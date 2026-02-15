import { Analytics } from '@vercel/analytics/react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import About from './sections/About'
import Contact from './sections/Contact'
import Experience from './sections/Experience'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import VibeCoded from './sections/VibeCoded'

function App() {
  return (
    <div className="min-h-screen bg-obsidian">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <VibeCoded />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <Analytics />
    </div>
  )
}

export default App
