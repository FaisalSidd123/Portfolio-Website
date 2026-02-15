import { useState, useEffect, useRef } from 'react';

export const useScrollSpy = (sectionIds, options = {}) => {
  const [activeSection, setActiveSection] = useState('');
  const observer = useRef(null);

  useEffect(() => {
    // Ensure DOM is ready
    if (typeof window === 'undefined') return;

    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter(el => el !== null);

    if (elements.length === 0) return;

    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    // Get the root margin from options
    const rootMargin = options.rootMargin || '-30% 0px -70% 0px';

    // Disconnect previous observer
    if (observer.current) {
      observer.current.disconnect();
    }

    // Create new observer
    observer.current = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: rootMargin,
      threshold: options.threshold || 0.1,
    });

    // Observe each section
    elements.forEach(el => {
      if (el) {
        observer.current.observe(el);
      }
    });

    // Initial check for hero section
    const heroElement = document.getElementById('hero');
    if (heroElement && window.scrollY === 0) {
      setActiveSection('hero');
    }

    // Handle manual scroll detection as fallback
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (let i = elements.length - 1; i >= 0; i--) {
        const element = elements[i];
        if (element) {
          const elementTop = element.offsetTop;
          const elementBottom = elementTop + element.offsetHeight;
          
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(element.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, options.rootMargin, options.threshold]);

  return activeSection;
};