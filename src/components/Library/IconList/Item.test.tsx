import React from 'react';

import { render } from '@testing-library/react';

import Item from './Item';

describe('Item component', () => {
  it('should display children.', () => {
    const { queryByText } = render(<Item label="Test text" />);

    const textElement = queryByText('Test text');

    expect(textElement).toBeTruthy();
  });

  it('should display a React Element as children.', () => {
    const { queryByText } = render(<Item label={<div>Test text</div>} />);

    const textElement = queryByText('Test text');

    expect(textElement).toBeTruthy();
  });

  it('should display an icon with a label.', () => {
    const { container } = render(<Item icon="icon-info" label={<div>Test text</div>} />);

    const iconElement = container.querySelector('[data-src="/images/icon-info.svg"]');

    expect(iconElement).toBeTruthy();
  });

  it('should display an icon.', () => {
    const { container } = render(<Item icon="icon-info" />);

    const iconElement = container.querySelector('[data-src="/images/icon-info.svg"]');

    expect(iconElement).toBeTruthy();
  });
});
