/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactNode } from 'react';

import { render, fireEvent } from '@testing-library/react';

import { ListCell, SelectCell } from './BaslakeTableCells';

jest.mock('react-router-dom', () => ({
  Link: ({ children, ...rest }: { children: ReactNode }) => (
    <a {...rest}>{children}</a>
  ),
}));

const mockedOnClick = jest.fn();

const user = {
  id: 1,
  email: 'email@gmail.com',
  first_name: 'Jane',
  last_name: 'Doe',
  profile_image: 'test image',
};

const input = {
  value: true,
  name: 'test-input',
  onChange: jest.fn(),
};

describe('ListCell component', () => {
  it('should display roles.', () => {
    const { queryByText } = render(<ListCell list="test-list" />);

    const textElement = queryByText('test-list');

    expect(textElement).toBeTruthy();
  });

  it('should display message if no data is found.', () => {
    const { queryByText } = render(<ListCell />);

    const textElement = queryByText('No info saved');

    expect(textElement).toBeTruthy();
  });
});

describe('SelectCell component', () => {
  it('should display a checkbox.', () => {
    const { queryByRole } = render(<SelectCell input={input} />);

    const checkboxElement = queryByRole('checkbox');

    expect(checkboxElement).toBeTruthy();
  });
});
