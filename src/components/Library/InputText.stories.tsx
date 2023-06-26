/* eslint-disable no-alert */
import React from 'react';

import Form from '@components/Library/Form';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from 'semantic-ui-react';

import InputText from './InputText';

export default {
  title: 'Form/Input Text',
  argTypes: {
    negative: {
      control: { type: 'boolean' },
      description: 'Negative styling (use dark background).',
      table: {
        category: 'Styles',
        defaultValue: {
          summary: false,
        },
      },
    },
    spaced: {
      control: { type: 'boolean' },
      description: 'Spaced styling.',
      table: {
        category: 'Styles',
        defaultValue: {
          summary: false,
        },
      },
    },
    rounded: {
      control: { type: 'boolean' },
      description: 'Rounded styling.',
      table: {
        category: 'Styles',
        defaultValue: {
          summary: false,
        },
      },
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder to use. This will overwrite default Placeholder rules.',
      table: {
        category: 'UI',
        defaultValue: {
          summary: null,
        },
      },
    },
    label: {
      control: { type: 'text' },
      description: "Text for field's label.",
      table: {
        category: 'UI',
        defaultValue: {
          summary: null,
        },
      },
    },
    required: {
      control: { type: 'boolean' },
      description: 'Is field required?',
      table: {
        category: 'UI',
        defaultValue: {
          summary: false,
        },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Is field disabled?',
      table: {
        category: 'UI',
        defaultValue: {
          summary: false,
        },
      },
    },
  },
} as ComponentMeta<typeof InputText>;

const Template: ComponentStory<typeof InputText> = (args) => (
  <Form onSubmit={(prop) => window.alert(JSON.stringify(prop))}>
    <InputText {...args} name="input" />
    <Button style={{ marginTop: 15 }} type="submit">
      Submit
    </Button>
  </Form>
);

export const Default = Template.bind({});

Default.args = {
  width: 'auto',
  className: '',
  placeholder: '',
  label: '',
  negative: false,
  spaced: false,
  rounded: false,
  icon: null,
  inputIcon: null,
  required: false,
  disabled: false,
  formProps: {},
};
