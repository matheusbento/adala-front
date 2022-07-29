import { useMemo } from 'react';

import { css } from 'glamor';

import { buttons, hovers, fontWeight, display, flex } from '../../utils/theme';
import TableHeaderSortIcon from './TableHeaderSortIcon';

export interface SortableTableHeaderProps {
  className?: string;
  label: string;
  field: string;
  onSort?: any;
  direction?: string;
  isActive?: boolean;
  isLoading?: boolean;
  noWrap?: boolean;
}

const SortableTableHeader = ({
  label,
  field,
  direction,
  className = '',
  isActive = false,
  isLoading = false,
  onSort = null,
  noWrap = false,
}: SortableTableHeaderProps) => {
  const styleButton = useMemo(
    () =>
      css(display.flex, flex.alignItemsCenter, buttons.plain, hovers.primary, {
        fontWeight: fontWeight.bold,
        textAlign: 'left',
        cursor: onSort ? 'pointer' : 'default',
        whiteSpace: noWrap ? 'nowrap' : 'normal',
      }),
    [noWrap, onSort]
  );

  return (
    <button
      className={`${styleButton} ${className}`}
      type="button"
      onClick={() => onSort?.(field, direction === 'asc' ? 'desc' : 'asc')}
    >
      {label}
      {!!onSort && (
        <TableHeaderSortIcon
          isActive={isActive}
          isLoading={isLoading}
          direction={direction as string}
        />
      )}
    </button>
  );
};

SortableTableHeader.defaultProps = {
  className: '',
  isActive: false,
  isLoading: false,
  onSort: null,
  noWrap: false,
};

export default SortableTableHeader;
