import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import Alert from './Alert';

export default {
  title: 'Alert',
  component: Alert,
  parameters: {
    docs: {
      description: {
        component:
          '**IMPORTANT:** This components extends the `<Message />` component).',
      },
    },
  },
  argTypes: {
    borderless: {
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
    header: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      control: { type: 'text' },
    },
    content: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      control: { type: 'text' },
    },
    colorIcon: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'icon-clock' },
      },
      control: { type: 'text' },
    },
    loading: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
      control: { type: 'boolean' },
    },
    size: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'xs' },
      },
      control: {
        type: 'select',
        options: ['mini', 'tiny', 'small', 'large', 'big', 'huge', 'massive'],
      },
    },
    color: {
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: 'primary' },
      },
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
  },
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

export const InfoAlert = Template.bind({});
InfoAlert.args = {
  info: true,
  icon: 'icon-info',
  header: 'Header',
  content: 'Content',
};
