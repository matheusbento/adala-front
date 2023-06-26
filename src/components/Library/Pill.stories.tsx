import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import Pill from './Pill';

export default {
  title: 'Pill',
  argTypes: {
    children: {
      table: {
        type: { summary: 'node' },
      },
      control: { type: 'text' },
    },
    color: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
      control: {
        type: 'select',
        options: ['primary', 'warning', 'danger', 'success', 'disabled', 'light', 'dark', 'purple'],
      },
    },
    active: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
      control: { type: 'boolean' },
    },
    disabled: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
      control: { type: 'boolean' },
    },
    button: {
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
      },
      control: { type: 'boolean' },
    },
    size: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'sm' },
      },
      control: {
        type: 'select',
        options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'],
      },
    },
  },
} as ComponentMeta<typeof Pill>;

const Template: ComponentStory<typeof Pill> = (args) => <Pill {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Some pill text',
};
