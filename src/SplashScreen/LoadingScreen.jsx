import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './LoadingScreen.css';

const LoadingScreen = ({ onComplete }) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);
  const revealRef = useRef(null);

  useEffect(() => {
    // Initial states
    gsap.set(logoRef.current, { opacity: 0, scale: 0.8 });
    gsap.set('.loading-text-line', { opacity: 0, y: 20 });
    gsap.set('.loading-tagline', { opacity: 0, y: 15 });
    gsap.set(progressRef.current, { width: '0%' });

    const tl = gsap.timeline({
      onComplete: () => {
        // Unique Reveal Animation
        const exitTl = gsap.timeline({
          onComplete: onComplete
        });

        // 1. Logo gently fades and scales
        exitTl.to(logoRef.current, {
          scale: 1.2,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.in'
        }, 0)

        // 2. Text fades out with blur
        .to('.loading-text-line, .loading-tagline', {
          opacity: 0,
          filter: 'blur(10px)',
          duration: 0.3,
          stagger: 0.05,
          ease: 'power2.in'
        }, 0)

        // 3. Progress bar sweeps away
        .to('.loading-progress-container', {
          scaleX: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in'
        }, 0.1)

        // 4. Background reveals with radial wipe
        .to('.loading-background', {
          scale: 1.5,
          opacity: 0,
          duration: 0.8,
          ease: 'power4.inOut'
        }, 0.2)

        // 5. Final content sweep with gradient reveal
        .to('.loading-reveal', {
          scaleY: 0,
          transformOrigin: 'center center',
          duration: 0.6,
          ease: 'power4.inOut',
          stagger: 0.1
        }, 0.3)

        // 6. Container fades out
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.2
        }, 0.8);
      }
    });

    // Optimized entrance timeline
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'back.out(1.2)'
    })
    .to('.loading-logo-ring', {
      rotation: 180,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.3')
    .to('.loading-text-line', {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: 'power2.out'
    }, '-=0.2')
    .to('.loading-tagline', {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    }, '-=0.1')
    .to(progressRef.current, {
      width: '100%',
      duration: 1.2,
      ease: 'power2.inOut'
    }, '-=0.2');

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div className="loading-screen" ref={containerRef}>
      {/* Reveal overlay */}
      <div className="loading-reveal" ref={revealRef}></div>

      {/* Background */}
      <div className="loading-background">
        <div className="loading-gradient"></div>
        <div className="loading-grid"></div>
      </div>

      {/* Content */}
      <div className="loading-content">
        {/* Minimal Logo */}
        <div className="loading-logo-wrapper">
          <div className="loading-logo" ref={logoRef}>
            <div className="loading-logo-ring"></div>
            <div className="loading-logo-text">FS</div>
          </div>
        </div>

        {/* Text */}
        <div className="loading-text" ref={textRef}>
          <h2 className="loading-title">
            <span className="loading-text-line">Welcome to</span>
            <span className="loading-text-line loading-name">My Portfolio</span>
          </h2>
          <p className="loading-tagline">
            Full-stack developer & digital craftsman
          </p>
        </div>

        {/* Progress */}
        <div className="loading-progress-container">
          <div className="loading-progress-bar" ref={progressRef}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;