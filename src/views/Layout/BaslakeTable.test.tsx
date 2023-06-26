/* eslint-disable jest/no-conditional-expect */
import React from 'react';

import { loading } from '@constants/baslakeTableConstants';
import { fireEvent, render } from '@testing-library/react';

import BaslakeTable from './BaslakeTable';

const mockedHeaderAction1 = jest.fn();
const mockedHeaderAction2 = jest.fn();
const mockedAction = jest.fn();
const mockedDataSortHandler = jest.fn();
const mockedOnRowClick = jest.fn();
const mockedBulkActionsHandler = jest.fn();
const mockedBulkChildrenActionsHandler = jest.fn();

const headers = [
  { label: 'Name', sortable: false, style: 'header 1 style' },
  { label: 'Created At', sortable: false },
];

const sortableHeaders = [
  { label: 'Name', key: 'name', sortable: true },
  { label: 'Created At', key: 'created_at', sortable: true },
];

const order = {
  field: sortableHeaders[0].key,
  direction: 'asc',
};

const rows: any = [
  [{ id: 1, actionKey: 'item-action-key' }, 'Name 1', 'Date 1'],
  [{ id: 'string-id' }, 'Name 2', 'Date 2'],
  ['Name 3', 'Date 3'],
];

const conditionalRows: any = [
  [{ id: 1, canDelete: true, canEdit: false }, 'Name 1 (Can delete)', 'Date 1'],
  [{ id: 2, canDelete: false, canEdit: true }, 'Name 2 (Can edit)', 'Date 2'],
  [{ id: 3, canDelete: false, canEdit: false }, "Name 3 (Can't delete or edit)", 'Date 3'],
];

const conditionalActions: any = [
  {
    label: 'Delete',
    action: mockedHeaderAction1,
    confirm: true,
    shouldShow: (itemData: any) => itemData.canDelete,
  },
  {
    label: 'Edit',
    action: mockedHeaderAction2,
    shouldShow: (itemData: any) => itemData.canEdit,
  },
];

const headerActions: any = [
  {
    label: 'Some Header confirmation action',
    action: mockedHeaderAction1,
    confirm: true,
    icon: 'icon-chat-line',
    key: 1,
  },
  {
    label: 'Header Action without confirm',
    key: 2,
    action: mockedHeaderAction2,
    icon: 'icon-trash-line',
  },
];

const headersWithActions: any = [
  { label: 'Name', sortable: false },
  { label: 'Created At', sortable: false },
  { label: '', key: 'actions', sortable: false, actions: headerActions },
];

const actions: any = [
  {
    label: 'Delete with confirm',
    action: mockedAction,
    confirm: true,
    icon: 'icon-chat-line',
  },
  {
    label: 'Action without confirm',
    action: mockedAction,
    icon: 'icon-trash-line',
  },
];

const actionsObj: any = {
  'item-action-key': actions,
};

const conditionalNestedActions: any = [
  {
    label: 'Delete with confirm',
    action: mockedAction,
    confirm: true,
    icon: 'icon-chat-line',
    showOnNested: (item: any) => item?.id === 1,
  },
  {
    label: 'Action without confirm',
    action: mockedAction,
    icon: 'icon-trash-line',
  },
];

const groupedRows: any = [
  [{ id: 1 }, 'Grouped Name 1', 'Grouped Date 1'],
  [{ id: 2 }, 'Grouped Group 1', 'Grouped Date 2'],
  [{ id: 3 }, 'Grouped Name 3', 'Grouped Date 3'],
];

const nestedRows: any = {
  2: [
    [{ id: 1 }, 'Nested Child 1', 'Nested Date 1'],
    [{ id: 'id-string' }, 'Nested Child 2', 'Nested Date 2'],
  ],
};

const selectedChildrenRows: any = [nestedRows[2][0][0].id];

describe('BaslakeTable component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should display headers and rows.', () => {
    const { queryByText } = render(<BaslakeTable headers={headers} rows={rows} disabled />);

    headers.forEach((header) => {
      const headerElement = queryByText(header.label);

      expect(headerElement).toBeTruthy();
    });
    rows.forEach((row: any) => {
      row.forEach((column: any) => {
        if (column?.length) {
          const columnElement = queryByText(column);

          expect(columnElement).toBeTruthy();
        }
      });
    });
  });

  it('should display sortable headers.', () => {
    const { queryByText, container, rerender } = render(
      <BaslakeTable
        headers={sortableHeaders}
        rows={rows}
        order={order}
        dataSortHandler={mockedDataSortHandler}
        responsive
      />,
    );

    headers.forEach((header) => {
      const headerElement = queryByText(header.label);

      expect(headerElement).toBeTruthy();
    });
    rows.forEach((row: any) => {
      row.forEach((column: any) => {
        if (column.length) {
          const columnElement = queryByText(column);

          expect(columnElement).toBeTruthy();
        }
      });
    });

    const sortUpIconElement = container.querySelector('span[data-src="/images/icon-arrow-up.svg"]');
    const sortDownIconElement = container.querySelector(
      'span[data-src="/images/icon-arrow-down.svg"]',
    );

    expect(sortUpIconElement).toBeTruthy();
    expect(sortDownIconElement).toBeTruthy();

    fireEvent.click(sortUpIconElement as Element);

    expect(mockedDataSortHandler).toHaveBeenCalledWith({
      order_by: sortableHeaders[0].key,
      direction: 'desc',
    });

    fireEvent.click(sortDownIconElement as Element);

    expect(mockedDataSortHandler).toHaveBeenCalledWith({
      order_by: sortableHeaders[1].key,
      direction: 'desc',
    });

    rerender(
      <BaslakeTable
        headers={sortableHeaders}
        rows={rows}
        order={{ ...order, direction: 'desc' }}
        dataSortHandler={mockedDataSortHandler}
      />,
    );

    const sortDownIconElements = container.querySelectorAll(
      'span[data-src="/images/icon-arrow-down.svg"]',
    );

    fireEvent.click(sortDownIconElements[0]);

    expect(mockedDataSortHandler).toHaveBeenCalledWith({
      order_by: sortableHeaders[0].key,
      direction: 'asc',
    });
  });

  it('should be able to display actions and execute them.', () => {
    const { queryByText, queryAllByText, queryAllByRole } = render(
      <BaslakeTable headers={headersWithActions} rows={rows} actions={actions} condensed />,
    );

    const optionsListElements = queryAllByRole('listbox');

    expect(optionsListElements).toHaveLength(4);

    optionsListElements.forEach((optionsElement, i) => {
      const actionsArr = i > 0 ? actions : headerActions;

      const optionElements = optionsElement.querySelectorAll('div[role="option"]');

      expect(optionElements).toHaveLength(2);

      optionElements.forEach((option, index) => {
        expect(option?.lastChild?.firstChild?.textContent).toBe(actionsArr[index].label);

        fireEvent.click(option);

        if (actionsArr[index]?.confirm) {
          let modalTextElement = queryByText('Are you sure?');
          let cancelButtonElement = queryByText('Cancel');
          let confirmButtonElement = queryAllByText('Confirm');

          expect(modalTextElement).toBeTruthy();
          expect(cancelButtonElement).toBeTruthy();
          expect(confirmButtonElement).toHaveLength(2);

          fireEvent.click(cancelButtonElement as Element);

          modalTextElement = queryByText('Are you sure?');
          cancelButtonElement = queryByText('Cancel');
          confirmButtonElement = queryAllByText('Confirm');

          expect(modalTextElement).toBeFalsy();
          expect(cancelButtonElement).toBeFalsy();
          expect(confirmButtonElement).toHaveLength(0);

          fireEvent.click(option);

          confirmButtonElement = queryAllByText('Confirm');

          fireEvent.click(confirmButtonElement[1]);

          modalTextElement = queryByText('Are you sure?');
          cancelButtonElement = queryByText('Cancel');
          confirmButtonElement = queryAllByText('Confirm');

          expect(modalTextElement).toBeFalsy();
          expect(cancelButtonElement).toBeFalsy();
          expect(confirmButtonElement).toHaveLength(0);
        }

        if (i > 0) {
          expect(actionsArr[index].action).toHaveBeenCalledWith(
            Array.isArray(rows[i - 1]) && rows[i - 1]?.[0]?.id ? rows[i - 1][0] : rows[i - 1],
            i - 1,
          );
        } else {
          expect(actionsArr[index].action).toHaveBeenCalled();
        }

        jest.resetAllMocks();
      });
    });
  });

  it('should be able to display conditional actions and execute them.', () => {
    const { queryByText, queryAllByText, queryAllByRole } = render(
      <BaslakeTable
        headers={headersWithActions}
        rows={conditionalRows}
        actions={conditionalActions}
      />,
    );

    const optionsListElements = queryAllByRole('listbox');

    expect(optionsListElements).toHaveLength(4);

    optionsListElements.forEach((optionsElement, i) => {
      const actionsArr = i > 0 ? conditionalActions : headerActions;

      const optionElements = optionsElement.querySelectorAll('div[role="option"]');

      if (!optionsElement.className.includes('disabled')) {
        optionElements.forEach((option, j) => {
          let index = option?.lastChild?.firstChild?.textContent === 'Delete' ? 0 : 1;

          index = i > 0 ? index : j;

          expect(option?.lastChild?.firstChild?.textContent).toBe(actionsArr[index].label);

          fireEvent.click(option);

          if (actionsArr[index]?.confirm) {
            let modalTextElement = queryByText('Are you sure?');
            let cancelButtonElement = queryByText('Cancel');
            let confirmButtonElement = queryAllByText('Confirm');

            expect(modalTextElement).toBeTruthy();
            expect(cancelButtonElement).toBeTruthy();
            expect(confirmButtonElement).toHaveLength(2);

            fireEvent.click(cancelButtonElement as Element);

            modalTextElement = queryByText('Are you sure?');
            cancelButtonElement = queryByText('Cancel');
            confirmButtonElement = queryAllByText('Confirm');

            expect(modalTextElement).toBeFalsy();
            expect(cancelButtonElement).toBeFalsy();
            expect(confirmButtonElement).toHaveLength(0);

            fireEvent.click(option);

            confirmButtonElement = queryAllByText('Confirm');

            fireEvent.click(confirmButtonElement[1]);

            modalTextElement = queryByText('Are you sure?');
            cancelButtonElement = queryByText('Cancel');
            confirmButtonElement = queryAllByText('Confirm');

            expect(modalTextElement).toBeFalsy();
            expect(cancelButtonElement).toBeFalsy();
            expect(confirmButtonElement).toHaveLength(0);
          }

          if (i > 0) {
            expect(actionsArr[index].action).toHaveBeenCalledWith(conditionalRows[index][0], index);
          } else {
            expect(actionsArr[index].action).toHaveBeenCalled();
          }
        });
      } else {
        fireEvent.click(optionsElement);

        actionsArr.forEach((action: any) => {
          expect(action.action).not.toHaveBeenCalled();
        });
      }

      jest.resetAllMocks();
    });
  });

  it('should display nested rows aligned to the left.', () => {
    const { container, queryByText } = render(
      <BaslakeTable
        headers={[{ label: '', sortable: false }, ...headers]}
        rows={groupedRows}
        nested={nestedRows}
        alignNested="left"
      />,
    );

    const keys = Object.keys(nestedRows);
    const parsedRows = [...groupedRows];
    let factor = 0;

    keys.forEach((key) => {
      const index = groupedRows.findIndex((r: any) => r[0].id === Number(key));

      nestedRows[key].forEach((item: any) => {
        factor += 1;
        parsedRows.splice(index + factor, 0, item);
      });
    });

    headers.forEach((header) => {
      const headerElement = queryByText(header.label);

      expect(headerElement).toBeTruthy();
    });

    const tableRowElements = container?.querySelector('tbody')?.querySelectorAll('tr');

    expect(tableRowElements).toHaveLength(parsedRows.length);

    tableRowElements?.forEach((row, i) => {
      const columnElements = row.querySelectorAll('td');

      expect(columnElements).toHaveLength(3);

      columnElements.forEach((column, j) => {
        if (j > 0) {
          expect(column.innerHTML).toBe(parsedRows[i][j]);
        }
      });
    });
  });

  it('should display nested rows aligned to the right.', () => {
    const { container, queryByText } = render(
      <BaslakeTable
        headers={[{ label: '', sortable: false }, ...headers]}
        rows={groupedRows}
        nested={nestedRows}
        alignNested="right"
      />,
    );

    const keys = Object.keys(nestedRows);

    const parsedRows = [...groupedRows];
    let factor = 0;

    keys.forEach((key) => {
      const index = groupedRows.findIndex((r: any) => r[0].id === Number(key));

      nestedRows[key].forEach((item: any) => {
        factor += 1;
        parsedRows.splice(index + factor, 0, item);
      });
    });

    headers.forEach((header) => {
      const headerElement = queryByText(header.label);

      expect(headerElement).toBeTruthy();
    });

    const tableRowElements = container?.querySelector('tbody')?.querySelectorAll('tr');

    expect(tableRowElements).toHaveLength(parsedRows.length);

    tableRowElements?.forEach((row, i) => {
      const columnElements = row.querySelectorAll('td');

      columnElements.forEach((column, j) => {
        if (j < columnElements.length - 1) {
          expect(column.innerHTML).toBe(parsedRows[i][j + 1]);
        }
      });
    });
  });

  it('should display nested collapsed and be able to expand.', () => {
    const { container } = render(
      <BaslakeTable
        headers={[{ label: '', sortable: false }, ...headers]}
        rows={groupedRows}
        nested={nestedRows}
        alignNested="left"
        allCollapsed
      />,
    );

    let iconUpElements = container.querySelectorAll(
      'span[data-src="/images/icon-arrow-circle-up-line.svg"]',
    );
    let iconDownElements = container.querySelectorAll(
      'span[data-src="/images/icon-arrow-circle-down-line.svg"]',
    );

    expect(iconUpElements).toHaveLength(groupedRows.length);
    expect(iconDownElements).toHaveLength(0);

    fireEvent.click(iconUpElements[1]);

    iconUpElements = container.querySelectorAll(
      'span[data-src="/images/icon-arrow-circle-up-line.svg"]',
    );
    iconDownElements = container.querySelectorAll(
      'span[data-src="/images/icon-arrow-circle-down-line.svg"]',
    );

    expect(iconUpElements).toHaveLength(groupedRows.length - 1);
    expect(iconDownElements).toHaveLength(1);

    fireEvent.click(iconDownElements[0]);

    iconUpElements = container.querySelectorAll(
      'span[data-src="/images/icon-arrow-circle-up-line.svg"]',
    );
    iconDownElements = container.querySelectorAll(
      'span[data-src="/images/icon-arrow-circle-down-line.svg"]',
    );

    expect(iconUpElements).toHaveLength(groupedRows.length);
    expect(iconDownElements).toHaveLength(0);
  });

  it('should be able to call onRowClick on click.', () => {
    const { container } = render(
      <BaslakeTable headers={headers} rows={rows} onRowClick={mockedOnRowClick} />,
    );

    const tableRowElements = container?.querySelector('tbody')?.querySelectorAll('tr');

    tableRowElements?.forEach((item, index) => {
      fireEvent.click(item);

      expect(mockedOnRowClick).toHaveBeenCalledWith(rows[index]);

      jest.resetAllMocks();
    });
  });

  it('should display select boxes an be able to select a single item or all.', () => {
    const { queryAllByRole } = render(
      <BaslakeTable
        headers={headers}
        rows={rows}
        bulk
        bulkActionsHandler={mockedBulkActionsHandler}
      />,
    );

    const inputElements = queryAllByRole('checkbox');

    expect(inputElements).toHaveLength(4);

    inputElements.forEach((item, index) => {
      fireEvent.click(item);
      if (index === 0) {
        expect(mockedBulkActionsHandler).toHaveBeenCalledWith(
          rows.map((row: any) => row?.[0]?.id ?? null),
        );
      } else {
        const key = rows?.[index - 1]?.[0]?.id ?? index;
        expect(mockedBulkActionsHandler).toHaveBeenCalledWith(Number.isInteger(key) ? key : null);
      }

      jest.resetAllMocks();
    });
  });

  it('should display an indeterminate parent checkbox if some of its children are selected.', () => {
    const { container } = render(
      <BaslakeTable
        headers={[{ label: '', sortable: false }, ...headers]}
        rows={groupedRows}
        nested={nestedRows}
        alignNested="left"
        bulk
        selectedChildrenRows={selectedChildrenRows}
      />,
    );

    const inputElement = container.querySelector('div[class*="ui indeterminate fitted checkbox"]');

    expect(inputElement).toBeTruthy();
  });

  it('should call children action handler on children checkbox click.', () => {
    const { queryAllByRole } = render(
      <BaslakeTable
        headers={[{ label: '', sortable: false }, ...headers]}
        rows={groupedRows}
        nested={nestedRows}
        alignNested="left"
        bulk
        bulkChildrenActionsHandler={mockedBulkChildrenActionsHandler}
      />,
    );

    const inputElements = queryAllByRole('checkbox');

    expect(inputElements).toHaveLength(6);

    fireEvent.click(inputElements[3]);

    expect(mockedBulkChildrenActionsHandler).toHaveBeenCalledWith(nestedRows[2][0][0].id);

    fireEvent.click(inputElements[4]);

    expect(mockedBulkChildrenActionsHandler).toHaveBeenCalledWith(null);
  });

  it('should display a loader for one line action.', () => {
    const { container } = render(
      <BaslakeTable
        headers={headers}
        rows={rows}
        selectedRows={[1]}
        loading={loading.actions}
        actions={actions}
      />,
    );

    const tableRowsElements: any = container?.querySelector('tbody')?.querySelectorAll('tr');

    const loaderElement = tableRowsElements[0].querySelector(
      'div[class*="ui small active centered inline loader"]',
    );

    expect(loaderElement).toBeTruthy();
  });

  it('should display an warning text if the table is empty.', () => {
    const { queryByText } = render(
      <BaslakeTable
        headers={headers}
        rows={[]}
        bulk
        bulkActionsHandler={mockedBulkActionsHandler}
      />,
    );

    const textELement = queryByText('No data found');

    expect(textELement).toBeTruthy();
  });

  it('should be able to show an action for a nested item conditionally.', () => {
    const { queryAllByRole } = render(
      <BaslakeTable
        headers={[{ label: '', sortable: false }, ...headers]}
        rows={groupedRows}
        nested={nestedRows}
        alignNested="left"
        actions={conditionalNestedActions}
        loading={loading.data}
      />,
    );

    const actionMenuElements = queryAllByRole('listbox');

    const firstMenuOptionElements = actionMenuElements[2].querySelectorAll('div[role="option"]');

    expect(firstMenuOptionElements).toHaveLength(2);

    const secondMenuOptionElements = actionMenuElements[3].querySelectorAll('div[role="option"]');

    expect(secondMenuOptionElements).toHaveLength(1);
  });

  it('should display an active row.', () => {
    const { container } = render(
      <BaslakeTable
        headers={[{ label: '', sortable: false }, ...headers]}
        rows={groupedRows}
        nested={nestedRows}
        alignNested="left"
        actions={actions}
        activeRow={1}
        highlightParentRow
        loading={loading.pagination}
      />,
    );

    const tableRowsElements: any = container?.querySelector('tbody')?.querySelectorAll('tr');

    expect(tableRowsElements[0].className).toEqual(expect.stringContaining('active'));
  });

  it('should be able to display highlighted parents.', () => {
    const { container } = render(
      <BaslakeTable
        headers={[{ label: '', sortable: false }, ...headers]}
        rows={groupedRows}
        nested={nestedRows}
        alignNested="left"
        actions={actions}
        highlightParentRow
      />,
    );

    const tableRowsElements: any = container?.querySelector('tbody')?.querySelectorAll('tr');

    expect(tableRowsElements[1].className).toEqual(expect.stringContaining('highlighted'));
  });

  it('should be able to display highlighted nested.', () => {
    const { container } = render(
      <BaslakeTable
        headers={[{ label: '', sortable: false }, ...headers]}
        rows={groupedRows}
        nested={nestedRows}
        alignNested="left"
        highlightNested
      />,
    );

    const tableRowsElements: any = container?.querySelector('tbody')?.querySelectorAll('tr');

    expect(tableRowsElements[2].className).toEqual(expect.stringContaining('highlight-nested'));
    expect(tableRowsElements[3].className).toEqual(expect.stringContaining('highlight-nested'));
  });

  it('should be able to display a specific nested item.', () => {
    const { container } = render(
      <BaslakeTable
        headers={[{ label: '', sortable: false }, ...headers]}
        rows={groupedRows}
        nested={nestedRows}
        alignNested="left"
        alwaysDisplayNested={false}
      />,
    );

    const tableRowsElements: any = container?.querySelector('tbody')?.querySelectorAll('tr');

    const iconElement = tableRowsElements[1].querySelector(
      'span[data-src="/images/icon-arrow-circle-down-line.svg"]',
    );

    expect(iconElement).toBeTruthy();
  });

  it('should display a custom styled header.', () => {
    const { container } = render(<BaslakeTable headers={headers} rows={rows} />);

    const tableRowsElements: any = container?.querySelector('tbody')?.querySelectorAll('tr');

    const firstHeaderElement = tableRowsElements[0].querySelector('td[class="header 1 style"]');

    expect(firstHeaderElement).toBeTruthy();
  });

  it("should display and enable row's drag and drop.", () => {
    const { container } = render(<BaslakeTable headers={headers} rows={rows} enableDragAndDrop />);

    const tBody = container.querySelector('tbody');

    const firstHeaderElement = tBody?.getAttribute('data-rbd-droppable-id');

    expect(firstHeaderElement).toBeTruthy();
  });

  it('should be able to display actions by item action key.', () => {
    const { queryByText, queryAllByText, queryAllByRole } = render(
      <BaslakeTable headers={headers} rows={rows} actions={actionsObj} />,
    );

    const optionsListElements = queryAllByRole('listbox');

    expect(optionsListElements).toHaveLength(3);

    optionsListElements.forEach((optionsElement, i) => {
      const optionElements = optionsElement.querySelectorAll('div[role="option"]');

      if (i !== 0) {
        expect(optionElements).toHaveLength(0);
      } else {
        expect(optionElements).toHaveLength(2);

        optionElements.forEach((option, index) => {
          expect(option?.lastChild?.firstChild?.textContent).toBe(actions[index].label);

          fireEvent.click(option);

          if (actions[index]?.confirm) {
            let modalTextElement = queryByText('Are you sure?');
            let cancelButtonElement = queryByText('Cancel');
            let confirmButtonElement = queryAllByText('Confirm');

            expect(modalTextElement).toBeTruthy();
            expect(cancelButtonElement).toBeTruthy();
            expect(confirmButtonElement).toHaveLength(2);

            fireEvent.click(cancelButtonElement as Element);

            modalTextElement = queryByText('Are you sure?');
            cancelButtonElement = queryByText('Cancel');
            confirmButtonElement = queryAllByText('Confirm');

            expect(modalTextElement).toBeFalsy();
            expect(cancelButtonElement).toBeFalsy();
            expect(confirmButtonElement).toHaveLength(0);

            fireEvent.click(option);

            confirmButtonElement = queryAllByText('Confirm');

            fireEvent.click(confirmButtonElement[1]);

            modalTextElement = queryByText('Are you sure?');
            cancelButtonElement = queryByText('Cancel');
            confirmButtonElement = queryAllByText('Confirm');

            expect(modalTextElement).toBeFalsy();
            expect(cancelButtonElement).toBeFalsy();
            expect(confirmButtonElement).toHaveLength(0);
          }

          expect(actions[index].action).toHaveBeenCalledWith(
            Array.isArray(rows[i]) && rows[i]?.[0]?.id ? rows[i][0] : rows[i],
            i,
          );

          jest.resetAllMocks();
        });
      }
    });
  });
});
