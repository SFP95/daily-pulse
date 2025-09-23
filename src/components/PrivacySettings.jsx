import React, { useState } from 'react';
import { X, Shield, Eye, User, Lock, Globe, Bell, Download } from 'lucide-react';

const PrivacySettings = ({ onClose }) => {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public', // 'public', 'friends', 'private'
    activityVisibility: true,
    emailVisibility: false,
    goalSharing: true,
    dataCollection: true,
    marketingEmails: false
  });

  const handleSettingChange = (setting, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleExportData = () => {
    // Lógica para exportar datos
    alert('Preparando exportación de datos...');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      // Lógica para eliminar cuenta
      alert('Proceso de eliminación de cuenta iniciado...');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal privacy-modal">
        <div className="modal-header">
          <div className="modal-title-with-icon">
            <Shield size={24} />
            <h3>Privacidad y Seguridad</h3>
          </div>
          <button className="btn-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="privacy-content">
          {/* Visibilidad del perfil */}
          <div className="privacy-section">
            <div className="section-header">
              <User size={20} />
              <h4>Visibilidad del perfil</h4>
            </div>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="profileVisibility"
                  value="public"
                  checked={privacySettings.profileVisibility === 'public'}
                  onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                />
                <span className="radio-label">
                  <Globe size={16} />
                  <div>
                    <strong>Público</strong>
                    <small>Todos pueden ver tu perfil y actividad</small>
                  </div>
                </span>
              </label>

              <label className="radio-option">
                <input
                  type="radio"
                  name="profileVisibility"
                  value="friends"
                  checked={privacySettings.profileVisibility === 'friends'}
                  onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                />
                <span className="radio-label">
                  <User size={16} />
                  <div>
                    <strong>Solo amigos</strong>
                    <small>Solo usuarios conectados pueden ver tu actividad</small>
                  </div>
                </span>
              </label>

              <label className="radio-option">
                <input
                  type="radio"
                  name="profileVisibility"
                  value="private"
                  checked={privacySettings.profileVisibility === 'private'}
                  onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                />
                <span className="radio-label">
                  <Lock size={16} />
                  <div>
                    <strong>Privado</strong>
                    <small>Solo tú puedes ver tu información</small>
                  </div>
                </span>
              </label>
            </div>
          </div>

          {/* Configuraciones de privacidad */}
          <div className="privacy-section">
            <div className="section-header">
              <Eye size={20} />
              <h4>Configuraciones de privacidad</h4>
            </div>
            
            <div className="toggle-group">
              <div className="toggle-item">
                <div className="toggle-label">
                  <strong>Actividad pública</strong>
                  <small>Mostrar tu progreso y logros públicamente</small>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={privacySettings.activityVisibility}
                    onChange={(e) => handleSettingChange('activityVisibility', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="toggle-item">
                <div className="toggle-label">
                  <strong>Email visible</strong>
                  <small>Permitir que otros usuarios vean tu email</small>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={privacySettings.emailVisibility}
                    onChange={(e) => handleSettingChange('emailVisibility', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="toggle-item">
                <div className="toggle-label">
                  <strong>Compartir metas</strong>
                  <small>Permitir compartir metas en redes sociales</small>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={privacySettings.goalSharing}
                    onChange={(e) => handleSettingChange('goalSharing', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Preferencias de datos */}
          <div className="privacy-section">
            <div className="section-header">
              <Bell size={20} />
              <h4>Preferencias de datos</h4>
            </div>
            
            <div className="toggle-group">
              <div className="toggle-item">
                <div className="toggle-label">
                  <strong>Recopilación de datos</strong>
                  <small>Permitir análisis anónimos para mejorar la app</small>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={privacySettings.dataCollection}
                    onChange={(e) => handleSettingChange('dataCollection', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="toggle-item">
                <div className="toggle-label">
                  <strong>Emails promocionales</strong>
                  <small>Recibir ofertas y novedades por email</small>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={privacySettings.marketingEmails}
                    onChange={(e) => handleSettingChange('marketingEmails', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Acciones de datos */}
          <div className="privacy-section">
            <div className="section-header">
              <Download size={20} />
              <h4>Gestión de datos</h4>
            </div>
            
            <div className="data-actions">
              <button className="btn btn-secondary" onClick={handleExportData}>
                <Download size={16} />
                Exportar mis datos
              </button>
              
              <button className="btn btn-danger2" onClick={handleDeleteAccount}>
                Eliminar cuenta permanentemente
              </button>
            </div>
            
            <div className="data-info">
              <p><small>Puedes solicitar una copia de todos tus datos personales o eliminar tu cuenta permanentemente.</small></p>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button 
            className="btn btn-primary-profile"
            onClick={() => {
              // Guardar configuraciones
              alert('Configuraciones de privacidad guardadas');
              onClose();
            }}
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;