// src/services/api.js
import api from '../api/axios';

export const AuthService = {
  register: (data) => api.post('/register', data),
  login: (data) => api.post('/login', data),
  logout: () => api.post('/logout'),
  getUser: () => api.get('/user'),
};

export const UserProfileService = {
  show: () => api.get('/user/profile'),
  update: (data) => api.put('/user/profile', data),
};

export const EcoActionService = {
  getAll: () => api.get('/eco-actions'),
  getById: (id) => api.get(`/eco-actions/${id}`),
  create: (data) => api.post('/eco-actions', data),
  update: (id, data) => api.put(`/eco-actions/${id}`, data),
  remove: (id) => api.delete(`/eco-actions/${id}`),
  summary: () => api.get('/eco-actions/stats/summary'),
};

export const EcoTipService = {
  getAll: () => api.get('/eco-tips'),
  getByCategory: (category) => api.get(`/eco-tips/category/${category}`),
};
