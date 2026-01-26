import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import './Nav.css';

const ModernNav = ({ 
  logo,
  name = "Faisal Siddique",
  navItems = []
}) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);
  const underlineRef = useRef(null);
  const menuItemsRef = useRef([]);

  const defaultNavItems = [
    { label: 'Home', path: '/' },
    { label: 'Work', path: '/work' },
    { label: 'About', path: '/about' },
    { label: 'Skills', path: '/skills' },
    { label: 'Contact', path: '/contact' }
  ];

  const items = navItems.length > 0 ? navItems : defaultNavItems;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Update underline position based on active item
    const activeIndex = items.findIndex(item => item.path === location.pathname);
    if (activeIndex !== -1 && underlineRef.current) {
      const activeItem = menuItemsRef.current[activeIndex];
      if (activeItem) {
        const { offsetLeft, offsetWidth } = activeItem;
        gsap.to(underlineRef.current, {
          left: offsetLeft,
          width: offsetWidth,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    }
  }, [location.pathname, items]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      // Animate in mobile menu items
      gsap.fromTo('.mobile-nav-item', 
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.4, 
          stagger: 0.1,
          ease: 'power2.out' 
        }
      );
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleItemHover = (index) => {
    const item = menuItemsRef.current[index];
    if (item && underlineRef.current) {
      const { offsetLeft, offsetWidth } = item;
      gsap.to(underlineRef.current, {
        left: offsetLeft,
        width: offsetWidth,
        duration: 0.2,
        ease: 'power2.out'
      });
    }
  };

  const handleNavLeave = () => {
    const activeIndex = items.findIndex(item => item.path === location.pathname);
    if (activeIndex !== -1 && underlineRef.current) {
      const activeItem = menuItemsRef.current[activeIndex];
      if (activeItem) {
        const { offsetLeft, offsetWidth } = activeItem;
        gsap.to(underlineRef.current, {
          left: offsetLeft,
          width: offsetWidth,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogoClick = () => {
    gsap.to('.nav-logo', {
      scale: 1.1,
      duration: 0.2,
      yoyo: true,
      repeat: 1
    });
  };

  return (
    <>
      <nav 
        ref={navRef}
        className={`modern-nav ${scrolled ? 'scrolled' : ''}`}
        onMouseLeave={handleNavLeave}
      >
        {/* Logo */}
        <Link 
          to="/" 
          className="nav-logo"
          onClick={handleLogoClick}
        >
          {logo ? (
            <img src={logo} alt={name} className="logo-image" />
          ) : (
            <div className="logo-text">
              {name.split(' ').map((word, i) => (
                <span key={i} className="logo-word">FS</span>
              ))}
            </div>
          )}
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-items">
          <ul className="nav-list">
            {items.map((item, index) => (
              <li 
                key={item.label}
                ref={el => menuItemsRef.current[index] = el}
                className="nav-item"
                onMouseEnter={() => handleItemHover(index)}
              >
                <Link 
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  <span className="link-number">0{index + 1}</span>
                  <span className="link-label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="nav-underline" ref={underlineRef} />
        </div>

        {/* Contact Button */}
        <a 
          href="/contact" 
          className="nav-contact"
          onClick={(e) => {
            e.preventDefault();
            // Smooth scroll to contact section or navigate
            const contactSection = document.getElementById('contact');
            if (contactSection && location.pathname === '/') {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            } else {
              window.location.href = '/contact';
            }
          }}
        >
          Get in Touch
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
          <span className="menu-line"></span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          {/* Mobile Logo */}
          <Link 
            to="/" 
            className="mobile-logo"
            onClick={() => setIsMenuOpen(false)}
          >
            {logo ? (
              <img src={logo} alt={name} className="mobile-logo-image" />
            ) : (
              <div className="mobile-logo-text">{name}</div>
            )}
          </Link>

          {/* Mobile Navigation */}
          <ul className="mobile-nav-list">
            {items.map((item, index) => (
              <li key={item.label} className="mobile-nav-item">
                <Link 
                  to={item.path}
                  className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="mobile-link-number">0{index + 1}</span>
                  <span className="mobile-link-label">{item.label}</span>
                  <span className="mobile-link-arrow">→</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Contact Button */}
          <a 
            href="/contact" 
            className="mobile-contact-btn"
            onClick={() => setIsMenuOpen(false)}
          >
            Let's Connect
          </a>

          {/* Mobile Social Links (Minimal) */}
          <div className="mobile-social">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">
              GitHub
            </a>
            <span className="social-separator">/</span>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
              LinkedIn
            </a>
            <span className="social-separator">/</span>
            <a href="mailto:hello@faisal.com" className="social-link">
              Email
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModernNav;