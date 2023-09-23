import { useEffect } from 'react';
import { FilterProvider } from '@hooks/Filter';
import { useOrganization } from '@hooks/Organization';

import { useParams } from 'react-router-dom';
import Organization from './Organization';

function OrganizationContainer(props: any) {
  const { organizationId } = useParams();
  const { fetchOrganizationHandler } = useOrganization();

  useEffect(() => {
    if (organizationId) {
      fetchOrganizationHandler(+organizationId);
    }
  }, [fetchOrganizationHandler, organizationId]);

  return (
    <FilterProvider context="organization">
      <Organization {...props} />
    </FilterProvider>
  );
}

export default OrganizationContainer;
