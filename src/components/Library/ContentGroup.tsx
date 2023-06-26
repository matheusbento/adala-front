/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ReactNode, useMemo } from 'react';

import { css } from 'glamor';
import { When } from 'react-if';

import {
  colors,
  fontSizes,
  fontWeight,
  margin,
  display,
  flex,
  padding,
} from 'utils/themeConstants';

const captionColors: Record<string, string> = {
  primary: colors.primary,
  warning: colors.warning,
  danger: colors.danger,
  success: colors.success,
  disabled: colors.grey,
  light: colors.white,
  dark: colors.greyDarkest,
};

const captionWeights: Record<string, string> = {
  light: fontWeight.w300,
  normal: fontWeight.w400,
  medium: fontWeight.w500,
  demiBold: fontWeight.w600,
  bold: fontWeight.w700,
};

const styleDisabled = css({ opacity: 0.5 });

interface ContentGroupProps {
  caption?: string;
  captionColor?: string;
  captionSize?: string;
  captionWeight?: string;
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
  disabled?: boolean;
  collapsed?: boolean;
  onCaptionClick?: any;
  className?: string;
  contentClassName?: string;
  children: ReactNode;
}

function ContentGroup({
  children,
  caption = undefined,
  captionColor = 'primary',
  captionSize = 'sm',
  captionWeight = 'bold',
  leftComponent = undefined,
  rightComponent = undefined,
  disabled = false,
  collapsed = true,
  onCaptionClick = undefined,
  className = '',
  contentClassName = '',
  ...rest
}: ContentGroupProps) {
  const styleCaption = useMemo(
    () =>
      css(fontSizes[captionSize], margin.none, flex.fill, {
        color: captionColors[captionColor],
        fontWeight: captionWeights[captionWeight],
        cursor: onCaptionClick ? 'pointer' : 'default',
      }),
    [captionSize, captionColor, captionWeight, onCaptionClick],
  );

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className={`${className} ${disabled ? styleDisabled : ''}`} {...rest}>
      <div className={`${css(display.flex, flex.alignItemsCenter)}`}>
        <When condition={!!leftComponent}>
          {() => <div className={`${css(padding.rightSm)}`}>{leftComponent}</div>}
        </When>
        <p className={`${styleCaption}`} onClick={onCaptionClick}>
          {caption}
        </p>
        <When condition={!!rightComponent}>
          {() => <div className={`${css(padding.leftSm)}`}>{rightComponent}</div>}
        </When>
      </div>
      <When condition={collapsed}>{() => <div className={contentClassName}>{children}</div>}</When>
    </div>
  );
}

export default ContentGroup;
