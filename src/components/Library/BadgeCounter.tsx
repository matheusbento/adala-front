import React, { useCallback, useMemo } from 'react';

import { css } from 'glamor';
import { Label } from 'semantic-ui-react';

import { colors, display, spacing } from '../../utils/theme';

const badgeSizes: Record<string, string> = {
  xxs: spacing.xxs,
  xs: spacing.xs,
  sm: spacing.s,
  md: spacing.m,
  lg: spacing.l,
  xl: spacing.xl,
  xxl: spacing.xxl,
};

interface BadgeCounterProps {
  count?: string;
  size?: string;
  color?: string;
  bgColor?: string;
  className?: string;
  verticalAlign?: string;
  onClick?: any;
}

const BadgeCounter = ({
  count = '0',
  size = 'sm',
  color = 'white',
  bgColor = 'primary',
  className = '',
  verticalAlign = 'bottom',
  onClick = null,
}: BadgeCounterProps) => {
  const styles = css({
    ...display.inlineBlock,
    fontSize: `${badgeSizes[size] || size} !important`,
    color: `${colors[color]} !important`,
    backgroundColor: `${colors[bgColor]} !important`,
    verticalAlign: `${verticalAlign} !important`,
  });

  const clickHandler = useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  return (
    <Label
      className={`${styles} ${className}`}
      circular
      key={color}
      onClick={clickHandler}
    >
      {count}
    </Label>
  );
};

export default BadgeCounter;
