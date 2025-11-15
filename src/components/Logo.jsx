// src/components/Logo.jsx
import React from 'react';
import '../styles/Logo.css'; // optionnel, styles globaux

const Logo = ({ size = 120, className = '' }) => {
  return (
    <img
      src="/Logo.png"
      alt="GreenTrack Logo"
      style={{ width: typeof size === 'number' ? `${size}px` : size }}
      className={`greentrack-logo ${className}`}
      loading="lazy"
    />
  );
};

export default Logo;
