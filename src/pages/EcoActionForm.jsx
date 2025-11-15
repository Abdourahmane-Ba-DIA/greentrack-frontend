// src/pages/EcoActionForm.jsx
import React, { useEffect, useState } from 'react';
import { EcoActionService } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import Logo from '../components/Logo';
import '../styles/EcoActionForm.css';

const EcoActionForm = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'transport',
    impact_co2: '',
    impact_water: '',
    impact_waste: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      EcoActionService.getById(id)
        .then((res) => {
          const data = res.data;
          setForm({
            title: data.title || '',
            description: data.description || '',
            type: data.type || 'transport',
            impact_co2: data.impact_co2 ?? '',
            impact_water: data.impact_water ?? '',
            impact_waste: data.impact_waste ?? '',
            date: data.date ? data.date.split('T')[0] : new Date().toISOString().split('T')[0]
          });
        })
        .catch(() => {});
    }
  }, [id]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await EcoActionService.update(id, form);
      } else {
        await EcoActionService.create(form);
      }
      navigate('/eco-actions');
    } catch (err) {
      alert('Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="eco-action-form">

      {/* HEADER AVEC LOGO */}
      <div className="form-header">
        <Logo size={70} />
        <h1>{id ? 'Modifier une Action' : 'Nouvelle Action Écologique'}</h1>
      </div>

      <form onSubmit={submit} className="action-form">

        <div className="form-group">
          <label>Type d'action</label>
          <select name="type" value={form.type} onChange={onChange}>
            <option value="transport">Transport</option>
            <option value="alimentation">Alimentation</option>
            <option value="energy">Énergie</option>
            <option value="dechets">Déchets</option>
          </select>
        </div>

        <div className="form-group">
          <label>Titre</label>
          <input
            name="title"
            value={form.title}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={onChange}
          />
        </div>

        <div className="impacts-grid">
          <div className="impact-input">
            <label>CO₂ économisé (kg)</label>
            <input
              name="impact_co2"
              type="number"
              step="0.1"
              value={form.impact_co2}
              onChange={onChange}
            />
          </div>

          <div className="impact-input">
            <label>Eau économisée (L)</label>
            <input
              name="impact_water"
              type="number"
              step="0.1"
              value={form.impact_water}
              onChange={onChange}
            />
          </div>

          <div className="impact-input">
            <label>Déchets évités (kg)</label>
            <input
              name="impact_waste"
              type="number"
              step="0.1"
              value={form.impact_waste}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate('/eco-actions')}
          >
            Annuler
          </button>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
        </div>

      </form>
    </div>
  );
};

export default EcoActionForm;
