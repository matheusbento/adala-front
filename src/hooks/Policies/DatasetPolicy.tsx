import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';

import * as AuthConstants from '@constants/authConstants';
import { useAuth } from '@hooks/Auth';

export type DatasetPolicyContextType = {
  canAccess: () => boolean;
  canCreate: () => boolean;
  canEdit: () => boolean;
  canDelete: () => boolean;
};

const DatasetPolicyContext = createContext<DatasetPolicyContextType | null>(
  null
);

export interface DatasetPolicyProps {
  children: ReactNode;
}

const DatasetPolicyProvider = ({ children }: DatasetPolicyProps) => {
  const { hasPermission } = useAuth();

  const canAccess = useCallback(
    () => hasPermission(AuthConstants.permissions.dataset.see),
    [hasPermission]
  );

  const canCreate = useCallback(
    () => hasPermission(AuthConstants.permissions.dataset.manage),
    [hasPermission]
  );

  const canEdit = useCallback(
    () => hasPermission(AuthConstants.permissions.dataset.manage),
    [hasPermission]
  );

  const canDelete = useCallback(
    () => hasPermission(AuthConstants.permissions.dataset.manage),
    [hasPermission]
  );

  const value = useMemo(
    () => ({
      canAccess,
      canCreate,
      canDelete,
      canEdit,
    }),
    [canAccess, canCreate, canDelete, canEdit]
  );

  return (
    <DatasetPolicyContext.Provider value={value}>
      {children}
    </DatasetPolicyContext.Provider>
  );
};

function useDatasetPolicy() {
  const context = useContext(DatasetPolicyContext);

  if (!context)
    throw new Error(
      'useDatasetPolicy must be used within a DatasetPolicyProvider'
    );

  return context;
}

export { DatasetPolicyProvider, useDatasetPolicy };
