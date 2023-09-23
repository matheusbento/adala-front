import { useEffect } from 'react';

import { useOrganization } from '@/hooks/Organization';
import BaslakeModal from '@components/Library/Baslake/BaslakeModal/BaslakeModal';
import BaslakeTitle from '@components/Library/BaslakeTitle';
import Button from '@components/Library/Button';
import FormMessage from '@components/Library/FormMessage';
import Segment from '@components/Library/Segment';
import { useSiloPolicy } from '@hooks/Policies/SilosPolicy';
import { useSilo } from '@hooks/Silos';
import { css } from 'glamor';
import { useTranslation } from 'react-i18next';
import { When } from 'react-if';
import { Element } from 'react-scroll';
import { Menu } from 'semantic-ui-react';

import SiloFileModalContainer from './SiloFileModalContainer';
import SiloFolderModalContainer from './SiloFolderModalContainer';
import SiloFoldersContainer from './SiloFoldersContainer';

// import SilosModalContainer from './SilosModalContainer';
// import SilosOverviewContainer from './SilosOverviewContainer';

// import SilosModalContainer from './SilosModalContainer';

const styleContainer = css({ minHeight: 'calc(100vh - 100px)' });

const styleSegment = css({
  paddingTop: '0 !important',
  paddingBottom: '0 !important',
  marginTop: '0 !important',
});

function Silos() {
  const { canCreate } = useSiloPolicy();

  const {
    showModal,
    showModalFile,
    setShowModalFile,
    setShowModal,
    fetchSilosHandler,
    formSuccess,
  } = useSilo();

  const { currentOrganization } = useOrganization();

  const { t } = useTranslation();

  useEffect(() => {
    fetchSilosHandler(null);
  }, [fetchSilosHandler, currentOrganization]);

  return (
    <div className={`${styleContainer}`}>
      <BaslakeTitle title={t('Data Silos')}>
        <When condition={canCreate()}>
          {() => (
            <Menu.Item position="right">
              <Button
                pill
                outline
                color="success"
                icon="icon-folder-add"
                onClick={() => setShowModal('new')}
              >
                {t('Create new Silo')}
              </Button>
            </Menu.Item>
          )}
        </When>
      </BaslakeTitle>

      <BaslakeModal
        size="small"
        title={t(`${showModal === 'new' ? 'Create' : 'Edit'} Silo`)}
        open={!!showModal}
        closeHandler={() => setShowModal(null)}
      >
        <BaslakeModal.Content>
          <Element name="BaslakeModal">
            <SiloFolderModalContainer />
          </Element>
        </BaslakeModal.Content>
      </BaslakeModal>

      <BaslakeModal
        size="small"
        title={t(`${showModalFile === 'new' ? 'Upload' : 'Edit'} File`)}
        open={!!showModalFile}
        closeHandler={() => setShowModalFile(null)}
      >
        <BaslakeModal.Content>
          <Element name="BaslakeModalFile">
            <SiloFileModalContainer />
          </Element>
        </BaslakeModal.Content>
      </BaslakeModal>

      <When condition={!!formSuccess}>
        {() => (
          <Segment basic className={`${styleSegment}`}>
            <FormMessage
              success
              header="Success"
              list={formSuccess as string[]}
              visible={!!formSuccess}
              timeout={5000}
              type="success"
            />
          </Segment>
        )}
      </When>

      <SiloFoldersContainer />
    </div>
  );
}

export default Silos;
