import { useEffect, useState, useRef } from 'react';
import { useScrollSpy } from '../hooks/useScrollSpy';
import ModernNav from '../Nav/Nav';
import Aurora from "../Background/Background";
import './Home.css';

function HomePage() {
  const [textIndex, setTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const contentRef = useRef(null);

  const sectionIds = ['hero', 'about', 'skills', 'education', 'projects', 'contact'];
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
    const typewriterInterval = setInterval(() => {
      setIsTyping(false);
      setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % greetings.length);
        setIsTyping(true);
      }, 400);
    }, 4500);
    return () => clearInterval(typewriterInterval);
  }, [greetings.length]);

  const handleWorkClick = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home-component home-container">
      <Aurora
        colorStops={['#0011ff', '#00ff9d', '#5227FF']}
        amplitude={1.6}
        blend={0.65}
      />

      <div className="home-gradient-overlay"></div>

      <ModernNav
        name="FS"
        navItems={[
          { label: 'Home',      path: '/',         sectionId: 'hero'      },
          { label: 'About',     path: '#about',    sectionId: 'about'     },
          { label: 'Skills',    path: '#skills',   sectionId: 'skills'    },
          { label: 'Education', path: '#education',sectionId: 'education' },
          { label: 'Projects',  path: '#projects', sectionId: 'projects'  },
          { label: 'Contact',   path: '#contact',  sectionId: 'contact'   },
        ]}
        activeSection={activeSection}
      />

      <div id="hero" className="home-hero-section">
        <div className="home-content" ref={contentRef}>

          {/* ── Status / Availability Badge ── */}
          <div className="home-status-badge">
            <span className="home-status-dot" aria-hidden="true" />
            <span className="home-status-label">Available for opportunities</span>
            <span className="home-status-pill">2026</span>
          </div>

          {/* ── Hero copy ── */}
          <div className="home-hero-content">
            <div className="home-title-section">
              <div className={`home-title-wrapper${isTyping ? ' typing' : ''}`}>
                <h2 className="home-main-title">{greetings[textIndex]}</h2>
              </div>
              <p key={textIndex} className="home-tagline home-tagline-animated">
                {taglines[textIndex]}
              </p>
            </div>

            {/* ── CTA Buttons ── */}
            <div className="home-action-buttons">

              {/* Primary — View Projects */}
              <button
                className="home-btn home-btn-primary"
                onClick={handleWorkClick}
                aria-label="View Projects"
              >
                <span className="home-btn-bg" aria-hidden="true"></span>
                <span className="home-btn-shimmer" aria-hidden="true"></span>
                <span className="home-btn-inner">
                  <span className="home-btn-text">View Projects</span>
                  <span className="home-btn-icon" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M7 17L17 7M17 7H7M17 7v10"
                        stroke="currentColor" strokeWidth="2.2"
                        strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </span>
              </button>

              {/* Secondary — Get in Touch */}
              <button
                className="home-btn home-btn-secondary"
                onClick={handleContactClick}
                aria-label="Get in Touch"
              >
                <span className="home-btn-border" aria-hidden="true"></span>
                <span className="home-btn-inner">
                  <span className="home-btn-text">Get in Touch</span>
                  <span className="home-btn-icon" aria-hidden="true">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                        stroke="currentColor" strokeWidth="2.2"
                        strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </span>
              </button>
            </div>
          </div>

          {/* ── Scroll indicator ── */}
          <div className="home-scroll-indicator" aria-hidden="true">
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