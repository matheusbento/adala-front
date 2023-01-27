import React, { ReactNode } from 'react';

import { BaslakePolicyProvider } from './BaslakePolicy';
import { CubesPolicyProvider } from './CubesPolicy';
import { OrganizationPolicyProvider } from './OrganizationPolicy';
import { SilosPolicyProvider } from './SilosPolicy';

export interface PolicyProps {
  children: ReactNode;
}

const PoliciesProvider = ({ children }: PolicyProps) => (
  <BaslakePolicyProvider>
    <OrganizationPolicyProvider>
      <SilosPolicyProvider>
        <CubesPolicyProvider>{children}</CubesPolicyProvider>
      </SilosPolicyProvider>
    </OrganizationPolicyProvider>
  </BaslakePolicyProvider>
);

export default PoliciesProvider;
