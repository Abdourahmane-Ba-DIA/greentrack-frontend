// src/pages/Tips.jsx
import React, { useEffect, useState } from 'react';
import { EcoTipService } from '../services/api';
import Logo from '../components/Logo';
import '../styles/Tips.css';

const Tips = () => {
  const [tips, setTips] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    EcoTipService.getAll()
      .then(res => setTips(res.data))
      .catch(() => setTips([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    selectedCategory === 'all'
      ? tips
      : tips.filter((t) => t.category === selectedCategory);

  if (loading) return <div className="loading">Chargement des conseils...</div>;

  return (
    <div className="tips">

      {/* HEADER AVEC LOGO */}
      <div className="tips-header">
        <Logo size={80} />
        <h1>Conseils Écologiques</h1>
        <p>Découvrez des astuces simples pour réduire votre impact environnemental 🌍</p>
      </div>

      {/* FILTRES */}
      <div className="categories">
        {[
          { key: 'all', label: 'Tous' },
          { key: 'transport', label: 'Transport' },
          { key: 'alimentation', label: 'Alimentation' },
          { key: 'energy', label: 'Énergie' },
          { key: 'dechets', label: 'Déchets' },
        ].map((cat) => (
          <button
            key={cat.key}
            className={`category-btn ${
              selectedCategory === cat.key ? 'active' : ''
            }`}
            onClick={() => setSelectedCategory(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* LISTE DES CONSEILS */}
      <div className="tips-list">
        {filtered.map((t) => (
          <div key={t.id} className="tip-card">
            <div className="tip-header">
              <h3>{t.title}</h3>
              <span className={`impact-badge ${t.impact_level}`}>
                {t.impact_level === 'high'
                  ? 'Impact élevé'
                  : t.impact_level === 'medium'
                  ? 'Impact moyen'
                  : 'Impact faible'}
              </span>
            </div>

            <p className="tip-content">{t.content}</p>

            <span className="tip-category">{t.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tips;
