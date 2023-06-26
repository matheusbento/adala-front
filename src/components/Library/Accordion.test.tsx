import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Accordion from './Accordion';

const mockedHandleAccordionClick = jest.fn();

describe('Accordion component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should display an arrow up if not active.', () => {
    const { container } = render(<Accordion data-testid="test-id" />);

    const svgElement = container.querySelector('[data-src="/images/icon-arrow-circle-up-line.svg"');

    expect(svgElement).toBeTruthy();
  });

  it('should display an arrow down if active.', () => {
    const { container } = render(<Accordion data-testid="test-id" active />);

    const svgElement = container.querySelector(
      '[data-src="/images/icon-arrow-circle-down-line.svg"',
    );

    expect(svgElement).toBeTruthy();
  });

  it('should execute function passed.', () => {
    const { queryByTestId } = render(
      <Accordion
        data-testid="test-id"
        token="token-example"
        accordionHandler={mockedHandleAccordionClick}
      />,
    );

    const containerElement = queryByTestId('test-id');

    fireEvent.click(containerElement as Element);

    expect(mockedHandleAccordionClick).toHaveBeenCalled();
    expect(mockedHandleAccordionClick).toHaveBeenCalledWith('token-example');
  });

  it('should not execute function passed if disabled.', () => {
    const { queryByTestId } = render(
      <Accordion
        data-testid="test-id"
        token="token-example"
        accordionHandler={mockedHandleAccordionClick}
        disabled
        size="xxxs"
      />,
    );

    const containerElement = queryByTestId('test-id');

    fireEvent.click(containerElement as Element);

    expect(mockedHandleAccordionClick).not.toHaveBeenCalled();
  });
});
