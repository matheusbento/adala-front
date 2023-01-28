import { useMemo, useState } from 'react';

import { CubesProvider } from '@hooks/Cubes';
import { CubesTemplateProvider } from '@hooks/CubesTemplate';
import { FilterProvider } from '@hooks/Filter';
import { useOrganizations } from '@hooks/Organizations';

import Cubes from './Cubes';

const CubesContainer = (props: any) => {
  const { organization } = useOrganizations();

  return (
    <FilterProvider context="cubes">
      <CubesTemplateProvider>
        <CubesProvider organizationId={organization?.id as unknown as number}>
          <Cubes {...props} />
        </CubesProvider>
      </CubesTemplateProvider>
    </FilterProvider>
  );
};

export default CubesContainer;
