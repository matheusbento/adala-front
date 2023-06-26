import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import CloseModalIcon from './CloseModalIcon';

export default {
  title: 'CloseModalIcon',
  argTypes: {
    onClick: {
      name: 'onClick',
      description: 'Click callback',
      table: {
        type: {
          summary: 'function',
        },
        defaultValue: {
          summary: null,
        },
      },
    },
  },
} as ComponentMeta<typeof CloseModalIcon>;

const Template: ComponentStory<typeof CloseModalIcon> = (args) => <CloseModalIcon {...args} />;

export const Default = Template.bind({});
Default.args = {
  // eslint-disable-next-line no-alert
  onClick: () => window.alert('You clicked'),
};
