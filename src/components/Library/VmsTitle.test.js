import React from 'react';

import { render } from '@testing-library/react';

import VmsTitle from './VmsTitle';

describe('VmsTitle component', () => {
  it('should display a Title.', () => {
    const { queryByText } = render(<VmsTitle title="Test Title" />);

    const textElement = queryByText('Test Title');

    expect(textElement).toBeTruthy();
  });

  it('should display children.', () => {
    const { queryByText } = render(<VmsTitle>Test Children</VmsTitle>);

    const textElement = queryByText('Test Children');

    expect(textElement).toBeTruthy();
  });
});
