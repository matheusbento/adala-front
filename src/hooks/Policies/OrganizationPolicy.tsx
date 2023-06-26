import { createContext, useContext, useCallback, useMemo, ReactNode } from 'react';

import * as AuthConstants from '@constants/authConstants';
import { useAuth } from '@hooks/Auth';

export type OrganizationPolicyContextType = {
  canAccess: () => boolean;
  canCreate: () => boolean;
  canEdit: () => boolean;
  canDelete: () => boolean;
};

const OrganizationPolicyContext = createContext<OrganizationPolicyContextType | null>(null);

export interface OrganizationPolicyProps {
  children: ReactNode;
}

function OrganizationPolicyProvider({ children }: OrganizationPolicyProps) {
  const { hasPermission } = useAuth();

  const canAccess = useCallback(
    () => hasPermission(AuthConstants.permissions.organization.see),
    [hasPermission],
  );

  const canCreate = useCallback(
    () => hasPermission(AuthConstants.permissions.organization.manage),
    [hasPermission],
  );

  const canEdit = useCallback(
    () => hasPermission(AuthConstants.permissions.organization.manage),
    [hasPermission],
  );

  const canDelete = useCallback(
    () => hasPermission(AuthConstants.permissions.organization.manage),
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

  return (
    <OrganizationPolicyContext.Provider value={value}>
      {children}
    </OrganizationPolicyContext.Provider>
  );
}

function useOrganizationPolicy() {
  const context = useContext(OrganizationPolicyContext);

  if (!context)
    throw new Error('useOrganizationPolicy must be used within a OrganizationPolicyProvider');

  return context;
}

export { OrganizationPolicyProvider, useOrganizationPolicy };
