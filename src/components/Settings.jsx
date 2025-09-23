// components/Settings.jsx
import React, { useState } from 'react';
import { Settings as SettingsIcon, Moon, Sun, Palette, Bell, Shield } from 'lucide-react';
import PrivacySettings from './PrivacySettings';

const Settings = ({ currentTheme, onChangeTheme, onToggleDarkMode }) => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const themes = [
    { id: 'blue', name: 'Azul', gradient: 'linear-gradient(135deg, #438bd3, #ff9dda)' },
    { id: 'green', name: 'Verde', gradient: 'linear-gradient(135deg, #0CAF60, #2CCDB0)' },
    { id: 'purple', name: 'Morado', gradient: 'linear-gradient(135deg, #9F7AEA, #805AD5)' }
  ];


  return (
    <div className="settings-container">
      <div className="settings-section">
        <h3><SettingsIcon size={20} /> Ajustes de la App</h3>
        
        <div className="settings-item">
          <div className="settings-label">
            <Moon size={18} />
            <span>Modo oscuro</span>
          </div>
          <label className="switch">
            <input 
              type="checkbox" 
              onChange={onToggleDarkMode}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="settings-item">
          <div className="settings-label">
            <Palette size={18} />
            <span>Tema de color</span>
          </div>
          <div className="theme-options">
            {themes.map(theme => (
              <button
                key={theme.id}
                className={`theme-option ${currentTheme === theme.id ? 'active' : ''}`}
                onClick={() => onChangeTheme(theme.id)}
                style={{ background: theme.gradient }}
                title={theme.name}
              >
                {currentTheme === theme.id && <Sun size={16} />}
              </button>
            ))}
          </div>
        </div>

        <div className="settings-item">
          <div className="settings-label">
            <Bell size={18} />
            <span>Notificaciones</span>
          </div>
          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
        </div>

        <div className="settings-item">
          <div className="settings-label">
            <Shield size={18} />
            <span>Privacidad</span>
          </div>
          <button 
            className="btn btn-secondary" 
            onClick={() => setShowPrivacy(true)}
          >
            Configurar
          </button>
        </div>
        {showPrivacy && (
        <PrivacySettings onClose={() => setShowPrivacy(false)} />
      )}
      </div>
    </div>
  );
};

export default Settings;