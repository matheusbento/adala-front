/* eslint-disable react/jsx-props-no-spreading */
import { ReactNode } from 'react';

import { css } from 'glamor';
import {
  Button as SemanticButton,
  SemanticCOLORS,
  SemanticSIZES,
} from 'semantic-ui-react';

import { margin, padding, border, colors } from 'utils/theme';

import Pill from './Pill';

export interface ButtonProps {
  pill?: boolean;
  link?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  children?: ReactNode;
  size?: any;
  color?: any;
  id?: any;
  onClick?: any;
}

const linkCss = css(margin.none, padding.none, border.none, {
  color: `${colors.primary} !important`,
  textDecoration: 'underline !important',
  background: 'transparent !important',
  userSelect: 'text !important',
});

const Button = ({
  pill = false,
  link = false,
  className,
  ...rest
}: ButtonProps) =>
  pill ? (
    <Pill button className={className} {...rest} />
  ) : (
    <SemanticButton
      className={`${className} ${link ? linkCss : ''}`}
      {...rest}
    />
  );

export default Button;
