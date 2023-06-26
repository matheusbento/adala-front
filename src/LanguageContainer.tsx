import * as React from 'react';
import { useEffect, useMemo } from 'react';

import { i18n } from '@translations/i18n';
import { IntlProvider } from 'react-intl';

import App from './App';
import { useSystem } from './hooks/System';
import * as messages_br from './translations/locales/br.json';

const messages: Record<string, any> = {
  en: null,
  'pt-BR': messages_br,
};

function LanguageContainer() {
  const { locale, locales, setLocale } = useSystem();

  useEffect(() => {
    const loc: any = Object.values(locales).find((e: any) => e.flag === locale);
    i18n.changeLanguage(loc?.id ?? locale);
  }, [locale]);

  useEffect(() => {
    setLocale(navigator.language);
  }, []);

  const msg = useMemo(() => messages[locale], [locale]);

  return (
    <IntlProvider key={locale} locale={locale} messages={msg}>
      <App changeLanguage={setLocale} currentLocale={locale} />
    </IntlProvider>
  );
}

export default LanguageContainer;
