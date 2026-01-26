import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeField, setActiveField] = useState(null);
  
  const contactRef = useRef(null);
  const formRef = useRef(null);
  const fieldsRef = useRef([]);
  const timelineRef = useRef(null);

  const contactMethods = [
    {
      icon: '✉️',
      title: 'Email',
      value: 'hello@faisalsiddique.com',
      action: 'mailto:hello@faisalsiddique.com'
    },
    {
      icon: '📱',
      title: 'Phone',
      value: '+1 (234) 567-8900',
      action: 'tel:+12345678900'
    },
    {
      icon: '📍',
      title: 'Location',
      value: 'Based in India',
      action: null
    }
  ];

  const socialLinks = [
    { platform: 'LinkedIn', handle: '@faisalsiddique', url: 'https://linkedin.com', icon: '💼' },
    { platform: 'GitHub', handle: '@faisalsiddique', url: 'https://github.com', icon: '💻' },
    { platform: 'Twitter', handle: '@faisalsiddique', url: 'https://twitter.com', icon: '🐦' },
    { platform: 'Instagram', handle: '@faisalsiddique', url: 'https://instagram.com', icon: '📸' }
  ];

  useEffect(() => {
    // Entrance animations
    timelineRef.current = gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.contact-header', {
        y: 30,
        opacity: 0,
        duration: 0.8
      })
      .from('.contact-method', {
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1
      }, '-=0.4')
      .from('.form-field', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1
      }, '-=0.3');

    // Floating animation for decorative elements
    gsap.to('.floating-element', {
      y: 20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.5
    });

    return () => {
      if (timelineRef.current) timelineRef.current.kill();
    };
  }, []);

  const handleFieldFocus = (index) => {
    setActiveField(index);
    if (fieldsRef.current[index]) {
      gsap.to(fieldsRef.current[index], {
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleFieldBlur = (index) => {
    setActiveField(null);
    if (fieldsRef.current[index]) {
      gsap.to(fieldsRef.current[index], {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Success animation
    gsap.from('.success-message', {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.7)'
    });

    // Reset form after delay
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 4000);
  };

  const handleContactAction = (action) => {
    if (action) {
      window.open(action, '_blank');
    }
  };

  const handleSocialClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <section className="contact-section" id="contact" ref={contactRef}>
      {/* Decorative floating elements */}
      <div className="contact-decoration">
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
      </div>

      <div className="contact-wrapper">
        {/* Header */}
        <div className="contact-header">
          <div className="section-badge">
            <div className="badge-line"></div>
            <span>Get in Touch</span>
          </div>
          <h2 className="section-title">Let's Build Something Great</h2>
          <p className="section-subtitle">
            Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing together.
          </p>
        </div>

        <div className="contact-content">
          {/* Left Column - Contact Form */}
          <div className="contact-form-section">
            <div className="form-card">
              <div className="form-header">
                <h3 className="form-title">Send a Message</h3>
                <p className="form-subtitle">I typically respond within 24 hours</p>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
                <div className="form-fields">
                  <div className="form-field">
                    <div className="field-header">
                      <span className="field-icon">👤</span>
                      <label htmlFor="name" className="field-label">Full Name</label>
                    </div>
                    <input
                      ref={el => fieldsRef.current[0] = el}
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => handleFieldFocus(0)}
                      onBlur={() => handleFieldBlur(0)}
                      className={`field-input ${activeField === 0 ? 'focused' : ''}`}
                      placeholder="John Doe"
                      required
                    />
                    <div className="field-line"></div>
                  </div>

                  <div className="form-field">
                    <div className="field-header">
                      <span className="field-icon">✉️</span>
                      <label htmlFor="email" className="field-label">Email Address</label>
                    </div>
                    <input
                      ref={el => fieldsRef.current[1] = el}
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFieldFocus(1)}
                      onBlur={() => handleFieldBlur(1)}
                      className={`field-input ${activeField === 1 ? 'focused' : ''}`}
                      placeholder="john@example.com"
                      required
                    />
                    <div className="field-line"></div>
                  </div>

                  <div className="form-field">
                    <div className="field-header">
                      <span className="field-icon">📌</span>
                      <label htmlFor="subject" className="field-label">Subject</label>
                    </div>
                    <input
                      ref={el => fieldsRef.current[2] = el}
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => handleFieldFocus(2)}
                      onBlur={() => handleFieldBlur(2)}
                      className={`field-input ${activeField === 2 ? 'focused' : ''}`}
                      placeholder="Project Inquiry"
                      required
                    />
                    <div className="field-line"></div>
                  </div>

                  <div className="form-field">
                    <div className="field-header">
                      <span className="field-icon">💬</span>
                      <label htmlFor="message" className="field-label">Your Message</label>
                    </div>
                    <textarea
                      ref={el => fieldsRef.current[3] = el}
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => handleFieldFocus(3)}
                      onBlur={() => handleFieldBlur(3)}
                      className={`field-textarea ${activeField === 3 ? 'focused' : ''}`}
                      placeholder="Tell me about your project, timeline, and any specific requirements..."
                      rows="5"
                      required
                    />
                    <div className="field-line"></div>
                  </div>
                </div>

                {isSubmitted ? (
                  <div className="success-message">
                    <div className="success-icon">✓</div>
                    <div className="success-content">
                      <h4 className="success-title">Message Sent Successfully!</h4>
                      <p className="success-text">Thank you for reaching out. I'll get back to you shortly.</p>
                    </div>
                  </div>
                ) : (
                  <button 
                    type="submit" 
                    className="submit-button"
                    disabled={isSubmitting}
                  >
                    <span className="button-content">
                      <span className="button-text">
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </span>
                      <span className="button-arrow">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </span>
                    <div className="button-glow"></div>
                  </button>
                )}
              </form>
            </div>
          </div>

          {/* Right Column - Contact Info */}
          <div className="contact-info-section">
            <div className="info-card">
              <div className="info-header">
                <h3 className="info-title">Contact Information</h3>
                <p className="info-subtitle">Other ways to connect</p>
              </div>

              <div className="contact-methods">
                {contactMethods.map((method, index) => (
                  <div 
                    key={index}
                    className={`contact-method ${method.action ? 'clickable' : ''}`}
                    onClick={() => handleContactAction(method.action)}
                  >
                    <div className="method-icon">{method.icon}</div>
                    <div className="method-content">
                      <div className="method-title">{method.title}</div>
                      <div className="method-value">{method.value}</div>
                    </div>
                    {method.action && (
                      <div className="method-action">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="social-section">
                <div className="social-header">
                  <h4 className="social-title">Connect with me</h4>
                  <p className="social-subtitle">Let's stay connected</p>
                </div>
                <div className="social-grid">
                  {socialLinks.map((social, index) => (
                    <div
                      key={index}
                      className="social-item"
                      onClick={() => handleSocialClick(social.url)}
                    >
                      <div className="social-icon">{social.icon}</div>
                      <div className="social-info">
                        <div className="social-platform">{social.platform}</div>
                        <div className="social-handle">{social.handle}</div>
                      </div>
                      <div className="social-arrow">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="availability-section">
                <div className="availability-badge">
                  <div className="availability-dot pulse"></div>
                  <span>Available for new projects</span>
                </div>
                <p className="availability-text">
                  I'm currently accepting select freelance opportunities and full-time positions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;