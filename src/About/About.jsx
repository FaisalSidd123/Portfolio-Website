import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import ProfileCard from './Profile';
import './About.css';

const About = () => {
  const [activeTab, setActiveTab] = useState('story');
  const aboutRef = useRef(null);
  const timelineRef = useRef(null);

  const stats = [
    { label: 'Years Experience', value: '4+', icon: '🎯' },
    { label: 'Projects Completed', value: '50+', icon: '🚀' },
    { label: 'Happy Clients', value: '30+', icon: '😊' },
    { label: 'Code Commits', value: '5K+', icon: '💻' }
  ];

  const journey = [
    { 
      year: '2022', 
      title: 'Started Journey', 
      desc: 'Began Computer Science at NED University',
      milestone: 'First Steps',
      icon: '🌱'
    },
    { 
      year: '2024', 
      title: 'First Project', 
      desc: 'Built my first full-stack web application',
      milestone: 'First Win',
      icon: '🏆'
    },
    { 
      year: '2025', 
      title: 'Freelancing', 
      desc: 'Started working with clients Locally',
      milestone: 'Growth',
      icon: '🚀'
    },
    { 
      year: '2026', 
      title: 'Expanding Skills', 
      desc: 'Exploring AI and modern frameworks',
      milestone: 'Innovation',
      icon: '💡'
    }
  ];

  useEffect(() => {
    // Set initial visibility
    gsap.set('.about-section .about-header', { opacity: 1 });
    gsap.set('.about-section .stat-card', { opacity: 1 });
    gsap.set('.about-section .about-profile', { opacity: 1 });

    // Entrance animations
    timelineRef.current = gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.about-section .about-header', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        clearProps: 'all'
      })
      .from('.about-section .stat-card', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        clearProps: 'all'
      }, '-=0.4')
      .from('.about-section .tab-content', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        clearProps: 'all'
      }, '-=0.3')
      .from('.about-section .about-profile', {
        x: 50,
        opacity: 0,
        duration: 0.8,
        clearProps: 'all'
      }, '-=0.6');

    return () => {
      if (timelineRef.current) timelineRef.current.kill();
    };
  }, []);

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/cv/faisal-cv.pdf';
    link.download = 'Muhammad_Faisal_Siddique_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewPortfolio = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="about-section" id="about" ref={aboutRef}>
      {/* Decorative Elements */}
      <div className="about-decoration">
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
        <div className="grid-overlay"></div>
      </div>

      <div className="about-container">
        {/* Header */}
        <div className="about-header">
          <div className="section-badge">
            <div className="badge-line"></div>
            <span>Get to Know Me</span>
          </div>
          <h2 className="section-title">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="section-subtitle">
            Passionate developer crafting digital experiences with code and creativity
          </p>
        </div>

      
        {/* Main Content Grid */}
        <div className="about-grid">
          {/* Left Column - Content */}
          <div className="about-content">
            {/* Tab Navigation */}
            <div className="tab-navigation">
              <button
                className={`tab-btn ${activeTab === 'story' ? 'active' : ''}`}
                onClick={() => setActiveTab('story')}
              >
                <span className="tab-icon">📖</span>
                <span>My Story</span>
              </button>
              <button
                className={`tab-btn ${activeTab === 'journey' ? 'active' : ''}`}
                onClick={() => setActiveTab('journey')}
              >
                <span className="tab-icon">🚀</span>
                <span>Journey</span>
              </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {/* My Story Tab */}
              {activeTab === 'story' && (
                <div className="story-content">
                  <h3 className="content-title">
                    Crafting Digital Experiences with{' '}
                    <span className="gradient-text">Precision & Passion</span>
                  </h3>
                  
                  <div className="story-text">
                    <p>
                      Hey there! 👋 I'm Faisal, a passionate Computer Science student at NED University 
                      with a deep love for creating exceptional web experiences. My journey into the world 
                      of development started with curiosity and has evolved into a professional pursuit of 
                      excellence.
                    </p>
                    
                    <p>
                      I specialize in building modern, scalable web applications that not only look great 
                      but perform exceptionally. From crafting pixel-perfect UIs to architecting robust 
                      backends, I bring ideas to life with clean code and innovative solutions.
                    </p>
                  </div>
                </div>
              )}

              {/* Journey Tab - Improved Timeline */}
              {activeTab === 'journey' && (
                <div className="journey-content">
                  <h3 className="content-title">
                    My <span className="gradient-text">Development Journey</span>
                  </h3>
                  
                  <div className="journey-timeline-modern">
                    {journey.map((item, index) => (
                      <div key={index} className="journey-card">
                        <div className="journey-card-left">
                          <div className="journey-year-badge">
                            <span className="journey-year-number">{item.year}</span>
                          </div>
                          <div className="journey-icon">{item.icon}</div>
                        </div>
                        
                        <div className="journey-card-content">
                          <div className="journey-header">
                            <h4 className="journey-title">{item.title}</h4>
                            <span className="journey-milestone" style={{ '--milestone-color': `hsl(${index * 30}, 70%, 60%)` }}>
                              {item.milestone}
                            </span>
                          </div>
                          <p className="journey-desc">{item.desc}</p>
                          
                          {/* Progress indicator for last item */}
                          {index === journey.length - 1 && (
                            <div className="journey-current">
                              <span className="current-dot"></span>
                              <span className="current-text">Currently here</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Connector line (except last) */}
                        {index < journey.length - 1 && (
                          <div className="journey-connector">
                            <div className="connector-line"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="about-cta">
                <button className="cta-btn primary" onClick={handleViewPortfolio}>
                  <span>View My Work</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="cta-btn secondary" onClick={handleDownloadCV}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Download CV</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Card */}
          <div className="about-profile">
            <div className="profile-wrapper">
              <ProfileCard
                name="Muhammad Faisal Siddique"
                title="Full-Stack Developer & CS Student"
                handle="FaisalSidd123"
                status="Available for work"
                contactText="Let's Connect"
                avatarUrl="./Photo.jpg"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={handleContactClick}
                accentColor="#8b5cf6"
              />

              {/* Quick Info Cards */}
              <div className="quick-info">
                <div className="info-card">
                  <div className="info-icon">🎓</div>
                  <div className="info-content">
                    <div className="info-label">Education</div>
                    <div className="info-value">NED University</div>
                  </div>
                </div>
                <div className="info-card">
                  <div className="info-icon">📍</div>
                  <div className="info-content">
                    <div className="info-label">Location</div>
                    <div className="info-value">Karachi, Pakistan</div>
                  </div>
                </div>
                <div className="info-card">
                  <div className="info-icon">💼</div>
                  <div className="info-content">
                    <div className="info-label">Status</div>
                    <div className="info-value">Open to Work</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;