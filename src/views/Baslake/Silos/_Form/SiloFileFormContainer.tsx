import { useCallback } from 'react';

import Form from '@components/Library/Form';
import { useSilo } from '@hooks/Silos';

import SilosFileForm from './SiloFileForm';

function SiloFileFormContainer(props: any) {
  const { showSilo, saveSiloHandler, initialValues } = useSilo();

  const submit = useCallback(
    (values: any) => {
      // eslint-disable-next-line no-console
      console.log(values);
      return saveSiloHandler(showSilo?.id as number, {
        ...values,
      });
    },
    [saveSiloHandler, showSilo?.id],
  );

  return (
    <Form onSubmit={submit} formArgs={{ defaultValues: initialValues }}>
      <SilosFileForm {...props} />
    </Form>
  );
}

export default SiloFileFormContainer;
