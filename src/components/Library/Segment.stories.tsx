import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import Segment from './Segment';

export default {
  title: 'Segment',
  argTypes: {
    children: {
      table: {
        type: { summary: 'node' },
      },
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof Segment>;

const Template: ComponentStory<typeof Segment> = (args) => <Segment {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <h1>Text</h1>
      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit.</p>
    </>
  ),
};
