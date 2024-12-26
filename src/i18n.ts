// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './locales/en/translation.json';
import frTranslations from './locales/fr/translation.json';
import hiTranslations from './locales/hi/translation.json';
import zhCNTranslations from './locales/zh-CN/translation.json';

// Initialize i18next
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    'zh-CN': { translation: zhCNTranslations },
    fr: { translation: frTranslations },
    hi: { translation: hiTranslations },
  },
  lng: 'en', // Default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
