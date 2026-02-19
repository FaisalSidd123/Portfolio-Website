import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import './Nav.css';

const ModernNav = ({ 
  logo,
  name = "FS",
  navItems = [],
  activeSection = ''  // Add this prop
}) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState(activeSection || ''); // State for active section
  const navRef = useRef(null);
  const logoRef = useRef(null);

  const defaultNavItems = [
    { label: 'Home', path: '/', sectionId: 'hero' },
    { label: 'About', path: '#about', sectionId: 'about' },
    { label: 'Skills', path: '#skills', sectionId: 'skills' },
    { label: 'Projects', path: '#projects', sectionId: 'projects' },
    { label: 'Contact', path: '#contact', sectionId: 'contact' }
  ];

  const items = navItems.length > 0 ? navItems.map(item => ({
    ...item,
    sectionId: item.label.toLowerCase().replace(/\s+/g, '-')
  })) : defaultNavItems;

  // Update activeNav when activeSection prop changes
  useEffect(() => {
    if (activeSection) {
      setActiveNav(activeSection);
    }
  }, [activeSection]);

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash && items.some(item => item.sectionId === hash)) {
        setActiveNav(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [items]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Logo entrance animation (subtle, no disappearing or rotation)
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        {
          scale: 0.9,
          opacity: 0,
          rotation: 0,
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.7,
          ease: 'power3.out',
          delay: 0.15,
        }
      );
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo('.mobile-nav-item', 
        { x: -30, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.5, 
          stagger: 0.08,
          ease: 'power3.out' 
        }
      );
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleItemClick = (path, sectionId) => {
    if (path.startsWith('#')) {
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveNav(sectionId);
      }
    } else if (path === '/') {
      // Scroll to top for home button
      window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      });
      setActiveNav('hero');
      
      // Clear any hash from URL
      window.history.pushState(null, null, ' ');
    }
    setIsMenuOpen(false);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveNav('hero');
    window.history.pushState(null, null, ' '); // Clear hash
    
    // Logo animation on click
    gsap.timeline()
      .to(logoRef.current, {
        scale: 0.9,
        duration: 0.1,
        ease: 'power2.in'
      })
      .to(logoRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'elastic.out(1, 0.3)'
      });
  };

  const handleLogoHover = () => {
    gsap.to('.logo-ring', {
      rotation: '+=360',
      duration: 0.6,
      ease: 'power2.out'
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Check if link should be active
  const isLinkActive = (item) => {
    // For home/hero, check if we're at the top
    if (item.sectionId === 'hero') {
      const atTop = window.scrollY < 100;
      return (atTop && activeNav === 'hero') || 
             (location.pathname === '/' && !location.hash);
    }
    
    // For other sections
    return activeNav === item.sectionId || 
           (item.path.startsWith('#') && location.hash === item.path);
  };

  return (
    <>
      <nav 
        ref={navRef}
        className={`modern-nav ${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}
      >
        <div className="nav-container">
          {/* Logo with Unique Design */}
          <Link 
            to="/" 
            className="nav-logo"
            onClick={handleLogoClick}
            onMouseEnter={handleLogoHover}
            ref={logoRef}
          >
            {logo ? (
              <img src={logo} alt={name} className="logo-image" />
            ) : (
              <div className="logo-wrapper">
                <div className="logo-background">
                  <div className="logo-ring"></div>
                  <div className="logo-inner-ring"></div>
                </div>
                <div className="logo-content">
                  <span className="logo-letter logo-f">F</span>
                  <span className="logo-letter logo-s">S</span>
                </div>
                <div className="logo-sparkle sparkle-1">✦</div>
                <div className="logo-sparkle sparkle-2">✦</div>
                <div className="logo-glow"></div>
              </div>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-center">
            <ul className="nav-list">
              {items.map((item, index) => (
                <li key={item.label} className="nav-item">
                  {item.path.startsWith('#') ? (
                    <a
                      href={item.path}
                      className={`nav-link ${isLinkActive(item) ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleItemClick(item.path, item.sectionId);
                      }}
                    >
                      <span className="link-number">0{index + 1}</span>
                      <span className="link-label">{item.label}</span>
                      <span className="link-dot"></span>
                    </a>
                  ) : (
                    <a
                      href="/"
                      className={`nav-link ${isLinkActive(item) ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleItemClick(item.path, item.sectionId);
                      }}
                    >
                      <span className="link-number">0{index + 1}</span>
                      <span className="link-label">{item.label}</span>
                      <span className="link-dot"></span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Button */}
          <a 
            href="#contact" 
            className="nav-cta"
            onClick={(e) => {
              e.preventDefault();
              handleItemClick('#contact', 'contact');
            }}
          >
            <span className="cta-text">Let's Talk</span>
            <span className="cta-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="cta-shine"></span>
          </a>

          {/* Mobile Menu Button */}
          <button 
            className={`mobile-menu-btn ${isMenuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="menu-line"></span>
            <span className="menu-line"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-backdrop" onClick={toggleMenu}></div>
        
        <div className="mobile-menu-content">
          {/* Mobile Header */}
          <div className="mobile-header">
            <div className="mobile-logo-wrapper">
              <div className="mobile-logo-bg">
                <div className="mobile-logo-ring"></div>
              </div>
              <div className="mobile-logo-text">
                <span className="mobile-logo-f">F</span>
                <span className="mobile-logo-s">S</span>
              </div>
            </div>
            <button 
              className="mobile-close"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {items.map((item, index) => (
                <li key={item.label} className="mobile-nav-item">
                  {item.path.startsWith('#') ? (
                    <a
                      href={item.path}
                      className={`mobile-nav-link ${isLinkActive(item) ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleItemClick(item.path, item.sectionId);
                      }}
                    >
                      <span className="mobile-link-number">0{index + 1}</span>
                      <span className="mobile-link-label">{item.label}</span>
                      <span className="mobile-link-arrow">→</span>
                    </a>
                  ) : (
                    <a
                      href="/"
                      className={`mobile-nav-link ${isLinkActive(item) ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleItemClick(item.path, item.sectionId);
                      }}
                    >
                      <span className="mobile-link-number">0{index + 1}</span>
                      <span className="mobile-link-label">{item.label}</span>
                      <span className="mobile-link-arrow">→</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Footer */}
          <div className="mobile-footer">
           
            
            <div className="mobile-socials">
              <a href="https://github.com/faisalsiddique" target="_blank" rel="noopener noreferrer">
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com/in/faisalsiddique" target="_blank" rel="noopener noreferrer">
                <span>LinkedIn</span>
              </a>
              <a href="mailto:faisalsiddique.129@gmail.com">
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModernNav;