import { CubesProvider } from '@hooks/Cubes';
import { CubesTemplateProvider } from '@hooks/CubesTemplate';
import { FilterProvider } from '@hooks/Filter';

import Cubes from './Cubes';

const CubesContainer = (props: any) => (
  <FilterProvider context="cubes">
    <CubesTemplateProvider>
      <CubesProvider>
        <Cubes {...props} />
      </CubesProvider>
    </CubesTemplateProvider>
  </FilterProvider>
);

export default CubesContainer;
