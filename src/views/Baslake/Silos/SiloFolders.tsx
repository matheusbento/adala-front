import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Segment from '@components/Library/Segment';
import SvgIcon from '@components/Library/SvgIcon';
import Text from '@components/Library/Text';
import { useFilter } from '@hooks/Filter';
import { useSilo } from '@hooks/Silos';
import { buttons, colors, display, padding } from '@utils/theme';
import { flex, margin } from '@utils/themeConstants';
import BaslakePageTitle from '@views/Layout/BaslakePageTitle';
import { css } from 'glamor';
import GaugeChart from 'react-gauge-chart';
import { useTranslation } from 'react-i18next';
import Plot from 'react-plotly.js';
import { useLocation } from 'react-router-dom';
import { Grid, Loader } from 'semantic-ui-react';
import SiloDetailsContainer from './SiloDetailsContainer';
import SilosListContainer from './SilosListContainer';
// import SiloViewerModalContainer from './SiloViewerModalContainer';
import '@translations/i18n';

// import SiloDetailsContainer from './SiloDetailsContainer';
// import SilosFilters from './SilosFilters';
// import SilosListContainer from './SilosListContainer';

const styleSilosHeader = css(padding.bottomXs, {
  borderBottom: `solid 1px ${colors.greyLight} !important`,
});

const styleSegment = css(display.flex, flex.alignItemsCenter, padding.topNone, padding.bottomXs, {
  borderBottom: `solid 1px ${colors.greyLight} !important`,
});

const styleScroll = {
  height: 'calc(100vh - 154px)',
  overflowY: 'auto',
};

const styleRow = css(display.flex);

const styleFilters = css(padding.xSm, padding.bottomMd, {
  ...styleScroll,
  width: '275px',
  minWidth: '275px',
  borderRight: `solid 1px ${colors.greyLighter}`,
});

const styleDetails = css(padding.md, {
  ...styleScroll,
  flexGrow: 1,
});

const styleCloseButton = css(buttons.plain, {
  float: 'right',
});

function SilosOverview({ context }: { context: string }) {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const { search, state }: any = useLocation();

  const { getAppliedFiltersByContext } = useFilter();
  const {
    showSilo,
    isLoadingSilos,
    clearSilo,
    fetchSiloSummaryHandler,
    isLoadingSiloFolderSummary,
    siloFolderSummary,
  } = useSilo();
  const { t } = useTranslation();

  useEffect(() => {
    fetchSiloSummaryHandler();
  }, [fetchSiloSummaryHandler]);

  const appliedFilters = getAppliedFiltersByContext();

  const toggleVisibleHandler = useCallback(() => {
    setFiltersVisible(!filtersVisible);
  }, [filtersVisible]);

  useEffect(() => {
    if (search?.length > 0) setFiltersVisible(true);
  }, [search]);

  useEffect(() => {
    setFiltersVisible((prev) => (prev ? !state?.closeFilters : prev));
  }, [state?.closeFilters]);

  const styleList = css(padding.bottomMd, {
    ...styleScroll,
    width: '500px',
    minWidth: '500px',
    borderLeft: `solid 1px ${colors.greyLighter}`,
    '@media (max-width: 1599px)': {
      width: '360px',
      minWidth: '360px',
    },
    '@media (max-width: 1199px)': {
      width: filtersVisible ? '290px' : '360px',
      minWidth: filtersVisible ? '290px' : '360px',
    },
  });

  const healthData = useMemo(
    () =>
      siloFolderSummary?.files_size_by_date.map((e: any) => ({
        ...e,
        type: 'bar',
      })),
    [siloFolderSummary?.files_size_by_date],
  );

  const sizeData = useMemo(
    () => [
      {
        x: siloFolderSummary?.files_size_by_silo?.x,
        y: siloFolderSummary?.files_size_by_silo?.y,
        type: 'bar',
        marker: { color: 'blue' },
      },
    ],
    [siloFolderSummary?.files_size_by_silo?.x, siloFolderSummary?.files_size_by_silo?.y],
  );

  const usageData = useMemo(
    () => [
      {
        x: siloFolderSummary?.view_per_silo?.x,
        y: siloFolderSummary?.view_per_silo?.y,
        type: 'bar',
        marker: { color: 'cian' },
      },
    ],
    [siloFolderSummary?.view_per_silo?.x, siloFolderSummary?.view_per_silo?.y],
  );

  const healthChartRef = useRef(null);
  const sizeChartRef = useRef(null);

  const layout = {
    autosize: true, // Defina autosize como true para tornar o gráfico responsivo
  };

  return (
    <div className={`${styleRow}`}>
      {filtersVisible && (
        <div className={`${styleFilters}`}>
          {t('Filters')}
          {/* <SilosFilters context={context} /> */}
        </div>
      )}
      <div className={`${styleDetails}`}>
        {!showSilo && (
          <>
            <Loader active={isLoadingSiloFolderSummary} />
            <Segment className={`${styleSegment}`}>
              <BaslakePageTitle
                icon="icon-swap"
                clickIconHandler={toggleVisibleHandler}
                clickIconActive={appliedFilters.length > 0}
                visible={filtersVisible}
              >
                {t('Silos Summary')}
              </BaslakePageTitle>
            </Segment>
            <Segment>
              <Grid className={`${css(margin.topSm)}`}>
                <Grid.Row>
                  <Grid.Column width={5}>
                    <Segment box>
                      <Text weight="bold" as="p" className={`${css({ textAlign: 'center' })}`}>
                        {t('Percent of Silos Utilization In Storage')}
                      </Text>
                      <GaugeChart
                        animate
                        // arcsLength={[0.3, 0.5, 0.2]}
                        percent={(siloFolderSummary?.disk_percent_in_use ?? 0.1) / 100}
                        textColor="#000"
                      />
                    </Segment>
                    <div className={`${css(margin.topSm)}`}>
                      <Segment box>
                        <Text weight="bold" as="p" className={`${css({ textAlign: 'center' })}`}>
                          {t('Percent of Organization Users Viewing Silos')}
                        </Text>
                        <GaugeChart
                          animate
                          // arcsLength={[0.3, 0.5, 0.2]}
                          percent={(siloFolderSummary?.users_percent_in_use ?? 0.1) / 100}
                          textColor="#000"
                        />
                      </Segment>
                    </div>
                  </Grid.Column>
                  <Grid.Column width={11}>
                    <Segment box>
                      <Text weight="bold" as="p" className={`${css({ textAlign: 'center' })}`}>
                        {t('Views per Silo')}
                      </Text>
                      <Plot
                        ref={healthChartRef}
                        data={usageData}
                        layout={{ ...layout }}
                        // config={{ responsive: true }}
                        style={{ width: '100%', height: '370px' }}
                      />
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <div className={`${css(margin.topSm, margin.bottomSm, { width: '100%' })}`}>
                    <Segment box>
                      <Text weight="bold" as="p" className={`${css({ textAlign: 'center' })}`}>
                        {t('Data Size per Silo')}
                      </Text>
                      <Plot
                        ref={sizeChartRef}
                        data={sizeData}
                        layout={layout}
                        // config={{ responsive: true }}
                        style={{ width: '100%', height: '100%' }}
                      />
                    </Segment>
                  </div>
                </Grid.Row>
                <Grid.Row>
                  <div className={`${css(margin.topSm, margin.bottomSm, { width: '100%' })}`}>
                    <Segment box>
                      <Text weight="bold" as="p" className={`${css({ textAlign: 'center' })}`}>
                        {t('Amount of Data Generation Per Day')}
                      </Text>
                      <Plot
                        ref={healthChartRef}
                        data={healthData}
                        layout={{ ...layout, barmode: 'stack' }}
                        // config={{ responsive: true }}
                        style={{ width: '100%', height: '100%' }}
                      />
                    </Segment>
                  </div>
                </Grid.Row>
              </Grid>
            </Segment>

            {/* <SilosSummary
              summary={summary}
              loadingOverview={loadingOverview}
              card="orders"
              stats={['orders', 'tasks', 'filled', 'estimated']}
              dataToShowDefault={
                isContextType()
                  ? 'byJobTitle'
                  : 'byDepartment'
              }
              dropdownOptions={getFilteredViewByOptions(
                dashboardSummaryOptions.order,
                isContextType()
              )}
            /> */}
          </>
        )}
        {showSilo && (
          <>
            <button className={`${styleCloseButton}`} type="button" onClick={() => clearSilo()}>
              <SvgIcon path="icon-close" size="lg" color={colors.greyDark} />
            </button>
            <Segment className={`${styleSegment} ${styleSilosHeader}`}>
              <BaslakePageTitle
                icon="icon-swap"
                clickIconHandler={toggleVisibleHandler}
                clickIconActive={appliedFilters.length > 0}
                visible={filtersVisible}
              >
                {t(`Silo {{silo.name}}`, { silo: showSilo })}
              </BaslakePageTitle>
            </Segment>
            <SiloDetailsContainer />
          </>
        )}
      </div>
      {!isLoadingSilos && (
        <div className={`${styleList}`}>
          <SilosListContainer />
        </div>
      )}
      {/* <When condition={!!siloModel}>
        <SiloViewerModalContainer />
      </When> */}
    </div>
  );
}

export default SilosOverview;
