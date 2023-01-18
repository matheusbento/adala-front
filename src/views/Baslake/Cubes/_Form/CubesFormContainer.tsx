import Form from '@components/Library/Form';
import { useCubes } from '@hooks/Cubes';

import CubesForm from './CubesForm';

const CubesFormContainer = (props: any) => {
  const { saveCubeHandler, initialValues } = useCubes();
  return (
    <Form
      onSubmit={saveCubeHandler}
      formArgs={{ defaultValues: initialValues }}
    >
      <CubesForm {...props} />
    </Form>
  );
};

export default CubesFormContainer;
