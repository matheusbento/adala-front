import React, { ReactNode } from 'react';

import { BaslakePolicyProvider } from './BaslakePolicy';
import { CubesPolicyProvider } from './CubesPolicy';
import { OrganizationPolicyProvider } from './OrganizationPolicy';
import { SilosPolicyProvider } from './SilosPolicy';
import { UserPolicyProvider } from './UserPolicy';

export interface IPolicyProps {
  children: ReactNode;
}

function PoliciesProvider({ children }: IPolicyProps) {
  return (
    <BaslakePolicyProvider>
      <UserPolicyProvider>
        <OrganizationPolicyProvider>
          <SilosPolicyProvider>
            <CubesPolicyProvider>{children}</CubesPolicyProvider>
          </SilosPolicyProvider>
        </OrganizationPolicyProvider>
      </UserPolicyProvider>
    </BaslakePolicyProvider>
  );
}

export default PoliciesProvider;
