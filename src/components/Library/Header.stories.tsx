import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import Header from './Header';

export default {
  title: 'Header',
  argTypes: {
    as: {
      control: {
        type: 'select',
        options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h5'],
      },
    },
    line: { control: { type: 'boolean' } },
    color: {
      control: {
        type: 'select',
        options: [
          'default',
          'primary',
          'primaryHover',
          'warning',
          'success',
          'danger',
          'negative',
          'silver',
          'blue',
          'green',
          'purpleLight',
          'greyLightest',
          'greyLighter',
          'greyLight',
          'greyIcon',
          'grey',
          'greyLabel',
          'greyDark',
          'greyDarker',
          'greyDarkest',
          'black',
          'shadow',
          'redLight',
          'redLightest',
          'redDark',
          'red',
          'white',
        ],
      },
    },
    hexColor: { control: { type: 'color' } },
    weight: { control: { type: 'number' } },
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Header',
};
