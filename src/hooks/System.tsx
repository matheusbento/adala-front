import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from 'react';

import { AxiosResponse } from 'axios';

export type SystemContextType = {
  isBarVisible: boolean;
  setIsBarVisible: (val: boolean) => void;
};

export const SystemContext = createContext<SystemContextType | null>(null);

const useSystem = () => {
  const context = useContext(SystemContext);
  if (!context) {
    throw new Error('useSystem must be within SystemProvider');
  }

  return context;
};

interface SystemProviderProps {
  children: ReactNode;
}

const SystemProvider = ({ children }: SystemProviderProps) => {
  const [isBarVisible, setIsBarVisible] = useState(false);

  const providerValue = useMemo(
    () => ({
      isBarVisible,
      setIsBarVisible,
    }),
    [isBarVisible, setIsBarVisible]
  );

  return (
    <SystemContext.Provider value={providerValue}>
      {children}
    </SystemContext.Provider>
  );
};

export { SystemProvider, useSystem };
