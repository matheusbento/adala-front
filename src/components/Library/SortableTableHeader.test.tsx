import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import SortableTableHeader from './SortableTableHeader';

const mockedOnSort = jest.fn();
console.warn = jest.fn(); // eslint-disable-line no-console

describe('SortableTableHeader component', () => {
  it('should be able to display a label.', () => {
    const { queryByText } = render(
      <SortableTableHeader
        label="Test Label"
        field="Test Field"
        onSort={mockedOnSort}
        direction="desc"
        noWrap
      />
    );

    const labelElement = queryByText('Test Label');

    expect(labelElement).toBeTruthy();
  });

  it('should call onSort function on click.', () => {
    const { queryByText } = render(
      <SortableTableHeader
        label="Test Label"
        field="Test Field"
        onSort={mockedOnSort}
        direction="desc"
      />
    );

    const labelElement = queryByText('Test Label');

    fireEvent.click(labelElement as Element);

    expect(mockedOnSort).toBeCalledWith('Test Field', 'asc');
  });
});
