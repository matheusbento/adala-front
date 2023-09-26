/* eslint-disable jsx-a11y/control-has-associated-label */
import { useCallback, useEffect, useState } from 'react';

import { useCubes } from '@hooks/Cubes';
import { useDashboard } from '@hooks/Dashboard';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { css } from 'glamor';
import { useTranslation } from 'react-i18next';
import { If, Then, Else } from 'react-if';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import CubeDashboardItem from './CubeDashboardItem';
import DashboardItemProvider from './Providers/DashboardItemProvider';
import DashboardProvider from './Providers/DashboardProvider';

function CubeDashboard() {
  const { showCube } = useCubes();
  const { t } = useTranslation();
  const { fetchCubeItemsHandler, dashboardItems, isDraggable } = useDashboard();
  const { isLoadingDashboardItems } = useDashboard();

  useEffect(() => {
    if (showCube) {
      fetchCubeItemsHandler();
    }
  }, [fetchCubeItemsHandler, showCube]);

  const [layout, setLayout] = useState([]);

  const onLayoutChange = (newLayout: any) => {
    setLayout(newLayout);
  };

  console.log({ isDraggable });

  const defaultLayout = useCallback(
    (i: any) => {
      console.log({ i });
      return {
        x: i?.layout?.x || 0,
        y: i?.layout?.y || 0,
        w: i?.layout?.w || 4,
        h: i?.layout?.h || 8,
        minW: 4,
        minH: 8,
        draggable: isDraggable[i.id] ?? true,
      };
    },
    [isDraggable],
  );

  const dashboardItem = useCallback(
    (item: any) => {
      return (
        <div key={item.id} data-grid={defaultLayout(item)}>
          <DashboardItemProvider key={item.id} itemId={item.id} title={item.name}>
            <CubeDashboardItem
              item={item}
              layout={layout.find((e: any) => e?.i === item?.id.toString())}
              isDraggable={false}
            />
          </DashboardItemProvider>
        </div>
      );
    },
    [defaultLayout, layout],
  );

  return (
    <Dimmer.Dimmable as={Segment} blurring dimmed={isLoadingDashboardItems} basic>
      <Dimmer active={isLoadingDashboardItems}>
        <Loader inline="centered" />
      </Dimmer>

      <div className={`${css({ minHeight: '800px !important' })}`}>
        <If condition={dashboardItems?.length}>
          <Then>
            <DashboardProvider dashboardItems={dashboardItems} onLayoutChange={onLayoutChange}>
              {dashboardItems?.map(dashboardItem)}
            </DashboardProvider>
          </Then>
          <Else>
            <Segment>{t('Any item added')}</Segment>
          </Else>
        </If>
      </div>
    </Dimmer.Dimmable>
  );
}

export default CubeDashboard;
