import React, { ReactNode } from 'react';

import { BaslakePolicyProvider } from './BaslakePolicy';
import { CubesPolicyProvider } from './CubesPolicy';
import { DatasetPolicyProvider } from './DatasetPolicy';
import { OrganizationPolicyProvider } from './OrganizationPolicy';

export interface PolicyProps {
  children: ReactNode;
}

const PoliciesProvider = ({ children }: PolicyProps) => (
  <BaslakePolicyProvider>
    <OrganizationPolicyProvider>
      <DatasetPolicyProvider>
        <CubesPolicyProvider>{children}</CubesPolicyProvider>
      </DatasetPolicyProvider>
    </OrganizationPolicyProvider>
  </BaslakePolicyProvider>
);

export default PoliciesProvider;
