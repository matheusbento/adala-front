import React from 'react';

import { render } from '@testing-library/react';

import Segment from './Segment';

describe('Segment component', () => {
  it('should display children.', () => {
    const { queryByText } = render(
      <Segment box boxPadding={{ style: 'any' }} borders shadow borderRadius="xl" marginBottom="xl">
        Text Example
      </Segment>,
    );

    const textElement = queryByText('Text Example');

    expect(textElement).toBeTruthy();
  });
});
