import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { colors } from '../../utils/theme';
import SvgIcon from './SvgIcon';

export default {
  title: 'SvgIcon',
  component: SvgIcon,
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
        defaultValue: {
          summary: colors.primary,
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
        defaultValue: {
          summary: 'sm',
        },
      },
      control: {
        type: 'select',
        options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      },
    },
    wrapper: {
      description: 'HTML container type',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'span' },
      },
      control: {
        type: 'select',
        options: ['span', 'div'],
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
} as ComponentMeta<typeof SvgIcon>;

const Template: ComponentStory<typeof SvgIcon> = (args) => <SvgIcon {...args} />;

export const Default = Template.bind({});
Default.args = {
  path: 'icon-download',
  color: colors.primary,
  size: 'sm',
  className: '',
  wrapper: 'span',
};
