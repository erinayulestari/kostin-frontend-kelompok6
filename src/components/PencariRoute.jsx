import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PencariRoute({ children }) {
  const { isAuthenticated, role, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <p>Loading session...</p>
      </div>
    );
  }

  // Jika user sudah login sebagai pemilik atau admin, alihkan langsung ke dashboard masing-masing
  if (isAuthenticated) {
    if (role === 'pemilik') {
      return <Navigate to="/owner/dashboard" replace />;
    }
    if (role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  return children;
}
