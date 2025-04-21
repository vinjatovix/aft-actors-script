import i18n, { i18n as I18nType } from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonESGL from '../../public/locales/es-GL/common.json';
import loginESGL from '../../public/locales/es-GL/login.json';
import registerESGL from '../../public/locales/es-GL/register.json';
import characterBuildingESGL from '../../public/locales/es-GL/characterBuilding.json';
import profileESGL from '../../public/locales/es-GL/profile.json';
import formValidationErrorsESGL from '../../public/locales/es-GL/formValidationErrors.json';

export const initializeI18n = async (
  lng: string = 'es-GL'
): Promise<I18nType> => {
  const i18nTest = i18n.createInstance();

  await i18nTest.use(initReactI18next).init({
    lng,
    fallbackLng: lng,
    ns: [
      'common',
      'login',
      'register',
      'characterBuilding',
      'profile',
      'formValidationErrors'
    ],
    defaultNS: 'common',
    resources: {
      'es-GL': {
        common: commonESGL,
        login: loginESGL,
        register: registerESGL,
        characterBuilding: characterBuildingESGL,
        profile: profileESGL,
        formValidationErrors: formValidationErrorsESGL
      }
    },
    interpolation: {
      escapeValue: false
    }
  });

  return i18nTest;
};
