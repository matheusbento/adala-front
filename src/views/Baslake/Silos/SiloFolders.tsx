import { useCallback, useEffect, useState } from 'react';

import Segment from '@components/Library/Segment';
import SvgIcon from '@components/Library/SvgIcon';
import { useFilter } from '@hooks/Filter';
import { useSilo } from '@hooks/Silos';
import { buttons, colors, display, padding } from '@utils/theme';
import { flex } from '@utils/themeConstants';
import BaslakePageTitle from '@views/Layout/BaslakePageTitle';
import { css } from 'glamor';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

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
  const { showSilo, isLoadingSilos } = useSilo();
  const { t } = useTranslation();

  console.log({ showSilo });

  const appliedFilters = getAppliedFiltersByContext();

  const handleShowSilo = useCallback((siloId: number | string | null) => {
    // if (siloId) {
    //   showSiloModelHandler(siloId);
    // }
  }, []);

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
            <button
              className={`${styleCloseButton}`}
              type="button"
              onClick={() => handleShowSilo(null)}
            >
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
