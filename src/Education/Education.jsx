import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './Education.css';

const Education = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const educationRef = useRef(null);
  const timelineRef = useRef(null);
  const cardRefs = useRef([]);

  const educationData = [
    {
      id: 1,
      institution: 'The City School',
      degree: 'O Levels',
      duration: '2019 - 2020',
      location: 'Karachi, Pakistan',
      icon: '🎓',
      color: '#6366f1',
      achievements: [
        'Completed Cambridge O Level certification',
        'Strong foundation in core subjects',
        'Developed analytical thinking skills'
      ],
      status: 'completed'
    },
    {
      id: 2,
      institution: 'Tabani\'s College',
      degree: 'Intermediate (Pre-Engineering)',
      duration: '2020 - 2022',
      location: 'Sindh Board, Karachi',
      icon: '📚',
      color: '#8b5cf6',
      achievements: [
        'Pre-Engineering with focus on Mathematics & Physics',
        'Built strong analytical and problem-solving skills',
        'Prepared for engineering entrance exams'
      ],
      status: 'completed'
    },
    {
      id: 3,
      institution: 'NED University of Engineering & Technology',
      degree: 'Bachelor of Computer Science & Information Technology',
      duration: '2022 - 2026',
      location: 'Karachi, Pakistan',
      icon: '🎯',
      color: '#d946ef',
      achievements: [
        'Specializing in Software Engineering & Web Development',
        'Hands-on experience with modern tech stack',
        'Active participant in coding competitions',
        'Building real-world projects and applications'
      ],
      status: 'current',
      gpa: 'CGPA: 3.2/4.0',
      highlight: true
    }
  ];

  useEffect(() => {
    // Set initial visibility
    gsap.set('.education-component .education-header', { opacity: 1 });
    gsap.set('.education-component .timeline-item', { opacity: 1 });
    gsap.set('.education-component .timeline-line', { opacity: 1 });

    // Entrance animations
    timelineRef.current = gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.education-component .education-header', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        clearProps: 'all'
      })
      .from('.education-component .timeline-line', {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.2,
        ease: 'power4.out',
        clearProps: 'all'
      }, '-=0.4')
      .from('.education-component .timeline-item', {
        x: (index) => index % 2 === 0 ? -50 : 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        clearProps: 'all'
      }, '-=0.8');

    // Floating animation for decorative elements
    gsap.to('.education-component .floating-shape', {
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

  const handleCardClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="education-component education-section" id="education" ref={educationRef}>
      {/* Decorative Elements */}
      <div className="education-decoration">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="grid-pattern"></div>
      </div>

      <div className="education-wrapper">
        {/* Header */}
        <div className="education-header">
          <div className="section-badge">
            <div className="badge-line"></div>
            <span>Academic Journey</span>
          </div>
          <h2 className="section-title">
            My <span className="gradient-text">Education</span>
          </h2>
          <p className="section-subtitle">
            A journey of continuous learning and growth, from foundational education to specialized technical expertise
          </p>
        </div>

        {/* Timeline */}
        <div className="timeline-container">
          <div className="timeline-line">
            <div className="timeline-progress"></div>
          </div>

          <div className="timeline-content">
            {educationData.map((edu, index) => (
              <div
                key={edu.id}
                ref={(el) => (cardRefs.current[index] = el)}
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'} ${
                  edu.status === 'current' ? 'current' : ''
                } ${activeIndex === index ? 'active' : ''}`}
                onClick={() => handleCardClick(index)}
              >
                {/* Timeline Dot */}
                <div className="timeline-dot" style={{ backgroundColor: edu.color }}>
                  <div className="dot-inner">
                    <span className="dot-icon">{edu.icon}</span>
                  </div>
                  {edu.status === 'current' && (
                    <div className="pulse-ring" style={{ borderColor: edu.color }}></div>
                  )}
                </div>

                {/* Education Card */}
                <div className="education-card" style={{ '--card-color': edu.color }}>
                  {edu.status === 'current' && (
                    <div className="current-badge">
                      <span className="badge-dot"></span>
                      Currently Pursuing
                    </div>
                  )}

                  <div className="card-header">
                    <div className="card-icon" style={{ backgroundColor: `${edu.color}20` }}>
                      <span style={{ color: edu.color }}>{edu.icon}</span>
                    </div>
                    <div className="card-title-section">
                      <h3 className="institution-name">{edu.institution}</h3>
                      <p className="degree-name">{edu.degree}</p>
                    </div>
                  </div>

                  <div className="card-meta">
                    <div className="meta-item">
                      <span className="meta-icon">📅</span>
                      <span className="meta-text">{edu.duration}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-icon">📍</span>
                      <span className="meta-text">{edu.location}</span>
                    </div>
                    {edu.gpa && (
                      <div className="meta-item">
                        <span className="meta-icon">⭐</span>
                        <span className="meta-text">{edu.gpa}</span>
                      </div>
                    )}
                  </div>

                  <div className={`card-achievements ${activeIndex === index ? 'expanded' : ''}`}>
                    <h4 className="achievements-title">Key Highlights</h4>
                    <ul className="achievements-list">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i} className="achievement-item">
                          <span className="achievement-bullet" style={{ backgroundColor: edu.color }}></span>
                          <span className="achievement-text">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="expand-btn" onClick={() => handleCardClick(index)}>
                    <span>{activeIndex === index ? 'Show Less' : 'Show More'}</span>
                    <svg
                      className={`expand-icon ${activeIndex === index ? 'rotated' : ''}`}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {/* Card Glow Effect */}
                  <div className="card-glow" style={{ background: `${edu.color}15` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        
        
      </div>
    </section>
  );
};

export default Education;