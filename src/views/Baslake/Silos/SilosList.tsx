import { useCallback, useEffect } from 'react';

import Button from '@components/Library/Button';
import Header from '@components/Library/Header';
import IconList from '@components/Library/IconList/IconList';
import SvgIcon from '@components/Library/SvgIcon';
import Text from '@components/Library/Text';
import { useSilos } from '@hooks/Silos';
import { css } from 'glamor';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { If, Then, Else, When } from 'react-if';
import { List, Loader } from 'semantic-ui-react';

import { SiloType } from 'types/SiloType';

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

const SilosList = () => {
  const { isLoadingSilos, silos, showSilo, fetchSiloHandler } = useSilos();

  const { t } = useTranslation();

  // eslint-disable-next-line no-console
  console.log(silos, showSilo);

  const handleShowSilo = useCallback((item: SiloType) => {
    fetchSiloHandler(item);
  }, []);

  return (
    <If condition={isLoadingSilos}>
      <Then>
        <Loader inverted />
      </Then>
      <Else>
        {silos?.length && (
          <div className={`${styleTitleContainer}`}>
            <Header
              as="h3"
              color="primary"
              className={`${css(margin.none)} ${styleSilos}`}
            >
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
                className={`${styleListItem} ${
                  showSilo?.id === item.id ? 'active' : ''
                }`}
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
                    className={`${css(
                      item.secondary_status ? margin.bottomXxs : margin.bottomSm
                    )}`}
                    size="xs"
                  >
                    {/* <IconList.Item
                      size="xs"
                      icon="icon-folder"
                      textAlign="left"
                      label={
                        <Text size="xs" weight="bold">
                          {item.name}
                        </Text>
                      }
                    /> */}
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
                    >
                      {t('Edit')}
                    </Button>
                  </div>
                </List.Content>
              </List.Item>
            ))}
        </List>

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
};

export default SilosList;
