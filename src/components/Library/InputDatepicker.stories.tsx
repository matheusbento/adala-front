import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import moment from 'moment';
import { Button } from 'semantic-ui-react';

import Form from 'components/Library/Form';

import Datepicker from './InputDatepicker';

export default {
  title: 'Form/Datepicker',
  parameters: {
    docs: {
      description: {
        component: 'This components extends the `<SingleDatePicker />` component.',
      },
    },
  },
  argTypes: {
    withDropdowns: {
      control: { type: 'boolean' },
      description: 'Activates year/month dropdowns for easy access.',
      table: {
        category: 'Datepicker',
        defaultValue: {
          summary: false,
        },
        type: { summary: 'Boolean' },
      },
    },
    lastYearAvailable: {
      control: { type: 'number' },
      description: 'Last year available in dropdown.',
      table: {
        category: 'Datepicker',
        defaultValue: {
          detail: '5 years into the future (calculated using moment()).',
        },
        type: { summary: 'Number' },
      },
    },
    firstYearAvailable: {
      control: { type: 'number' },
      description: 'First year available in dropdown.',
      table: {
        category: 'Datepicker',
        defaultValue: {
          detail: '20 years ago (calculated using moment()).',
        },
        type: { summary: 'Number' },
      },
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder to use. This will overwrite default Placeholder rules.',
      table: {
        category: 'Form',
        defaultValue: {
          summary: null,
        },
        type: { summary: 'String' },
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
        type: { summary: 'String' },
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
        type: { summary: 'Boolean' },
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
        type: { summary: 'Boolean' },
      },
    },
  },
} as ComponentMeta<typeof Datepicker>;

const Template: ComponentStory<typeof Datepicker> = (args) => (
  <Form onSubmit={(prop) => window.alert(JSON.stringify(prop))}>
    <Datepicker {...args} />
    <Button style={{ marginTop: 15 }} type="submit">
      Submit
    </Button>
  </Form>
);

export const Default = Template.bind({});
Default.args = {
  withDropdowns: false,
  lastYearAvailable: moment().year() + 5,
  firstYearAvailable: moment().year() - 20,
  placeholder: '',
  required: false,
  label: 'Select a date',
  name: 'datepicker',
  formProps: {},
  setDate: null,
  disabled: false,
};
