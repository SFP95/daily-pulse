import React, { useState } from 'react';
import { Settings as SettingsIcon, Moon, Sun, Palette, Bell, Shield, ChevronDown } from 'lucide-react';
import PrivacySettings from './PrivacySettings';

const Settings = ({ currentTheme, onChangeTheme, onToggleDarkMode, isDarkMode }) => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  
  const themes = [
    { 
      id: 'blue', 
      name: 'Azul', 
      lightGradient: 'linear-gradient(135deg, #438bd3, #9bc8f6)',
      darkGradient: 'linear-gradient(135deg, #63B3ED, #FBB6CE)'
    },
    { 
      id: 'green', 
      name: 'Verde', 
      lightGradient: 'linear-gradient(135deg, #0CAF60, #2CCDB0)',
      darkGradient: 'linear-gradient(135deg, #68D391, #81E6D9)'
    },
    { 
      id: 'red', 
      name: 'Rojo', 
      lightGradient: 'linear-gradient(135deg, #F53D5C, #FF9F43)',
      darkGradient: 'linear-gradient(135deg, #FC8181, #FBD38D)'
    },
    { 
      id: 'pink', 
      name: 'Rosa', 
      lightGradient: 'linear-gradient(135deg, #FF6B9D, #9F7AEA)',
      darkGradient: 'linear-gradient(135deg, #F687B3, #D6BCFA)'
    },
    { 
      id: 'purple', 
      name: 'Morado', 
      lightGradient: 'linear-gradient(135deg, #9F7AEA, #805AD5)',
      darkGradient: 'linear-gradient(135deg, #B794F4, #9F7AEA)'
    }
  ];

  const currentThemeData = themes.find(t => t.id === currentTheme);

  const handleThemeSelect = (themeId) => {
    onChangeTheme(themeId);
    setShowThemeDropdown(false);
  };

  return (
    <div className="settings-container">
      <div className="settings-section">
        <h3><SettingsIcon size={20} /> Ajustes de la App</h3>
        
        <div className="settings-item">
          <div className="settings-label">
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            <span>Modo {isDarkMode ? 'claro' : 'oscuro'}</span>
          </div>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={isDarkMode}
              onChange={onToggleDarkMode}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="settings-item">
          <div className="settings-label">
            <Palette size={28} />
            <span>Tema de color</span>
          </div>
          
          <div className="theme-dropdown-container">
            <button 
              className="theme-dropdown-toggle"
              onClick={() => setShowThemeDropdown(!showThemeDropdown)}
            >
              <span className="theme-preview" style={{ 
                background: isDarkMode ? currentThemeData.darkGradient : currentThemeData.lightGradient 
              }}>
                {currentThemeData.icon}
              </span>
              <span>{currentThemeData.name}</span>
              <ChevronDown size={16} className={`dropdown-chevron ${showThemeDropdown ? 'open' : ''}`} />
            </button>
            
            {showThemeDropdown && (
              <div className="theme-dropdown-menu">
                {themes.map(theme => (
                  <button
                    key={theme.id}
                    className={`theme-dropdown-item ${currentTheme === theme.id ? 'active' : ''}`}
                    onClick={() => handleThemeSelect(theme.id)}
                  >
                    <span 
                      className="theme-preview"
                      style={{ 
                        background: isDarkMode ? theme.darkGradient : theme.lightGradient 
                      }}
                    >
                      {theme.icon}
                    </span>
                    <span>{theme.name}</span>
                    {currentTheme === theme.id && (
                      <div className="theme-check">✓</div>
                    )}
                  </button>
                ))}
              </div>
            )}
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
      </div>

      {showPrivacy && (
        <PrivacySettings onClose={() => setShowPrivacy(false)} />
      )}
    </div>
  );
};

export default Settings;