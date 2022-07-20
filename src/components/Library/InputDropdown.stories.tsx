/* eslint-disable no-alert */
import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from 'semantic-ui-react';

import Form from 'components/Library/Form';

import states from 'constants/usStatesConstants';

import InputDropdown from './InputDropdown';

export default {
  title: 'Form/InputDropdown',
  argTypes: {
    onChange: { action: 'onChange Action' },
    clearable: { control: { type: 'boolean' } },
    fluid: { control: { type: 'boolean' } },
    multiple: { control: { type: 'boolean' } },
    spaced: { control: { type: 'boolean' } },
  },
} as ComponentMeta<typeof InputDropdown>;

const Template: ComponentStory<typeof InputDropdown> = (args) => (
  <Form onSubmit={(prop) => window.alert(JSON.stringify(prop))}>
    <InputDropdown {...args} />
    <Button style={{ marginTop: 15 }} type="submit">
      Submit
    </Button>
  </Form>
);

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Select your state',
  name: 'state',
  fluid: true,
  multiple: false,
  label: 'Select your state',
  required: false,
  useDescriptionAsValue: false,
  spaced: false,
  formProps: {},
  laravelOptions: states,
};
