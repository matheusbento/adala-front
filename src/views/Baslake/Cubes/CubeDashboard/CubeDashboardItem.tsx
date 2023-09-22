/* eslint-disable jsx-a11y/control-has-associated-label */
import { ReactNode, useMemo } from 'react';

import Segment from '@components/Library/Segment';
import api from '@helpers/api';
import { useCubes } from '@hooks/Cubes';
import { useOrganization } from '@hooks/Organization';
import { useQuery } from '@tanstack/react-query';
import { margin } from '@utils/themeConstants';
import { css } from 'glamor';
import { useTranslation } from 'react-i18next';
import { Dimmer, Loader } from 'semantic-ui-react';
import HeatMapChart from './Charts/HeatMapChart';
import LineChart from './Charts/LineChart';
import WaterFallChart from './Charts/WaterFallChart';
import CubeDashboardExploreFilterContainer from './CubeDashboardExploreFilterContainer';

function CubeDashboardItem({ item, layout }: any) {
  const { cube } = useCubes();
  const { organization } = useOrganization();
  const { t } = useTranslation();

  const filter = useMemo(() => JSON.stringify(item.filter), [item.filter]);

  const { data, isLoading } = useQuery({
    queryKey: [`dash-${item?.id}-${filter}`],
    queryFn: async () => {
      const params = new URLSearchParams(
        filter
          ? {
              ...item,
              filter,
            }
          : item,
      ).toString();
      const res = await api.get(
        `/organizations/${organization?.id}/cubes/${cube.id}/data?t=${item.id}&${params}`,
      );
      return res.data;
    },
  });

  const dashboard = useMemo(() => data?.data ?? null, [data]);
  const isLoadingDashboard = useMemo(() => isLoading ?? false, [isLoading]);

  console.log({ item });
  const components: Record<string, ReactNode> = {
    heatmap: (
      <HeatMapChart
        dataset={dashboard}
        item={item}
        loading={isLoadingDashboard}
        gridLayout={layout}
      />
    ),
    line: (
      <LineChart dataset={dashboard} item={item} loading={isLoadingDashboard} gridLayout={layout} />
    ),
    waterfall: (
      <WaterFallChart
        dataset={dashboard}
        item={item}
        loading={isLoadingDashboard}
        gridLayout={layout}
      />
    ),
  };

  return (
    <Segment basic>
      <Dimmer active={isLoadingDashboard}>
        <Loader inline="centered" />
      </Dimmer>
      <div className={`${css(margin.sm)}`}>
        <CubeDashboardExploreFilterContainer item={item} />
      </div>
      <Segment>{components[item.chart]}</Segment>
    </Segment>
  );
}

export default CubeDashboardItem;
