/* eslint-disable react/prop-types */
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../features/auth/authStore.js';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
    // Role not authorized
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-bg)' }}>
        <div style={{ textAlign: 'center', padding: 'var(--space-xl)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--color-error)', marginBottom: 'var(--space-md)' }}>403 Forbidden</h1>
          <p style={{ color: 'var(--color-text-light)' }}>You do not have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return children;
}
