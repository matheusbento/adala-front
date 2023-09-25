import { ReactNode, createContext, useCallback, useContext, useMemo } from 'react';

import * as AuthConstants from '@constants/authConstants';
import { useAuth } from '@hooks/Auth';

export type UserPolicyContextType = {
  canAccess: () => boolean;
  canManage: () => boolean;
};

const UserPolicyContext = createContext<UserPolicyContextType | null>(null);

export interface IUserPolicyProps {
  children: ReactNode;
}

function UserPolicyProvider({ children }: IUserPolicyProps) {
  const { hasPermission } = useAuth();

  const canAccess = useCallback(
    () => hasPermission(AuthConstants.permissions.silos.see),
    [hasPermission],
  );

  const canManage = useCallback(
    () => hasPermission(AuthConstants.permissions.silos.manage),
    [hasPermission],
  );

  const value = useMemo(
    () => ({
      canAccess,
      canManage,
    }),
    [canAccess, canManage],
  );

  return <UserPolicyContext.Provider value={value}>{children}</UserPolicyContext.Provider>;
}

function useUserPolicy() {
  const context = useContext(UserPolicyContext);

  if (!context) throw new Error('useUserPolicy must be used within a UserPolicyProvider');

  return context;
}

export { UserPolicyProvider, useUserPolicy };
