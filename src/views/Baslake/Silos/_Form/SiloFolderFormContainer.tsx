import { useCallback } from 'react';
import Form from '@components/Library/Form';
import { useSilo } from '@hooks/Silos';

import SiloFolderForm from './SiloFolderForm';

function SiloFolderFormContainer(props: any) {
  const { saveSiloFolderHandler, initialValues } = useSilo();

  const submit = useCallback(
    (values: any) => {
      console.log({ values });
      return saveSiloFolderHandler(values);
    },
    [saveSiloFolderHandler],
  );

  return (
    <Form onSubmit={submit} formArgs={{ defaultValues: initialValues }}>
      <SiloFolderForm {...props} />
    </Form>
  );
}

export default SiloFolderFormContainer;
