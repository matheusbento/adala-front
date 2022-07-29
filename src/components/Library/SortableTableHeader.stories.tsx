import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import SortableTableHeader from './SortableTableHeader';

export default {
  title: 'SortableTableHeader',
  argTypes: {
    label: {
      description: 'Column label',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    field: {
      description: 'Field name returned on callback',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    direction: {
      description: 'Arrow direction [asc|desc]',
      table: {
        type: {
          summary: 'string',
        },
      },
      control: {
        type: 'select',
        options: ['asc', 'desc'],
      },
    },
    onSort: {
      description: 'Callback function',
      table: {
        type: {
          summary: 'function',
        },
      },
    },
    isActive: {
      description: 'Is active?',
      table: {
        type: {
          summary: 'bool',
        },
      },
      defaultValue: {
        summary: false,
      },
    },
    isLoading: {
      description: 'Is loading?',
      table: {
        type: {
          summary: 'bool',
        },
      },
      defaultValue: {
        summary: false,
      },
    },
  },
} as ComponentMeta<typeof SortableTableHeader>;

const Template: ComponentStory<typeof SortableTableHeader> = (args) => (
  <SortableTableHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: 'Column name',
  field: 'field_name',
  // eslint-disable-next-line no-alert
  onSort: () => window.alert('onSort()'),
  isActive: true,
  isLoading: false,
  direction: 'desc',
};
