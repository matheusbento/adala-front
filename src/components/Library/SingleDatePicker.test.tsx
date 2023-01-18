import React from 'react';

import { render } from '@testing-library/react';

import SingleDatePicker from './SingleDatePicker';

const mockedFunc = jest.fn();
console.warn = jest.fn(); // eslint-disable-line no-console

describe('SingleDatePicker component', () => {
  it('should be able to render.', () => {
    const { queryByRole } = render(
      <SingleDatePicker onDateChange={mockedFunc} onFocusChange={mockedFunc} />,
    );

    const inputElement = queryByRole('textbox');

    expect(inputElement).toBeTruthy();
  });
});
