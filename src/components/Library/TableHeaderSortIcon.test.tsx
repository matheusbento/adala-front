import React from 'react';

import { render } from '@testing-library/react';

import TableHeaderSortIcon from './TableHeaderSortIcon';

describe('TableHeaderSortIcon component', () => {
  it('should be able to display a direction icon if active', () => {
    const { container } = render(
      <TableHeaderSortIcon isActive direction="asc" />
    );

    const iconElement = container.querySelector(
      'span[data-src="/images/icon-arrow-up.svg"]'
    );

    expect(iconElement).toBeTruthy();
  });

  it('should display an arrow down if not active', () => {
    const { container } = render(
      <TableHeaderSortIcon isActive={false} direction="asc" />
    );

    const iconElement = container.querySelector(
      'span[data-src="/images/icon-arrow-down.svg"]'
    );

    expect(iconElement).toBeTruthy();
  });

  it('should be able to display a loader', () => {
    const { container } = render(
      <TableHeaderSortIcon isActive direction="asc" isLoading />
    );

    const loaderElement = container.querySelector(
      'div[class="ui mini active inline loader"]'
    );

    expect(loaderElement).toBeTruthy();
  });
});
