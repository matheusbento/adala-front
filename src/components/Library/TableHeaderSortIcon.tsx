import { css } from 'glamor';
import { Loader } from 'semantic-ui-react';

import { colors, display, margin } from '../../utils/theme';
import SvgIcon from './SvgIcon';

const icons: Record<string, string> = {
  asc: 'icon-arrow-up',
  desc: 'icon-arrow-down',
};

export interface TableHeaderSortIconProps {
  isActive: boolean;
  direction: string;
  activeColor?: string;
  inactiveColor?: string;
  className?: string;
  isLoading?: boolean;
}

const TableHeaderSortIcon = ({
  isActive,
  direction,
  activeColor = colors.primary,
  inactiveColor = colors.greyLighter,
  className = '',
  isLoading = false,
}: TableHeaderSortIconProps) => {
  const styleLoader = css(display.inlineBlock, margin.leftXxs, {
    width: '16px',
    height: '16px',
  });

  if (isLoading) {
    return (
      <div className={`${styleLoader}`}>
        <Loader active inline size="mini" />
      </div>
    );
  }

  return (
    <SvgIcon
      className={`${css(margin.leftXxs)} ${className}`}
      path={icons[isActive ? direction : 'desc']}
      size="sm"
      color={isActive ? activeColor : inactiveColor}
    />
  );
};

export default TableHeaderSortIcon;
