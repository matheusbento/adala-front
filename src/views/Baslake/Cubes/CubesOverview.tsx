import { useCallback, useEffect, useState } from 'react';

import Segment from '@components/Library/Segment';
import SvgIcon from '@components/Library/SvgIcon';
import { useCubes } from '@hooks/Cubes';
import { useFilter } from '@hooks/Filter';
import { padding, display, colors, buttons } from '@utils/theme';
import { flex } from '@utils/themeConstants';
import BaslakePageTitle from '@views/Layout/BaslakePageTitle';
import { css } from 'glamor';
import { useTranslation } from 'react-i18next';
import { When } from 'react-if';
import { useLocation } from 'react-router-dom';

import CubesDetailsContainer from './CubesDetailsContainer';
import CubesListContainer from './CubesListContainer';
import CubeViewerModalContainer from './CubeViewerModalContainer';
import '@translations/i18n';

// import CubesDetailsContainer from './CubesDetailsContainer';
// import CubesFilters from './CubesFilters';
// import CubesListContainer from './CubesListContainer';

const styleCubesHeader = css(padding.bottomXs, {
  borderBottom: `solid 1px ${colors.greyLight} !important`,
});

const styleSegment = css(
  display.flex,
  flex.alignItemsCenter,
  padding.topNone,
  padding.bottomXs,
  {
    borderBottom: `solid 1px ${colors.greyLight} !important`,
  }
);

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

const CubesOverview = ({ context }: { context: string }) => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const { search, state }: any = useLocation();

  const { getAppliedFiltersByContext } = useFilter();
  const { loadingOverview, showCube, cubeModel, cube, showCubeModelHandler } =
    useCubes();
  const { t } = useTranslation();

  const appliedFilters = getAppliedFiltersByContext();

  const handleShowCube = useCallback(
    (cubeId: number | string | null) => {
      if (cubeId) {
        showCubeModelHandler(cubeId);
      }
    },
    [showCubeModelHandler]
  );

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
          {/* <CubesFilters context={context} /> */}
        </div>
      )}
      <div className={`${styleDetails}`}>
        {!showCube && (
          <>
            <Segment className={`${styleSegment}`}>
              <BaslakePageTitle
                icon="icon-swap"
                clickIconHandler={toggleVisibleHandler}
                clickIconActive={appliedFilters.length > 0}
                visible={filtersVisible}
              >
                {t('Cubes Summary')}
              </BaslakePageTitle>
            </Segment>

            {/* <CubesSummary
              summary={summary}
              loadingOverview={loadingOverview}
              card="cubes"
              stats={['cubes', 'tasks', 'filled', 'estimated']}
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
        {showCube && (
          <>
            <button
              className={`${styleCloseButton}`}
              type="button"
              onClick={() => handleShowCube(null)}
            >
              <SvgIcon path="icon-close" size="lg" color={colors.greyDark} />
            </button>
            <Segment className={`${styleSegment} ${styleCubesHeader}`}>
              <BaslakePageTitle
                icon="icon-swap"
                clickIconHandler={toggleVisibleHandler}
                clickIconActive={appliedFilters.length > 0}
                visible={filtersVisible}
              >
                {t(`Cube {{cube.name}}`, { cube })}
              </BaslakePageTitle>
            </Segment>
            <CubesDetailsContainer />
          </>
        )}
      </div>
      {!loadingOverview && (
        <div className={`${styleList}`}>
          <CubesListContainer />
        </div>
      )}
      <When condition={!!cubeModel}>
        <CubeViewerModalContainer />
      </When>
    </div>
  );
};

export default CubesOverview;
