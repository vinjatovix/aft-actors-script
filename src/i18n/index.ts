import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// import Backend from 'i18next-http-backend';

import commonCa from '../../public/locales/ca/common.json';
import loginCa from '../../public/locales/ca/login.json';
import registerCa from '../../public/locales/ca/register.json';
import characterBuildingCa from '../../public/locales/ca/characterBuilding.json';
import profileCa from '../../public/locales/ca/profile.json';
import settingsCa from '../../public/locales/ca/settings.json';
import formValidationErrorsCa from '../../public/locales/ca/formValidationErrors.json';

import commonES from '../../public/locales/es/common.json';
import loginES from '../../public/locales/es/login.json';
import registerES from '../../public/locales/es/register.json';
import characterBuildingES from '../../public/locales/es/characterBuilding.json';
import profileES from '../../public/locales/es/profile.json';
import settingsES from '../../public/locales/es/settings.json';
import formValidationErrorsES from '../../public/locales/es/formValidationErrors.json';

import commonESGL from '../../public/locales/es-GL/common.json';
import loginESGL from '../../public/locales/es-GL/login.json';
import registerESGL from '../../public/locales/es-GL/register.json';
import characterBuildingESGL from '../../public/locales/es-GL/characterBuilding.json';
import profileESGL from '../../public/locales/es-GL/profile.json';
import settingsESGL from '../../public/locales/es-GL/settings.json';
import formValidationErrorsESGL from '../../public/locales/es-GL/formValidationErrors.json';

import commonEU from '../../public/locales/eu/common.json';
import loginEU from '../../public/locales/eu/login.json';
import registerEU from '../../public/locales/eu/register.json';
import characterBuildingEU from '../../public/locales/eu/characterBuilding.json';
import profileEU from '../../public/locales/eu/profile.json';
import settingsEU from '../../public/locales/eu/settings.json';
import formValidationErrorsEU from '../../public/locales/eu/formValidationErrors.json';

import commonFR from '../../public/locales/fr/common.json';
import loginFR from '../../public/locales/fr/login.json';
import registerFR from '../../public/locales/fr/register.json';
import characterBuildingFR from '../../public/locales/fr/characterBuilding.json';
import profileFR from '../../public/locales/fr/profile.json';
import settingsFR from '../../public/locales/fr/settings.json';
import formValidationErrorsFR from '../../public/locales/fr/formValidationErrors.json';

import commonIT from '../../public/locales/it/common.json';
import loginIT from '../../public/locales/it/login.json';
import registerIT from '../../public/locales/it/register.json';
import characterBuildingIT from '../../public/locales/it/characterBuilding.json';
import profileIT from '../../public/locales/it/profile.json';
import settingsIT from '../../public/locales/it/settings.json';
import formValidationErrorsIT from '../../public/locales/it/formValidationErrors.json';

import commonPT from '../../public/locales/pt/common.json';
import loginPT from '../../public/locales/pt/login.json';
import registerPT from '../../public/locales/pt/register.json';
import characterBuildingPT from '../../public/locales/pt/characterBuilding.json';
import profilePT from '../../public/locales/pt/profile.json';
import settingsPT from '../../public/locales/pt/settings.json';
import formValidationErrorsPT from '../../public/locales/pt/formValidationErrors.json';

import commonRO from '../../public/locales/ro/common.json';
import loginRO from '../../public/locales/ro/login.json';
import registerRO from '../../public/locales/ro/register.json';
import characterBuildingRO from '../../public/locales/ro/characterBuilding.json';
import profileRO from '../../public/locales/ro/profile.json';
import settingsRO from '../../public/locales/ro/settings.json';
import formValidationErrorsRO from '../../public/locales/ro/formValidationErrors.json';

import commonEN from '../../public/locales/en/common.json';
import loginEN from '../../public/locales/en/login.json';
import registerEN from '../../public/locales/en/register.json';
import characterBuildingEN from '../../public/locales/en/characterBuilding.json';
import profileEN from '../../public/locales/en/profile.json';
import settingsEN from '../../public/locales/en/settings.json';
import formValidationErrorsEN from '../../public/locales/en/formValidationErrors.json';

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
