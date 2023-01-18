import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import AddItem from './AddItem';

const mockedAddHandler = jest.fn();

describe('Add Item component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should display an icon.', () => {
    const { container } = render(
      <AddItem icon="icon-plus-line" label="Text Example" addHandler={mockedAddHandler} />,
    );

    expect(container.querySelector('[data-src="/images/icon-plus-line.svg"]')).toBeTruthy();
  });

  it('should display a label.', () => {
    const { queryByText } = render(<AddItem label="Text Example" addHandler={mockedAddHandler} />);

    const textElement = queryByText('Text Example');

    expect(textElement).toBeTruthy();
  });

  it('should pass class to container element.', () => {
    const { queryByTestId } = render(
      <AddItem
        data-testid="test-id"
        label="Text Example"
        addHandler={mockedAddHandler}
        className="test-class"
      />,
    );

    const containerElement = queryByTestId('test-id');

    expect(containerElement?.className).toEqual(expect.stringContaining('test-class'));
  });

  it('should execute function passed.', () => {
    const { queryByTestId } = render(
      <AddItem data-testid="test-id" label="Text Example" addHandler={mockedAddHandler} />,
    );

    const containerElement = queryByTestId('test-id');

    fireEvent.click(containerElement as Element);

    expect(mockedAddHandler).toHaveBeenCalled();
    expect(mockedAddHandler).toHaveBeenCalledWith('new');
  });

  it('should not execute function passed if button is disabled.', () => {
    const { queryByTestId } = render(
      <AddItem data-testid="test-id" label="Text Example" addHandler={mockedAddHandler} disabled />,
    );

    const containerElement = queryByTestId('test-id');

    fireEvent.click(containerElement as Element);

    expect(mockedAddHandler).not.toHaveBeenCalled();
  });
});
