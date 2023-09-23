import { FilterProvider } from '@hooks/Filter';

import Organizations from './Organizations';

function OrganizationsContainer(props: any) {
  return (
    <FilterProvider context="organizations">
      <Organizations {...props} />
    </FilterProvider>
  );
}

export default OrganizationsContainer;
