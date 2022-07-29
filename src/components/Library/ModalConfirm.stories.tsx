import React, { useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import Button from './Button';
import ModalConfirm from './ModalConfirm';

export default {
  title: 'Vms/ModalConfirm',
  parameters: {
    docs: {
      description: {
        component: 'Modal Confirm, extends VmsModal.',
      },
    },
  },
  argTypes: {
    closeHandler: {
      type: { required: true },
      control: { type: null },
      description: 'Handler to close modal.',
      table: {
        type: { summary: 'Function' },
      },
    },
  },
} as ComponentMeta<typeof ModalConfirm>;

const Template: ComponentStory<typeof ModalConfirm> = (args) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setOpen(!open);
        }}
      >
        Show Modal
      </Button>
      <ModalConfirm
        open={!!open}
        {...args}
        onDismiss={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  onDismiss: () => alert('canceled'), // eslint-disable-line no-alert
  onConfirm: () => alert('confirmed'), // eslint-disable-line no-alert
};

export const WithCaptcha = Template.bind({});
WithCaptcha.args = {
  onDismiss: () => alert('canceled'), // eslint-disable-line no-alert
  onConfirm: () => alert('confirmed'), // eslint-disable-line no-alert
  captchaText: 'Captcha text',
};
