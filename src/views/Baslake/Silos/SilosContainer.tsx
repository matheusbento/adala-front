import { FilterProvider } from '@hooks/Filter';
import { useOrganizations } from '@hooks/Organizations';
import { SilosProvider } from '@hooks/Silos';

import Silos from './Silos';

const SilosContainer = (props: any) => {
  const { organization } = useOrganizations();
  return (
    <FilterProvider context="silos">
      <SilosProvider organizationId={organization?.id as unknown as number}>
        <Silos {...props} />
      </SilosProvider>
    </FilterProvider>
  );
};

export default SilosContainer;
