import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import BadgeCounter from './BadgeCounter';

const mockedOnClick = jest.fn();

describe('BadgeCounter component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should display a count.', () => {
    const { queryByText } = render(<BadgeCounter count="1" />);

    const textElement = queryByText('1');

    expect(textElement).toBeTruthy();
  });

  it('should execute the onClick function on click.', () => {
    const { queryByText } = render(<BadgeCounter count="1" onClick={mockedOnClick} />);

    const textElement = queryByText('1');

    fireEvent.click(textElement as Element);

    expect(mockedOnClick).toHaveBeenCalled();
  });

  it('should not execute the onClick function on click if prop is not passed.', () => {
    const { queryByText } = render(<BadgeCounter count="1" />);

    const textElement = queryByText('1');

    fireEvent.click(textElement as Element);

    expect(mockedOnClick).not.toHaveBeenCalled();
  });
});
