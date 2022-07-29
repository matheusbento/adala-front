import React from 'react';

import { render } from '@testing-library/react';

import BaslakeSidebarIcon from './BaslakeSidebarIcon';

describe('BaslakeSidebarIcon component', () => {
  it('should display an icon.', () => {
    const { container } = render(<BaslakeSidebarIcon path="test-path" />);

    const iconElement = container.querySelector(
      'span[data-src="/images/test-path.svg"]'
    );

    expect(iconElement).toBeTruthy();
  });

  it('should display an subItem.', () => {
    const { container } = render(
      <BaslakeSidebarIcon subItem path="test-path" />
    );

    const iconElement = container.querySelector(
      'span[data-src="/images/test-path.svg"]'
    );

    expect(iconElement).toBeTruthy();
  });
});
