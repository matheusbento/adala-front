/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from 'react';

import { useCubes } from '@hooks/Cubes';
import { useDashboard } from '@hooks/Dashboard';
import RGL, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useTranslation } from 'react-i18next';
import { If, Then, Else } from 'react-if';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import { css } from 'glamor';
import CubeDashboardItem from './CubeDashboardItem';
import DashboardItemProvider from './Providers/DashboardItemProvider';
import DashboardProvider from './Providers/DashboardProvider';

const ReactGridLayout = WidthProvider(RGL);

const defaultLayout = (i: any) => {
  console.log({ i });
  return {
    x: i?.layout?.x || 0,
    y: i?.layout?.y || 0,
    w: i?.layout?.w || 4,
    h: i?.layout?.h || 8,
    minW: 4,
    minH: 8,
  };
};

function CubeDashboard() {
  const { cube } = useCubes();
  const { t } = useTranslation();
  const { getItems, dashboardItems } = useDashboard();
  const { isLoadingDashboard } = useDashboard();

  useEffect(() => {
    getItems();
  }, [getItems]);

  const [layout, setLayout] = useState([]);

  const onLayoutChange = (newLayout: any) => {
    setLayout(newLayout);
    console.log({ newLayout });
  };

  const dashboardItem = (item: any) => {
    return (
      <div key={item.id} data-grid={defaultLayout(item)}>
        <DashboardItemProvider key={item.id} itemId={item.id} title={item.name}>
          <CubeDashboardItem
            item={item}
            layout={layout.find((e: any) => e?.i === item?.id.toString())}
          />
        </DashboardItemProvider>
      </div>
    );
  };

  return (
    <Dimmer.Dimmable as={Segment} blurring dimmed={isLoadingDashboard} basic>
      <Dimmer active={isLoadingDashboard}>
        <Loader inline="centered" />
      </Dimmer>

      <div className={`${css({ height: '800px !important' })}`}>
        <If condition={dashboardItems?.length}>
          <Then>
            <DashboardProvider dashboardItems={dashboardItems} onLayoutChange={onLayoutChange}>
              {dashboardItems.map(dashboardItem)}
            </DashboardProvider>
          </Then>
          <Else>
            <Segment>Nenhum item added</Segment>
          </Else>
        </If>
      </div>
    </Dimmer.Dimmable>
  );
}

export default CubeDashboard;
