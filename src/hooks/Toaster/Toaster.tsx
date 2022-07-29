import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from 'react';

import { ToasterType } from 'types/ToasterType';

export type ToasterContextType = {
  toaster: ToasterType;
  invokeToaster: (
    message: string,
    status: 'success' | 'error' | 'warning' | 'info'
  ) => void;
};

export const ToasterContext = createContext<ToasterContextType | null>(null);

const useToaster = () => {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error('useToaster must be within ToasterProvider');
  }

  return context;
};

interface ToasterProviderProps {
  children: ReactNode;
}

const ToasterProvider = ({ children }: ToasterProviderProps) => {
  const initialState = {
    trigger: undefined,
    message: undefined,
    status: undefined,
  };

  const [toaster, setToaster] = useState<ToasterType>(initialState);

  const trigger = () =>
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  const invokeToaster = useCallback(
    (message: string, status: 'success' | 'error' | 'warning' | 'info') => {
      setToaster({
        trigger: trigger(),
        message,
        status,
      });
    },
    [trigger]
  );

  const providerValue = useMemo(
    () => ({
      toaster,
      invokeToaster,
    }),
    [toaster, invokeToaster]
  );

  return (
    <ToasterContext.Provider value={providerValue}>
      {children}
    </ToasterContext.Provider>
  );
};

export { ToasterProvider, useToaster };
