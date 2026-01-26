import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './Home/Home'

import Aurora from './Background/Background'
import About from './About/About'
import Contact from './Contact/Contact'
import Footer from './Footer/Footer'
  

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
     <HomePage />
     <About />
     <Contact />
     <Footer />

    </div>
  )
}

export default App
