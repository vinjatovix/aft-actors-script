import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: 'es-GL',
    fallbackLng: 'es',
    supportedLngs: ['en', 'es', 'es-GL', 'ca', 'eu', 'fr', 'it', 'pt', 'ro'],
    ns: [
      'common',
      'login',
      'register',
      'characterBuilding',
      'profile',
      'formValidationErrors'
    ],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },
    react: {
      useSuspense: true
    }
  });

export default i18n;
