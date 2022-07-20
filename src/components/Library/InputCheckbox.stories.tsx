import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { fontSizes, colors } from '../../utils/theme';
import Form from './Form';
import InputCheckbox from './InputCheckbox';

export default {
  title: 'Form/Input Checkbox',
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Text for input label.',
    },
    labelColor: {
      control: { type: 'color', presetColors: Object.values(colors) },
      description: 'Text color for input text.',
    },
    labelSize: {
      control: { type: 'select', options: Object.keys(fontSizes) },
      description: 'Text size for input text.',
    },
  },
} as ComponentMeta<typeof InputCheckbox>;

const Template: ComponentStory<typeof InputCheckbox> = (args) => (
  <Form onSubmit={() => {}}>
    <InputCheckbox {...args} name="test" />
  </Form>
);

export const Default = Template.bind({});
Default.args = {
  label: 'Checkbox',
  text: 'Checkbox text',
  labelSize: 'sm',
  labelColor: '#000000',
  reverse: false,
  smallBox: false,
  disabled: false,
  className: '',
  required: false,
  toggle: false,
  slider: false,
  formProps: {},
};
