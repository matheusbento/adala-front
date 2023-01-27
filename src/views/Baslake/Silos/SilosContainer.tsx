import { FilterProvider } from '@hooks/Filter';
import { SilosProvider } from '@hooks/Silos';

import Silos from './Silos';

const SilosContainer = (props: any) => (
  <FilterProvider context="silos">
    <SilosProvider>
      <Silos {...props} />
    </SilosProvider>
  </FilterProvider>
);

export default SilosContainer;
