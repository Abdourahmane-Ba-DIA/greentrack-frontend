// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      {/* Zone gauche : Logo + nom */}
      <div className="navbar-left">
        <Link to="/dashboard" className="brand-link" aria-label="GreenTrack">
          <Logo size={42} />
        </Link>
        <Link to="/dashboard" className="nav-title">GreenTrack</Link>
      </div>

      {/* Zone droite : Navigation */}
      <nav className="navbar-right">
        <Link to="/eco-actions" className="nav-link">Mes Actions</Link>
        <Link to="/tips" className="nav-link">Conseils</Link>
        <Link to="/profile" className="nav-link">Profil</Link>

        {user ? (
          <>
            <span className="nav-user">
              Bonjour, <strong>{user.name}</strong>
            </span>
            <button className="logout-btn" onClick={handleLogout}>Déconnexion</button>
          </>
        ) : (
          <Link to="/login" className="nav-link">Se connecter</Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
