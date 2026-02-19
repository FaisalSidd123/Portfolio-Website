import { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import './Projects.css';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const projectsRef = useRef(null);
  const timelineRef = useRef(null);
  const modalRef = useRef(null);
  const modalContentRef = useRef(null);
  const modalOverlayRef = useRef(null);

  const projectsData = [
    {
      id: 1,
      title: 'OptiManage – Brand Showcase Website',
      description:
        'A professional brand showcase website for OptiManage that highlights brand identity, services, vision, and complete contact information to establish a strong digital presence.',
      category: 'web',
      image: '/Capture.PNG',
      technologies: ['React', 'CSS', 'JavaScript', 'EmailJs'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: false,
      color: '#6366f1',
    },
    {
      id: 2,
      title: 'QuranVision – Islamic Learning & E-Commerce Platform',
      description:
        'An all-in-one Islamic platform similar to Islam360 where users can read, save, and organize Quranic verses and Hadith into custom collections, purchase books and learning plans, and engage through blogs with likes and comments. Includes a full admin portal for user activity and content management.',
      category: 'web',
      image: '/Capture1.PNG',
      technologies: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'Firebase', 'CSS', 'EmailJs'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: false,
      color: '#8b5cf6',
    },
    {
      id: 3,
      title: 'DreamFragrance – E-Commerce Perfume Store',
      description:
        'A complete e-commerce website for the perfume brand DreamFragrance featuring product listings, cart, checkout, order management, and a dedicated admin portal for stock control and customer history.',
      category: 'web',
      image: '/Capture2.jpg',
      technologies: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'Firebase', 'CSS', 'EmailJs'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: false,
      color: '#d946ef',
    },
    {
      id: 4,
      title: 'F&W Glitch – IT Services Website',
      description:
        'A modern IT brand website for F&W Glitch that showcases technology services, expertise, and business solutions with a clean and responsive user interface.',
      category: 'web',
      image: '/Capture3.jpeg',
      technologies: ['React', 'CSS', 'JavaScript', 'EmailJs'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: false,
      color: '#10b981',
    },
  ];

  useEffect(() => {
    gsap.set('.projects-component .projects-header', { opacity: 1 });
    gsap.set('.projects-component .project-card', { opacity: 1 });

    timelineRef.current = gsap
      .timeline({ defaults: { ease: 'power3.out' } })
      .from('.projects-component .projects-header', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        clearProps: 'all',
      })
      .from(
        '.projects-component .project-card',
        { y: 40, opacity: 0, duration: 0.8, stagger: 0.15, clearProps: 'all' },
        '-=0.3'
      );

    gsap.to('.projects-component .floating-circle', {
      y: 30,
      x: 20,
      rotation: 360,
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.5,
    });

    return () => {
      if (timelineRef.current) timelineRef.current.kill();
    };
  }, []);

  // When modal mounts, run open animation
  useEffect(() => {
    if (modalVisible && modalContentRef.current && modalOverlayRef.current) {
      // Reset
      gsap.set(modalOverlayRef.current, { opacity: 0 });
      gsap.set(modalContentRef.current, {
        rotationY: -90,
        transformOrigin: 'left center',
        opacity: 0,
        scale: 0.95,
      });

      // Animate in
      gsap.to(modalOverlayRef.current, { opacity: 1, duration: 0.35, ease: 'power2.out' });
      gsap.to(modalContentRef.current, {
        rotationY: 0,
        opacity: 1,
        scale: 1,
        duration: 0.75,
        ease: 'power3.out',
        delay: 0.1,
      });
    }
  }, [modalVisible]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setModalVisible(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = useCallback(() => {
    if (modalContentRef.current && modalOverlayRef.current) {
      gsap.to(modalContentRef.current, {
        rotationY: -90,
        opacity: 0,
        scale: 0.95,
        duration: 0.5,
        ease: 'power3.in',
        onComplete: () => {
          setModalVisible(false);
          setSelectedProject(null);
          document.body.style.overflow = '';
        },
      });
      gsap.to(modalOverlayRef.current, { opacity: 0, duration: 0.35, ease: 'power2.in', delay: 0.1 });
    } else {
      setModalVisible(false);
      setSelectedProject(null);
      document.body.style.overflow = '';
    }
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape' && modalVisible) closeModal(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [modalVisible, closeModal]);

  return (
    <section className="projects-component projects-section" id="projects" ref={projectsRef}>
      {/* Decorative Elements */}
      <div className="projects-decoration">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
        <div className="grid-pattern"></div>
      </div>

      <div className="projects-wrapper">
        {/* Header */}
        <div className="projects-header">
          <div className="section-badge">
            <div className="badge-line"></div>
            <span>Portfolio Showcase</span>
          </div>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            A collection of my best work showcasing innovative solutions, clean code, and modern design principles
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className={`project-card ${project.featured ? 'featured' : ''} ${
                hoveredProject === project.id ? 'hovered' : ''
              }`}
              style={{ '--project-color': project.color }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => handleProjectClick(project)}
            >
              {project.featured && (
                <div className="featured-badge">
                  <span className="badge-star">⭐</span>
                  <span>Featured</span>
                </div>
              )}

              <div className="project-image-container">
                <div className="project-image">
                  {project.image ? (
                    <img src={project.image} alt={project.title} />
                  ) : (
                    <div className="image-placeholder">
                      <div className="placeholder-icon">🖼️</div>
                      <div className="placeholder-text">Project Image</div>
                    </div>
                  )}
                </div>
                <div className="image-overlay" style={{ background: `${project.color}20` }}>
                  <div className="overlay-content">
                    <button className="overlay-btn view-btn">
                      <span>View Details</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-links">
                    <a href={project.githubUrl} className="project-link" onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                    <a href={project.liveUrl} className="project-link" onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag" style={{ borderColor: project.color }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="card-accent" style={{ background: project.color }}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal — always rendered, visibility controlled via modalVisible state */}
      {modalVisible && selectedProject && (
        <div className="project-modal" ref={modalRef} onClick={closeModal}>
          <div className="modal-overlay" ref={modalOverlayRef}></div>

          {/* Book spine decoration */}
          <div className="book-spine" style={{ background: selectedProject.color }}></div>

          <div
            className="modal-content"
            ref={modalContentRef}
            onClick={(e) => e.stopPropagation()}
            style={{ '--modal-color': selectedProject.color }}
          >
            {/* Book page lines decoration */}
            <div className="book-pages-edge"></div>

            <button className="modal-close" onClick={closeModal}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="modal-image">
              {selectedProject.image ? (
                <img src={selectedProject.image} alt={selectedProject.title} />
              ) : (
                <div className="image-placeholder">
                  <div className="placeholder-icon">🖼️</div>
                  <div className="placeholder-text">Project Image</div>
                </div>
              )}
              {/* Image gradient overlay for text legibility */}
              <div className="modal-image-gradient" style={{ background: `linear-gradient(to bottom, transparent 40%, #0d0d0d)` }}></div>
              {/* Title on image */}
              <div className="modal-image-title">
                <h3 className="modal-title">{selectedProject.title}</h3>
                {selectedProject.featured && (
                  <div className="modal-badge">⭐ Featured</div>
                )}
              </div>
            </div>

            <div className="modal-body">
              {/* Color accent bar */}
              <div className="modal-accent-bar" style={{ background: `linear-gradient(90deg, ${selectedProject.color}, transparent)` }}></div>

              <p className="modal-description">{selectedProject.description}</p>

              <div className="modal-tech">
                <h4 className="modal-section-title">
                  <span className="section-title-dot" style={{ background: selectedProject.color }}></span>
                  Technologies Used
                </h4>
                <div className="tech-grid">
                  {selectedProject.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="tech-badge"
                      style={{ backgroundColor: `${selectedProject.color}18`, color: selectedProject.color, borderColor: `${selectedProject.color}40` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="modal-actions">
                <a href={selectedProject.githubUrl} className="modal-btn secondary" target="_blank" rel="noopener noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  View Code
                </a>
                <a
                  href={selectedProject.liveUrl}
                  className="modal-btn primary"
                  style={{ background: `linear-gradient(135deg, ${selectedProject.color}, ${selectedProject.color}bb)` }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;