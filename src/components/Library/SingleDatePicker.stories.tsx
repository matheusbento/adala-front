import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import SingleDatePicker from './SingleDatePicker';

export default {
  title: 'Form/SingleDatePicker',
  argTypes: {
    error: { control: { type: 'boolean' } },
  },
} as ComponentMeta<typeof SingleDatePicker>;

const Template: ComponentStory<typeof SingleDatePicker> = (args: any) => (
  <SingleDatePicker {...args} />
);

export const Default = Template.bind({});
