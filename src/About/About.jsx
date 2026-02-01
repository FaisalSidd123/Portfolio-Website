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

  const expertise = [
    {
      icon: '⚡',
      title: 'Full-Stack Development',
      description: 'Building end-to-end web applications with React, Node.js, and modern cloud technologies',
      technologies: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'PostgreSQL']
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Creating intuitive and beautiful interfaces that users love to interact with',
      technologies: ['Figma', 'Tailwind CSS', 'Framer Motion', 'GSAP']
    },
    {
      icon: '⚙️',
      title: 'Performance Optimization',
      description: 'Delivering lightning-fast applications with 98%+ Lighthouse scores',
      technologies: ['Webpack', 'Vite', 'Next.js', 'PWA', 'Caching']
    },
    {
      icon: '🤖',
      title: 'AI Integration',
      description: 'Implementing AI-powered features and intelligent automation',
      technologies: ['OpenAI', 'TensorFlow', 'Python', 'FastAPI']
    }
  ];

  const journey = [
    { year: '2022', title: 'Started Journey', desc: 'Began Computer Science at NED University' },
    { year: '2023', title: 'First Project', desc: 'Built my first full-stack web application' },
    { year: '2024', title: 'Freelancing', desc: 'Started working with clients worldwide' },
    { year: '2025', title: 'Growing', desc: 'Expanding skills in AI and modern frameworks' }
  ];

  useEffect(() => {
    // Set initial visibility
    gsap.set('.about-section .about-header', { opacity: 1 });
    gsap.set('.about-section .stat-card', { opacity: 1 });
    gsap.set('.about-section .expertise-card', { opacity: 1 });
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

    // Floating animation
    gsap.to('.about-section .floating-element', {
      y: 20,
      rotation: 5,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.3
    });

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
    // Implement CV download logic
    console.log('Downloading CV...');
    // window.open('/path-to-cv.pdf', '_blank');
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

        {/* Stats
        <div className="about-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div> */}

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
                className={`tab-btn ${activeTab === 'expertise' ? 'active' : ''}`}
                onClick={() => setActiveTab('expertise')}
              >
                <span className="tab-icon">💡</span>
                <span>Expertise</span>
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
                    
                    <p>
                      When I'm not coding, you'll find me exploring new technologies, contributing to 
                      open-source projects, or sharing knowledge with the developer community. I believe 
                      in continuous learning and staying ahead of the curve in this ever-evolving tech landscape.
                    </p>
                  </div>

                  <div className="story-highlights">
                    <div className="highlight-card">
                      <div className="highlight-icon">
                        <svg viewBox="0 0 24 24" fill="none">
                          <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="highlight-content">
                        <h4>Fast Learner</h4>
                        <p>Quickly adapt to new technologies and frameworks</p>
                      </div>
                    </div>

                    <div className="highlight-card">
                      <div className="highlight-icon">
                        <svg viewBox="0 0 24 24" fill="none">
                          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="highlight-content">
                        <h4>Team Player</h4>
                        <p>Collaborate effectively in diverse teams</p>
                      </div>
                    </div>

                    <div className="highlight-card">
                      <div className="highlight-icon">
                        <svg viewBox="0 0 24 24" fill="none">
                          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="highlight-content">
                        <h4>Detail-Oriented</h4>
                        <p>Meticulous attention to code quality and UX</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Expertise Tab */}
              {activeTab === 'expertise' && (
                <div className="expertise-content">
                  <h3 className="content-title">
                    What I Bring to the <span className="gradient-text">Table</span>
                  </h3>
                  
                  <div className="expertise-grid">
                    {expertise.map((item, index) => (
                      <div key={index} className="expertise-card">
                        <div className="expertise-icon">{item.icon}</div>
                        <h4 className="expertise-title">{item.title}</h4>
                        <p className="expertise-description">{item.description}</p>
                        <div className="expertise-tech">
                          {item.technologies.map((tech, i) => (
                            <span key={i} className="tech-pill">{tech}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Journey Tab */}
              {activeTab === 'journey' && (
                <div className="journey-content">
                  <h3 className="content-title">
                    My <span className="gradient-text">Development Journey</span>
                  </h3>
                  
                  <div className="journey-timeline">
                    {journey.map((item, index) => (
                      <div key={index} className="journey-item">
                        <div className="journey-year">{item.year}</div>
                        <div className="journey-dot"></div>
                        <div className="journey-details">
                          <h4 className="journey-title">{item.title}</h4>
                          <p className="journey-desc">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="journey-quote">
                    <div className="quote-icon">"</div>
                    <p className="quote-text">
                      Every line of code is a step forward in my journey. Every project is a lesson learned. 
                      Every challenge is an opportunity to grow.
                    </p>
                    <div className="quote-author">- Muhammad Faisal Siddique</div>
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
                handle="@faisalsiddique"
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