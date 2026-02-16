import { useState, useEffect } from 'react'
import './App.css'
import LoadingScreen from './SplashScreen/LoadingScreen'
import HomePage from './Home/Home'
import About from './About/About'
import Contact from './Contact/Contact'
import Footer from './Footer/Footer'
import Skills from './Skills/Skills'
import Education from './Education/Education'
import Projects from './Projects/Projects'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Prevent scrolling during loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Small delay to ensure smooth transition
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  return (
    <div className="App">
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      {/* Main Content - Only render after loading */}
      {showContent && (
        <>
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
        </>
      )}
    </div>
  )
}

export default App