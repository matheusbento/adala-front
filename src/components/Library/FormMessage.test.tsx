import React from 'react';

import { render, act } from '@testing-library/react';

import FormMessage from './FormMessage';

const list = ['item 1', 'item 2', 'item 3', 'item 4'];
jest.useFakeTimers();

describe('FormMessage component', () => {
  it('should not be displayed if the visible prop is falsy.', () => {
    const { container } = render(<FormMessage />);

    const elements = container.querySelectorAll('div');

    expect(elements).toHaveLength(0);
  });

  it('should display a Title.', () => {
    const { queryByText } = render(
      <FormMessage header="Test title" content="Test message" visible />,
    );

    const textElement = queryByText('Test title');

    expect(textElement).toBeTruthy();
  });

  it('should display a content.', () => {
    const { queryByText } = render(<FormMessage content="Test message" visible />);

    const textElement = queryByText('Test message');

    expect(textElement).toBeTruthy();
  });

  it('should display a list of messages.', () => {
    const { queryByText } = render(<FormMessage list={list} visible />);

    list.forEach((item) => {
      const textElement = queryByText(item);

      expect(textElement).toBeTruthy();
    });
  });

  it('should display an error type message.', () => {
    const { container } = render(<FormMessage error content="test message" visible />);

    const iconElement = container.querySelector('span[data-src="/images/icon-alert-circle.svg"]');

    expect(iconElement).toBeTruthy();
  });

  it('should display a warning type message.', () => {
    const { container } = render(<FormMessage warning content="test message" visible />);

    const iconElement = container.querySelector('span[data-src="/images/icon-alert-circle.svg"]');

    expect(iconElement).toBeTruthy();
  });

  it('should display a success type message.', () => {
    const { container } = render(<FormMessage success content="test message" visible />);

    const iconElement = container.querySelector(
      'span[data-src="/images/icon-checkmark-circle-2.svg"]',
    );

    expect(iconElement).toBeTruthy();
  });

  it('should display an info type message.', () => {
    const { container } = render(<FormMessage info content="test message" visible />);

    const iconElement = container.querySelector('span[data-src="/images/icon-info.svg"]');

    expect(iconElement).toBeTruthy();
  });

  it('should hide after timeout.', () => {
    const { queryByText } = render(<FormMessage content="test message" visible timeout={1000} />);

    let textElement = queryByText('test message');

    expect(textElement).toBeTruthy();

    act(() => {
      jest.runAllTimers();
    });

    textElement = queryByText('test message');

    expect(textElement).toBeFalsy();
  });
});
