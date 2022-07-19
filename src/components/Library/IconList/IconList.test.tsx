import React from 'react';

import { render } from '@testing-library/react';

import IconList from './IconList';

describe('IconList component', () => {
  it('should display children.', () => {
    const { queryByText } = render(<IconList>Test</IconList>);

    const textElement = queryByText('Test');

    expect(textElement).toBeTruthy();
  });
  it('should display a React Element as children.', () => {
    const { queryByText } = render(
      <IconList>
        <div>Test</div>
      </IconList>
    );

    const textElement = queryByText('Test');

    expect(textElement).toBeTruthy();
  });
});
