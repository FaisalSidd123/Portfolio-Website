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
    <div className="home-component home-container">
      {/* Aurora Background */}
      <Aurora 
        colorStops={['#0011ff', '#00ff9d', '#5227FF']}
        amplitude={1.6}
        blend={0.65}
      />
      
      {/* Gradient Overlay */}
      <div className="home-gradient-overlay"></div>
      
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
        {/* Status Badge (commented but kept for reference)
        <div className="home-status-badge">
          <div className="home-status-dot"></div>
          <span>Available for projects</span>
        </div> */}

        {/* Hero Section */}
        <div className="home-hero-content">
          
          {/* Greeting (commented but kept for reference)
          <div className="home-greeting-section">
            <h1 className="home-greeting">
              Hi there, <span className="home-wave">👋</span>
            </h1>
          </div> */}

          {/* Main Title */}
          <div className="home-title-section">
            <div className={`home-title-wrapper ${isTyping ? 'typing' : ''}`}>
              <h2 className="home-main-title">
                {greetings[textIndex]}
                <span className="home-typing-cursor">|</span>
              </h2>
            </div>
            <p className="home-tagline">
              {taglines[textIndex]}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="home-action-buttons">
            <button 
              className="home-action-button home-primary-button" 
              onClick={handleWorkClick}
            >
              <span className="home-button-content">
                <span className="home-button-text">View Projects</span>
                <span className="home-button-icon">↗</span>
              </span>
            </button>
            <button 
              className="home-action-button home-secondary-button" 
              onClick={handleContactClick}
            >
              <span className="home-button-content">
                <span className="home-button-text">Get in Touch</span>
                <span className="home-button-icon">✉️</span>
              </span>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="home-scroll-indicator">
          <div className="home-indicator-line">
            <div className="home-indicator-dot"></div>
          </div>
          <span className="home-indicator-text">Scroll</span>
        </div>
      </div>
    </div>
  );
}

export default HomePage;