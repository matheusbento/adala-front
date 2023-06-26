import React from 'react';

import { render } from '@testing-library/react';

import Alert from './Alert';

describe('Alert component', () => {
  it('should display a content text.', () => {
    const { queryByText } = render(<Alert content="Example Text" />);

    const textElement = queryByText('Example Text');

    expect(textElement).toBeTruthy();
  });

  it('should display an icon.', () => {
    const { container } = render(<Alert content="Example Text" icon="icon-info" />);

    const iconElement = container.querySelector('[data-src="/images/icon-info.svg"]');

    expect(iconElement).toBeTruthy();
  });

  it('should display a Header.', () => {
    const { queryByText } = render(<Alert content="Example Text" header="Header Text" />);

    const textElement = queryByText('Header Text');

    expect(textElement).toBeTruthy();
  });

  it('should display an icon with Header.', () => {
    const { container } = render(
      <Alert content="Example Text" header="Header Text" icon="icon-info" />,
    );

    const iconElement = container.querySelector('[data-src="/images/icon-info.svg"]');

    expect(iconElement).toBeTruthy();
  });
});
