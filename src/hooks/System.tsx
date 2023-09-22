import { createContext, useContext, useMemo, useState, ReactNode } from 'react';

export type SystemContextType = {
  isBarVisible: boolean;
  setIsBarVisible: (val: boolean) => void;
  setLocale: (val: string) => void;
  locales: Record<string, string>;
  locale: string;
};

export const SystemContext = createContext<SystemContextType | null>(null);

const useSystem = () => {
  const context = useContext(SystemContext);
  if (!context) {
    throw new Error('useSystem must be within SystemProvider');
  }

  return context;
};

interface ISystemProviderProps {
  children: ReactNode;
}

function SystemProvider({ children }: ISystemProviderProps) {
  const locales: Record<string, any> = {
    en: {
      id: 'en',
      flag: 'us',
      label: 'English',
      moment: 'us',
    },
    br: {
      id: 'pt-BR',
      flag: 'br',
      moment: 'pt-br',
      label: 'Portuguese (Brasil)',
    },
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [locale, setLocale] = useState('en');
  const [isBarVisible, setIsBarVisible] = useState(false);

  const providerValue = useMemo(
    () => ({
      isBarVisible,
      setIsBarVisible,
      setLocale,
      locales,
      locale,
    }),
    [isBarVisible, locales, locale, setLocale, setIsBarVisible],
  );

  return <SystemContext.Provider value={providerValue}>{children}</SystemContext.Provider>;
}

export { SystemProvider, useSystem };
