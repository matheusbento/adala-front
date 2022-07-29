import React from 'react';

import { render } from '@testing-library/react';

import Header from './Header';

describe('Header component', () => {
  it('should be able to render with hexcolor.', () => {
    const { container } = render(
      <Header hexColor="#000" line>
        Children Text
      </Header>
    );

    const headerElement = container.querySelector('div[class*=header]');

    expect(headerElement).toBeTruthy();
  });

  it('should be able to render.', () => {
    const { queryByText } = render(<Header>Children Text</Header>);

    const textElement = queryByText('Children Text');

    expect(textElement).toBeTruthy();
  });
});
