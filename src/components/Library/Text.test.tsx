import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Text from './Text';

const mockClick = jest.fn();

describe('Text component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should display the children text.', () => {
    const { queryByText } = render(<Text>Text Example</Text>);

    const textElement = queryByText('Text Example');

    expect(textElement).toBeTruthy();
  });

  it('should display the children text as paragraph.', () => {
    const { getByText } = render(<Text as="p">Text Example</Text>);

    const textElement = getByText('Text Example');

    expect(textElement.tagName.toLowerCase()).toBe('p');
  });

  it('should display a button.', () => {
    const { getByText } = render(<Text onClick={mockClick}>Text Example</Text>);

    const textElement = getByText('Text Example');

    fireEvent.click(textElement);

    expect(textElement).toHaveProperty('type', 'button');
    expect(mockClick).toHaveBeenCalled();
  });

  it('should be able to display a disabled button.', () => {
    const { getByText } = render(
      <Text disabled onClick={mockClick}>
        Text Example
      </Text>,
    );

    const textElement = getByText('Text Example');

    fireEvent.click(textElement);

    expect(textElement).toHaveProperty('type', 'button');
    expect(mockClick).not.toHaveBeenCalled();
  });
});
