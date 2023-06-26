import { CubesProvider } from '@hooks/Cubes';
import { CubesTemplateProvider } from '@hooks/CubesTemplate';
import { FilterProvider } from '@hooks/Filter';
import { SiloProvider } from '@hooks/Silos';
import { useOrganization } from '@/hooks/Organization';

import Cubes from './Cubes';

function CubesContainer(props: any) {
  const { organization } = useOrganization();

  return (
    <FilterProvider context="cubes">
      <CubesTemplateProvider>
        <SiloProvider organizationId={organization?.id as unknown as number}>
          <CubesProvider organizationId={organization?.id as unknown as number}>
            <Cubes {...props} />
          </CubesProvider>
        </SiloProvider>
      </CubesTemplateProvider>
    </FilterProvider>
  );
}

export default CubesContainer;
