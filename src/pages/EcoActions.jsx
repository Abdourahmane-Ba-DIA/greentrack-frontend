// src/pages/EcoActions.jsx
import React, { useEffect, useState } from 'react';
import { EcoActionService } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import '../styles/EcoActions.css';

const EcoActions = () => {
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const load = () => {
    setLoading(true);
    EcoActionService.getAll()
      .then(res => setActions(res.data))
      .catch(() => setActions([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette action ?")) return;
    try {
      await EcoActionService.remove(id);
      load();
    } catch (err) {
      alert("Impossible de supprimer");
    }
  };

  if (loading) return <div className="loading">Chargement...</div>;

  return (
    <div className="eco-actions">

      {/* HEADER AVEC LOGO */}
      <div className="actions-header">
        <div className="header-left">
          <Logo size={70} />
          <h1>Mes Actions Écologiques</h1>
        </div>

        <button className="btn-primary" onClick={() => navigate('/eco-actions/new')}>
          + Nouvelle Action
        </button>
      </div>

      {/* LISTE DES ACTIONS */}
      <div className="actions-list">
        {actions.length === 0 ? (
          <div className="no-actions">
            <p>Aucune action trouvée.</p>
            <button className="btn-primary" onClick={() => navigate('/eco-actions/new')}>
              Créer une action
            </button>
          </div>
        ) : (
          actions.map((a) => (
            <div key={a.id} className="action-card">
              <div className="action-header">
                <span className="action-icon">✓</span>
                <h3>{a.title}</h3>
                <span className="action-date">
                  {new Date(a.date).toLocaleDateString('fr-FR')}
                </span>
              </div>

              <p className="action-description">{a.description}</p>

              <div className="action-impacts">
                <span>CO₂ : -{a.impact_co2 ?? 0} kg</span>
                <span>Eau : {a.impact_water ?? 0} L</span>
                <span>Déchets : {a.impact_waste ?? 0} kg</span>
              </div>

              <div className="action-actions">
                <button
                  className="btn-secondary"
                  onClick={() => navigate(`/eco-actions/${a.id}/edit`)}
                >
                  Modifier
                </button>
                <button
                  className="btn-danger"
                  onClick={() => handleDelete(a.id)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EcoActions;
