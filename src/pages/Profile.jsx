// pages/Profile.jsx
import React from 'react';
import { User, Target, CheckCircle, Activity, LogIn, LogOut } from 'lucide-react';
import Settings from '../components/Settings';

const Profile = ({ goals, isLoggedIn, onToggleLogin, onLogout, user, currentTheme, onChangeTheme, onToggleDarkMode, isDarkMode }) => {
  const completedTasks = goals.flatMap(goal => goal.tasks || []).filter(task => task.completed).length;
  const totalTasks = goals.flatMap(goal => goal.tasks || []).length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="avatar">
          <User size={58} />
        </div>
        <div className="profile-info">
          <h2>{user?.displayName || 'Usuario'}</h2>
          <p>{user?.email || ''}</p>
        </div>
        {isLoggedIn && (
          <button className="btn-logout-icon" onClick={onLogout} title="Cerrar sesión">
            <LogOut size={20} />
          </button>
        )}
      </div>
      
      {isLoggedIn ? (
        <>
          <div className="stats-section">
            <h3><Activity size={20} /> Estadísticas</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <Target size={24} />
                <div className="stat-value">{goals.length}</div>
                <div className="stat-label">Metas activas</div>
              </div>
              <div className="stat-card">
                <CheckCircle size={24} />
                <div className="stat-value">{completedTasks}/{totalTasks}</div>
                <div className="stat-label">Tareas completadas</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{progressPercentage}%</div>
                <div className="stat-label">Progreso general</div>
              </div>
            </div>
          </div>
          
          <Settings 
            currentTheme={currentTheme}
            onChangeTheme={onChangeTheme}
            onToggleDarkMode={onToggleDarkMode}
            isDarkMode={isDarkMode}
          />
        </>
      ) : (
        <div className="not-logged-message">
          <div className="not-logged-content">
            <User size={48} />
            <h3>Inicia sesión para continuar</h3>
            <p>Si deseas registrar tus progresos inicia sesión o regístrate</p>
            <button className="btn btn-primary" onClick={onToggleLogin}>
              <LogIn size={16} />
              Iniciar Sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;