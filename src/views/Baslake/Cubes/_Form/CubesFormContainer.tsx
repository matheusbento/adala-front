import { useCallback } from 'react';

import { useOrganization } from '@/hooks/Organization';
import Form from '@components/Library/Form';
import { useCubes } from '@hooks/Cubes';
import { useSilo } from '@hooks/Silos';

import CubesForm from './CubesForm';

function CubesFormContainer(props: any) {
  const { saveCubeHandler, initialValues } = useCubes();
  const { selectedColumns, folder } = useSilo();
  const { organization } = useOrganization();

  const handleSubmit = useCallback(
    (values: Record<string, any>) => {
      const payload = {
        ...values,
        folder,
        columns: selectedColumns,
      };
      // eslint-disable-next-line no-console
      console.log({ payload });
      return saveCubeHandler(payload);
    },
    [saveCubeHandler, selectedColumns, folder],
  );

  return (
    <Form onSubmit={handleSubmit} formArgs={{ defaultValues: initialValues }}>
      <CubesForm {...props} />
    </Form>
  );
}

export default CubesFormContainer;
