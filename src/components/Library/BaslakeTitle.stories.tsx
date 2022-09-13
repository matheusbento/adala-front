import React from 'react';

import Button from '@components/Library/Button';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Menu } from 'semantic-ui-react';

import BaslakeTitle from './BaslakeTitle';

export default {
  title: 'Baslake/Baslake Title',
  argTypes: {
    title: { type: { name: 'string' }, required: true, description: '' },
  },
} as ComponentMeta<typeof BaslakeTitle>;

const Template: ComponentStory<typeof BaslakeTitle> = (args) => (
  <BaslakeTitle {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Title',
};

export const WithTitleAndMenu = Template.bind({});
WithTitleAndMenu.args = {
  title: 'Title',
  children: (
    <>
      <Menu.Item>
        <Button pill color="primary">
          Menu Item
        </Button>
      </Menu.Item>
      <Menu.Item position="right">
        <Button pill outline color="success">
          Add New
        </Button>
      </Menu.Item>
    </>
  ),
};
