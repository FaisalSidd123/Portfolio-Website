import { useState } from 'react'
import './App.css'
import HomePage from './Home/Home'
import About from './About/About'
import Contact from './Contact/Contact'
import Footer from './Footer/Footer'
import Skills from './Skills/Skills'
import Education from './Education/Education'
import Projects from './Projects/Projects'

function App() {
  return (
    <div className="App">
      {/* HomePage includes the navigation */}
      <HomePage />
      
      {/* Sections with proper IDs */}
      <section id="about">
        <About />
      </section>
      
      <section id="skills">
        <Skills />
      </section>
      
      <section id="education">
        <Education />
      </section>
      
      <section id="projects">
        <Projects />
      </section>
      
      <section id="contact">
        <Contact />
      </section>
      
      <Footer />
    </div>
  )
}

export default App