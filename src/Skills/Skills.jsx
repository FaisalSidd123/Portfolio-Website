import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './Skills.css';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const skillsRef = useRef(null);
  const timelineRef = useRef(null);

  const skillCategories = [
    { id: 'all', name: 'All Skills', icon: '🚀', color: '#6366f1' },
    { id: 'languages', name: 'Languages', icon: '💻', color: '#8b5cf6' },
    { id: 'frontend', name: 'Frontend', icon: '🎨', color: '#d946ef' },
    { id: 'backend', name: 'Backend', icon: '⚙️', color: '#10b981' },
    { id: 'database', name: 'Database', icon: '💾', color: '#f59e0b' },
    { id: 'tools', name: 'Tools & Other', icon: '🔧', color: '#ec4899' }
  ];

  const skillsData = [
    // Languages
    { 
      name: 'C/C++', 
      category: 'languages',
      icon: '🔷',
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      name: 'JavaScript', 
      category: 'languages',
      icon: '📜',
      gradient: 'from-yellow-400 to-orange-500'
    },
    { 
      name: 'Python', 
      category: 'languages',
      icon: '🐍',
      gradient: 'from-blue-600 to-yellow-400'
    },

    // Frontend
    { 
      name: 'HTML/CSS', 
      category: 'frontend',
      icon: '🎨',
      gradient: 'from-orange-500 to-blue-500'
    },
    { 
      name: 'React', 
      category: 'frontend',
      icon: '⚛️',
      gradient: 'from-cyan-400 to-blue-500'
    },

    // Backend
    { 
      name: 'Node.js', 
      category: 'backend',
      icon: '🟢',
      gradient: 'from-green-500 to-green-700'
    },
    { 
      name: 'Express.js', 
      category: 'backend',
      icon: '🚂',
      gradient: 'from-gray-600 to-gray-800'
    },

    // Database
    { 
      name: 'MySQL', 
      category: 'database',
      icon: '🐬',
      gradient: 'from-blue-500 to-blue-700'
    },
    { 
      name: 'PostgreSQL', 
      category: 'database',
      icon: '🐘',
      gradient: 'from-blue-600 to-indigo-600'
    },

    // Tools & Other
    { 
      name: 'Git', 
      category: 'tools',
      icon: '📚',
      gradient: 'from-orange-600 to-red-600'
    },
    { 
      name: 'DSA in C++', 
      category: 'tools',
      icon: '🧮',
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      name: 'Affiliate Marketing', 
      category: 'tools',
      icon: '💼',
      gradient: 'from-green-500 to-teal-500',
      subtitle: 'Digistore, Amazon'
    }
  ];

  const filteredSkills = activeCategory === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeCategory);

  useEffect(() => {
    // Set initial state to visible
    gsap.set('.skills-component .skills-header', { opacity: 1 });
    gsap.set('.skills-component .category-btn', { opacity: 1 });
    gsap.set('.skills-component .skill-card', { opacity: 1 });

    // Entrance animations
    timelineRef.current = gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.skills-component .skills-header', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        clearProps: 'all'
      })
      .from('.skills-component .category-btn', {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        clearProps: 'all'
      }, '-=0.4')
      .from('.skills-component .skill-card', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        clearProps: 'all'
      }, '-=0.3');

    return () => {
      if (timelineRef.current) timelineRef.current.kill();
    };
  }, []);

  useEffect(() => {
    // Animate filtered skills
    if (filteredSkills.length > 0) {
      gsap.fromTo('.skills-component .skill-card', 
        {
          scale: 0.9,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'back.out(1.4)',
          clearProps: 'all'
        }
      );
    }
  }, [activeCategory]);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    
    // Pulse animation on click
    const clickedBtn = document.querySelector(`[data-category="${categoryId}"]`);
    if (clickedBtn) {
      gsap.fromTo(clickedBtn,
        { scale: 1 },
        { 
          scale: 1.1,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut'
        }
      );
    }
  };

  const getCategoryData = () => {
    return skillCategories.find(cat => cat.id === activeCategory) || skillCategories[0];
  };

  return (
    <section className="skills-component skills-section" id="skills" ref={skillsRef}>
      {/* Decorative elements */}
      <div className="skills-decoration">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="grid-pattern"></div>
      </div>

      <div className="skills-wrapper">
        {/* Header */}
        <div className="skills-header">
          <div className="section-badge">
            <div className="badge-line"></div>
            <span>My Arsenal</span>
          </div>
          <h2 className="section-title">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="section-subtitle">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Category Pills */}
        <div className="category-pills">
          {skillCategories.map((category) => (
            <button
              key={category.id}
              className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category.id)}
              data-category={category.id}
              style={{ '--category-color': category.color }}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
              <span className="category-count">
                {category.id === 'all' 
                  ? skillsData.length 
                  : skillsData.filter(s => s.category === category.id).length}
              </span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="skills-grid">
          <div className="grid-header">
            <h3 className="grid-title">
              {getCategoryData().name}
              <span className="skill-count">{filteredSkills.length} {filteredSkills.length === 1 ? 'skill' : 'skills'}</span>
            </h3>
          </div>

          <div className="skills-container">
            {filteredSkills.map((skill, index) => (
              <div 
                key={`${skill.name}-${index}`}
                className="skill-card"
                onMouseEnter={() => setHoveredSkill(index)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="skill-content">
                  <div className="skill-icon-wrapper">
                    <div className={`skill-icon bg-gradient-to-br ${skill.gradient}`}>
                      <span className="icon-emoji">{skill.icon}</span>
                    </div>
                    <div className="icon-glow" style={{ backgroundColor: getCategoryData().color }}></div>
                  </div>
                  
                  <div className="skill-info">
                    <h4 className="skill-name">{skill.name}</h4>
                    {skill.subtitle && (
                      <p className="skill-subtitle">{skill.subtitle}</p>
                    )}
                  </div>

                  <div className="skill-badge" style={{ backgroundColor: `${getCategoryData().color}20`, color: getCategoryData().color }}>
                    {skillCategories.find(cat => cat.id === skill.category)?.icon}
                  </div>
                </div>

                <div className="card-shine"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="skills-stats">
          <div className="stat-item">
            <div className="stat-icon">💻</div>
            <div className="stat-content">
              <div className="stat-value">{skillsData.length}</div>
              <div className="stat-label">Total Skills</div>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <div className="stat-value">3</div>
              <div className="stat-label">Core Languages</div>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">🚀</div>
            <div className="stat-content">
              <div className="stat-value">5</div>
              <div className="stat-label">Frameworks</div>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">⚡</div>
            <div className="stat-content">
              <div className="stat-value">Always</div>
              <div className="stat-label">Learning</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;