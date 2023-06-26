import { ReactNode } from 'react';

import { css } from 'glamor';

import { colors, margin, display, fontSizes, fontWeight, spacing } from '../../utils/theme';

const colorsLabel: any = {
  default: colors.greyDark,
  error: colors.red,
};

const styleDefault = {
  ...fontSizes.xxs,
  ...display.block,
  ...margin.bottomNone,
  fontWeight: fontWeight.w500,
  lineHeight: spacing.md,
};

export interface TextProps {
  color?: string;
  required?: boolean;
  children: ReactNode;
  htmlFor?: string | undefined;
}

function FormLabel({ color = 'default', children, required, ...childProps }: TextProps) {
  const styleLabel = css(styleDefault, {
    color: `${colorsLabel[color]} !important`,
  });

  return (
    <label className={`${styleLabel}`} {...childProps}>
      {children} {required && '*'}
    </label>
  );
}

export default FormLabel;
