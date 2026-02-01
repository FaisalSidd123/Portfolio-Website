import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './Home/Home'

import Aurora from './Background/Background'
import About from './About/About'
import Contact from './Contact/Contact'
import Footer from './Footer/Footer'
import Skills from './Skills/Skills'
import Education from './Education/Education'
import Projects from './Projects/Projects'
  

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
     <HomePage />
     <About />
     <Skills />
     <Education />
     <Projects />
     <Contact />
     <Footer />

    </div>
  )
}

export default App
