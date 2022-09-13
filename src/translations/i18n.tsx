import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import moment from 'moment';
import { initReactI18next } from 'react-i18next';

import TRANSLATIONS_BR from './locales/br.json';
import TRANSLATIONS_EN from './locales/en.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    returnEmptyString: false,
    resources: {
      'pt-BR': {
        translation: TRANSLATIONS_BR,
      },
      en: {
        translation: TRANSLATIONS_EN,
      },
    },
  });

i18n.init({
  interpolation: {
    format(value, format, lng) {
      if (value instanceof Date) return moment(value).format(format);
      if (typeof value === 'number')
        return new Intl.NumberFormat().format(value);
      return value;
    },
  },
});
export { i18n };

export default i18n;
