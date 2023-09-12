import { DashboardProvider } from '@hooks/Dashboard';
import { useOrganization } from '@hooks/Organization';
import CubeDashboardModal from './CubeDashboardModal';

function CubeDashboardModalContainer({ showModal, setShowModal }: any) {
  const { organization } = useOrganization();
  return (
    <DashboardProvider organizationId={organization?.id as unknown as number}>
      <CubeDashboardModal showModal={showModal} setShowModal={setShowModal} />
    </DashboardProvider>
  );
}

export default CubeDashboardModalContainer;
