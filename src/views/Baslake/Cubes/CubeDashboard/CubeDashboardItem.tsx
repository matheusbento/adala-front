/* eslint-disable jsx-a11y/control-has-associated-label */
import { ReactNode, useMemo, useState } from 'react';

import Segment from '@components/Library/Segment';
import api from '@helpers/api';
import { useCubes } from '@hooks/Cubes';
import { useOrganization } from '@hooks/Organization';
import { useQuery } from '@tanstack/react-query';
import { margin } from '@utils/themeConstants';
import { css } from 'glamor';
import { useTranslation } from 'react-i18next';
import { Else, If, Then } from 'react-if';
import { Dimmer, Loader } from 'semantic-ui-react';
import HeatMapChart from './Charts/HeatMapChart';
import LineChart from './Charts/LineChart';
import WaterFallChart from './Charts/WaterFallChart';
import CubeDashboardExploreFilterContainer from './CubeDashboardExploreFilterContainer';

const styleSVG = css({
  '&': {
    height: 'auto',
    weight: '100%',
  },
  '& svg': {
    width: '100%',
    height: '100%',
  },
});

function CubeDashboardItem({ item, layout }: any) {
  const { cube } = useCubes();
  const { currentOrganization } = useOrganization();
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
        `/organizations/${currentOrganization?.id}/cubes/${cube.id}/data?${params}`,
        { timeout: 600000 },
      );

      const contentType = res.headers['x-file-type'];
      if (res.data) {
        if (contentType === 'image/svg+xml') {
          return { mime: contentType, json: res.data };
        }
        // console.log({res: res.data})
        return { mime: contentType, json: JSON.parse(res.data) };
      }
      return {};
    },
    staleTime: 600000,
    cacheTime: 600000,
  });

  const dashboard = useMemo(() => data?.json.data ?? null, [data]);
  const isLoadingDashboard = useMemo(() => isLoading ?? false, [isLoading]);

  console.log({ item, data });
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
      <Segment>
        <If condition={data?.mime === 'application/json'}>
          <Then>{components[item.chart]}</Then>
          <Else>
            <div dangerouslySetInnerHTML={{ __html: data?.json }} className={`${styleSVG}`} />
          </Else>
        </If>
      </Segment>
    </Segment>
  );
}

export default CubeDashboardItem;
