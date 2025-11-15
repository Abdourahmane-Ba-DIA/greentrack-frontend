// src/components/Header.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo" onClick={() => navigate('/dashboard')}>🌱 GreenTrack</h1>

        <nav className="nav">
          <Link className="nav-link" to="/dashboard">Tableau de Bord</Link>
          <Link className="nav-link" to="/eco-actions">Mes Actions</Link>
          <Link className="nav-link" to="/tips">Conseils</Link>
          <Link className="nav-link" to="/profile">Profil</Link>
          {user ? (
            <>
              <span style={{marginLeft:'.5rem', marginRight:'.5rem'}}>Bonjour, <strong>{user.name}</strong></span>
              <button className="logout-btn" onClick={handleLogout}>Déconnexion</button>
            </>
          ) : (
            <Link className="nav-link" to="/login">Se connecter</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
