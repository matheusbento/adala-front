import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import Accordion from './Accordion';

export default {
  title: 'Accordion',
  argTypes: {
    accordionHandler: {
      action: 'onClick Action',
      description: 'Callback used on click (When not disabled)',
    },
    active: { type: { name: 'boolean' }, description: '' },
    disabled: {
      type: { name: 'boolean' },
      description: 'Whether the button should be disabled',
    },
    token: { type: { name: 'string' || 'number' }, description: '' },
    size: { type: { name: 'string' }, description: '' },
  },
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = (args) => (
  <Accordion {...args} />
);

export const Default = Template.bind({});
Default.args = {
  accordionHandler: (token: string) => alert(`Clicked: ${token}`),
  active: false,
  token: 'token',
  disabled: false,
};
