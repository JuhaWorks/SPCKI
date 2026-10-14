import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthStore } from '../features/auth/authStore.js';
import { useTranslationStore } from '../features/i18n/i18nStore.js';
import { apiClient } from '../api/axios.js';
import { SyncEngine } from '../offline/syncEngine.js';
import './Layout.css';

export default function Layout() {
  const { user, logout } = useAuthStore();
  const { t } = useTranslationStore();
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      SyncEngine.syncOutbox();
    };
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Logout failed:', err);
    } finally {
      logout();
      navigate('/login');
    }
  };

  return (
    <div className="layout-container">
      <nav className="sidebar">
        <div className="sidebar-header">
          <h2>SPCKI</h2>
          <span className="badge">{user?.role}</span>
        </div>
        <ul className="sidebar-nav">
          <li><NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>{t('dashboard')}</NavLink></li>
          
          {['Field', 'Project', 'Admin'].includes(user?.role) && (
            <>
              <li><NavLink to="/enroll-household" className={({ isActive }) => (isActive ? 'active' : '')}>{t('enrollHousehold')}</NavLink></li>
              <li><NavLink to="/log-session" className={({ isActive }) => (isActive ? 'active' : '')}>{t('logSession')}</NavLink></li>
              <li><NavLink to="/log-feedback" className={({ isActive }) => (isActive ? 'active' : '')}>{t('logFeedback')}</NavLink></li>
            </>
          )}

          {['Technical', 'Project', 'Admin'].includes(user?.role) && (
            <>
              <li><NavLink to="/log-technical" className={({ isActive }) => (isActive ? 'active' : '')}>{t('technicalLog')}</NavLink></li>
              <li><NavLink to="/log-generator" className={({ isActive }) => (isActive ? 'active' : '')}>{t('generatorLog')}</NavLink></li>
            </>
          )}

          {['Admin', 'Project', 'Viewer'].includes(user?.role) && (
            <li><NavLink to="/reports" className={({ isActive }) => (isActive ? 'active' : '')}>{t('reports')}</NavLink></li>
          )}

          <li><NavLink to="/my-entries" className={({ isActive }) => (isActive ? 'active' : '')}>{t('myEntries')}</NavLink></li>
          <li><NavLink to="/settings" className={({ isActive }) => (isActive ? 'active' : '')}>{t('settings')}</NavLink></li>
        </ul>
      </nav>

      <main className="main-content">
        <header className="topbar">
          <div className="topbar-title">{t('spckiPlatform')}</div>
          <div className="user-menu">
            <span className={`status-indicator ${isOnline ? 'online' : 'offline'}`}>
              {isOnline ? `🟢 ${t('online')}` : `🔴 ${t('offline')}`}
            </span>
            <span className="username">{user?.username}</span>
            <button onClick={handleLogout} className="logout-btn">{t('logout')}</button>
          </div>
        </header>
        
        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
