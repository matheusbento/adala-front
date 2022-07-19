import React, { ReactNode, useMemo } from 'react';

import { css } from 'glamor';

import { spacing, fontSizes } from 'utils/theme';

import Item from './Item';

export interface IconListProps {
  size?: string;
  className?: string;
  children: ReactNode;
}

const IconList = ({ size = 'sm', children, className }: IconListProps) => {
  const styleList = useMemo(
    () =>
      css(fontSizes[size], {
        margin: spacing.none,
        padding: spacing.none,
      }),
    [size]
  );

  const childrenWithProps = useMemo(
    () =>
      React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { size });
        }
        return child;
      }),
    [children, size]
  );

  return <ul className={`${styleList} ${className}`}>{childrenWithProps}</ul>;
};

IconList.Item = Item;

export default IconList;
