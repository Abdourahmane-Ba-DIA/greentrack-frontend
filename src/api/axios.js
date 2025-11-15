// src/api/axios.js
import axios from 'axios';

// 🔥 La base URL vient du .env du frontend
// Exemple dans .env : REACT_APP_API_URL=http://127.0.0.1:8000/api
const API_BASE = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE, // 👉 Ici l'URL API est injectée depuis ton .env
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false, 
  // ❗ on garde false car ton backend utilise Bearer token (pas cookies Sanctum)
});

// ==========================
// Ajouter le token automatiquement
// ==========================
export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
}

// ==========================
// Gestion automatique des erreurs
// ==========================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expiré → on le supprime
      localStorage.removeItem('token');
      // redirection gérée par AuthContext
    }
    return Promise.reject(error);
  }
);

export default api;
