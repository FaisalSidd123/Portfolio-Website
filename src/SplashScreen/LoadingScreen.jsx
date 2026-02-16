import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './LoadingScreen.css';

const LoadingScreen = ({ onComplete }) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    // Set initial visibility to prevent flashing
    gsap.set(logoRef.current, { opacity: 1, scale: 1 });
    gsap.set('.loading-text-line', { opacity: 1, y: 0 });
    gsap.set('.loading-tagline', { opacity: 1, filter: 'blur(0px)' });
    gsap.set(progressRef.current, { width: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out the entire loading screen
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: onComplete
        });
      }
    });

    // Logo animation
    tl.fromTo(logoRef.current, 
      { scale: 0, rotation: 360 },
      {
        scale: 1,
        rotation: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
        clearProps: 'all'
      }
    )
    // Logo ring rotation
    .to('.loading-logo-ring', {
      rotation: 360,
      duration: 2,
      ease: 'none',
      repeat: 2
    }, '-=1')
    // Welcome text animation
    .fromTo('.loading-text-line', 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        clearProps: 'all'
      }, '-=1.5'
    )
    // Tagline blur in
    .fromTo('.loading-tagline',
      { opacity: 0, filter: 'blur(10px)' },
      {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        clearProps: 'all'
      }, '-=0.5'
    )
    // Progress bar
    .to(progressRef.current, {
      width: '100%',
      duration: 1.5,
      ease: 'power2.inOut'
    }, '-=0.8')
    // Hold for a moment
    .to({}, { duration: 0.5 });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="loading-screen" ref={containerRef}>
      {/* Background */}
      <div className="loading-background">
        <div className="loading-gradient"></div>
        <div className="loading-grid"></div>
        <div className="loading-particles">
          <div className="loading-particle particle-1"></div>
          <div className="loading-particle particle-2"></div>
          <div className="loading-particle particle-3"></div>
          <div className="loading-particle particle-4"></div>
        </div>
      </div>

      {/* Content */}
      <div className="loading-content">
        {/* Logo */}
        <div className="loading-logo" ref={logoRef}>
          <div className="loading-logo-ring"></div>
          <div className="loading-logo-inner-ring"></div>
          <div className="loading-logo-text">FS</div>
          <div className="loading-logo-glow"></div>
        </div>

        {/* Welcome Text */}
        <div className="loading-text" ref={textRef}>
          <h1 className="loading-title">
            <span className="loading-text-line">Welcome to</span>
            <span className="loading-text-line loading-name">My Portfolio</span>
          </h1>
          <p className="loading-tagline">
            Crafting digital experiences with passion & precision
          </p>
        </div>

        {/* Progress Bar */}
        <div className="loading-progress-container">
          <div className="loading-progress-bar" ref={progressRef}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;