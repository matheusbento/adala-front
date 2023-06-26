import { ReactNode, createContext, useCallback, useContext, useMemo } from 'react';

import * as AuthConstants from '@constants/authConstants';
import { useAuth } from '@hooks/Auth';

export type SilosPolicyContextType = {
  canAccess: () => boolean;
  canCreate: () => boolean;
  canEdit: () => boolean;
  canDelete: () => boolean;
};

const SilosPolicyContext = createContext<SilosPolicyContextType | null>(null);

export interface SilosPolicyProps {
  children: ReactNode;
}

function SilosPolicyProvider({ children }: SilosPolicyProps) {
  const { hasPermission } = useAuth();

  const canAccess = useCallback(
    () => hasPermission(AuthConstants.permissions.silos.see),
    [hasPermission],
  );

  const canCreate = useCallback(
    () => hasPermission(AuthConstants.permissions.silos.manage),
    [hasPermission],
  );

  const canEdit = useCallback(
    () => hasPermission(AuthConstants.permissions.silos.manage),
    [hasPermission],
  );

  const canDelete = useCallback(
    () => hasPermission(AuthConstants.permissions.silos.manage),
    [hasPermission],
  );

  const value = useMemo(
    () => ({
      canAccess,
      canCreate,
      canDelete,
      canEdit,
    }),
    [canAccess, canCreate, canDelete, canEdit],
  );

  return <SilosPolicyContext.Provider value={value}>{children}</SilosPolicyContext.Provider>;
}

function useSiloPolicy() {
  const context = useContext(SilosPolicyContext);

  if (!context) throw new Error('useSiloPolicy must be used within a SilosPolicyProvider');

  return context;
}

export { SilosPolicyProvider, useSiloPolicy };
