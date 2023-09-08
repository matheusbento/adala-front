/* eslint-disable jsx-a11y/control-has-associated-label */
import { useMemo } from 'react';

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

function CubeDashboardModal() {
  const { cube } = useCubes();
  const { t } = useTranslation();

  const { showDashboard, setShowDashboard } = useDashboard();

  const panes = useMemo(
    () => [
      {
        menuItem: t('Explore'),
        render: () => (
          <Tab.Pane attached={false} className={`${css(padding.none, border.none)}`}>
            <CubeDashboardExploreContainer />
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
    [t],
  );

  const modalTitle = useMemo(() => t(`Dashboard for Cube {{cube.name}}`, { cube }), [cube, t]);

  return (
    <BaslakeModal
      title={modalTitle}
      closeHandler={() => setShowDashboard(false)}
      open={showDashboard}
      size="large"
    >
      <BaslakeModal.Content>
        <If condition={!cube}>
          <Then>
            <Loader inline="centered" />
          </Then>
        </If>
        <Else>{() => <Tab menu={{ secondary: true, pointing: true }} panes={panes} />}</Else>
      </BaslakeModal.Content>
    </BaslakeModal>
  );
}

export default CubeDashboardModal;
