import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import FormMessage from './FormMessage';

export default {
  title: 'Form/Form Message',
  argTypes: {
    size: {
      defaultValue: 'medium',
      control: {
        type: 'select',
        options: [
          'red',
          'orange',
          'yellow',
          'olive',
          'green',
          'teal',
          'blue',
          'violet',
          'purple',
          'pink',
          'brown',
          'grey',
          'black',
        ],
      },
    },
    type: {
      defaultValue: 'error',
      control: {
        type: 'select',
        options: ['error', 'warning', 'success', 'info'],
      },
    },
    error: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
      control: { type: 'boolean' },
    },
    warning: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
      control: { type: 'boolean' },
    },
    info: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
      control: { type: 'boolean' },
    },
    success: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
      control: { type: 'boolean' },
    },
    visible: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
      control: { type: 'boolean' },
    },
    header: {
      type: { name: 'string' },
      required: false,
    },
    content: {
      type: { name: 'string' },
      required: false,
    },
  },
} as ComponentMeta<typeof FormMessage>;

const Template: ComponentStory<typeof FormMessage> = (args) => (
  <FormMessage {...args} />
);

export const Default = Template.bind({});
Default.args = {
  header: 'Message title',
  content: 'Message here',
};

export const WithList = Template.bind({});
WithList.args = {
  header: 'Message title',
  list: ['Message 1', 'Message 2'],
  visible: true,
};

export const WithTimeout = Template.bind({});
WithTimeout.args = {
  header: 'Message title',
  content: 'Message here',
  timeout: 3000,
};
