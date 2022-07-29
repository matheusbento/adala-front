import { useMemo } from 'react';

import IconList from '@components/Library/IconList/IconList';
import SvgIcon from '@components/Library/SvgIcon';
import Text from '@components/Library/Text';
import { css } from 'glamor';
import moment from 'moment';
import { When } from 'react-if';
import { List } from 'semantic-ui-react';

import {
  colors,
  padding,
  margin,
  fontWeight,
  fontSizes,
  display,
} from '../../../utils/theme';

const CubeDetailsHeader = ({
  titleSize = 'lg',
  cube = null,
}: {
  titleSize?: string;
  cube?: any;
}) => {
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
        display.flex
      ),
    [titleSize]
  );

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
            {cube.label}
          </Text>
        </div>
      </List.Header>
      <IconList className={`${css(margin.bottomSm)}`} size="xs">
        <IconList.Item
          size="xs"
          icon="icon-star-line"
          label={cube?.category ?? 'No category'}
        />

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
              <When condition={cube?.info?.min_date}>
                {() => (
                  <>
                    {cube?.info?.min_date
                      ? moment(cube?.info?.min_date).format('MMM DD, YYYY')
                      : 'n/a'}

                    {cube?.info?.max_date ? (
                      <>
                        <SvgIcon
                          className={`${css(margin.leftXxs, margin.rightXxs)}`}
                          path="icon-arrow-forward"
                          size="xs"
                          color={colors.grey}
                        />
                        {moment(cube?.info?.max_date).format('MMM DD, YYYY')}
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
};

export default CubeDetailsHeader;
