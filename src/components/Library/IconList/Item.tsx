/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ReactNode, useMemo } from 'react';

import { css } from 'glamor';

import TypeOf from '../../../constants/typeOfConstants';
import { colors, fontSizes, display, spacing, margin } from '../../../utils/theme';
import SvgIcon from '../SvgIcon';

/*
  We need this fix because 'sm' font is 1rem; Should be 'md'
  Keep this comment until we fix this.
*/

const sizes: any = {
  xxs: 'xs',
  xs: 'sm',
  sm: 'md',
  md: 'lg',
  lg: 'xl',
  xl: 'xxl',
};

const marginBottoms: any = {
  xs: spacing.none,
  sm: spacing.none,
  md: spacing.none,
  lg: spacing.xs,
  xl: spacing.s,
};

export interface ItemProps {
  size?: string;
  className?: string;
  icon?: string;
  label?: string | ReactNode;
  color?: string;
  children?: ReactNode;
  textAlign?: string;
}

function Item({
  icon,
  label,
  size = 'sm',
  color = 'greyIcon',
  textAlign = 'center',
  className,
  children,
}: ItemProps) {
  const styleTab = useMemo(
    () =>
      css({
        ...fontSizes[size],
        listStyle: 'none',
        '&:not(:last-child)': {
          marginBottom: marginBottoms[size],
        },
      }),
    [size],
  );

  return (
    <li className={`${styleTab} ${className}`}>
      <div className={`${css(display.flex)}`}>
        {!!icon && (
          <SvgIcon
            className={label || children ? `${css(margin.rightXs)}` : undefined}
            path={icon}
            color={colors[color]}
            size={sizes[size]}
          />
        )}

        {!!label && typeof label === TypeOf.string && (
          <div className={`${css({ textAlign })}`}>{label}</div>
        )}
        {!!label && typeof label !== TypeOf.string && <div>{label}</div>}
        {!!children && children}
      </div>
    </li>
  );
}

export default Item;
