---
title: "TypeScript Patterns That Make Your Code Bulletproof"
slug: "typescript-patterns-you-should-know"
date: "2026-01-18"
description: "Advanced TypeScript patterns for real-world applications — discriminated unions, branded types, type-safe event systems, and builder patterns that catch bugs at compile time instead of production."
tags: ["TypeScript", "Frontend", "Software Engineering", "React"]
published: true
---

TypeScript's type system is far more powerful than most developers realize. Beyond basic annotations, there are patterns that fundamentally change how you write code — catching entire categories of bugs at compile time that would otherwise surface in production.

These are the patterns I reach for in every serious TypeScript project.

## Discriminated Unions: Model Your Domain

This is the single most impactful TypeScript pattern. Instead of optional fields and boolean flags, model each state explicitly:

```typescript
// Bad: Multiple optional fields, unclear which combinations are valid
interface ApiResponse {
  data?: User[];
  error?: string;
  loading?: boolean;
  // Can loading be true AND error be set? Who knows.
}

// Good: Each state is explicit and exhaustive
type ApiResponse =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: User[] }
  | { status: "error"; error: string; retryable: boolean };

// TypeScript enforces correct access
function renderUsers(response: ApiResponse) {
  switch (response.status) {
    case "idle":
      return <Placeholder />;
    case "loading":
      return <Spinner />;
    case "success":
      return <UserList users={response.data} />; // ✅ data is guaranteed
    case "error":
      return <Error message={response.error} />; // ✅ error is guaranteed
  }
}
```

The power: if you add a new status (say `"retrying"`), TypeScript will flag every `switch` statement that doesn't handle it. **New states can't silently fall through.**

### Exhaustive Checking

```typescript
// This helper ensures you handle every case
function assertNever(x: never): never {
  throw new Error(`Unexpected value: ${x}`);
}

function getStatusColor(response: ApiResponse): string {
  switch (response.status) {
    case "idle": return "gray";
    case "loading": return "blue";
    case "success": return "green";
    case "error": return "red";
    default: return assertNever(response);
    // If you add a new status and forget to handle it,
    // TypeScript will error on this line ✅
  }
}
```

## Branded Types: Prevent Primitive Obsession

Strings and numbers are ambiguous. Is this string a `userId` or an `orderId`? Is this number pixels or milliseconds? Branded types add compile-time safety:

```typescript
// Create distinct types from primitives
type UserId = string & { readonly __brand: "UserId" };
type OrderId = string & { readonly __brand: "OrderId" };

// Constructor functions with validation
function UserId(id: string): UserId {
  if (!id.startsWith("usr_")) throw new Error("Invalid UserId format");
  return id as UserId;
}

function OrderId(id: string): OrderId {
  if (!id.startsWith("ord_")) throw new Error("Invalid OrderId format");
  return id as OrderId;
}

// Now TypeScript prevents mixing them up
function getOrder(orderId: OrderId): Order { /* ... */ }
function getUser(userId: UserId): User { /* ... */ }

const userId = UserId("usr_123");
const orderId = OrderId("ord_456");

getOrder(userId);  // ❌ Type error! Can't pass UserId where OrderId expected
getOrder(orderId); // ✅ Correct type
```

This catches bugs that unit tests often miss — accidentally swapping two string parameters of the same type.

## Type-Safe Event Emitters

Event systems are notoriously hard to type correctly. Here's a pattern that makes them bulletproof:

```typescript
type EventMap = {
  "user:login": { userId: string; timestamp: Date };
  "user:logout": { userId: string };
  "order:created": { orderId: string; items: CartItem[] };
  "order:paid": { orderId: string; amount: number };
};

class TypedEventEmitter<T extends Record<string, any>> {
  private handlers = new Map<string, Set<Function>>();

  on<K extends keyof T>(event: K, handler: (payload: T[K]) => void): () => void {
    const set = this.handlers.get(event as string) ?? new Set();
    set.add(handler);
    this.handlers.set(event as string, set);

    // Return unsubscribe function
    return () => set.delete(handler);
  }

  emit<K extends keyof T>(event: K, payload: T[K]): void {
    this.handlers.get(event as string)?.forEach((fn) => fn(payload));
  }
}

const events = new TypedEventEmitter<EventMap>();

// Fully typed — autocomplete for event names AND payloads
events.on("user:login", (payload) => {
  console.log(payload.userId);    // ✅ string
  console.log(payload.timestamp); // ✅ Date
});

events.emit("order:created", {
  orderId: "ord_123",
  items: [{ id: "item_1", quantity: 2 }],
}); // ✅ Payload shape is enforced

events.emit("user:login", { orderId: "wrong" }); // ❌ Type error!
```

## The Builder Pattern for Complex Objects

When constructing objects with many optional fields, builders provide a type-safe, readable API:

```typescript
interface EmailConfig {
  to: string[];
  subject: string;
  body: string;
  cc?: string[];
  bcc?: string[];
  replyTo?: string;
  attachments?: Attachment[];
  priority?: "low" | "normal" | "high";
}

class EmailBuilder {
  private config: Partial<EmailConfig> = {};

  to(...addresses: string[]): this {
    this.config.to = addresses;
    return this;
  }

  subject(subject: string): this {
    this.config.subject = subject;
    return this;
  }

  body(body: string): this {
    this.config.body = body;
    return this;
  }

  cc(...addresses: string[]): this {
    this.config.cc = addresses;
    return this;
  }

  priority(level: "low" | "normal" | "high"): this {
    this.config.priority = level;
    return this;
  }

  attach(...files: Attachment[]): this {
    this.config.attachments = files;
    return this;
  }

  build(): EmailConfig {
    if (!this.config.to?.length) throw new Error("Recipient required");
    if (!this.config.subject) throw new Error("Subject required");
    if (!this.config.body) throw new Error("Body required");
    return this.config as EmailConfig;
  }
}

// Clean, readable construction
const email = new EmailBuilder()
  .to("user@example.com", "admin@example.com")
  .subject("Monthly Report")
  .body(reportHtml)
  .cc("manager@example.com")
  .priority("high")
  .build();
```

## `satisfies`: The Underused Keyword

The `satisfies` operator validates a value matches a type without widening it:

```typescript
type Route = {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  handler: string;
};

// With 'as const', you get literal types but no type checking
const routes_bad = {
  getUsers: { path: "/users", method: "GET", handler: "getUsers" },
  createUser: { path: "/users", method: "POSTT", handler: "createUser" },
  // Typo "POSTT" is NOT caught ❌
} as const;

// With satisfies, you get BOTH type checking AND literal types
const routes = {
  getUsers: { path: "/users", method: "GET", handler: "getUsers" },
  createUser: { path: "/users", method: "POST", handler: "createUser" },
  // Typo would be caught ✅
} satisfies Record<string, Route>;

// And you still get precise types:
routes.getUsers.method; // type is "GET", not string
```

## Utility Types for Real-World Scenarios

### Deep Partial (for patch operations)

```typescript
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface UserSettings {
  profile: {
    name: string;
    avatar: string;
    bio: string;
  };
  notifications: {
    email: boolean;
    push: boolean;
    frequency: "daily" | "weekly";
  };
}

// Update any nested subset of settings
function updateSettings(userId: string, patch: DeepPartial<UserSettings>) {
  // patch.profile?.name is valid
  // patch.notifications?.frequency is valid
  // TypeScript ensures you can't add unknown fields
}

updateSettings("usr_123", {
  notifications: { email: false }, // Only update one nested field ✅
});
```

### Type-Safe API Routes

```typescript
type ApiRoutes = {
  "/users": { GET: { response: User[] }; POST: { body: CreateUserDto; response: User } };
  "/users/:id": { GET: { response: User }; PUT: { body: UpdateUserDto; response: User } };
  "/orders": { GET: { response: Order[] } };
};

async function api<
  Path extends keyof ApiRoutes,
  Method extends keyof ApiRoutes[Path],
>(
  path: Path,
  method: Method,
  ...args: "body" extends keyof ApiRoutes[Path][Method]
    ? [body: ApiRoutes[Path][Method]["body"]]
    : []
): Promise<ApiRoutes[Path][Method]["response"]> {
  // Implementation
}

// Fully typed API calls
const users = await api("/users", "GET");           // User[]
const user = await api("/users", "POST", {          // User
  name: "John",
  email: "john@example.com",
});
const orders = await api("/orders", "GET");         // Order[]
```

## Template Literal Types for String Validation

```typescript
// CSS unit validation at compile time
type CSSUnit = "px" | "rem" | "em" | "vh" | "vw" | "%";
type CSSValue = `${number}${CSSUnit}`;

function setWidth(value: CSSValue) { /* ... */ }

setWidth("100px");   // ✅
setWidth("2.5rem");  // ✅
setWidth("100");     // ❌ Missing unit
setWidth("100dogs"); // ❌ Invalid unit

// Route parameter extraction
type ExtractParams<T extends string> =
  T extends `${string}:${infer Param}/${infer Rest}`
    ? Param | ExtractParams<Rest>
    : T extends `${string}:${infer Param}`
    ? Param
    : never;

type UserRouteParams = ExtractParams<"/users/:userId/posts/:postId">;
// type = "userId" | "postId"
```

## The Practical Takeaway

These patterns share a common goal: **move runtime errors to compile-time errors.** Every bug your type system catches is a bug that never reaches production, never triggers an alert at 3 AM, and never costs your users' trust.

Start with discriminated unions and branded types — they have the highest impact-to-effort ratio. Layer in the others as your codebase grows. The investment in type safety pays for itself many times over.
