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
      githubUrl: 'https://github.com',
      featured: false,
      color: '#7cff67',
    },
    {
      id: 2,
      title: 'QuranVision – Islamic Learning & E-Commerce Platform',
      description:
        'An all-in-one Islamic platform where users can read, save, and organize Quranic verses and Hadith into custom collections, purchase books and learning plans.',
      category: 'web',
      image: '/Capture1.PNG',
      technologies: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'Firebase'],
      githubUrl: 'https://github.com',
      featured: false,
      color: '#7cff67',
    },
    {
      id: 3,
      title: 'DreamFragrance – E-Commerce Perfume Store',
      description:
        'A complete e-commerce website for DreamFragrance featuring product listings, cart, checkout, order management, and a dedicated admin portal.',
      category: 'web',
      image: '/Capture2.jpg',
      technologies: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'Firebase'],
      githubUrl: 'https://github.com',
      featured: false,
      color: '#00ff9d',
    },
    {
      id: 4,
      title: 'F&W Glitch – IT Services Website',
      description:
        'A modern IT brand website for F&W Glitch that showcases technology services, expertise, and business solutions with a clean and responsive user interface.',
      category: 'web',
      image: '/Capture3.jpeg',
      technologies: ['React', 'CSS', 'JavaScript', 'EmailJs'],
      githubUrl: 'https://github.com',
      featured: false,
      color: '#10b981',
    },
  ];

  useEffect(() => {
    gsap.set('.pj-section .pj-header', { opacity: 1 });
    gsap.set('.pj-section .pj-card', { opacity: 1 });

    timelineRef.current = gsap
      .timeline({ defaults: { ease: 'power2.out' } })
      .from('.pj-section .pj-header', { 
        y: 30, 
        opacity: 0, 
        duration: 0.8 
      })
      .from('.pj-section .pj-card', { 
        y: 30, 
        opacity: 0, 
        duration: 0.6, 
        stagger: 0.1 
      }, '-=0.4');

    return () => { if (timelineRef.current) timelineRef.current.kill(); };
  }, []);

  useEffect(() => {
    if (modalVisible && modalContentRef.current && modalOverlayRef.current) {
      gsap.set(modalOverlayRef.current, { opacity: 0 });
      gsap.set(modalContentRef.current, { 
        rotationY: -15, 
        x: -30,
        transformOrigin: 'left center', 
        opacity: 0 
      });
      
      gsap.to(modalOverlayRef.current, { 
        opacity: 1, 
        duration: 0.4, 
        ease: 'power2.out' 
      });
      
      gsap.to(modalContentRef.current, { 
        rotationY: 0, 
        x: 0,
        opacity: 1, 
        duration: 0.6, 
        ease: 'power3.out',
        delay: 0.1
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
        rotationY: -15, 
        x: -30,
        opacity: 0, 
        duration: 0.4, 
        ease: 'power2.in',
        onComplete: () => { 
          setModalVisible(false); 
          setSelectedProject(null); 
          document.body.style.overflow = ''; 
        },
      });
      gsap.to(modalOverlayRef.current, { 
        opacity: 0, 
        duration: 0.3, 
        ease: 'power2.in' 
      });
    } else {
      setModalVisible(false); 
      setSelectedProject(null); 
      document.body.style.overflow = '';
    }
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && modalVisible) closeModal(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modalVisible, closeModal]);

  return (
    <section className="pj-section" id="projects" ref={projectsRef}>
      {/* Decorative elements */}
      <div className="pj-bg">
        <div className="pj-bg-glow pj-bg-glow-1"></div>
        <div className="pj-bg-glow pj-bg-glow-2"></div>
        <div className="pj-bg-glow pj-bg-glow-3"></div>
        <div className="pj-bg-grid"></div>
      </div>

      <div className="pj-container">
        {/* Header */}
        <div className="pj-header">
          <div className="pj-header-tag">
            <span className="pj-header-line"></span>
            <span className="pj-header-label">Portfolio</span>
          </div>
          <h2 className="pj-header-title">
            Featured <span className="pj-header-gradient">Projects</span>
          </h2>
          <p className="pj-header-subtitle">
            A collection of my best work — each project is crafted with attention to detail 
            and a focus on user experience.
          </p>
        </div>

        {/* Cards grid */}
        <div className="pj-grid">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className={`pj-card ${hoveredProject === project.id ? 'pj-card-hovered' : ''}`}
              style={{ '--card-accent': project.color }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => handleProjectClick(project)}
            >
              {/* Card accent line */}
              <div className="pj-card-accent"></div>
              
              {/* Card inner */}
              <div className="pj-card-inner">
                {/* Image */}
                <div className="pj-card-image">
                  {project.image ? (
                    <img src={project.image} alt={project.title} />
                  ) : (
                    <div className="pj-card-image-placeholder">
                      <span>🖼️</span>
                    </div>
                  )}
                  
                  {/* Overlay */}
                  <div className="pj-card-overlay">
                    <div className="pj-card-overlay-content">
                      <span>View Project</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="pj-card-content">
                  <div className="pj-card-header">
                    <h3 className="pj-card-title">{project.title}</h3>
                    <a
                      href={project.githubUrl}
                      className="pj-card-github"
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  </div>

                  <p className="pj-card-description">{project.description}</p>

                  <div className="pj-card-tech">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className="pj-card-tech-tag">{tech}</span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="pj-card-tech-more">+{project.technologies.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalVisible && selectedProject && (
        <div className="pj-modal" ref={modalRef} onClick={closeModal}>
          <div className="pj-modal-overlay" ref={modalOverlayRef}></div>
          
          <div
            className="pj-modal-content"
            ref={modalContentRef}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button className="pj-modal-close" onClick={closeModal}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>

            {/* Image */}
            <div className="pj-modal-image">
              {selectedProject.image ? (
                <img src={selectedProject.image} alt={selectedProject.title} />
              ) : (
                <div className="pj-modal-image-placeholder">
                  <span>🖼️</span>
                </div>
              )}
              <div className="pj-modal-image-overlay"></div>
            </div>

            {/* Content */}
            <div className="pj-modal-body">
              <div className="pj-modal-header">
                <h3 className="pj-modal-title">{selectedProject.title}</h3>
                {selectedProject.featured && (
                  <span className="pj-modal-featured">Featured</span>
                )}
              </div>

              <p className="pj-modal-description">{selectedProject.description}</p>

              <div className="pj-modal-section">
                <h4 className="pj-modal-section-title">
                  <span className="pj-modal-dot" style={{ background: selectedProject.color }}></span>
                  Technologies
                </h4>
                <div className="pj-modal-tech">
                  {selectedProject.technologies.map((tech, i) => (
                    <span 
                      key={i} 
                      className="pj-modal-tech-item"
                      style={{ 
                        background: `${selectedProject.color}10`,
                        color: selectedProject.color,
                        borderColor: `${selectedProject.color}30`
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pj-modal-actions">
                <a
                  href={selectedProject.githubUrl}
                  className="pj-modal-btn pj-modal-btn-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  View Code
                </a>
                
                <button
                  className="pj-modal-btn pj-modal-btn-primary"
                  style={{ background: selectedProject.color }}
                  onClick={() => {
                    closeModal();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Let's Talk
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Page edge effect */}
            <div className="pj-modal-edge"></div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;