import { useCallback, useState } from 'react';

import Button from '@components/Library/Button';
import Header from '@components/Library/Header';
import IconList from '@components/Library/IconList/IconList';
import ModalConfirm from '@components/Library/ModalConfirm';
import SvgIcon from '@components/Library/SvgIcon';
import Text from '@components/Library/Text';
import TextEllipsis from '@components/Library/TextEllipsis';
import { statusLabel } from '@constants/cubesConstants';
import { useCubes } from '@hooks/Cubes';
import { css } from 'glamor';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { If, Then, Else, When } from 'react-if';
import { List, Loader } from 'semantic-ui-react';

import { CubeType } from 'types/CubeType';

import { colors, margin, padding, styles, utils, display, tables, fontSizes } from 'utils/theme';

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

function CubesList() {
  const {
    loadingOverview,
    isLoadingCubes,
    cubes,
    showCube,
    setIsOpenCubeViewerModal,
    fetchCubeHandler,
    deleteCubeHandler,
  } = useCubes();

  const [confirmDelete, setConfirmDelete] = useState<null | number>(null);

  const { t } = useTranslation();

  const handleShowCube = useCallback(
    (item: CubeType) => {
      fetchCubeHandler(item.id);
    },
    [fetchCubeHandler],
  );

  const handleConfirmDeleteFolder = useCallback(() => {
    if (confirmDelete) {
      deleteCubeHandler(confirmDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete, deleteCubeHandler]);

  return (
    <If condition={isLoadingCubes || loadingOverview}>
      <Then>{() => <Loader />}</Then>
      <Else>
        {() => (
          <>
            {cubes?.length && (
              <div className={`${styleTitleContainer}`}>
                <Header as="h3" color="primary" className={`${css(margin.none)} ${styleCubes}`}>
                  {t('cube_amount', { count: cubes?.length })}
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
                cubes.map((item: any, index: number) => {
                  const startDate = item?.metadata?.find((e: any) => e.field === 'start_date');

                  const endDate = item?.metadata?.find((e: any) => e.field === 'end_date');

                  return (
                    <List.Item
                      key={item.id ? `cube-id-${item.id}` : `cube-index-${index}`}
                      className={`${styleListItem} ${showCube === item.id ? 'active' : ''}`}
                      onClick={() => handleShowCube(item)}
                    >
                      <List.Content className={`${css(utils.w100)}`}>
                        <div
                          className={`${css(display.flex, {
                            justifyContent: 'space-between',
                          })}`}
                        >
                          <Text size="xxs" color="dark" weight="regular">
                            {item?.id ?? 'No ID'}
                          </Text>
                          <Text size="xs" weight="medium">
                            {item?.category?.name ?? 'No category'}
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
                            item.secondary_status ? margin.bottomXxs : margin.bottomSm,
                          )}`}
                          size="xs"
                        >
                          <IconList.Item
                            size="xs"
                            icon="icon-cube"
                            label={
                              <Text size="xs" weight="bold">
                                {item.name}
                              </Text>
                            }
                          />
                          <IconList.Item
                            size="xs"
                            icon="icon-clock"
                            label={
                              <Text size="xs" weight="bold">
                                {t(statusLabel[item?.current_status])}
                              </Text>
                            }
                          />
                          <IconList.Item
                            size="xs"
                            icon="icon-book"
                            textAlign="left"
                            label={
                              <Text size="xs" weight="bold">
                                {item.description}
                              </Text>
                            }
                          />
                          <When condition={item.is_dataflow}>
                            <IconList.Item
                              size="xs"
                              icon="icon-sync"
                              textAlign="left"
                              label={<TextEllipsis>{item.description}</TextEllipsis>}
                            />
                          </When>
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
                                {startDate?.value
                                  ? moment(startDate?.value).format('MMM DD, YYYY')
                                  : 'n/a'}
                                <When condition={endDate?.value}>
                                  {() => (
                                    <>
                                      <SvgIcon
                                        className={`${css(margin.xXs)}`}
                                        path="icon-arrow-forward"
                                        size="xs"
                                        color={colors.grey}
                                      />
                                      {endDate?.value
                                        ? moment(endDate?.value).format('MMM DD, YYYY')
                                        : 'n/a'}
                                    </>
                                  )}
                                </When>
                              </div>
                            }
                          />
                        </IconList>
                        <div>
                          {/* <Button
                          pill
                          className={`${styleButton}`}
                          size="xs"
                          onClick={() => setIsOpenCubeViewerModal(true)}
                          color="primary"
                          outline
                        >
                          {t('Data visualize')}
                        </Button> */}
                          <Button
                            pill
                            className={`${styleButton}`}
                            size="xs"
                            onClick={() => setConfirmDelete(item.id)}
                            color="disabled"
                            outline
                          >
                            {t('Delete')}
                          </Button>
                        </div>
                      </List.Content>
                    </List.Item>
                  );
                })}
            </List>

            <ModalConfirm
              open={!!confirmDelete}
              header="Delete Silo"
              confirmText="Are you sure you want to delete this silo?"
              labelConfirm="Delete"
              onConfirm={handleConfirmDeleteFolder}
              onDismiss={() => setConfirmDelete(null)}
            />
          </>
        )}

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
}

export default CubesList;
