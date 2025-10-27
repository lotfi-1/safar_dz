import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import en from './locales/en.json';
import ar from './locales/ar.json';

const resources = { en: { translation: en }, ar: { translation: ar } };

const locale = RNLocalize.getLocales()[0]?.languageCode || 'en';

i18n
  .use(initReactI18next)
  .init({
    // compatibilityJSON: 'v3',
    lng: locale,
    fallbackLng: 'en',
    resources,
    interpolation: { escapeValue: false },
  });

export default i18n;
