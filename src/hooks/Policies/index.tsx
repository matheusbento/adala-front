import React, { ReactNode } from 'react';

import { BaslakePolicyProvider } from './BaslakePolicy';
import { CubesPolicyProvider } from './CubesPolicy';

export interface PolicyProps {
  children: ReactNode;
}

const PoliciesProvider = ({ children }: PolicyProps) => (
  <BaslakePolicyProvider>
    <CubesPolicyProvider>{children}</CubesPolicyProvider>
  </BaslakePolicyProvider>
);

export default PoliciesProvider;
