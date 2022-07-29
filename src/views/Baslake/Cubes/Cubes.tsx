import BaslakeTitle from '@components/Library/BaslakeTitle';
import Button from '@components/Library/Button';
import { useCubes } from '@hooks/Cubes';
import { useCubesPolicy } from '@hooks/Policies/CubesPolicy';
import { css } from 'glamor';
import { useEffect } from 'react';
import { When } from 'react-if';
// import { Element } from 'react-scroll';
import { Menu } from 'semantic-ui-react';

import CubesOverviewContainer from './CubesOverviewContainer';

// import CubesModalContainer from './CubesModalContainer';

const styleContainer = css({ minHeight: 'calc(100vh - 100px)' });

const Cubes = () => {
  const { canCreate } = useCubesPolicy();

  const { setShowModal, fetchCubesHandler } = useCubes();

  useEffect(() => {
    fetchCubesHandler();
  }, []);

  return (
    <div className={`${styleContainer}`}>
      <BaslakeTitle title="Data Cubes">
        <When condition={canCreate()}>
          {() => (
            <Menu.Item position="right">
              <Button
                pill
                outline
                color="success"
                onClick={() => setShowModal(true)}
              >
                Create new Cube
              </Button>
            </Menu.Item>
          )}
        </When>
      </BaslakeTitle>

      {/* <BaslakeModal
        size="small"
        title={`${jobOrderActionLabel[visibleModal]} Order`}
        open={!!visibleModal}
        closeHandler={() => showFormJobOrderModalHandler(null)}
      >
        <BaslakeModal.Content>
          <Element name="BaslakeModal">
            <CubesModalContainer />
          </Element>
        </BaslakeModal.Content>
      </BaslakeModal> */}

      {/* <When condition={formSuccess}>
        {() => (
          <Segment basic className={`${styleSegment}`}>
            <FormMessage
              success
              header="Success"
              list={formSuccess}
              visible={!!formSuccess}
              timeout={5000}
            />
          </Segment>
        )}
      </When> */}

      <CubesOverviewContainer />
    </div>
  );
};

export default Cubes;
