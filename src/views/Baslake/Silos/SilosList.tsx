import { useCallback, useState } from 'react';

import Button from '@components/Library/Button';
import Header from '@components/Library/Header';
import IconList from '@components/Library/IconList/IconList';
import ModalConfirm from '@components/Library/ModalConfirm';
import Text from '@components/Library/Text';
import { useSilo } from '@hooks/Silos';
import { css } from 'glamor';
import { useTranslation } from 'react-i18next';
import { Else, If, Then, When } from 'react-if';
import { List, Loader } from 'semantic-ui-react';

import { SiloType } from 'types/SiloType';

import { colors, display, fontSizes, margin, padding, styles, tables, utils } from 'utils/theme';

const styleSilos = css({
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

function SilosList() {
  const [confirmDeleteSilo, setConfirmDeleteSilo] = useState<null | number>(null);
  const { isLoadingSilos, silos, showSilo, fetchSiloHandler, deleteSiloFolderHandler } = useSilo();

  const { t } = useTranslation();

  const handleShowSilo = useCallback(
    (item: SiloType) => {
      fetchSiloHandler(item);
    },
    [fetchSiloHandler],
  );

  const handleConfirmDeleteFolder = useCallback(() => {
    if (confirmDeleteSilo) {
      deleteSiloFolderHandler(confirmDeleteSilo);
    }
  }, [confirmDeleteSilo, deleteSiloFolderHandler]);

  return (
    <If condition={isLoadingSilos}>
      <Then>
        <Loader inverted />
      </Then>
      <Else>
        {silos?.length && (
          <div className={`${styleTitleContainer}`}>
            <Header as="h3" color="primary" className={`${css(margin.none)} ${styleSilos}`}>
              {t('silo_amount', { count: silos?.length })}
            </Header>
          </div>
        )}

        <List className={`${styleList}`}>
          {!isLoadingSilos && !silos?.length && (
            <table className={`${noDataTable}`}>
              <tbody>
                <tr>
                  <td className="no-data" colSpan={100}>
                    {t('No silos found')}
                  </td>
                </tr>
              </tbody>
            </table>
          )}
          {silos &&
            silos.map((item: any, index: number) => (
              <List.Item
                key={item.id ? `silo-id-${item.id}` : `silo-index-${index}`}
                className={`${styleListItem} ${showSilo?.id === item.id ? 'active' : ''}`}
                onClick={() => handleShowSilo(item)}
              >
                <List.Content className={`${css(utils.w100)}`}>
                  <div className={`${css(display.flex)}`}>
                    <Text
                      className={`${css(margin.bottomXs, display.flex)}`}
                      size="md"
                      color="primary"
                      weight="medium"
                      as="p"
                    >
                      {item.name}
                    </Text>
                  </div>
                  <IconList
                    className={`${css(item.secondary_status ? margin.bottomXxs : margin.bottomSm)}`}
                    size="xs"
                  >
                    <When condition={item?.category}>
                      <IconList.Item
                        size="xs"
                        icon="icon-info"
                        textAlign="left"
                        label={
                          <Text size="xs" weight="bold">
                            {item?.category?.name}
                          </Text>
                        }
                      />
                    </When>
                    <IconList.Item
                      size="xs"
                      icon="icon-forward"
                      textAlign="left"
                      label={
                        <Text size="xs" weight="bold">
                          {t('Is Dataflow:')} {item.is_dataflow ? 'Yes' : 'No'}
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
                  </IconList>
                  <div>
                    <Button
                      pill
                      className={`${styleButton}`}
                      size="xs"
                      // onClick={() => setIsOpenSiloViewerModal(true)}
                      color="primary"
                      outline
                      icon="icon-edit-line"
                    >
                      {t('Edit')}
                    </Button>
                    <Button
                      pill
                      className={`${styleButton}`}
                      size="xs"
                      icon="icon-trash-line"
                      onClick={() => setConfirmDeleteSilo(item.id)}
                      color="disabled"
                      outline
                    >
                      {t('Remove')}
                    </Button>
                  </div>
                </List.Content>
              </List.Item>
            ))}
        </List>
        <ModalConfirm
          open={!!confirmDeleteSilo}
          header="Delete Silo"
          confirmText="Are you sure you want to delete this silo?"
          labelConfirm="Delete"
          onConfirm={handleConfirmDeleteFolder}
          onDismiss={() => setConfirmDeleteSilo(null)}
        />

        {/* <Pagination
          isLoading={isLoadingSilos}
          currentPage={currentPage || 1}
          totalPages={1}
          onPageChange={getPageHandler}
          size="small"
        /> */}
      </Else>
    </If>
  );
}

export default SilosList;
