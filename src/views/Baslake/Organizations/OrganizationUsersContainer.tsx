import { useEffect } from 'react';
import { FilterProvider } from '@hooks/Filter';
import { useOrganization } from '@hooks/Organization';

import { UserProvider } from '@hooks/User';
import { useParams } from 'react-router-dom';
import OrganizationUsers from './OrganizationUsers';

function OrganizationUsersContainer(props: any) {
  const { organizationId } = useParams();
  const { fetchOrganizationHandler } = useOrganization();

  useEffect(() => {
    if (organizationId) {
      fetchOrganizationHandler(+organizationId);
    }
  }, [fetchOrganizationHandler, organizationId]);

  return (
    <UserProvider>
      <FilterProvider context="organization">
        <OrganizationUsers {...props} />
      </FilterProvider>
    </UserProvider>
  );
}

export default OrganizationUsersContainer;
