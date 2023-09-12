import { CubesProvider } from '@hooks/Cubes';
import { CubesTemplateProvider } from '@hooks/CubesTemplate';
import { ExploreProvider } from '@hooks/Explore';
import { FilterProvider } from '@hooks/Filter';
import { useOrganization } from '@hooks/Organization';
import { SiloProvider } from '@hooks/Silos';

import Cubes from './Cubes';

function CubesContainer(props: any) {
  const { organization } = useOrganization();

  return (
    <FilterProvider context="cubes">
      <CubesTemplateProvider>
        <SiloProvider organizationId={organization?.id as unknown as number}>
          <ExploreProvider organizationId={organization?.id as unknown as number}>
            <CubesProvider organizationId={organization?.id as unknown as number}>
              <Cubes {...props} />
            </CubesProvider>
          </ExploreProvider>
        </SiloProvider>
      </CubesTemplateProvider>
    </FilterProvider>
  );
}

export default CubesContainer;
