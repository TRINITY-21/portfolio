---
title: "React Patterns That Scale: Lessons From Production Applications"
slug: "react-patterns-for-production"
date: "2026-02-16"
description: "Battle-tested React patterns for building maintainable applications — compound components, custom hooks, render optimization, and state management strategies that survive real-world complexity."
tags: ["React", "TypeScript", "Frontend", "Architecture"]
published: true
---

Every React application starts clean. A few components, some local state, maybe a context or two. Then features pile up, edge cases multiply, and suddenly you're debugging a component tree that re-renders 47 times when someone types a single character into a search box.

I've shipped React applications ranging from internal dashboards to high-traffic consumer products. The patterns I'm sharing here aren't theoretical — they're the ones that consistently prevent the kind of complexity that makes codebases painful to work in. They're the patterns I wish I'd adopted sooner.

## Compound Components for Flexible UI

Most developers build configurable components by adding props. Need a variant? Add a prop. Need a different layout? Add a prop. Eventually you end up with a component that takes 30 props and has a render function full of conditionals.

Compound components flip this approach. Instead of configuring behavior through props, you compose behavior through children:

```tsx
// Instead of this prop-heavy approach:
<Tabs
  tabs={["Profile", "Settings", "Billing"]}
  defaultTab={0}
  renderTab={(tab, isActive) => <span>{tab}</span>}
  renderPanel={(tab) => <div>{panels[tab]}</div>}
  onChange={handleChange}
  variant="underlined"
/>

// Build this composable API:
<Tabs defaultValue="profile" onChange={handleChange}>
  <Tabs.List>
    <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
    <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Panel value="profile"><ProfileForm /></Tabs.Panel>
  <Tabs.Panel value="settings"><SettingsForm /></Tabs.Panel>
  <Tabs.Panel value="billing"><BillingInfo /></Tabs.Panel>
</Tabs>
```

Here's the implementation. The key insight is using React Context to share state between the parent and its children without prop drilling:

```tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs compound components must be used within <Tabs>");
  }
  return context;
}

interface TabsProps {
  defaultValue: string;
  onChange?: (value: string) => void;
  children: ReactNode;
}

function Tabs({ defaultValue, onChange, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const handleChange = (value: string) => {
    setActiveTab(value);
    onChange?.(value);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleChange }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabsList({ children }: { children: ReactNode }) {
  return <div role="tablist" className="tabs-list">{children}</div>;
}

function TabsTrigger({ value, children }: { value: string; children: ReactNode }) {
  const { activeTab, setActiveTab } = useTabsContext();
  return (
    <button
      role="tab"
      aria-selected={activeTab === value}
      className={activeTab === value ? "tab-active" : "tab-inactive"}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
}

function TabsPanel({ value, children }: { value: string; children: ReactNode }) {
  const { activeTab } = useTabsContext();
  if (activeTab !== value) return null;
  return <div role="tabpanel">{children}</div>;
}

// Attach sub-components
Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Panel = TabsPanel;
```

The consumer gets full control over markup and layout. Need to add an icon to one tab? Just put it inside the `Tabs.Trigger`. Need a divider between panels? Drop a `<hr />` in there. No new props needed.

**This pattern is how libraries like Radix UI and Headless UI work.** Once you internalize it, you'll stop building rigid prop-driven components.

## Custom Hooks Beyond useEffect

The most powerful use of custom hooks isn't wrapping `useEffect` — it's extracting reusable logic that would otherwise be duplicated across components. Here are three hooks I use in nearly every project:

### useDebounce

```tsx
import { useState, useEffect } from "react";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Usage: search input that doesn't fire on every keystroke
function SearchBar() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      searchApi(debouncedQuery);
    }
  }, [debouncedQuery]);

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}
```

### useLocalStorage

```tsx
import { useState, useCallback } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const valueToStore = value instanceof Function ? value(prev) : value;
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        return valueToStore;
      });
    },
    [key]
  );

  const removeValue = useCallback(() => {
    window.localStorage.removeItem(key);
    setStoredValue(initialValue);
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue] as const;
}

// Usage: persist UI preferences
function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useLocalStorage("sidebar-open", true);
  const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "light");

  return (
    <div className={theme}>
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen((prev) => !prev)} />
      <ThemeToggle theme={theme} onToggle={() => setTheme((t) => t === "light" ? "dark" : "light")} />
    </div>
  );
}
```

### useMediaQuery

```tsx
import { useState, useEffect } from "react";

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

// Usage: responsive behavior without CSS
function Navigation() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return isMobile ? <MobileNav /> : <DesktopNav />;
}
```

The key principle: **a custom hook should encapsulate a single concern and return the minimum API the consumer needs.** If your hook returns more than 3-4 values, it's probably doing too much.

## State Colocation vs Global State

This is where most React applications go wrong. Developers reach for global state management (Redux, Zustand, Jotai) too early, and suddenly every component re-renders when any piece of state changes.

Here's my rule: **state should live as close as possible to where it's used.**

```tsx
// Level 1: Local state — used by a single component
function SearchInput() {
  const [query, setQuery] = useState(""); // Only this component cares
  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}

// Level 2: Lifted state — shared by siblings
function ProductPage() {
  const [selectedSize, setSelectedSize] = useState<string>("M");
  return (
    <>
      <SizeSelector selected={selectedSize} onChange={setSelectedSize} />
      <AddToCartButton size={selectedSize} />
      <SizeGuide highlighted={selectedSize} />
    </>
  );
}

// Level 3: Context — shared across a subtree (rarely changes)
const ThemeContext = createContext<Theme>(defaultTheme);
function App() {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  return (
    <ThemeContext.Provider value={theme}>
      <Header />
      <Main />
      <Footer />
    </ThemeContext.Provider>
  );
}

// Level 4: Global store — truly global, frequently accessed state
// Use Zustand, Jotai, or Redux ONLY for this level
const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  login: async (credentials) => { /* ... */ },
  logout: () => set({ user: null, token: null }),
}));
```

**The litmus test:** if removing a component should also remove its state, that state should live in (or near) the component. Authentication state survives component unmounts — it's truly global. A form's draft state disappears with the form — it's local.

I've refactored applications that had 200+ Redux actions where 80% of the state could have been local `useState`. The performance improvement from that refactor alone was dramatic, because global state changes trigger re-renders in every connected component.

## Render Optimization Without Premature Memoization

Here's an unpopular opinion: **most `useMemo` and `React.memo` usage is premature optimization that adds complexity without measurable benefit.**

React is fast. A component re-rendering doesn't mean the DOM is updating. React's diffing algorithm is efficient enough that most re-renders are essentially free. So before reaching for memoization, try these strategies first:

### Strategy 1: Move State Down

```tsx
// Bad: The entire page re-renders when the input changes
function Page() {
  const [search, setSearch] = useState("");
  return (
    <div>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <ExpensiveTree />  {/* Re-renders on every keystroke! */}
      <AnotherExpensiveTree />
    </div>
  );
}

// Good: Only the search component re-renders
function Page() {
  return (
    <div>
      <SearchInput />  {/* State is isolated here */}
      <ExpensiveTree />
      <AnotherExpensiveTree />
    </div>
  );
}

function SearchInput() {
  const [search, setSearch] = useState("");
  return <input value={search} onChange={(e) => setSearch(e.target.value)} />;
}
```

### Strategy 2: Pass Children as Props

```tsx
// Bad: ScrollTracker state change re-renders children
function ScrollTracker({ children }: { children: ReactNode }) {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div>
      <ScrollIndicator position={scrollY} />
      {children}  {/* children is a stable reference from the parent! */}
    </div>
  );
}

// The children don't re-render because they were created by the PARENT,
// not by ScrollTracker. React preserves their reference.
function App() {
  return (
    <ScrollTracker>
      <ExpensiveTree />  {/* Won't re-render on scroll */}
    </ScrollTracker>
  );
}
```

### When Memoization Actually Helps

Use `React.memo` when you have **measurable evidence** of a performance problem and the component:

1. Renders frequently with the same props (parent re-renders often).
2. Has expensive rendering logic (large lists, complex calculations).
3. Receives stable or easily comparable props.

```tsx
// This IS a good use of React.memo — data visualization component
// that's expensive to render and receives the same data most of the time
const Chart = React.memo(function Chart({ data, config }: ChartProps) {
  // Expensive SVG path calculations, DOM manipulation
  const paths = computePaths(data, config); // Genuinely expensive
  return <svg>{paths.map((p) => <path key={p.id} d={p.d} />)}</svg>;
});

// Use useMemo for genuinely expensive computations
function AnalyticsDashboard({ transactions }: { transactions: Transaction[] }) {
  const summary = useMemo(() => {
    // Processing 100k+ records — this is worth memoizing
    return transactions.reduce((acc, tx) => {
      acc.total += tx.amount;
      acc.byCategory[tx.category] = (acc.byCategory[tx.category] ?? 0) + tx.amount;
      acc.byMonth[tx.month] = (acc.byMonth[tx.month] ?? 0) + tx.amount;
      return acc;
    }, { total: 0, byCategory: {}, byMonth: {} });
  }, [transactions]);

  return <DashboardView summary={summary} />;
}
```

**Profile first, optimize second.** React DevTools Profiler will show you exactly which components are slow. Fix those. Leave the rest alone.

## Error Boundaries in Practice

Error boundaries are React's mechanism for catching rendering errors. Most tutorials show a basic example and move on. Here's how I actually use them in production:

```tsx
import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode | ((error: Error, reset: () => void) => ReactNode);
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Send to your error tracking service
    this.props.onError?.(error, errorInfo);
  }

  reset = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      const { fallback } = this.props;
      if (typeof fallback === "function") {
        return fallback(this.state.error, this.reset);
      }
      return fallback;
    }
    return this.props.children;
  }
}
```

The real pattern is **granular error boundaries** — not one at the root, but multiple at different levels:

```tsx
function App() {
  return (
    // Root boundary: shows a full-page error for catastrophic failures
    <ErrorBoundary fallback={<FullPageError />} onError={reportToSentry}>
      <Layout>
        <Sidebar />
        <main>
          {/* Page-level boundary: the sidebar still works if the page crashes */}
          <ErrorBoundary
            fallback={(error, reset) => (
              <div>
                <h2>Something went wrong loading this page.</h2>
                <pre>{error.message}</pre>
                <button onClick={reset}>Try Again</button>
              </div>
            )}
          >
            <PageContent />
          </ErrorBoundary>
        </main>
      </Layout>
    </ErrorBoundary>
  );
}

function PageContent() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* Widget-level boundary: one widget crashing doesn't break the page */}
      <div className="grid grid-cols-3 gap-4">
        <ErrorBoundary fallback={<WidgetError name="Revenue" />}>
          <RevenueChart />
        </ErrorBoundary>
        <ErrorBoundary fallback={<WidgetError name="Users" />}>
          <UserMetrics />
        </ErrorBoundary>
        <ErrorBoundary fallback={<WidgetError name="Orders" />}>
          <OrdersTable />
        </ErrorBoundary>
      </div>
    </div>
  );
}
```

**The principle: isolate failures to the smallest reasonable surface area.** If a chart component throws because the API returned unexpected data, the rest of the dashboard should still work. Users should be able to keep using the parts that aren't broken.

## Data Fetching Patterns

If you're still writing `useEffect` + `useState` for data fetching, you're solving problems that have been solved. Libraries like TanStack Query (React Query) handle caching, deduplication, background refetching, and error/loading states out of the box. But understanding the underlying pattern is valuable:

```tsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Fetching with automatic caching and background refetching
function UserProfile({ userId }: { userId: string }) {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
    staleTime: 5 * 60 * 1000,    // Consider data fresh for 5 minutes
    retry: 2,                     // Retry failed requests twice
  });

  if (isLoading) return <ProfileSkeleton />;
  if (error) return <ErrorMessage error={error} />;

  return <ProfileCard user={user} />;
}

// Mutations that update the cache optimistically
function UpdateProfileForm({ user }: { user: User }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updates: Partial<User>) => updateUser(user.id, updates),
    // Optimistic update: show changes immediately
    onMutate: async (updates) => {
      await queryClient.cancelQueries({ queryKey: ["user", user.id] });
      const previous = queryClient.getQueryData<User>(["user", user.id]);
      queryClient.setQueryData(["user", user.id], { ...previous, ...updates });
      return { previous };
    },
    // If the mutation fails, roll back to the previous value
    onError: (_err, _updates, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["user", user.id], context.previous);
      }
    },
    // Always refetch after mutation to ensure consistency
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user", user.id] });
    },
  });

  const handleSubmit = (formData: Partial<User>) => {
    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleFormSubmit(handleSubmit)}>
      {/* form fields */}
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Saving..." : "Save Changes"}
      </button>
      {mutation.isError && <p>Failed to save. Please try again.</p>}
    </form>
  );
}
```

A pattern I've found particularly effective is creating **typed query factories** that centralize your API layer:

```tsx
const userQueries = {
  all: () => ({ queryKey: ["users"] as const }),
  lists: () => ({ ...userQueries.all(), queryKey: ["users", "list"] as const }),
  list: (filters: UserFilters) => ({
    queryKey: ["users", "list", filters] as const,
    queryFn: () => fetchUsers(filters),
  }),
  details: () => ({ ...userQueries.all(), queryKey: ["users", "detail"] as const }),
  detail: (id: string) => ({
    queryKey: ["users", "detail", id] as const,
    queryFn: () => fetchUser(id),
    staleTime: 5 * 60 * 1000,
  }),
};

// Usage is clean and consistent across the app
const { data } = useQuery(userQueries.detail(userId));
const { data } = useQuery(userQueries.list({ role: "admin" }));

// Cache invalidation becomes surgical
queryClient.invalidateQueries(userQueries.lists()); // Invalidate all user lists
queryClient.invalidateQueries(userQueries.detail(userId)); // Invalidate one user
```

This gives you a single source of truth for query keys, fetch functions, and cache configuration. When the API changes, you update one place.

## Conclusion

These patterns all share a common philosophy: **manage complexity by making it hard to do the wrong thing.** Compound components make it hard to build rigid UIs. State colocation makes it hard to create unnecessary re-renders. Error boundaries make it hard for one failure to cascade. Typed query factories make it hard to have cache key mismatches.

None of these patterns are complicated individually. The discipline is knowing when to apply each one and resisting the urge to over-engineer before you have a real problem. Start with the simplest approach: local state, plain components, direct data fetching. Refactor toward these patterns when the codebase tells you it needs them — when you find yourself duplicating logic, fighting re-renders, or debugging state that's three context providers away from where it's used.

The best React codebases I've worked in weren't impressive because of the patterns they used. They were impressive because every pattern choice had a clear reason behind it. Aim for that, and your applications will scale with your team and your requirements.
