import React, { useRef, useState } from 'react';
import './Profile.css';

const ProfileCard = ({
  name = "Javi A. Torres",
  title = "Software Engineer",
  handle = "javicodes",
  status = "Online",
  contactText = "Contact Me",
  avatarUrl = "", // Will use default if empty
  showUserInfo = true,
  enableTilt = true,
  enableMobileTilt = false,
  onContactClick = () => console.log('Contact clicked'),
  className = "",
  accentColor = "#6366f1"
}) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!enableTilt || (enableMobileTilt === false && window.innerWidth <= 768)) return;
    
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((x - centerX) / centerX) * 4; // Reduced tilt intensity
    const rotateX = ((centerY - y) / centerY) * 4;
    
    setMousePosition({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const cardStyle = enableTilt ? {
    transform: `perspective(1000px) rotateX(${mousePosition.x}deg) rotateY(${mousePosition.y}deg)`,
    transition: isHovered ? 'none' : 'transform 0.5s ease'
  } : {};

  return (
    <div 
      ref={cardRef}
      className={`profile-component profile-card ${className}`}
      style={cardStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-accent-color={accentColor}
    >
      <div className="profile-card__glow"></div>
      
      <div className="profile-card__content">
        <div className="profile-card__avatar-container">
          <div className="profile-card__avatar-frame">
            <img 
              src={avatarUrl || '/default-avatar.png'} 
              alt={name}
              className="profile-card__avatar"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face';
              }}
            />
            <div className="profile-card__avatar-overlay"></div>
          </div>
          
          <div className="profile-card__status" data-status={status.toLowerCase()}>
            <div className="profile-card__status-indicator"></div>
            <span className="profile-card__status-text">{status}</span>
          </div>
        </div>

        {showUserInfo && (
          <div className="profile-card__info">
            <h2 className="profile-card__name">{name}</h2>
            <p className="profile-card__title">{title}</p>
            <div className="profile-card__handle">
              <svg className="profile-card__handle-icon" viewBox="0 0 24 24" fill="none">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>@{handle}</span>
            </div>
          </div>
        )}

        <button 
          className="profile-card__contact-btn"
          onClick={onContactClick}
          aria-label={contactText}
        >
          <span className="profile-card__contact-text">{contactText}</span>
          <svg className="profile-card__contact-icon" viewBox="0 0 20 20" fill="none">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" 
              stroke="currentColor" strokeWidth="1.5"/>
            <path d="M18 6.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V6.118z" 
              stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </button>

        <div className="profile-card__stats">
          <div className="profile-card__stat">
            <span className="profile-card__stat-value">150+</span>
            <span className="profile-card__stat-label">Projects</span>
          </div>
          <div className="profile-card__stat">
            <span className="profile-card__stat-value">5★</span>
            <span className="profile-card__stat-label">Rating</span>
          </div>
          <div className="profile-card__stat">
            <span className="profile-card__stat-value">98%</span>
            <span className="profile-card__stat-label">Satisfaction</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;