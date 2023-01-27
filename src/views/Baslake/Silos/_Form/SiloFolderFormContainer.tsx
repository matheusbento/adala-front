import Form from '@components/Library/Form';
import { useSilos } from '@hooks/Silos';

import SiloFolderForm from './SiloFolderForm';

const SiloFolderFormContainer = (props: any) => {
  const { saveSiloFolderHandler, initialValues } = useSilos();
  return (
    <Form
      onSubmit={saveSiloFolderHandler}
      formArgs={{ defaultValues: initialValues }}
    >
      <SiloFolderForm {...props} />
    </Form>
  );
};

export default SiloFolderFormContainer;
