import { useMemo } from 'react';

import IconList from '@components/Library/IconList/IconList';
import SvgIcon from '@components/Library/SvgIcon';
import Text from '@components/Library/Text';
import { statusLabel } from '@constants/cubesConstants';
import { css } from 'glamor';
import moment from 'moment';
import { When } from 'react-if';
import { List } from 'semantic-ui-react';

import { colors, padding, margin, fontWeight, fontSizes, display } from '../../../utils/theme';

function CubeDetailsHeader({
  titleSize = 'lg',
  cube = null,
  title = null,
}: {
  titleSize?: string;
  cube?: any;
  title?: string | null;
}) {
  const styleHeader = useMemo(
    () =>
      css(
        {
          '&.header': {
            fontWeight: fontWeight.w600,
            color: `${colors.primary} !important`,
            ...fontSizes[titleSize],

            ...padding.bottomXs,
          },
        },
        display.flex,
      ),
    [titleSize],
  );

  const startDate = useMemo(
    () => cube?.metadata?.find((e: any) => e.field === 'start_date'),
    [cube],
  );

  const endDate = useMemo(() => cube?.metadata?.find((e: any) => e.field === 'end_date'), [cube]);

  return (
    <>
      <List.Header className={`${styleHeader}`}>
        <div className={`${css(display.flex)}`}>
          <Text
            className={`${css(margin.bottomXs, display.flex)}`}
            size="md"
            color="primary"
            weight="medium"
            as="p"
          >
            {title ?? cube?.name}
          </Text>
        </div>
      </List.Header>
      <IconList className={`${css(margin.bottomSm)}`} size="xs">
        <IconList.Item
          size="xs"
          icon="icon-star-line"
          label={cube?.category?.name ?? 'No category'}
        />
        <IconList.Item size="xs" icon="icon-clock" label={statusLabel[cube?.current_status]} />

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
              <When condition={startDate}>
                {() => (
                  <>
                    {startDate ? moment(startDate?.value).format('MMM DD, YYYY') : 'n/a'}

                    {endDate ? (
                      <>
                        <SvgIcon
                          className={`${css(margin.leftXxs, margin.rightXxs)}`}
                          path="icon-arrow-forward"
                          size="xs"
                          color={colors.grey}
                        />
                        {moment(endDate?.value).format('MMM DD, YYYY')}
                      </>
                    ) : (
                      ''
                    )}
                  </>
                )}
              </When>
            </div>
          }
        />
      </IconList>
    </>
  );
}

export default CubeDetailsHeader;
