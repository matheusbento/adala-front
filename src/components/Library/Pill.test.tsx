import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Pill from './Pill';

const mockedOnClick = jest.fn();

describe('Pill component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should display the children text.', () => {
    const { queryByText } = render(<Pill>Text Example</Pill>);

    const textElement = queryByText('Text Example');

    expect(textElement).toBeTruthy();
  });

  it('should display a button component.', () => {
    const { queryByText } = render(
      <Pill button clear>
        Text Example
      </Pill>,
    );

    const textElement = queryByText('Text Example');

    expect(textElement).toBeTruthy();
    expect(textElement).toHaveProperty('type', 'button');
  });

  it('should execute the onClick function when the button is clicked.', () => {
    const { queryByText } = render(
      <Pill button onClick={mockedOnClick}>
        Text Example
      </Pill>,
    );

    const textElement = queryByText('Text Example');

    fireEvent.click(textElement as Element);

    expect(textElement).toBeTruthy();
    expect(mockedOnClick).toHaveBeenCalled();
  });

  it('should not execute the onClick function when the button is clicked and the button is disabled.', () => {
    const { queryByText } = render(
      <Pill disabled button onClick={mockedOnClick}>
        Text Example
      </Pill>,
    );

    const textElement = queryByText('Text Example');

    fireEvent.click(textElement as Element);

    expect(textElement).toBeTruthy();
    expect(mockedOnClick).not.toHaveBeenCalled();
  });

  it('should display a button component with icon.', () => {
    const { container } = render(
      <Pill data-testid="test" button icon="icon" color="non-existing" size="12">
        Text Example
      </Pill>,
    );

    const textElement = container.querySelector('span[data-src="/images/icon.svg"]');

    expect(textElement).toBeTruthy();
  });

  it('should be able to render  without children.', () => {
    const { queryByTestId } = render(<Pill data-testid="test" outline />);

    const textElement = queryByTestId('test');

    expect(textElement).toBeTruthy();
  });

  it('should be able to render a button without children.', () => {
    const { queryByTestId } = render(<Pill data-testid="test" button clear />);

    const textElement = queryByTestId('test');

    expect(textElement).toBeTruthy();
    expect(textElement).toHaveProperty('type', 'button');
  });

  it('should display a react router dom button component.', () => {
    const { queryByText } = render(
      <MemoryRouter initialEntries={['/home']}>
        <Pill button to="to">
          Text Example
        </Pill>
      </MemoryRouter>,
    );

    const textElement = queryByText('Text Example');

    expect(textElement).toBeTruthy();
    expect(textElement).toHaveProperty('href', 'http://localhost/to');
  });

  it('should display a react router dom button component with icon.', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/home']}>
        <Pill data-testid="test" button to="to" icon="icon">
          Text Example
        </Pill>
      </MemoryRouter>,
    );

    const textElement = container.querySelector('span[data-src="/images/icon.svg"]');

    expect(textElement).toBeTruthy();
  });

  it('should execute the onClick function when the react router dom button is clicked.', () => {
    const { queryByText } = render(
      <MemoryRouter initialEntries={['/home']}>
        <Pill data-testid="test" button to="to" onClick={mockedOnClick}>
          Text Example
        </Pill>
      </MemoryRouter>,
    );

    const textElement = queryByText('Text Example');

    fireEvent.click(textElement as Element);

    expect(textElement).toBeTruthy();
    expect(mockedOnClick).toHaveBeenCalled();
  });

  it('should not execute the onClick function when the react router dom button is clicked and the button is disabled.', () => {
    const { queryByText } = render(
      <MemoryRouter initialEntries={['/home']}>
        <Pill data-testid="test" disabled outline button to="to" onClick={mockedOnClick}>
          Text Example
        </Pill>
      </MemoryRouter>,
    );

    const textElement = queryByText('Text Example');

    fireEvent.click(textElement as Element);

    expect(textElement).toBeTruthy();
    expect(mockedOnClick).not.toHaveBeenCalled();
  });
});
