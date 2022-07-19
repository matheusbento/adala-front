import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import Text from './Text';

export default {
  title: 'Text',
  component: Text,
  argTypes: {
    children: {
      table: {
        type: { summary: 'node' },
      },
      control: { type: 'text' },
    },
    as: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'span' },
      },
      control: {
        type: 'text',
      },
    },
    weight: {
      control: {
        type: 'select',
        options: ['light', 'regular', 'medium', 'demiBold', 'bold'],
      },
    },
    size: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'xs' },
      },
      control: {
        type: 'select',
        options: ['xxxs', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
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
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Content',
};
