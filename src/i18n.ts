// src/i18n.ts
import i18n from 'i18next';
// import { getSubdomain } from 'lib/utils';
import { getSubdomain } from 'lib/utils';
import { clientOverrides } from 'locales/clientOverrides';
import { initReactI18next } from 'react-i18next';

import enTranslations from './locales/en/translation.json';
import frTranslations from './locales/fr/translation.json';
import hiTranslations from './locales/hi/translation.json';
import zhCNTranslations from './locales/zh-CN/translation.json';

const subdomain = getSubdomain(); // 'demo'
console.log('Subdomain:', subdomain);

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

if (subdomain && clientOverrides[subdomain]) {
  const overrides = clientOverrides[subdomain];
  Object.entries(overrides).forEach(([lng, flatStrings]) => {
    i18n.addResourceBundle(lng, 'translation', flatStrings, true, true);
  });
}

export default i18n;
