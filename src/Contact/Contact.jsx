import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import emailjs from '@emailjs/browser';
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
  const [submitError, setSubmitError] = useState(null);
  const [activeField, setActiveField] = useState(null);
  
  const contactRef = useRef(null);
  const formRef = useRef(null);
  const fieldRefs = useRef([]);
  const timelineRef = useRef(null);

  const contactMethods = [
    {
      icon: '✉️',
      title: 'Email',
      value: 'faisalsiddique.129@gmail.com',
      action: 'mailto:faisalsiddique.129@gmail.com',
      color: '#6366f1'
    },
    {
      icon: '📱',
      title: 'Phone',
      value: '+92-3120009405',
      action: 'tel:+923120009405',
      color: '#8b5cf6'
    },
    {
      icon: '📍',
      title: 'Location',
      value: 'Karachi, Pakistan',
      action: null,
      color: '#d946ef'
    }
  ];

  const socialLinks = [
    { 
      platform: 'LinkedIn', 
      handle: '@faisalsiddique', 
      url: 'https://www.linkedin.com/in/muhammad-faisal-74baa5297/', 
      icon: '💼',
      color: '#0077b5'
    },
    { 
      platform: 'GitHub', 
      handle: '@FaisalSidd123', 
      url: 'https://github.com/FaisalSidd123', 
      icon: '💻',
      color: '#333'
    },
  
    { 
      platform: 'Instagram', 
      handle: '@siddique3804', 
      url: 'https://www.instagram.com/siddique3804/', 
      icon: '📸',
      color: '#e4405f'
    }
  ];

  // EmailJS configuration
  const EMAILJS_CONFIG = {
    serviceId: 'service_2hsw40q',
    templateId: 'template_x9qjank',
    publicKey: 'KjG_-tf52_1Njgm8c',
    toName: 'Web Wizard'
  };

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init(EMAILJS_CONFIG.publicKey);

    // Set initial state to visible to prevent flickering
    gsap.set('.contact-component .contact-header', { opacity: 1 });
    gsap.set('.contact-component .contact-method', { opacity: 1 });
    gsap.set('.contact-component .form-field', { opacity: 1 });
    gsap.set('.contact-component .info-section', { opacity: 1 });

    // Entrance animations with clearProps to ensure elements remain visible
    timelineRef.current = gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.contact-component .contact-header', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        clearProps: 'all'
      })
      .from('.contact-component .form-card', {
        x: -40,
        opacity: 0,
        duration: 0.8,
        clearProps: 'all'
      }, '-=0.4')
      .from('.contact-component .info-section', {
        x: 40,
        opacity: 0,
        duration: 0.8,
        clearProps: 'all'
      }, '-=0.6')
      .from('.contact-component .contact-method', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        clearProps: 'all'
      }, '-=0.4')
      .from('.contact-component .social-item', {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        clearProps: 'all'
      }, '-=0.3');

    // Floating animation for decorative elements
    gsap.to('.contact-component .floating-element', {
      y: 20,
      x: 10,
      rotation: 5,
      duration: 4,
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
    if (fieldRefs.current[index]) {
      gsap.to(fieldRefs.current[index], {
        scale: 1.01,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleFieldBlur = (index) => {
    setActiveField(null);
    if (fieldRefs.current[index]) {
      gsap.to(fieldRefs.current[index], {
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
    // Clear any previous errors when user starts typing
    if (submitError) setSubmitError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_name: EMAILJS_CONFIG.toName,
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams
      );

      console.log('Email sent successfully!', response);

      // Success state
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Success animation
      gsap.from('.contact-component .success-message', {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
        clearProps: 'all'
      });

      // Reset form data
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Reset success message after delay
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);

    } catch (error) {
      console.error('Error sending email:', error);
      setIsSubmitting(false);
      setSubmitError('Failed to send message. Please try again or contact me directly at faisalsiddique.129@gmail.com');
      
      // Error animation
      gsap.from('.contact-component .error-message', {
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        clearProps: 'all'
      });
    }
  };

  const handleContactAction = (action) => {
    if (action) {
      window.location.href = action;
    }
  };

  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setSubmitError(null);
    setIsSubmitted(false);
  };

  return (
    <section className="contact-component contact-section" id="contact" ref={contactRef}>
      {/* Decorative floating elements */}
      <div className="contact-decoration">
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
        <div className="grid-pattern"></div>
      </div>

      <div className="contact-wrapper">
        {/* Header */}
        <div className="contact-header">
          <div className="section-badge">
            <div className="badge-line"></div>
            <span>Let's Connect</span>
          </div>
          <h2 className="section-title">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind or just want to chat? I'd love to hear from you. 
            Let's create something amazing together!
          </p>
        </div>

        <div className="contact-content">
          {/* Left Column - Contact Form */}
          <div className="contact-form-section">
            <div className="form-card">
              <header className="form-header">
                <div className="form-icon" aria-hidden="true">💬</div>
                <div className="form-header-content">
                  <h3 className="form-title">Send a Message</h3>
                  <p className="form-subtitle">I typically respond within 24 hours</p>
                </div>
              </header>

              <form ref={formRef} onSubmit={handleSubmit} className="contact-form" noValidate>
                <div className="form-body">
                  <div className="form-fields">
                    <div
                      ref={el => (fieldRefs.current[0] = el)}
                      className="form-field form-field-half"
                    >
                      <label htmlFor="name" className="field-label">
                        <span className="field-icon" aria-hidden="true">👤</span>
                        <span className="field-label-text">Full Name</span>
                        <span className="required" aria-hidden="true">*</span>
                      </label>
                      <input
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
                        disabled={isSubmitting || isSubmitted}
                        autoComplete="name"
                      />
                    </div>

                    <div
                      ref={el => (fieldRefs.current[1] = el)}
                      className="form-field form-field-half"
                    >
                      <label htmlFor="email" className="field-label">
                        <span className="field-icon" aria-hidden="true">✉️</span>
                        <span className="field-label-text">Email Address</span>
                        <span className="required" aria-hidden="true">*</span>
                      </label>
                      <input
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
                        disabled={isSubmitting || isSubmitted}
                        autoComplete="email"
                      />
                    </div>

                    <div
                      ref={el => (fieldRefs.current[2] = el)}
                      className="form-field form-field-full"
                    >
                      <label htmlFor="subject" className="field-label">
                        <span className="field-icon" aria-hidden="true">📌</span>
                        <span className="field-label-text">Subject</span>
                        <span className="required" aria-hidden="true">*</span>
                      </label>
                      <input
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
                        disabled={isSubmitting || isSubmitted}
                        autoComplete="off"
                      />
                    </div>

                    <div
                      ref={el => (fieldRefs.current[3] = el)}
                      className="form-field form-field-full"
                    >
                      <label htmlFor="message" className="field-label">
                        <span className="field-icon" aria-hidden="true">💬</span>
                        <span className="field-label-text">Your Message</span>
                        <span className="required" aria-hidden="true">*</span>
                      </label>
                      <textarea
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
                        disabled={isSubmitting || isSubmitted}
                      />
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                {submitError && (
                  <div className="error-message">
                    <div className="error-icon">⚠️</div>
                    <div className="error-content">
                      <p className="error-text">{submitError}</p>
                    </div>
                  </div>
                )}

                {/* Success Message */}
                {isSubmitted ? (
                  <div className="success-message">
                    <div className="success-icon">✓</div>
                    <div className="success-content">
                      <h4 className="success-title">Message Sent Successfully!</h4>
                      <p className="success-text">Thank you for reaching out. I'll get back to you within 24 hours.</p>
                    </div>
                    <button 
                      type="button" 
                      className="reset-button"
                      onClick={resetForm}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <button 
                    type="submit" 
                    className="submit-button"
                    disabled={isSubmitting}
                  >
                    <span className="button-content">
                      <span className="button-text">
                        {isSubmitting ? (
                          <>
                            <span className="spinner"></span>
                            Sending...
                          </>
                        ) : 'Send Message'}
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
            <div className="info-section">
              {/* Contact Methods */}
              <div className="contact-methods-card">
                <h3 className="section-heading">Contact Information</h3>
                <div className="contact-methods">
                  {contactMethods.map((method, index) => (
                    <div 
                      key={index}
                      className={`contact-method ${method.action ? 'clickable' : ''}`}
                      onClick={() => handleContactAction(method.action)}
                      style={{ '--method-color': method.color }}
                    >
                      <div className="method-icon-wrapper">
                        <div className="method-icon">{method.icon}</div>
                      </div>
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
              </div>

              {/* Social Links */}
              <div className="social-card">
                <h3 className="section-heading">Follow Me</h3>
                <p className="section-subheading">Let's stay connected on social media</p>
                <div className="social-grid">
                  {socialLinks.map((social, index) => (
                    <div
                      key={index}
                      className="social-item"
                      onClick={() => handleSocialClick(social.url)}
                      style={{ '--social-color': social.color }}
                    >
                      <div className="social-icon">{social.icon}</div>
                      <div className="social-content">
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

             
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;