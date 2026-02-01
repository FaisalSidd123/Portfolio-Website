import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import './Footer.css';

const Footer = () => {
  const [currentYear] = useState(new Date().getFullYear());

  const navigationLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { name: 'GitHub', icon: '💻', url: 'https://github.com' },
    { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com' },
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com' }
  ];

  useEffect(() => {
    // Simple fade in animation
    gsap.from('.footer-component', {
      opacity: 1,
      duration: 1,
      delay: 0.2
    });
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-component footer-section">
      <div className="footer-wrapper">
        {/* Navigation Links */}
        <div className="footer-nav">
          {navigationLinks.map((link, index) => (
            <button
              key={index}
              className="nav-link"
              onClick={() => scrollToSection(link.href)}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Social Links */}
        <div className="footer-social">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
            >
              <span className="social-icon">{social.icon}</span>
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          <p>© {currentYear} Faisal Siddique. Built with React.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;