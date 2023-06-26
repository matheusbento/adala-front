import { useOrganization } from '@/hooks/Organization';
import { FilterProvider } from '@hooks/Filter';
import { SiloProvider } from '@hooks/Silos';

import Silos from './Silos';

function SilosContainer(props: any) {
  const { organization } = useOrganization();
  return (
    <FilterProvider context="silos">
      <SiloProvider organizationId={organization?.id as unknown as number}>
        <Silos {...props} />
      </SiloProvider>
    </FilterProvider>
  );
}

export default SilosContainer;
