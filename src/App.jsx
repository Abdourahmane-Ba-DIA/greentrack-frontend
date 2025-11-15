// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EcoActions from './pages/EcoActions';
import EcoActionForm from './pages/EcoActionForm';
import Profile from './pages/Profile';
import Tips from './pages/Tips';
import './index.css';

const Private = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading">Chargement...</div>;
  return user ? children : <Navigate to="/login" replace />;
};

const PublicOnly = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading">Chargement...</div>;
  return !user ? children : <Navigate to="/dashboard" replace />;
};

function AppContent() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user && <Header />}
      <main className={user ? 'main-with-header' : 'main-full'}>
        <Routes>
          <Route path="/login" element={<PublicOnly><Login /></PublicOnly>} />
          <Route path="/register" element={<PublicOnly><Register /></PublicOnly>} />

          <Route path="/dashboard" element={<Private><Dashboard /></Private>} />
          <Route path="/eco-actions" element={<Private><EcoActions /></Private>} />
          <Route path="/eco-actions/new" element={<Private><EcoActionForm /></Private>} />
          <Route path="/eco-actions/:id/edit" element={<Private><EcoActionForm /></Private>} />
          <Route path="/profile" element={<Private><Profile /></Private>} />
          <Route path="/tips" element={<Private><Tips /></Private>} />

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
      {user && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}
