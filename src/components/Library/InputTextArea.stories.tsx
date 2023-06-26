/* eslint-disable no-alert */
import React from 'react';

import Form from '@components/Library/Form';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from 'semantic-ui-react';

import InputTextArea from './InputTextArea';

export default {
  title: 'Form/Textarea',
  argTypes: {
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder to use. This will overwrite default Placeholder rules.',
      table: {
        category: 'Form',
        defaultValue: {
          summary: null,
        },
      },
    },
    label: {
      control: { type: 'text' },
      description: "Text for field's label.",
      table: {
        category: 'Form',
        defaultValue: {
          summary: null,
        },
      },
    },
    required: {
      control: { type: 'boolean' },
      description: 'Is field required?',
      table: {
        category: 'Form',
        defaultValue: {
          summary: false,
        },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Is field disabled?',
      table: {
        category: 'Form',
        defaultValue: {
          summary: false,
        },
      },
    },
  },
} as ComponentMeta<typeof InputTextArea>;

const Template: ComponentStory<typeof InputTextArea> = (args) => (
  <Form onSubmit={(prop) => window.alert(JSON.stringify(prop))}>
    <InputTextArea {...args} name="input" />
    <Button style={{ marginTop: 15 }} type="submit">
      Submit
    </Button>
  </Form>
);

export const Default = Template.bind({});
Default.args = {
  name: 'textarea',
  spaced: false,
  rounded: false,
  className: '',
  placeholder: undefined,
  label: 'Description',
  required: false,
  formProps: {},
};
