/* eslint-disable jsx-a11y/control-has-associated-label */
import { ReactNode, useMemo } from 'react';

import Segment from '@components/Library/Segment';
import api from '@helpers/api';
import { useCubes } from '@hooks/Cubes';
import { useOrganization } from '@hooks/Organization';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Dimmer, Loader } from 'semantic-ui-react';
import HeatMap from './Charts/HeatMap';
import LineChart from './Charts/LineChart';

function CubeDashboardItem({ item, layout }: any) {
  const { cube } = useCubes();
  const { organization } = useOrganization();
  const { t } = useTranslation();

  const { data, isLoading } = useQuery({
    queryKey: [`dash-${item?.id}`],
    queryFn: async () => {
      const params = new URLSearchParams(item).toString();
      const res = await api.get(
        `/organizations/${organization?.id}/cubes/${cube.id}/data?t=${item.id}&${params}`,
      );
      return res.data;
    },
  });

  const dashboard = useMemo(() => data?.data ?? null, [data]);
  const isLoadingDashboard = useMemo(() => isLoading ?? false, [isLoading]);

  const components: Record<string, ReactNode> = {
    heatmap: <HeatMap dataset={dashboard} loading={isLoadingDashboard} gridLayout={layout} />,
    line: <LineChart dataset={dashboard} loading={isLoadingDashboard} gridLayout={layout} />,
    waterfall: <LineChart dataset={dashboard} loading={isLoadingDashboard} gridLayout={layout} />,
  };

  return (
    <Segment basic>
      <Dimmer active={isLoadingDashboard}>
        <Loader inline="centered" />
      </Dimmer>
      {components[item.chart]}
    </Segment>
  );
}

export default CubeDashboardItem;
