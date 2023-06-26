import { createContext, useContext, useCallback, useMemo, ReactNode } from 'react';

import * as AuthConstants from '@constants/authConstants';

import { useAuth } from '@hooks/Auth';

export type BaslakePolicyContextType = {
  canAccess: () => boolean;
};

const BaslakePolicyContext = createContext<BaslakePolicyContextType | null>(null);

export interface BaslakePolicyProps {
  children: ReactNode;
}

function BaslakePolicyProvider({ children }: BaslakePolicyProps) {
  const { hasPermission } = useAuth();

  const canAccess = useCallback(
    () => hasPermission(AuthConstants.permissions.baslake.access),
    [hasPermission],
  );

  const value = useMemo(
    () => ({
      canAccess,
    }),
    [canAccess],
  );

  return <BaslakePolicyContext.Provider value={value}>{children}</BaslakePolicyContext.Provider>;
}

function useBaslakePolicy() {
  const context = useContext(BaslakePolicyContext);

  if (!context) throw new Error('useBaslakePolicy must be used within a BaslakePolicyProvider');

  return context;
}

export { BaslakePolicyProvider, useBaslakePolicy };
