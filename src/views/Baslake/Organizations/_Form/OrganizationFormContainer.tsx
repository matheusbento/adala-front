import { useCallback } from 'react';

import Form from '@components/Library/Form';

import { useOrganization } from '@hooks/Organization';
import OrganizationForm from './OrganizationForm';

function OrganizationFormContainer(props: any) {
  const { setShowModal } = props;
  const { saveOrganizationHandler, initialValues } = useOrganization();

  const submit = useCallback(
    (values: any) => {
      const result = saveOrganizationHandler(values);

      setShowModal(null);
      return result;
    },
    [saveOrganizationHandler, setShowModal],
  );

  return (
    <Form onSubmit={submit} formArgs={{ defaultValues: initialValues }}>
      <OrganizationForm {...props} />
    </Form>
  );
}

export default OrganizationFormContainer;
