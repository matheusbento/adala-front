import { useCallback } from 'react';

import Form from '@components/Library/Form';

import { useUser } from '@hooks/User';
import { useParams } from 'react-router-dom';
import OrganizationUsersForm from './OrganizationUsersForm';

function OrganizationUsersFormContainer(props: any) {
  const { setShowModal } = props;
  const { organizationId } = useParams();
  const { saveUserHandler, user } = useUser();

  const submit = useCallback(
    (values: any) => {
      const { direct_permissions: dPermission, ...rest } = values;
      console.log({ dPermission, values });
      const result = saveUserHandler(+organizationId, {
        ...rest,
        direct_permissions: Object.keys(dPermission)
          .filter((key: any) => !!dPermission[key])
          .map((key: string) => key),
      });

      setShowModal(null);
      return result;
    },
    [saveUserHandler, setShowModal],
  );

  console.log({ user });
  return (
    <Form onSubmit={submit} formArgs={{ defaultValues: user }}>
      <OrganizationUsersForm {...props} />
    </Form>
  );
}

export default OrganizationUsersFormContainer;
