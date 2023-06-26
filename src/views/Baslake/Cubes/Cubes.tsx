import { useEffect } from 'react';

import { useOrganization } from '@/hooks/Organization';
import BaslakeModal from '@components/Library/Baslake/BaslakeModal/BaslakeModal';
import BaslakeTitle from '@components/Library/BaslakeTitle';
import Button from '@components/Library/Button';
import FormMessage from '@components/Library/FormMessage';
import Segment from '@components/Library/Segment';
import { useCubes } from '@hooks/Cubes';
import { useCubesPolicy } from '@hooks/Policies/CubesPolicy';
import { css } from 'glamor';
import { useTranslation } from 'react-i18next';
import { When } from 'react-if';
import { Element } from 'react-scroll';
import { Dimmer, Loader, Menu } from 'semantic-ui-react';

import CubesModalContainer from './CubesModalContainer';
import CubesOverviewContainer from './CubesOverviewContainer';

// import CubesModalContainer from './CubesModalContainer';

const styleContainer = css({ minHeight: 'calc(100vh - 100px)' });

const styleSegment = css({
  paddingTop: '0 !important',
  paddingBottom: '0 !important',
  marginTop: '0 !important',
});

function Cubes() {
  const { canCreate } = useCubesPolicy();

  const { showModal, setShowModal, fetchCubesHandler, formSuccess } = useCubes();

  const { organization } = useOrganization();

  const { t } = useTranslation();

  useEffect(() => {
    fetchCubesHandler();
  }, [organization]);

  return (
    <div className={`${styleContainer}`}>
      <Dimmer active={!organization} inverted>
        <Loader active />
      </Dimmer>
      <When condition={!!organization}>
        <>
          <BaslakeTitle title={t('Cubes')}>
            <When condition={canCreate()}>
              {() => (
                <Menu.Item position="right">
                  <Button pill outline color="success" onClick={() => setShowModal('new')}>
                    Create new Cube
                  </Button>
                </Menu.Item>
              )}
            </When>
          </BaslakeTitle>

          <BaslakeModal
            size="large"
            title={`${showModal === 'new' ? 'Create' : 'Edit'} Cube`}
            open={!!showModal}
            closeHandler={() => setShowModal(null)}
          >
            <BaslakeModal.Content>
              <Element name="BaslakeModal">
                <CubesModalContainer />
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

          <CubesOverviewContainer />
        </>
      </When>
    </div>
  );
}

export default Cubes;
