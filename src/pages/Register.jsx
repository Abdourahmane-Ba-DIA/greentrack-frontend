// src/pages/Register.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../components/Logo';
import '../styles/Login.css'; // réutilise le style de Login

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (form.password !== form.password_confirmation) {
      setError('Les mots de passe ne correspondent pas.');
      setLoading(false);
      return;
    }

    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.errors
          ? Object.values(err.response.data.errors)[0][0]
          : 'Erreur lors de l’inscription'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        {/* Logo */}
        <div className="logo-container">
          <Logo size={90} />
        </div>

        {/* En-tête */}
        <div className="login-header">
          <h1>Inscription</h1>
          <p>Créez votre compte GreenTrack</p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="login-form">
          
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label>Nom complet</label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              required
              placeholder="Votre nom complet"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              required
              placeholder="email@example.com"
            />
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              required
              placeholder="Mot de passe (min 8 caractères)"
            />
          </div>

          <div className="form-group">
            <label>Confirmer le mot de passe</label>
            <input
              name="password_confirmation"
              type="password"
              value={form.password_confirmation}
              onChange={onChange}
              required
              placeholder="Confirmez le mot de passe"
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Inscription...' : "S'inscrire"}
          </button>

          <div className="login-links">
            <Link to="/login">Déjà un compte ? Se connecter</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
