import { useEffect, useState, useRef } from 'react';
import { useScrollSpy } from '../hooks/useScrollSpy'; // Import the hook
import ModernNav from '../Nav/Nav';
import Aurora from "../Background/Background";
import './Home.css';

function HomePage() {
  const [textIndex, setTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const contentRef = useRef(null);

  // Define your section IDs (must match the IDs in your components)
  const sectionIds = ['hero', 'about', 'skills', 'education', 'projects', 'contact'];
  
  // Use the scroll spy hook
  const activeSection = useScrollSpy(sectionIds, {
    rootMargin: '-25% 0px -65% 0px',
    threshold: 0.1
  });

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
  }, [greetings.length]);

  const handleWorkClick = () => {
    const workSection = document.getElementById('projects');
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
      
      {/* Navigation - Pass activeSection prop */}
      <ModernNav 
        name="FS"
        navItems={[
          { label: 'Home', path: '/', sectionId: 'hero' },
          { label: 'About', path: '#about', sectionId: 'about' },
          { label: 'Skills', path: '#skills', sectionId: 'skills' },
          { label: 'Education', path: '#education', sectionId: 'education' },
          { label: 'Projects', path: '#projects', sectionId: 'projects' },
          { label: 'Contact', path: '#contact', sectionId: 'contact' }
        ]}
        activeSection={activeSection}
      />
      
      {/* Main Content - Hero Section */}
      <div id="hero" className="home-hero-section">
        <div className="home-content" ref={contentRef}>
          {/* Status / Availability Badge */}
          <div className="home-status-badge">
            <span className="home-status-dot" />
            <span>Available for new opportunities</span>
            <span className="home-status-pill">Portfolio · 2026</span>
          </div>

          {/* Hero Section */}
          <div className="home-hero-content">
            {/* Greeting */}
          
            {/* Main Title */}
            <div className="home-title-section">
              <div className={`home-title-wrapper ${isTyping ? 'typing' : ''}`}>
                <h2 className="home-main-title">
                  {greetings[textIndex]}
                  {/* <span className="home-typing-cursor">|</span> */}
                </h2>
              </div>
              <p
                key={textIndex}
                className="home-tagline home-tagline-animated"
              >
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
    </div>
  );
}

export default HomePage;