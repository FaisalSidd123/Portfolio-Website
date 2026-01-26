import { useEffect, useState, useRef } from 'react';
import ModernNav from '../Nav/Nav';
import Aurora from "../Background/Background";
import './Home.css';

function HomePage() {
  const [textIndex, setTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const contentRef = useRef(null);

  const greetings = [
    "I'm Faisal Siddique",
    "Full-Stack Developer",
    "Digital Craftsman",
    "Problem Solver",
    "Tech Innovator"
  ];

  const taglines = [
    "Building exceptional digital experiences",
    "Turning ideas into impactful solutions",
    "Crafting code that makes a difference",
    "Passionate about elegant engineering",
    "Shaping the future through technology"
  ];

  useEffect(() => {
    // Typewriter effect
    const typewriterInterval = setInterval(() => {
      setIsTyping(false);
      setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % greetings.length);
        setIsTyping(true);
      }, 400);
    }, 4500);

    return () => {
      clearInterval(typewriterInterval);
    };
  }, []);

  const handleWorkClick = () => {
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-container">
      {/* Aurora Background */}
      <Aurora 
        colorStops={['#0011ff', '#00ff9d', '#5227FF']}
        amplitude={1.6}
        blend={0.65}
      />
      
      {/* Gradient Overlay */}
      <div className="gradient-overlay"></div>
      
      {/* Navigation */}
      <ModernNav 
        name="FS"
        navItems={[
          { label: 'Home', path: '/' },
          { label: 'Work', path: '/work' },
          { label: 'About', path: '/about' },
          { label: 'Skills', path: '/skills' },
          { label: 'Contact', path: '/contact' }
        ]}
      />
      
      {/* Main Content */}
      <div className="home-content" ref={contentRef}>
        
        {/* Status Badge
        <div className="status-badge">
          <div className="status-dot"></div>
          <span>Available for projects</span>
        </div> */}

        {/* Hero Section */}
        <div className="hero-content">
          
          {/* Greeting
          <div className="greeting-section">
            <h1 className="greeting">
              Hi there, <span className="wave">👋</span>
            </h1>
          </div> */}

          {/* Main Title */}
          <div className="title-section">
            <div className={`title-wrapper ${isTyping ? 'typing' : ''}`}>
              <h2 className="main-title">
                {greetings[textIndex]}
                <span className="typing-cursor">|</span>
              </h2>
            </div>
            <p className="tagline">
              {taglines[textIndex]}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="action-buttons">
            <button 
              className="action-button primary" 
              onClick={handleWorkClick}
            >
              <span className="button-content">
                <span className="button-text">View Projects</span>
                <span className="button-icon">↗</span>
              </span>
            </button>
            <button 
              className="action-button secondary" 
              onClick={handleContactClick}
            >
              <span className="button-content">
                <span className="button-text">Get in Touch</span>
                <span className="button-icon">✉️</span>
              </span>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="indicator-line">
            <div className="indicator-dot"></div>
          </div>
          <span className="indicator-text">Scroll</span>
        </div>
      </div>
    </div>
  );
}

export default HomePage;