// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import { UserProfileService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../components/Logo';
import '../styles/Profile.css';

const Profile = () => {
  const { user, setUser } = useAuth();

  const [form, setForm] = useState({
    name: '',
    email: '',
    eco_score: 0,
    total_co2_saved: 0,
    total_water_saved: 0,
    total_waste_reduced: 0,
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  // Charger les infos dans le formulaire
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        eco_score: user.profile?.eco_score ?? 0,
        total_co2_saved: user.profile?.total_co2_saved ?? 0,
        total_water_saved: user.profile?.total_water_saved ?? 0,
        total_waste_reduced: user.profile?.total_waste_reduced ?? 0,
      });
    }
  }, [user]);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Sauvegarde du profil
  const save = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    try {
      const res = await UserProfileService.update(form);

      // Mise à jour du contexte global
      const newUser = {
        ...user,
        name: form.name,
        email: form.email,
        profile: res.data.profile,
      };

      setUser(newUser);
      setMsg('Profil mis à jour avec succès ✔️');
    } catch (err) {
      setMsg('❌ Erreur lors de la sauvegarde.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="loading">Chargement...</div>;

  return (
    <div className="profile">

      {/* HEADER AVEC LOGO */}
      <div className="profile-header">
        <Logo size={80} />
        <h1>Mon Profil</h1>
      </div>

      <form className="profile-card" onSubmit={save}>

        {/* SECTION INFO USER */}
        <div className="profile-info">
          <div className="avatar-section">
            <div className="avatar">👤</div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>

          <div className="profile-fields">
            <label>Nom</label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              required
            />

            <label>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              required
            />
          </div>
        </div>

        {/* SECTION STATISTIQUES */}
        <div className="stats-section">
          <h3>Mes Statistiques Écologiques</h3>

          <div className="stats-grid">
            <div className="stat-item">
              <label>Score Éco</label>
              <input
                name="eco_score"
                type="number"
                value={form.eco_score}
                onChange={onChange}
              />
            </div>

            <div className="stat-item">
              <label>CO₂ Sauvé (kg)</label>
              <input
                name="total_co2_saved"
                type="number"
                value={form.total_co2_saved}
                onChange={onChange}
              />
            </div>

            <div className="stat-item">
              <label>Eau Économisée (L)</label>
              <input
                name="total_water_saved"
                type="number"
                value={form.total_water_saved}
                onChange={onChange}
              />
            </div>

            <div className="stat-item">
              <label>Déchets Réduits (kg)</label>
              <input
                name="total_waste_reduced"
                type="number"
                value={form.total_waste_reduced}
                onChange={onChange}
              />
            </div>
          </div>
        </div>

        <div className="save-section">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Enregistrement...' : 'Enregistrer'}
          </button>

          {msg && <div className="profile-msg">{msg}</div>}
        </div>
      </form>
    </div>
  );
};

export default Profile;
