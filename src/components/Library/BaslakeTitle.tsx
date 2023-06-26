import { useMemo } from 'react';

import { css } from 'glamor';
import { Menu } from 'semantic-ui-react';

import { colors, margin, fontWeight, fontSizes } from '../../utils/theme';

const styleTitle = css({ flexShrink: '1 !important' });

export interface BaslakeTitleProps {
  title?: string | null;
  children?: any;
  color?: string;
  height?: string | null;
  className?: string;
}

function BaslakeTitle({
  title = null,
  children = '',
  color = colors.greyDarkest,
  height = null,
  className = '',
}: BaslakeTitleProps) {
  const styleMenu = useMemo(
    () =>
      css({
        boxShadow: '0 0 1px 0 rgba(48,49,51,0.05), 0 1px 3px 0 rgba(48,49,51,0.1) !important',
        border: 'none !important',
        height: height || null,
      }),
    [height],
  );

  const styleHeader = useMemo(
    () =>
      css(margin.yNone, fontSizes.lg, {
        fontWeight: fontWeight.w600,
        color,
      }),
    [color],
  );

  return (
    <Menu borderless attached stackable className={`${styleMenu} ${className}`}>
      {!!title && (
        <Menu.Item className={`${styleTitle}`}>
          <h1 className={`${styleHeader}`}>{title}</h1>
        </Menu.Item>
      )}
      {children}
    </Menu>
  );
}

export default BaslakeTitle;
