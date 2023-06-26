import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import AddItem from './AddItem';

export default {
  title: 'AddItem',
  argTypes: {
    icon: { type: { name: 'string' }, description: 'Button icon' },
    label: { type: { name: 'string' }, description: 'Button label' },
    addHandler: {
      action: 'onClick Action',
      type: { name: 'func' },
      description: 'Callback used on click to Add something (When not disabled)',
    },
    className: {
      type: { name: 'string' },
    },
    disabled: {
      action: 'Disables the action',
      type: { name: 'boolean' },
      description: 'Whether the button should be disabled or not',
    },
  },
} as unknown as ComponentMeta<typeof AddItem>;

const Template: ComponentStory<typeof AddItem> = (args) => <AddItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  icon: 'icon-plus-line',
  label: 'Add an item',
  disabled: false,
};
