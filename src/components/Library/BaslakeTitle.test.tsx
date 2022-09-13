import React from 'react';

import { render } from '@testing-library/react';

import BaslakeTitle from './BaslakeTitle';

describe('BaslakeTitle component', () => {
  it('should display a Title.', () => {
    const { queryByText } = render(<BaslakeTitle title="Test Title" />);

    const textElement = queryByText('Test Title');

    expect(textElement).toBeTruthy();
  });

  it('should display children.', () => {
    const { queryByText } = render(<BaslakeTitle>Test Children</BaslakeTitle>);

    const textElement = queryByText('Test Children');

    expect(textElement).toBeTruthy();
  });
});
