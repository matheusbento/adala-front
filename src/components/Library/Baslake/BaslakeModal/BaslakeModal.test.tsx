import React from 'react';

import { render } from '@testing-library/react';

import BaslakeModal from './BaslakeModal';

const mockedCloseHandler = jest.fn();

describe('BaslakeModal component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should display children.', () => {
    const { queryByText } = render(
      <BaslakeModal
        open
        isClosable={false}
        closeByClickingOutside
        closeHandler={mockedCloseHandler}
      >
        <div>Test Children</div>
      </BaslakeModal>,
    );

    const textElement1 = queryByText('Test Children');

    expect(textElement1).toBeTruthy();
  });

  it('should display nothing if not opened.', () => {
    const { queryByText } = render(
      <BaslakeModal closeHandler={mockedCloseHandler}>
        <div>Test Children</div>
      </BaslakeModal>,
    );

    const textElement1 = queryByText('Test Children');

    expect(textElement1).toBeFalsy();
  });

  it('should display title.', () => {
    const { queryByText } = render(
      <BaslakeModal
        open
        isClosable={false}
        closeOnEscape
        title="test title"
        closeHandler={mockedCloseHandler}
      >
        <div>Test Children</div>
      </BaslakeModal>,
    );

    const textElement1 = queryByText('test title');

    expect(textElement1).toBeTruthy();
  });
});
