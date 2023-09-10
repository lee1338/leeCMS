import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import de from './i18n/de.json';
import en from './i18n/en.json';

const resources = {
  de: {
    translation: de
  },
  en: {
    translation: en
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  keyseparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
