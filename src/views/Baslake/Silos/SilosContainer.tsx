import { FilterProvider } from '@hooks/Filter';
import { useOrganization } from '@hooks/Organization';
import { SiloProvider } from '@hooks/Silos';

import Silos from './Silos';

function SilosContainer(props: any) {
  const { currentOrganization } = useOrganization();
  return (
    <FilterProvider context="silos">
      <SiloProvider organizationId={currentOrganization?.id as unknown as number}>
        <Silos {...props} />
      </SiloProvider>
    </FilterProvider>
  );
}

export default SilosContainer;
