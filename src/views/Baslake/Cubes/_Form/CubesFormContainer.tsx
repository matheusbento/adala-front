import Form from '@components/Library/Form';
import { useCubes } from '@hooks/Cubes';
import { OrganizationsProvider } from '@hooks/Organizations';
import { SilosProvider } from '@hooks/Silos';

import CubesForm from './CubesForm';

const CubesFormContainer = (props: any) => {
  const { saveCubeHandler, initialValues } = useCubes();
  return (
    <OrganizationsProvider>
      <SilosProvider>
        <Form
          onSubmit={saveCubeHandler}
          formArgs={{ defaultValues: initialValues }}
        >
          <CubesForm {...props} />
        </Form>
      </SilosProvider>
    </OrganizationsProvider>
  );
};

export default CubesFormContainer;
