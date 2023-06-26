import { ReactNode, useMemo } from 'react';

import { css } from 'glamor';
import { If, Then, Else } from 'react-if';

import { colors, fontSizes, fontWeight, buttons } from '../../utils/theme';

export const textColors: any = {
  primary: colors.primary,
  warning: colors.warning,
  danger: colors.danger,
  success: colors.success,
  white: colors.white,
  lighter: colors.greyLighter,
  light: colors.greyLight,
  disabled: colors.grey,
  dark: colors.greyDark,
  darker: colors.greyDarkest,
  black: colors.black,
};

const textWeights: any = {
  light: fontWeight.w300,
  regular: fontWeight.w400,
  medium: fontWeight.w500,
  demiBold: fontWeight.w600,
  bold: fontWeight.w700,
};

export interface TextProps {
  as?: keyof JSX.IntrinsicElements;
  size?: string;
  color?: string;
  weight?: string;
  hoverTitle?: string;
  className?: string;
  onClick?: any;
  disabled?: boolean;
  children: ReactNode;
}

function Text({
  as = 'span',
  size = 'sm',
  color = 'darker',
  weight = 'regular',
  hoverTitle,
  className,
  onClick = () => {},
  disabled,
  children,
}: TextProps) {
  const Component = as;

  const styleText = useMemo(
    () =>
      css(fontSizes[size], {
        color: `${textColors[color]} !important`,
        fontWeight: textWeights[weight],
      }),
    [size, color, weight],
  );

  return (
    <Component className={`${styleText} ${className}`} title={hoverTitle}>
      <If condition={!!onClick}>
        <Then>
          {() => (
            <button
              className={`${styleText} ${css(buttons.plain)}`}
              type="button"
              onClick={onClick}
              disabled={disabled}
            >
              {children}
            </button>
          )}
        </Then>
        <Else>{children}</Else>
      </If>
    </Component>
  );
}

export default Text;
