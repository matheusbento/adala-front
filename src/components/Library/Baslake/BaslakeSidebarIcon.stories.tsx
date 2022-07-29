import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { colors } from '@utils/theme';

import BaslakeSidebarIcon from './BaslakeSidebarIcon';

export default {
  title: 'Baslake/Baslake Sidebar Icon',
  argTypes: {
    path: {
      description: 'Icon name',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    color: {
      description: 'Icon color',
      table: {
        type: {
          summary: 'string',
        },
      },
      control: 'color',
    },
    size: {
      description: 'Icon size',
      table: {
        type: {
          summary: 'string',
        },
      },
      control: {
        type: 'select',
        options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      },
    },
    className: {
      description: 'Custom CSS className',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
  },
} as ComponentMeta<typeof BaslakeSidebarIcon>;

const Template: ComponentStory<typeof BaslakeSidebarIcon> = (args) => (
  <BaslakeSidebarIcon {...args} />
);

export const Default = Template.bind({});
Default.args = {
  path: 'icon-download',
  color: colors.primary,
  className: '',
};
