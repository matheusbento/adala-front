import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import CloseModalIcon from './CloseModalIcon';

const mockedOnClick = jest.fn();

describe('CloseModalIcon component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should display close icon.', () => {
    const { container } = render(<CloseModalIcon />);

    const iconElement = container.querySelector('span[data-src*="/images/"]');

    expect(iconElement).toBeTruthy();
  });

  it('should execute onClick funcion.', () => {
    const { queryByRole } = render(<CloseModalIcon onClick={mockedOnClick} />);

    const buttonElement = queryByRole('button');

    fireEvent.click(buttonElement as Element);

    expect(mockedOnClick).toHaveBeenCalled();
  });

  it('should not execute onClick funcion if disabled.', () => {
    const { queryByRole } = render(
      <CloseModalIcon disabled onClick={mockedOnClick} />
    );

    const buttonElement = queryByRole('button');

    fireEvent.click(buttonElement as Element);

    expect(mockedOnClick).not.toHaveBeenCalled();
  });
});
