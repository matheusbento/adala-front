import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { colors } from '../../utils/theme';
import TableHeaderSortIcon from './TableHeaderSortIcon';

export default {
  title: 'TableHeaderSortIcon',
  argTypes: {
    isActive: {
      description: 'Is active?',
      table: {
        type: {
          summary: 'bool',
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
    activeColor: {
      description: "Arrow color when it's active",
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: colors.primary,
        },
      },
      control: 'color',
    },
    inactiveColor: {
      description: "Arrow color when it's inactive",
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: colors.greyLighter,
        },
      },
      control: 'color',
    },
  },
} as ComponentMeta<typeof TableHeaderSortIcon>;

const Template: ComponentStory<typeof TableHeaderSortIcon> = (args) => (
  <TableHeaderSortIcon {...args} />
);

export const Default = Template.bind({});
Default.args = {
  isActive: true,
  direction: 'asc',
  activeColor: colors.primary,
  inactiveColor: colors.greyLighter,
  className: '',
  isLoading: false,
};
