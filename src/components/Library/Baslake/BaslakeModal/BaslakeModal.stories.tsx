/* eslint-disable no-alert */
import React, { useState } from 'react';

import Button from '@components/Library/Button';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import BaslakeModal from './BaslakeModal';

export default {
  title: 'Baslake/Baslake Modal',
  parameters: {
    docs: {
      description: {
        component: 'Modal Confirm, extends BaslakeModal.',
      },
    },
  },
  argTypes: {
    closeHandler: {
      control: { type: null },
      description: 'Handler to close modal.',
      table: {
        type: { summary: 'Function' },
      },
    },
    size: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'xs' },
      },
      control: {
        type: 'select',
        options: ['mini', 'tiny', 'small', 'large', 'big', 'huge', 'massive'],
      },
    },
  },
} as ComponentMeta<typeof BaslakeModal>;

const Template: ComponentStory<typeof BaslakeModal> = (args) => {
  const [open, setOpen] = useState(false);
  const [withActions, setWithActionsOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setOpen(!open);
        }}
      >
        Show Modal
      </Button>
      <BaslakeModal open={!!open} {...args} closeHandler={() => setOpen(false)}>
        <BaslakeModal.Content>
          <p>Content</p>
        </BaslakeModal.Content>
        <BaslakeModal.Actions>
          <Button
            pill
            color="default"
            outline
            onClick={() => setWithActionsOpen(false)}
          >
            Dismiss
          </Button>
          <Button
            pill
            color="success"
            onClick={() => setWithActionsOpen(false)}
          >
            Confirm
          </Button>
        </BaslakeModal.Actions>
      </BaslakeModal>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: 'Modal Title',
  onDismiss: () => alert('canceled'),
  onConfirm: () => alert('confirmed'),
};
