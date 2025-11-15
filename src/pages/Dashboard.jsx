// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { EcoActionService } from '../services/api';
import Logo from '../components/Logo';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    EcoActionService.summary()
      .then(res => setStats(res.data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Chargement...</div>;

  return (
    <div className="dashboard">

      {/* HEADER AVEC LOGO */}
      <div className="dashboard-header">
        <Logo size={80} />
        <h1>Tableau de Bord GreenTrack</h1>
        <p className="subtitle">Votre impact écologique en un coup d'œil 🌿</p>
      </div>

      {/* CARTES STATISTIQUES */}
      <div className="stats">
        <div className="stat-card">
          <h3>Nombre d'actions</h3>
          <p className="score">{stats?.count ?? 0}</p>
        </div>

        <div className="stat-card">
          <h3>CO₂ économisé</h3>
          <p className="co2">{stats?.total_co2 ?? 0} kg</p>
        </div>

        <div className="stat-card">
          <h3>Eau économisée</h3>
          <p className="water">{stats?.total_water ?? 0} L</p>
        </div>

        <div className="stat-card">
          <h3>Déchets évités</h3>
          <p className="waste">{stats?.total_waste ?? 0} kg</p>
        </div>
      </div>

      <p className="welcome">Bienvenue sur votre tableau de bord ! 🎉</p>
    </div>
  );
};

export default Dashboard;
