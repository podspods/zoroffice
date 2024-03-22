import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importing translation files

import ar from './locales/ar/translation.json';
import de from './locales/de/translation.json';
import en from './locales/en/translation.json';
import es from './locales/es/translation.json';
import fr from './locales/fr/translation.json';
import it from './locales/it/translation.json';
import ja from './locales/ja/translation.json';
import ko from './locales/ko/translation.json';
import nl from './locales/nl/translation.json';
import pt from './locales/pt/translation.json';
import ru from './locales/ru/translation.json';
import vi from './locales/vi/translation.json';
// Creating object with the variables of imported translation files
const resources = {
  en: {
    translation: en
  },
  ar: {
    translation: ar
  },
  de: {
    translation: de
  },
  es: {
    translation: es
  },
  fr: {
    translation: fr
  },
  it: {
    translation: it
  },
  ja: {
    translation: ja
  },
  ko: {
    translation: ko
  },
  nl: {
    translation: nl
  },
  pt: {
    translation: pt
  },
  ru: {
    translation: ru
  },
  vi: {
    translation: vi
  }
};

// i18N Initialization

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
