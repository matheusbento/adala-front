/* eslint-disable no-alert */
import React from 'react';

import { loading } from '@constants/baslakeTableConstants';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { css } from 'glamor';
import moment from 'moment';

import BaslakeTable from './BaslakeTable';

export default {
  title: 'Baslake/BaslakeTable',
  argTypes: {
    loading: {
      defaultValue: false,
      control: {
        type: 'select',
        options: ['actions', 'pagination', 'data'],
      },
    },
  },
} as ComponentMeta<typeof BaslakeTable>;

const Template: ComponentStory<typeof BaslakeTable> = (args) => (
  <BaslakeTable {...args} />
);

export const Default = Template.bind({});
const headers = [
  { label: 'Name', sortable: false },
  { label: 'Created At', sortable: false },
];
const rows = [
  [{ id: 1 }, 'Name 1', moment().format('MMM DD, YYYY')],
  [{ id: 2 }, 'Name 2', moment().format('MMM DD, YYYY')],
  ['Name 3', moment().format('MMM DD, YYYY')],
];

Default.args = {
  headers,
  rows,
};

export const SortableHeaders = Template.bind({});
const sortableHeaders = [
  { label: 'Name', key: 'name', sortable: true },
  { label: 'Created At', key: 'created_at', sortable: true },
];

SortableHeaders.args = {
  headers: sortableHeaders,
  rows,
  dataSortHandler: (props: any) => alert(JSON.stringify(props)),
  order: {
    field: 'name',
    direction: 'asc',
  },
};

export const AlignCollapsibleOnLeft = Template.bind({});
const groupedRows: any = [
  [{ id: 1 }, 'Name 1', moment().format('MMM DD, YYYY')],
  [{ id: 2 }, 'Group 1', moment().format('MMM DD, YYYY')],
  [{ id: 3 }, 'Name 3', moment().format('MMM DD, YYYY')],
];

const nestedRows: any = {
  2: [
    [{ id: 1 }, 'Child 1', moment().format('MMM DD, YYYY')],
    [{ id: 2 }, 'Child 2', moment().format('MMM DD, YYYY')],
  ],
};

AlignCollapsibleOnLeft.args = {
  headers: [{ label: '', sortable: false }, ...headers],
  rows: groupedRows,
  nested: nestedRows,
  alignNested: 'left',
  alwaysDisplayNested: false,
  highlightNested: true,
  highlightParentRow: true,
};

export const WithCustomHeaderStyle = Template.bind({});
const headersWithCustomHeaderStyle = [
  { label: 'Name', sortable: false, style: `${css({ width: '90%' })}` },
  { label: 'Created At', sortable: false, style: `${css({ width: '10%' })}` },
];
WithCustomHeaderStyle.args = {
  headers: headersWithCustomHeaderStyle,
  rows,
};

export const WithActions = Template.bind({});
const headerActions = [
  {
    label: 'Some confirmation action',
    action: () => alert('Confirmed'),
    confirm: true,
    icon: 'icon-chat-line',
  },
  {
    label: 'Action without confirm',
    action: () => alert('Ok'),
    icon: 'icon-trash-line',
  },
];
const headersWithActions = [
  { label: 'Name', sortable: false },
  { label: 'Created At', sortable: false },
  { label: '', key: 'actions', sortable: false, actions: headerActions },
];
const actions = [
  {
    label: 'Delete with confirm',
    action: () => alert('Deleted'),
    confirm: true,
    icon: 'icon-chat-line',
  },
  {
    label: 'Action without confirm',
    action: () => alert('Ok'),
    icon: 'icon-trash-line',
  },
];
WithActions.args = {
  headers: headersWithActions,
  rows,
  actions,
};

export const WithConditionalActions = Template.bind({});

const conditionalRows = [
  [
    { id: 1, canDelete: true, canEdit: false },
    'Name 1 (Can delete)',
    moment().format('MMM DD, YYYY'),
  ],
  [
    { id: 2, canDelete: false, canEdit: true },
    'Name 2 (Can edit)',
    moment().format('MMM DD, YYYY'),
  ],
  [
    { id: 3, canDelete: false, canEdit: false },
    "Name 3 (Can't delete or edit)",
    moment().format('MMM DD, YYYY'),
  ],
];

const conditionalActions = [
  {
    label: 'Delete',
    action: () => alert('Deleted'),
    confirm: true,
    shouldShow: (itemData: any) => itemData.canDelete,
  },
  {
    label: 'Edit',
    action: () => alert('Edit'),
    shouldShow: (itemData: any) => itemData.canEdit,
  },
];

WithConditionalActions.args = {
  headers: headersWithActions,
  rows: conditionalRows,
  actions: conditionalActions,
};

export const WithActionsAndLoading = Template.bind({});
WithActionsAndLoading.args = {
  headers: headersWithActions,
  rows,
  actions,
  loading: loading.actions,
  selectedRows: [1],
};

WithConditionalActions.args = {
  headers: headersWithActions,
  rows: conditionalRows,
  actions: conditionalActions,
};

export const DisabledTable = Template.bind({});
DisabledTable.args = {
  headers: headersWithActions,
  rows,
  actions,
  disabled: true,
};

export const WithBulk = Template.bind({});
WithBulk.args = {
  headers,
  rows,
  bulk: true,
  bulkActionsHandler: (props: any) => alert(JSON.stringify(props)),
};

export const WithBulkSelectedChildren = Template.bind({});
WithBulkSelectedChildren.args = {
  headers: [{ label: '', sortable: false }, ...headers],
  rows: groupedRows,
  nested: nestedRows,
  alignNested: 'left',
  bulk: true,
  bulkActionsHandler: (props: any) => alert(JSON.stringify(props)),
  selectedChildrenRows: [nestedRows[2][0][0].id],
};

export const DragAndDrop = Template.bind({});

DragAndDrop.args = {
  headers: [{ label: '', sortable: false }, ...headers],
  rows: groupedRows,
  nested: nestedRows,
  alignNested: 'left',
  enableDragAndDrop: true,
  alwaysDisplayNested: false,
  highlightNested: true,
  highlightParentRow: true,
};

export const DragAndDropWithCallbackWhenDragEnd = Template.bind({});

DragAndDropWithCallbackWhenDragEnd.args = {
  headers: [{ label: '', sortable: false }, ...headers],
  rows: groupedRows,
  nested: nestedRows,
  alignNested: 'left',
  enableDragAndDrop: true,
  alwaysDisplayNested: false,
  highlightNested: true,
  highlightParentRow: true,
  onCallBackDragEnd: (item: any, to: any, from: any) =>
    alert(JSON.stringify({ item, to, from })),
};
