/* eslint-disable react/jsx-props-no-spreading */
import { useMemo, useCallback, ReactNode } from 'react';

import { css } from 'glamor';
import { lighten } from 'polished';
import { When } from 'react-if';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import {
  colors,
  display,
  flex,
  fontSizes,
  fontWeight,
  spacing,
  margin,
} from '../../utils/themeConstants';
import SvgIcon from './SvgIcon';

export interface PillProps {
  size?: string;
  color?: string;
  icon?: string | null;
  clear?: boolean;
  children?: ReactNode;
  outline?: boolean;
  button?: boolean;
  active?: boolean;
  disabled?: boolean;
  onClick?: any | undefined;
  className?: string;
  lineHeight?: string | undefined;
  to?: string | null;
  loading?: boolean;
}

export interface RestProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
}

const pillColors: Record<string, string> = {
  primary: colors.primary,
  warning: colors.warning,
  danger: colors.danger,
  success: colors.success,
  disabled: colors.grey,
  default: colors.greyDark,
  light: colors.white,
  dark: colors.greyDarkest,
  purple: colors.purpleLight,
  transparent: colors.transparent,
};

const contrastColors: Record<string, string> = {
  primary: colors.white,
  warning: colors.white,
  danger: colors.white,
  success: colors.white,
  disabled: colors.white,
  default: colors.white,
  light: colors.greyDarkest,
  dark: colors.white,
  purple: colors.white,
};

const buttonPadding: Record<string, string> = {
  xxs: `${spacing.xxs} ${spacing.s}`,
  xs: `${spacing.xs} ${spacing.m}`,
  sm: `${spacing.xs} ${spacing.m}`,
  md: `${spacing.s} ${spacing.l}`,
  lg: `${spacing.s} ${spacing.l}`,
  xl: `${spacing.s} ${spacing.l}`,
};

const iconButtonPadding: Record<string, string> = {
  xxs: `${spacing.xxs}`,
  xs: `${spacing.xs}`,
  sm: `${spacing.xs}`,
  md: `${spacing.s}`,
  lg: `${spacing.s}`,
  xl: `${spacing.s}`,
};

const iconMargin: Record<string, string> = {
  xxs: margin.rightXxs,
  xs: margin.rightXs,
  sm: margin.rightXs,
  md: margin.rightSm,
  lg: margin.rightSm,
  xl: margin.rightMd,
};

function Pill({
  size = 'sm',
  color = 'primary',
  clear = false,
  outline = false,
  button = false,
  active = false,
  disabled = false,
  className = '',
  loading = false,
  onClick,
  children = null,
  to = null,
  icon = null,
  ...rest
}: PillProps & Partial<RestProps>) {
  const getBackgroundColor = useCallback(
    (hover: boolean) => {
      const pill = pillColors[color] ?? pillColors.primary;

      if (clear) return 'transparent !important';
      if (disabled) return `${outline ? 'transparent' : pillColors.disabled} !important`;
      if (active || hover) return `${outline ? pill : lighten(0.075, pill)} !important`;
      return `${outline ? 'transparent' : pill} !important`;
    },
    [color, clear, disabled, outline, active],
  );

  const getTextColor = useCallback(
    (hover = false) => {
      const contrast = contrastColors[color] ?? contrastColors.primary;
      const pill = pillColors[color] ?? pillColors.primary;

      if (clear) return `${pill} !important`;
      if (disabled) return `${outline ? pillColors.disabled : contrastColors.disabled} !important`;
      if (active || hover) return `${contrast} !important`;
      return `${outline ? pill : contrast} !important`;
    },
    [active, disabled, outline, color, clear],
  );

  const getBorderStyle = useCallback(
    (hover: boolean) => {
      const pill = pillColors[color] ?? pillColors.primary;
      if (clear) return 'none !important';
      if (disabled) return `solid 1px ${pillColors.disabled} !important`;
      if (active || hover)
        return `solid 1px ${outline ? 'transparent' : lighten(0.075, pill)} !important`;
      return `solid 1px ${pill} !important`;
    },
    [active, clear, disabled, outline, color],
  );

  const cursorStyle = useMemo(() => {
    let cursor = button || !!onClick ? 'pointer' : 'default';
    if (disabled) cursor = 'not-allowed';
    return `${cursor} !important`;
  }, [button, disabled, onClick]);

  const stylePill = useMemo(() => {
    let padding;
    if (children) {
      padding = `${buttonPadding[size]} !important`;
    } else if (clear) {
      padding = `${spacing.none} !important`;
    } else {
      padding = `${iconButtonPadding[size]} !important`;
    }

    return css(
      display.inlineFlex,
      flex.alignItemsCenter,
      flex.justifyContentCenter,
      fontSizes[size],
      {
        cursor: cursorStyle,
        fontWeight: outline ? fontWeight.w400 : fontWeight.w600,
        backgroundColor: getBackgroundColor(false),
        color: getTextColor(false),
        border: getBorderStyle(false),
        borderRadius: `${spacing.xxl} !important`,
        padding,
        lineHeight: `1 !important`,
        '& svg path, & svg use': {
          fill: getTextColor(false),
        },
      },
    );
  }, [
    children,
    clear,
    size,
    cursorStyle,
    outline,
    getBackgroundColor,
    getTextColor,
    getBorderStyle,
  ]);

  const styleButton = useMemo(
    () =>
      css({
        cursor: cursorStyle,
        '&.loading svg path, &.loading svg use': {
          opacity: 0,
        },
        '&:focus': { outline: 'none !important' },
        '&:hover': {
          backgroundColor: getBackgroundColor(true),
          color: getTextColor(true),
          border: getBorderStyle(true),
          '& svg path, & svg use': {
            fill: getTextColor(true),
          },
        },
      }),
    [cursorStyle, getBackgroundColor, getTextColor, getBorderStyle],
  );

  const styleIcon = useMemo(() => css(children ? iconMargin[size] : margin.none), [children, size]);

  if (button) {
    if (to) {
      return (
        <Link
          to={to}
          className={`${stylePill} ${styleButton} ${className}`}
          onClick={!disabled ? onClick : undefined}
          {...rest}
        >
          <When condition={icon}>
            {() => (
              <SvgIcon
                className={`${styleIcon}`}
                path={icon ?? ''}
                size={size}
                color={getTextColor()}
              />
            )}
          </When>
          <When condition={!!children}>{children}</When>
        </Link>
      );
    }

    return (
      <Button
        type={rest.type || 'button'}
        className={`${stylePill} ${styleButton} ${className}${active ? ' active' : ''}${
          disabled ? ' disabled' : ''
        }`}
        onClick={!disabled ? onClick : undefined}
        loading={loading}
        {...rest}
      >
        <When condition={icon}>
          {() => (
            <SvgIcon
              className={`${styleIcon}`}
              path={icon ?? ''}
              size={size}
              color={getTextColor()}
            />
          )}
        </When>
        <When condition={!!children}>{children}</When>
      </Button>
    );
  }

  return (
    <span className={`${stylePill} ${className}`} {...rest}>
      {children}
    </span>
  );
}

export default Pill;
