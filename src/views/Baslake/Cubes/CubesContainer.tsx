import { CubesProvider } from '@hooks/Cubes';
import { FilterProvider } from '@hooks/Filter';

import Cubes from './Cubes';

const CubesContainer = (props: any) => (
  <FilterProvider context="cubes">
    <CubesProvider>
      <Cubes {...props} />
    </CubesProvider>
  </FilterProvider>
);

export default CubesContainer;
