import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

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
    { name: 'GitHub', icon: '💻', url: 'https://github.com/faisalsiddique' },
    { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com/in/faisalsiddique' },
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com' },
    { name: 'Email', icon: '✉️', url: 'mailto:faisalsiddique.129@gmail.com' }
  ];

  useEffect(() => {
    // Set initial visibility to prevent flashing
    gsap.set('.footer-logo', { opacity: 1 });
    gsap.set('.footer-nav .nav-link', { opacity: 1 });
    gsap.set('.footer-social .social-link', { opacity: 1 });
    gsap.set('.footer-copyright', { opacity: 1 });

    // Entrance animations on scroll
    gsap.from('.footer-logo', {
      scrollTrigger: {
        trigger: '.footer-component',
        start: 'top 80%',
      },
      scale: 0,
      rotation: 180,
      duration: 1,
      ease: 'elastic.out(1, 0.5)',
      clearProps: 'all'
    });

    gsap.from('.footer-nav .nav-link', {
      scrollTrigger: {
        trigger: '.footer-component',
        start: 'top 80%',
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      clearProps: 'all'
    });

    gsap.from('.footer-social .social-link', {
      scrollTrigger: {
        trigger: '.footer-component',
        start: 'top 80%',
      },
      scale: 0,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'back.out(1.7)',
      clearProps: 'all'
    });

    gsap.from('.footer-copyright', {
      scrollTrigger: {
        trigger: '.footer-component',
        start: 'top 80%',
      },
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.5,
      clearProps: 'all'
    });

    // Floating animation for logo
    gsap.to('.footer-logo', {
      y: 10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-component footer-section">
      <div className="footer-decoration">
        <div className="footer-glow"></div>
        <div className="footer-grid"></div>
      </div>

      <div className="footer-wrapper">
        {/* Logo */}
        <div className="footer-logo">
          <div className="logo-ring"></div>
          <div className="logo-text">FS</div>
        </div>

        {/* Navigation Links */}
        <div className="footer-nav">
          {navigationLinks.map((link, index) => (
            <button
              key={index}
              className="nav-link"
              onClick={() => scrollToSection(link.href)}
            >
              <span className="nav-link-text">{link.name}</span>
              <span className="nav-link-line"></span>
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="footer-divider">
          <div className="divider-dot"></div>
        </div>

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
              <span className="social-tooltip">{social.name}</span>
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          <p className="copyright-text">
            © {currentYear} <span className="highlight">Faisal Siddique</span>
          </p>
          <p className="copyright-subtext">Built with React & 💚</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;