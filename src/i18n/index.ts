import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// import Backend from 'i18next-http-backend';

import commonCa from './locales/ca/common.json';
import loginCa from './locales/ca/login.json';
import registerCa from './locales/ca/register.json';
import characterBuildingCa from './locales/ca/characterBuilding.json';
import profileCa from './locales/ca/profile.json';
import settingsCa from './locales/ca/settings.json';
import formValidationErrorsCa from './locales/ca/formValidationErrors.json';

import commonES from './locales/es/common.json';
import loginES from './locales/es/login.json';
import registerES from './locales/es/register.json';
import characterBuildingES from './locales/es/characterBuilding.json';
import profileES from './locales/es/profile.json';
import settingsES from './locales/es/settings.json';
import formValidationErrorsES from './locales/es/formValidationErrors.json';

import commonESGL from './locales/es-GL/common.json';
import loginESGL from './locales/es-GL/login.json';
import registerESGL from './locales/es-GL/register.json';
import characterBuildingESGL from './locales/es-GL/characterBuilding.json';
import profileESGL from './locales/es-GL/profile.json';
import settingsESGL from './locales/es-GL/settings.json';
import formValidationErrorsESGL from './locales/es-GL/formValidationErrors.json';

import commonEU from './locales/eu/common.json';
import loginEU from './locales/eu/login.json';
import registerEU from './locales/eu/register.json';
import characterBuildingEU from './locales/eu/characterBuilding.json';
import profileEU from './locales/eu/profile.json';
import settingsEU from './locales/eu/settings.json';
import formValidationErrorsEU from './locales/eu/formValidationErrors.json';

import commonFR from './locales/fr/common.json';
import loginFR from './locales/fr/login.json';
import registerFR from './locales/fr/register.json';
import characterBuildingFR from './locales/fr/characterBuilding.json';
import profileFR from './locales/fr/profile.json';
import settingsFR from './locales/fr/settings.json';
import formValidationErrorsFR from './locales/fr/formValidationErrors.json';

import commonIT from './locales/it/common.json';
import loginIT from './locales/it/login.json';
import registerIT from './locales/it/register.json';
import characterBuildingIT from './locales/it/characterBuilding.json';
import profileIT from './locales/it/profile.json';
import settingsIT from './locales/it/settings.json';
import formValidationErrorsIT from './locales/it/formValidationErrors.json';

import commonPT from './locales/pt/common.json';
import loginPT from './locales/pt/login.json';
import registerPT from './locales/pt/register.json';
import characterBuildingPT from './locales/pt/characterBuilding.json';
import profilePT from './locales/pt/profile.json';
import settingsPT from './locales/pt/settings.json';
import formValidationErrorsPT from './locales/pt/formValidationErrors.json';

import commonRO from './locales/ro/common.json';
import loginRO from './locales/ro/login.json';
import registerRO from './locales/ro/register.json';
import characterBuildingRO from './locales/ro/characterBuilding.json';
import profileRO from './locales/ro/profile.json';
import settingsRO from './locales/ro/settings.json';
import formValidationErrorsRO from './locales/ro/formValidationErrors.json';

import commonEN from './locales/en/common.json';
import loginEN from './locales/en/login.json';
import registerEN from './locales/en/register.json';
import characterBuildingEN from './locales/en/characterBuilding.json';
import profileEN from './locales/en/profile.json';
import settingsEN from './locales/en/settings.json';
import formValidationErrorsEN from './locales/en/formValidationErrors.json';

i18n
  .use(LanguageDetector)
  // .use(Backend)
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
      'settings',
      'formValidationErrors'
    ],
    defaultNS: 'common',
    resources: {
      ca: {
        common: commonCa,
        login: loginCa,
        register: registerCa,
        characterBuilding: characterBuildingCa,
        profile: profileCa,
        settings: settingsCa,
        formValidationErrors: formValidationErrorsCa
      },
      en: {
        common: commonEN,
        login: loginEN,
        register: registerEN,
        characterBuilding: characterBuildingEN,
        profile: profileEN,
        settings: settingsEN,
        formValidationErrors: formValidationErrorsEN
      },
      es: {
        common: commonES,
        login: loginES,
        register: registerES,
        characterBuilding: characterBuildingES,
        profile: profileES,
        settings: settingsES,
        formValidationErrors: formValidationErrorsES
      },
      eu: {
        common: commonEU,
        login: loginEU,
        register: registerEU,
        characterBuilding: characterBuildingEU,
        profile: profileEU,
        settings: settingsEU,
        formValidationErrors: formValidationErrorsEU
      },
      fr: {
        common: commonFR,
        login: loginFR,
        register: registerFR,
        characterBuilding: characterBuildingFR,
        profile: profileFR,
        settings: settingsFR,
        formValidationErrors: formValidationErrorsFR
      },
      it: {
        common: commonIT,
        login: loginIT,
        register: registerIT,
        characterBuilding: characterBuildingIT,
        profile: profileIT,
        settings: settingsIT,
        formValidationErrors: formValidationErrorsIT
      },
      pt: {
        common: commonPT,
        login: loginPT,
        register: registerPT,
        characterBuilding: characterBuildingPT,
        profile: profilePT,
        settings: settingsPT,
        formValidationErrors: formValidationErrorsPT
      },
      ro: {
        common: commonRO,
        login: loginRO,
        register: registerRO,
        characterBuilding: characterBuildingRO,
        profile: profileRO,
        settings: settingsRO,
        formValidationErrors: formValidationErrorsRO
      },
      'es-GL': {
        common: commonESGL,
        login: loginESGL,
        register: registerESGL,
        characterBuilding: characterBuildingESGL,
        profile: profileESGL,
        settings: settingsESGL,
        formValidationErrors: formValidationErrorsESGL
      }
    },
    interpolation: {
      escapeValue: false
    },
    // backend: {
    //   loadPath: '/locales/{{lng}}/{{ns}}.json'
    // },
    react: {
      useSuspense: true
    }
  });

export default i18n;
