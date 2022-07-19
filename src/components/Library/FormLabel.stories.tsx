import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import FormLabel from './FormLabel';

export default {
  title: 'Form/Form Label',
  argTypes: {
    children: {
      table: {
        type: { summary: 'node' },
      },
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof FormLabel>;

const Template: ComponentStory<typeof FormLabel> = (args) => (
  <FormLabel {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: 'Form Label',
};
