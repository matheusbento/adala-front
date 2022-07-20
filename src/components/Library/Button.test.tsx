import React from 'react';

import { render } from '@testing-library/react';

import Button from './Button';

describe('Button component', () => {
  it('should display the children text.', () => {
    const { queryByText } = render(<Button>Text Example</Button>);

    const textElement = queryByText('Text Example');

    expect(textElement).toBeTruthy();
  });

  it('should display the children text when link.', () => {
    const { queryByText } = render(<Button link>Text Example</Button>);

    const textElement = queryByText('Text Example');

    expect(textElement?.className).toEqual(expect.stringMatching(/css-/));
  });

  it('should display the children text when pill.', () => {
    const { queryByText } = render(<Button pill>Text Example</Button>);

    const textElement = queryByText('Text Example');

    expect(textElement).toBeTruthy();
  });
});
