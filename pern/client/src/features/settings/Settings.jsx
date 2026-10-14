import React, { useState } from 'react';
import { useTranslationStore } from '../i18n/i18nStore.js';
import './Settings.css';

export default function Settings() {
  const { language, setLanguage, t } = useTranslationStore();
  const [localLang, setLocalLang] = useState(language);

  const handleLanguageChange = (e) => {
    setLocalLang(e.target.value);
  };

  const handleSave = () => {
    setLanguage(localLang);
    alert(t('saveChanges') + '!');
  };

  return (
    <div className="settings-container">
      <div className="settings-card">
        <h2>{t('appSettings')}</h2>
        <p className="settings-subtitle">{t('managePreferences')}</p>
        
        <div className="settings-group">
          <label htmlFor="language-select">{t('displayLanguage')}</label>
          <select 
            id="language-select" 
            value={localLang} 
            onChange={handleLanguageChange}
            className="settings-select"
          >
            <option value="en">{t('english')}</option>
            <option value="bn">{t('bengali')}</option>
          </select>
          <p className="settings-hint">
            {t('languageHint')}
          </p>
        </div>

        <button className="btn-primary" onClick={handleSave}>{t('saveChanges')}</button>
      </div>
    </div>
  );
}
