import React from 'react';

import { render } from '@testing-library/react';

import FormLabel from './FormLabel';

describe('FormLabel component', () => {
  it('should display children.', () => {
    const { queryByText } = render(<FormLabel>Test Text</FormLabel>);

    const textElement = queryByText('Test Text');

    expect(textElement).toBeTruthy();
  });

  it('should display an asterisk when is required.', () => {
    const { queryByText } = render(<FormLabel required>Test Text</FormLabel>);

    const textElement = queryByText('Test Text *');

    expect(textElement).toBeTruthy();
  });
});
