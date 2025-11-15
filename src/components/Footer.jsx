// src/components/Footer.jsx
import React from 'react';
import '../styles/Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-section">
        <h3>À propos</h3>
        <p>GreenTrack — Suivez et améliorez votre impact écologique.</p>
      </div>
      <div className="footer-section">
        <h3>Contact</h3>
        <p>contact@greentrack.example</p>
      </div>
      <div className="footer-section">
        <h3>Réseaux</h3>
        <p>Facebook · Twitter · Instagram</p>
      </div>
    </div>
  </footer>
);

export default Footer;
