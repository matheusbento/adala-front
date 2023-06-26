import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { colors } from '../../utils/theme';
import BadgeCounter from './BadgeCounter';

export default {
  title: 'BadgeCounter',
  argTypes: {
    count: {
      control: { type: 'number' },
      description: 'Counter number value',
      table: {
        type: { summary: 'Number' },
        defaultValue: { summary: 15 },
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'xs' },
      },
    },
    color: {
      control: {
        type: 'select',
        options: Object.keys(colors),
      },
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: 'white' },
      },
    },
    bgColor: {
      control: {
        type: 'select',
        options: Object.keys(colors),
      },
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: 'primary' },
      },
    },
    verticalAlign: {
      control: {
        type: 'select',
        options: ['baseline', 'text-top', 'text-bottom', 'sub', 'super'],
      },
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: 'bottom' },
      },
    },
    onClick: {
      description: 'Click callback',
      table: {
        type: {
          summary: 'function',
        },
      },
    },
  },
} as ComponentMeta<typeof BadgeCounter>;

const Template: ComponentStory<typeof BadgeCounter> = (args) => <BadgeCounter {...args} />;

export const Default = Template.bind({});

Default.args = {
  bgColor: colors.primary,
  color: colors.white,
  size: 'sm',
  verticalAlign: 'bottom',
  onClick: () => window.alert('You clicked'), // eslint-disable-line no-alert
};
