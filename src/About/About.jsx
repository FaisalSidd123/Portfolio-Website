import React from 'react';
import ProfileCard from './Profile';

import './About.css';

const About = () => {
  const handleContactClick = () => {
    // Implement your contact logic here
    console.log('Opening contact modal...');
    // Example: window.open('mailto:javi@example.com', '_blank');
  };

  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-content">
          <h1 className="about-title">
            Crafting Digital Experiences with{' '}
            <span className="gradient-text">Precision & Passion</span>
          </h1>
          
          <div className="about-grid">
            <div className="about-text">
              <p className="about-description">
                With over 5 years of experience in software engineering, I specialize in 
                creating scalable web applications and intuitive user interfaces. My 
                passion lies in solving complex problems with elegant solutions.
              </p>
              
              <div className="about-highlights">
                <div className="highlight-item">
                  <div className="highlight-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="highlight-content">
                    <h3>Full-Stack Expertise</h3>
                    <p>React, Node.js, TypeScript, and modern cloud technologies</p>
                  </div>
                </div>
                
                <div className="highlight-item">
                  <div className="highlight-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="highlight-content">
                    <h3>Performance Focused</h3>
                    <p>Optimized applications with 98%+ Lighthouse scores</p>
                  </div>
                </div>
                
                <div className="highlight-item">
                  <div className="highlight-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="highlight-content">
                    <h3>User-Centric Design</h3>
                    <p>Creating experiences that users love and remember</p>
                  </div>
                </div>
              </div>
              
              <div className="about-cta">
                <button className="about-cta__primary">
                  View Portfolio
                </button>
                <button className="about-cta__secondary">
                  Download CV
                </button>
              </div>
            </div>
            
            <div className="about-profile">
              <ProfileCard
                name="Muhammad Faisal Siddique"
                title="Developer"
                handle="javicodes"
                status="Online"
                contactText="Let's Connect"
                avatarUrl="./Photo.jpg" // Replace with your photo path
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={handleContactClick}
                accentColor="#8b5cf6"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;