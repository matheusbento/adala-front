import { CategoryProvider } from '@hooks/Category';
import SiloFolderModal from './SiloFolderModal';

function SiloFolderModalContainer(props: any) {
  return (
    <CategoryProvider>
      <SiloFolderModal {...props} />
    </CategoryProvider>
  );
}

export default SiloFolderModalContainer;
