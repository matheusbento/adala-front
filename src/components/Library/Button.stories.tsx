import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Button from './Button';

export default {
  title: 'Button',
  parameters: {
    docs: {
      description: {
        component:
          "**IMPORTANT:** This components extends the `<Pill />` component when `pill === true`. Otherwise, it extends [Semantic UI's Button component](https://react.semantic-ui.com/elements/button/).",
      },
    },
  },
  argTypes: {
    children: {
      table: {
        type: { summary: 'node' },
      },
      control: { type: 'text' },
    },
    to: {
      table: {
        type: { summary: 'string' },
      },
      control: { type: 'text' },
    },
    pill: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
      control: { type: 'boolean' },
    },
    icon: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'icon-clock' },
      },
      control: { type: 'text' },
    },
    clear: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
      control: { type: 'boolean' },
    },
    loading: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
      control: { type: 'boolean' },
    },
    outline: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
        category: 'Pill',
      },
      control: { type: 'boolean' },
    },
    active: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
        category: 'Pill',
      },
      control: { type: 'boolean' },
    },
    disabled: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
        category: 'Pill',
      },
      control: { type: 'boolean' },
    },
    size: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'xs' },
        category: 'Pill',
      },
      control: {
        type: 'select',
        options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'],
      },
    },
    color: {
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: 'primary' },
        category: 'Pill',
      },
      control: {
        type: 'select',
        options: [
          'primary',
          'warning',
          'danger',
          'success',
          'disabled',
          'default',
          'light',
          'dark',
          'purple',
        ],
      },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Pill = Template.bind({});
Pill.args = {
  children: 'Submit',
  pill: true,
  size: 'xs',
  color: 'success',
};

export const Semantic = Template.bind({});
Semantic.args = { children: 'Submit', size: 'small', color: 'teal' };
