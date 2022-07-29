import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import PolicyCheck from './PolicyCheck';

export default {
  title: 'PolicyCheck',
  argTypes: {
    children: { type: { name: 'string', required: true }, description: '' },
    policy: { type: { name: 'boolean', required: true }, description: '' },
  },
} as ComponentMeta<typeof PolicyCheck>;

const Template: ComponentStory<typeof PolicyCheck> = (args) => (
  <PolicyCheck {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: <div>'Some PolicyCheck text'</div>,
  policy: true,
};
