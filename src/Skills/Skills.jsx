import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './Skills.css';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const skillsRef = useRef(null);
  const sliderRef = useRef(null);
  const timelineRef = useRef(null);
  const autoplayInterval = useRef(null);

  const skillCategories = [
    { id: 'frontend', name: 'Frontend', color: '#6366f1' },
    { id: 'backend', name: 'Backend', color: '#8b5cf6' },
    { id: 'tools', name: 'Tools & DevOps', color: '#d946ef' },
    { id: 'design', name: 'Design', color: '#10b981' }
  ];

  const skillsData = [
    // Frontend Skills
    { 
      name: 'React', 
      level: 95, 
      category: 'frontend',
      icon: '⚛️',
      description: 'Advanced component architecture & hooks'
    },
    { 
      name: 'Next.js', 
      level: 90, 
      category: 'frontend',
      icon: '⏭️',
      description: 'SSR, ISR, and App Router expertise'
    },
    { 
      name: 'TypeScript', 
      level: 88, 
      category: 'frontend',
      icon: '📘',
      description: 'Type-safe development'
    },
    { 
      name: 'JavaScript', 
      level: 95, 
      category: 'frontend',
      icon: '📜',
      description: 'ES6+, Modern JavaScript'
    },
    { 
      name: 'HTML/CSS', 
      level: 98, 
      category: 'frontend',
      icon: '🎨',
      description: 'Semantic markup & modern CSS'
    },
    { 
      name: 'Tailwind CSS', 
      level: 92, 
      category: 'frontend',
      icon: '🌀',
      description: 'Utility-first CSS framework'
    },

    // Backend Skills
    { 
      name: 'Node.js', 
      level: 85, 
      category: 'backend',
      icon: '🟢',
      description: 'REST APIs & server-side logic'
    },
    { 
      name: 'Express', 
      level: 82, 
      category: 'backend',
      icon: '🚂',
      description: 'Fast, unopinionated web framework'
    },
    { 
      name: 'MongoDB', 
      level: 80, 
      category: 'backend',
      icon: '🍃',
      description: 'NoSQL database management'
    },
    { 
      name: 'PostgreSQL', 
      level: 75, 
      category: 'backend',
      icon: '🐘',
      description: 'Relational database expertise'
    },
    { 
      name: 'Python', 
      level: 70, 
      category: 'backend',
      icon: '🐍',
      description: 'Backend scripting & automation'
    },

    // Tools & DevOps
    { 
      name: 'Git', 
      level: 90, 
      category: 'tools',
      icon: '📚',
      description: 'Version control & collaboration'
    },
    { 
      name: 'Docker', 
      level: 75, 
      category: 'tools',
      icon: '🐳',
      description: 'Containerization & deployment'
    },
    { 
      name: 'AWS', 
      level: 70, 
      category: 'tools',
      icon: '☁️',
      description: 'Cloud infrastructure'
    },
    { 
      name: 'Vercel', 
      level: 88, 
      category: 'tools',
      icon: '▲',
      description: 'Frontend deployment platform'
    },
    { 
      name: 'VS Code', 
      level: 95, 
      category: 'tools',
      icon: '💻',
      description: 'Primary development environment'
    },

    // Design Skills
    { 
      name: 'UI/UX Design', 
      level: 88, 
      category: 'design',
      icon: '✨',
      description: 'User-centered design principles'
    },
    { 
      name: 'Framer Motion', 
      level: 85, 
      category: 'design',
      icon: '🎬',
      description: 'Advanced animations & gestures'
    },
    { 
      name: 'GSAP', 
      level: 82, 
      category: 'design',
      icon: '⚡',
      description: 'Professional-grade animations'
    },
    { 
      name: 'Responsive Design', 
      level: 95, 
      category: 'design',
      icon: '📱',
      description: 'Mobile-first approach'
    }
  ];

  const filteredSkills = activeCategory === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeCategory);

  useEffect(() => {
    // Set initial state to visible to prevent flickering
    gsap.set('.skills-component .skills-header', { opacity: 1 });
    gsap.set('.skills-component .category-filter', { opacity: 1 });
    gsap.set('.skills-component .skill-card', { opacity: 1 });
    gsap.set('.skills-component .slider-track', { opacity: 1 });

    // Entrance animations
    timelineRef.current = gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.skills-component .skills-header', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        clearProps: 'all'
      })
      .from('.skills-component .category-filter', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        clearProps: 'all'
      }, '-=0.4')
      .from('.skills-component .skill-card', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        clearProps: 'all'
      }, '-=0.3');

    // Initialize autoplay
    startAutoplay();

    return () => {
      if (timelineRef.current) timelineRef.current.kill();
      stopAutoplay();
    };
  }, []);

  useEffect(() => {
    // Animate filtered skills
    if (filteredSkills.length > 0) {
      gsap.fromTo('.skills-component .skill-card', 
        {
          y: 20,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'back.out(1.2)',
          clearProps: 'all'
        }
      );
    }
  }, [activeCategory]);

  const startAutoplay = () => {
    if (autoplayInterval.current) {
      clearInterval(autoplayInterval.current);
    }

    autoplayInterval.current = setInterval(() => {
      if (isAutoPlaying) {
        const currentIndex = skillCategories.findIndex(cat => cat.id === activeCategory);
        const nextIndex = (currentIndex + 1) % (skillCategories.length + 1);
        const nextCategory = nextIndex === skillCategories.length ? 'all' : skillCategories[nextIndex].id;
        setActiveCategory(nextCategory);
      }
    }, 4000);
  };

  const stopAutoplay = () => {
    if (autoplayInterval.current) {
      clearInterval(autoplayInterval.current);
      autoplayInterval.current = null;
    }
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
      stopAutoplay();
    }
    
    // Animate active category
    const activeBtn = document.querySelector(`[data-category="${categoryId}"]`);
    if (activeBtn) {
      gsap.to(activeBtn, {
        scale: 1.05,
        duration: 0.3,
        yoyo: true,
        repeat: 1
      });
    }
  };

  const toggleAutoplay = () => {
    setIsAutoPlaying(!isAutoPlaying);
    if (!isAutoPlaying) {
      startAutoplay();
    } else {
      stopAutoplay();
    }
  };

  const getCategoryColor = () => {
    const category = skillCategories.find(cat => cat.id === activeCategory);
    return category ? category.color : '#6366f1';
  };

  return (
    <section className="skills-component skills-section" id="skills" ref={skillsRef}>
      {/* Decorative elements */}
      <div className="skills-decoration">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
        <div className="grid-overlay"></div>
      </div>

      <div className="skills-wrapper">
        {/* Header */}
        <div className="skills-header">
          <div className="section-badge">
            <div className="badge-line"></div>
            <span>Technical Expertise</span>
          </div>
          <h2 className="section-title">
            My <span className="gradient-text">Skills</span> & Technologies
          </h2>
          <p className="section-subtitle">
            A comprehensive showcase of my technical skills and the technologies I work with daily
          </p>
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          <div className="filter-buttons">
            <button
              className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => handleCategoryClick('all')}
              data-category="all"
            >
              <span className="btn-icon">🌟</span>
              <span className="btn-text">All Skills</span>
            </button>
            
            {skillCategories.map((category) => (
              <button
                key={category.id}
                className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category.id)}
                data-category={category.id}
              >
                <span className="btn-icon">
                  {category.id === 'frontend' && '💻'}
                  {category.id === 'backend' && '⚙️'}
                  {category.id === 'tools' && '🔧'}
                  {category.id === 'design' && '🎨'}
                </span>
                <span className="btn-text">{category.name}</span>
              </button>
            ))}
          </div>

          <button 
            className={`autoplay-btn ${isAutoPlaying ? 'playing' : ''}`}
            onClick={toggleAutoplay}
            aria-label={isAutoPlaying ? 'Pause auto-rotation' : 'Play auto-rotation'}
          >
            <span className="autoplay-icon">
              {isAutoPlaying ? '⏸️' : '▶️'}
            </span>
            <span className="autoplay-text">
              {isAutoPlaying ? 'Auto' : 'Manual'}
            </span>
          </button>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid">
          <div className="slider-track" style={{ '--active-color': getCategoryColor() }}>
            {filteredSkills.map((skill, index) => (
              <div 
                key={`${skill.name}-${index}`}
                className="skill-card"
                style={{ 
                  '--skill-level': `${skill.level}%`,
                  '--card-delay': `${index * 0.1}s`
                }}
              >
                <div className="card-content">
                  <div className="card-header">
                    <div className="skill-icon">{skill.icon}</div>
                    <div className="skill-info">
                      <h3 className="skill-name">{skill.name}</h3>
                      <p className="skill-description">{skill.description}</p>
                    </div>
                  </div>
                  
                  <div className="skill-level">
                    <div className="level-bar">
                      <div 
                        className="level-fill"
                        style={{ 
                          backgroundColor: getCategoryColor(),
                          width: 'var(--skill-level)'
                        }}
                      >
                        <div className="level-glow"></div>
                      </div>
                    </div>
                    <div className="level-value">{skill.level}%</div>
                  </div>

                  <div className="card-backdrop" style={{ background: `${getCategoryColor()}10` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="skills-stats">
          <div className="stat-card">
            <div className="stat-number">50+</div>
            <div className="stat-label">Projects Completed</div>
            <div className="stat-line" style={{ backgroundColor: '#6366f1' }}></div>
          </div>
          <div className="stat-card">
            <div className="stat-number">20+</div>
            <div className="stat-label">Technologies</div>
            <div className="stat-line" style={{ backgroundColor: '#8b5cf6' }}></div>
          </div>
          <div className="stat-card">
            <div className="stat-number">4+</div>
            <div className="stat-label">Years Learning</div>
            <div className="stat-line" style={{ backgroundColor: '#d946ef' }}></div>
          </div>
          <div className="stat-card">
            <div className="stat-number">100%</div>
            <div className="stat-label">Dedication</div>
            <div className="stat-line" style={{ backgroundColor: '#10b981' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;