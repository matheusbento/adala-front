import React from 'react';

import { Menu } from 'semantic-ui-react';

import Button from '../Library/Button';
import VmsTitle from './VmsTitle';

export default {
  title: 'VMS/VMS Title',
  argTypes: {
    title: { type: { name: 'string' }, required: true, description: '' },
  },
};

const Template = (args) => <VmsTitle {...args} />;

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
