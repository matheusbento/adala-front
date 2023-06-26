import { createContext, useContext, useCallback, useMemo, ReactNode } from 'react';

import * as AuthConstants from '@constants/authConstants';
import { useAuth } from '@hooks/Auth';

export type CubesPolicyContextType = {
  canAccess: () => boolean;
  canCreate: () => boolean;
  canEdit: () => boolean;
  canDelete: () => boolean;
};

const CubesPolicyContext = createContext<CubesPolicyContextType | null>(null);

export interface CubesPolicyProps {
  children: ReactNode;
}

function CubesPolicyProvider({ children }: CubesPolicyProps) {
  const { hasPermission } = useAuth();

  const canAccess = useCallback(
    () => hasPermission(AuthConstants.permissions.cubes.see),
    [hasPermission],
  );

  const canCreate = useCallback(
    () => hasPermission(AuthConstants.permissions.cubes.manage),
    [hasPermission],
  );

  const canEdit = useCallback(
    () => hasPermission(AuthConstants.permissions.cubes.manage),
    [hasPermission],
  );

  const canDelete = useCallback(
    () => hasPermission(AuthConstants.permissions.cubes.manage),
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

  return <CubesPolicyContext.Provider value={value}>{children}</CubesPolicyContext.Provider>;
}

function useCubesPolicy() {
  const context = useContext(CubesPolicyContext);

  if (!context) throw new Error('useCubesPolicy must be used within a CubesPolicyProvider');

  return context;
}

export { CubesPolicyProvider, useCubesPolicy };
