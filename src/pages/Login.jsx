// src/pages/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../components/Logo';
import '../styles/Login.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login({
        email: form.email,
        password: form.password,
      });

      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Échec de la connexion. Vérifiez vos identifiants.'
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

        {/* Header */}
        <div className="login-header">
          <h1>GREEN TRACK</h1>
          <p>Suivez et améliorez votre impact écologique</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Se connecter</h2>

          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              required
              placeholder="email@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              required
              placeholder="Votre mot de passe"
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Connexion...' : 'Connexion'}
          </button>

          <div className="login-links">
            <Link to="/register">Pas de compte ? S'inscrire</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
