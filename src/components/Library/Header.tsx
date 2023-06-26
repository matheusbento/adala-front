import { ReactNode } from 'react';

import { css } from 'glamor';
import { Header as SemanticHeader } from 'semantic-ui-react';

import { colors, spacing } from '../../utils/theme';

function Header({
  children,
  color = 'default',
  hexColor = null,
  className = '',
  line = false,
  lineMargin = `${spacing.l} 0 ${spacing.xl} 0`,
  weight = '500',
  ...childProps
}: {
  as?: string;
  children: ReactNode;
  color?: string;
  hexColor?: string | null;
  className?: string;
  line?: boolean;
  lineMargin?: string;
  weight?: string;
}) {
  const styleLegend = css({
    fontWeight: `${weight} !important`,
    color: `${colors[color]} !important`,
  });

  const styleColor = css(
    hexColor
      ? {
          color: `${hexColor} !important`,
        }
      : {},
  );

  const styleLine = line
    ? css({
        borderBottom: `1px solid ${colors[color]} !important`,
        lineHeight: '0.1em !important',
        margin: `${lineMargin} !important`,
        '> span': {
          background: colors.negative,
          paddingRight: spacing.xs,
        },
      })
    : css({});

  return (
    <SemanticHeader
      className={`${css(styleLegend, styleLine, styleColor)} ${className}`}
      {...childProps}
    >
      <span>{children}</span>
    </SemanticHeader>
  );
}
export default Header;
