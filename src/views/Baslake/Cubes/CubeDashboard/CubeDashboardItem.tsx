/* eslint-disable jsx-a11y/control-has-associated-label */
import { useCallback, useEffect, useMemo, useState } from 'react';

import api from '@helpers/api';
import { useCubes } from '@hooks/Cubes';
import { useDashboard } from '@hooks/Dashboard';
import { useOrganization } from '@hooks/Organization';
import { useTranslation } from 'react-i18next';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import HeatMap from './Charts/HeatMap';

function CubeDashboardItem({ item, layout }: any) {
  const { cube } = useCubes();
  const { organization } = useOrganization();
  const { t } = useTranslation();
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);
  const [dashboard, setDashboard] = useState<any>(null);

  const { showDashboard } = useDashboard();

  const fetchDashboardHandler = useCallback(async () => {
    try {
      setIsLoadingDashboard(true);
      const response = await api.get(
        `/organizations/${organization?.id}/cubes/${cube.id}/data?t=${item.id}`,
        {
          params: item,
        },
      );
      setDashboard(response?.data?.data);
    } catch (e) {
      setDashboard(null);
      // [todo]
      // toaster(
      //   dispatch,
      //   'Error while trying to load the departmentSources',
      //   'error'
      // );
    } finally {
      setIsLoadingDashboard(false);
    }
  }, [cube.id, item, organization?.id]);

  useEffect(() => {
    if (showDashboard) {
      fetchDashboardHandler();
    }
  }, [fetchDashboardHandler, item, showDashboard]);

  const components = useMemo(
    () => ({
      heatmap: <HeatMap dataset={dashboard} loading={isLoadingDashboard} gridLayout={layout} />,
    }),
    [dashboard, isLoadingDashboard, layout],
  );

  return (
    <Dimmer.Dimmable as={Segment} blurring dimmed={isLoadingDashboard} basic>
      <Dimmer active={isLoadingDashboard}>
        <Loader inline="centered" />
      </Dimmer>
      {components[item.chart]}
    </Dimmer.Dimmable>
  );
}

export default CubeDashboardItem;
