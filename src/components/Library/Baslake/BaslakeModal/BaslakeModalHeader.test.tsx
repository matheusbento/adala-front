import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import BaslakeModalHeader from './BaslakeModalHeader';

const mockedCloseHandler = jest.fn();

jest.mock('react-router-dom', () => ({
  Link: ({ children, ...rest }: { children: any }) => <a {...rest}>{children}</a>,
}));

describe('BaslakeModalHeader component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should display title.', () => {
    const { queryByText } = render(<BaslakeModalHeader title="test title" />);

    const textElement1 = queryByText('test title');

    expect(textElement1).toBeTruthy();
  });

  it('should display a close button and execute closeHandler function on click.', () => {
    const { container } = render(
      <BaslakeModalHeader isClosable title="test title" closeHandler={mockedCloseHandler} />,
    );

    const buttonElement = container.querySelector('span[data-src="/images/icon-close.svg"]');

    fireEvent.click(buttonElement as Element);

    expect(mockedCloseHandler).toHaveBeenCalled();
  });

  it('should have a clickable title if has a linkTo.', () => {
    const { container, queryByText } = render(
      <BaslakeModalHeader title="test title" linkTo="link" />,
    );

    const linkElement = container.querySelector('a[to="link"]');
    const textElement1 = queryByText('test title');

    expect(linkElement).toBeTruthy();
    expect(textElement1).toBeTruthy();
  });

  it('should display a close button svg and execute nothing if closeHandler is undefined.', () => {
    const { container } = render(<BaslakeModalHeader isClosable title="test title" />);

    const buttonElement = container.querySelector('span[data-src="/images/icon-close.svg"]');

    fireEvent.click(buttonElement as Element);

    expect(mockedCloseHandler).not.toHaveBeenCalled();
  });

  it('should display a close button and execute nothing if closeHandler is undefined.', () => {
    const { queryByText } = render(
      <BaslakeModalHeader headerChildren={<div>Test Children</div>} />,
    );

    const textElement1 = queryByText('Test Children');

    expect(textElement1).toBeTruthy();
  });
});
