/* eslint-disable react/jsx-props-no-spreading */
import { ReactNode } from 'react';

import { margin, padding, border, colors } from '@utils/theme';
import { css } from 'glamor';
import { Button as SemanticButton, SemanticFLOATS } from 'semantic-ui-react';

import Pill from './Pill';

export interface IButtonProps {
  pill?: boolean;
  link?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  children?: ReactNode;
  size?: any;
  color?: any;
  id?: any;
  circular?: boolean;
  icon?: any;
  onClick?: any;
  basic?: boolean;
  outline?: boolean;
  disabled?: boolean;
  fluid?: boolean;
  floated?: SemanticFLOATS;
  loading?: boolean;
}

const linkCss = css(margin.none, padding.none, border.none, {
  color: `${colors.primary} !important`,
  textDecoration: 'underline !important',
  background: 'transparent !important',
  userSelect: 'text !important',
});

function Button({ pill = false, link = false, className, ...rest }: IButtonProps) {
  return pill ? (
    <Pill button className={className} {...rest} />
  ) : (
    <SemanticButton className={`${className} ${link ? linkCss : ''}`} {...rest} />
  );
}

export default Button;
