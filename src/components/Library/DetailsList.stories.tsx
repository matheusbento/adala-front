import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import DetailsList from './DetailsList';

export default {
  title: 'DetailsList',
} as ComponentMeta<typeof DetailsList>;

const Template: ComponentStory<typeof DetailsList> = (args) => <DetailsList {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Title',
  description: 'Description',
};
