import * as React from 'react';
import { useEffect, useMemo } from 'react';

import { i18n } from '@translations/i18n';
import Cookies from 'js-cookie';
import moment from 'moment';
import { IntlProvider } from 'react-intl';

import App from './App';
import { useSystem } from './hooks/System';
import * as messagesBr from './translations/locales/br.json';

const messages: Record<string, any> = {
  en: null,
  'pt-BR': messagesBr,
};

function LanguageContainer() {
  const { locale, locales, setLocale } = useSystem();

  useEffect(() => {
    const loc: any = Object.values(locales).find((e: any) => e.flag === locale);
    console.log({ loc });
    i18n.changeLanguage(loc?.id ?? locale);
    moment.locale(loc?.moment ?? locale);
    Cookies.set('language', loc?.id ?? locale);
  }, [locale, locales]);

  useEffect(() => {
    const lang = Cookies.get('language') ?? navigator.language;
    setLocale(lang);
  }, [locale, setLocale]);

  const msg = useMemo(() => messages[locale], [locale]);

  return (
    <IntlProvider key={locale} locale={locale} messages={msg}>
      <App changeLanguage={setLocale} currentLocale={locale} />
    </IntlProvider>
  );
}

export default LanguageContainer;
