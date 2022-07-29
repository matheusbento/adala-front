import { useCallback, useEffect } from 'react';

import Button from '@components/Library/Button';
import Header from '@components/Library/Header';
import IconList from '@components/Library/IconList/IconList';
import SvgIcon from '@components/Library/SvgIcon';
import Text from '@components/Library/Text';
import { useCubes } from '@hooks/Cubes';
import { css } from 'glamor';
import moment from 'moment';
import { If, Then, Else, When } from 'react-if';
import { List, Loader } from 'semantic-ui-react';

import {
  colors,
  margin,
  padding,
  styles,
  utils,
  display,
  tables,
  fontSizes,
} from 'utils/theme';

const styleCubes = css({
  '&.ui.header': {
    ...fontSizes.lg,
  },
});

const styleTitleContainer = css(display.flex, padding.sm, {
  justifyContent: 'space-between',
  '@media (max-width: 1599px)': {
    ...display.block,
  },
});

const noDataTable = css({
  ...tables.default,
});

const styleList = css(padding.topNone, margin.topNone);

const styleListItem = css(styles.pointer, padding.sm, {
  '&.active': {
    backgroundColor: `${colors.greyLightest} !important`,
  },
});

const styleButton = css(margin.rightXxs, margin.bottomXxs);

const CubesList = () => {
  const {
    loadingOverview,
    isLoadingCubes,
    cubes,
    showCube,
    setIsOpenCubeViewerModal,
    showCubeModelHandler,
  } = useCubes();

  // eslint-disable-next-line no-console
  console.log(cubes);

  return (
    <If condition={loadingOverview}>
      <Then>
        <Loader inverted />
      </Then>
      <Else>
        {cubes?.length && (
          <div className={`${styleTitleContainer}`}>
            <Header
              as="h3"
              color="primary"
              className={`${css(margin.none)} ${styleCubes}`}
            >
              {`${cubes?.length} Cubes`}
            </Header>
          </div>
        )}

        <List className={`${styleList}`}>
          {!isLoadingCubes && !cubes?.length && (
            <table className={`${noDataTable}`}>
              <tbody>
                <tr>
                  <td className="no-data" colSpan={100}>
                    No cubes found
                  </td>
                </tr>
              </tbody>
            </table>
          )}
          {cubes &&
            cubes.map((item: any, index: number) => (
              <List.Item
                key={item.id ? `cube-id-${item.id}` : `cube-index-${index}`}
                className={`${styleListItem} ${
                  showCube === item.name ? 'active' : ''
                }`}
                onClick={() => showCubeModelHandler(item.name)}
              >
                <List.Content className={`${css(utils.w100)}`}>
                  <div
                    className={`${css(display.flex, {
                      justifyContent: 'space-between',
                    })}`}
                  >
                    <Text size="xxs" color="dark" weight="regular">
                      {item?.info?.id ?? 'No ID'}
                    </Text>
                    <Text size="xs" weight="medium">
                      {item?.category ?? 'No category'}
                    </Text>
                  </div>

                  <div className={`${css(display.flex)}`}>
                    <Text
                      className={`${css(margin.bottomXs, display.flex)}`}
                      size="md"
                      color="primary"
                      weight="medium"
                      as="p"
                    >
                      {item.label}
                    </Text>
                  </div>
                  <IconList
                    className={`${css(
                      item.secondary_status ? margin.bottomXxs : margin.bottomSm
                    )}`}
                    size="xs"
                  >
                    {/* <IconList.Item
                      size="xs"
                      icon="icon-person-line"
                      label={
                        <Text size="xs" weight="bold">
                          Persona
                        </Text>
                      }
                    />
                    <IconList.Item
                      size="xs"
                      icon="icon-home"
                      label={
                        <Text size="xs" weight="bold">
                          Location
                        </Text>
                      }
                    /> */}
                    <IconList.Item
                      size="xs"
                      icon="icon-calendar-line"
                      label={
                        <div
                          className={`${css(display.flex, {
                            alignItems: 'center',
                            lineHeight: 1,
                          })}`}
                        >
                          {item.info?.min_date
                            ? moment(item.info?.min_date).format('MMM DD, YYYY')
                            : 'n/a'}
                          <When condition={item.info?.max_date}>
                            {() => (
                              <>
                                <SvgIcon
                                  className={`${css(margin.xXs)}`}
                                  path="icon-arrow-forward"
                                  size="xs"
                                  color={colors.grey}
                                />
                                {item.info?.max_date
                                  ? moment(item.info?.max_date).format(
                                      'MMM DD, YYYY'
                                    )
                                  : 'n/a'}
                              </>
                            )}
                          </When>
                        </div>
                      }
                    />
                  </IconList>
                  <div>
                    <Button
                      pill
                      className={`${styleButton}`}
                      size="xs"
                      onClick={() => setIsOpenCubeViewerModal(true)}
                      color="primary"
                      outline
                    >
                      View
                    </Button>
                  </div>
                </List.Content>
              </List.Item>
            ))}
        </List>

        {/* <Pagination
          isLoading={isLoadingCubes}
          currentPage={currentPage || 1}
          totalPages={1}
          onPageChange={getPageHandler}
          size="small"
        /> */}
      </Else>
    </If>
  );
};

export default CubesList;
