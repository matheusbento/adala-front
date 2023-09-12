/* eslint-disable jsx-a11y/control-has-associated-label */
import { useCallback, useEffect, useMemo, useState } from 'react';

import BaslakeModal from '@components/Library/Baslake/BaslakeModal/BaslakeModal';
import { useCubes } from '@hooks/Cubes';
import { useDashboard } from '@hooks/Dashboard';
import { border, padding } from '@utils/themeConstants';
import { css } from 'glamor';
import { useTranslation } from 'react-i18next';
import { Else, If, Then } from 'react-if';
import { Loader, Tab } from 'semantic-ui-react';
import CubeDashboardContainer from './CubeDashboardContainer';
import CubeDashboardExploreContainer from './CubeDashboardExploreContainer';

function CubeDashboardModal({ showModal, setShowModal }: any) {
  const { cube } = useCubes();
  const { t } = useTranslation();
  const { setShowDashboard, clearDashboardItems } = useDashboard();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setShowDashboard(showModal);
  }, [setShowDashboard, showModal]);

  const handleTabChange = useCallback((_, data: any) => {
    const i = data.activeIndex;
    setActiveIndex(i);
  }, []);

  console.log({activeIndex})

  const panes = useMemo(
    () => [
      {
        menuItem: t('Explore'),
        render: () => (
          <Tab.Pane attached={false} className={`${css(padding.none, border.none)}`}>
            <CubeDashboardExploreContainer setActiveIndex={setActiveIndex} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: t('Dashboard'),
        render: () => (
          <Tab.Pane attached={false} className={`${css(padding.none, border.none)}`}>
            <CubeDashboardContainer />
          </Tab.Pane>
        ),
      },
    ],
    [t, setActiveIndex],
  );

  const modalTitle = useMemo(() => t(`Dashboard for Cube {{cube.name}}`, { cube }), [cube, t]);

  const closeModal = useCallback(() => {
    clearDashboardItems();
    setShowModal(false);
  }, [clearDashboardItems, setShowModal]);

  return (
    <BaslakeModal
      title={modalTitle}
      closeHandler={() => closeModal()}
      open={showModal}
      size="large"
    >
      <BaslakeModal.Content className={`${css({ flex: 1, overflow: 'auto' })}`}>
        <If condition={!cube}>
          <Then>
            <Loader inline="centered" />
          </Then>
        </If>
        <Else>
          {() => (
            <Tab
              menu={{ secondary: true, pointing: true }}
              panes={panes}
              activeIndex={activeIndex}
              onTabChange={handleTabChange}
            />
          )}
        </Else>
      </BaslakeModal.Content>
    </BaslakeModal>
  );
}

export default CubeDashboardModal;
