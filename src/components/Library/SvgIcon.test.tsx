import React from 'react';

import { render } from '@testing-library/react';

import SvgIcon from './SvgIcon';

describe('SvgIcon component', () => {
  it('should be able to display an icon', () => {
    const { container } = render(
      <SvgIcon path="test-path" color="red" size="10px" />
    );

    const iconElement = container.querySelector(
      'span[data-src="/images/test-path.svg"]'
    );

    expect(iconElement).toBeTruthy();
  });
});
