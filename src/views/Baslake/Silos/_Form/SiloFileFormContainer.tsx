import { useCallback } from 'react';

import Form from '@components/Library/Form';
import { useSilos } from '@hooks/Silos';

import { SiloFileType } from 'types/SiloFileType';

import SilosFileForm from './SiloFileForm';

const SiloFileFormContainer = (props: any) => {
  const { showSilo, saveSiloHandler, initialValues } = useSilos();

  const submit = useCallback(
    (values: any) => {
      // eslint-disable-next-line no-console
      console.log(values);
      return saveSiloHandler(showSilo?.id as number, {
        ...values,
        file: values.file[0],
      });
    },
    [showSilo]
  );

  return (
    <Form onSubmit={submit} formArgs={{ defaultValues: initialValues }}>
      <SilosFileForm {...props} />
    </Form>
  );
};

export default SiloFileFormContainer;
