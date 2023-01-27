import React from 'react';

import { ComponentStory } from '@storybook/react';

import FileIcon from './FileIcon';

export default {
  title: 'FileIcon',
  argTypes: {
    mimeType: {
      description: 'File mime type',
      type: {
        required: true,
      },
      table: {
        type: {
          summary: 'string',
        },
      },
      control: {
        type: 'select',
        options: [
          'image/jpeg',
          'image/png',
          'image/gif',
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/vnd.oasis.opendocument.text',
          'text/plain',
          'application/zip',
        ],
      },
    },
    size: {
      description: 'Icon size',
      type: {
        required: false,
      },
      table: {
        type: {
          summary: 'integer',
        },
        defaultValue: {
          summary: 30,
        },
      },
    },
  },
};

const Template: ComponentStory<typeof FileIcon> = (args) => (
  <FileIcon {...args} />
);

export const Default = Template.bind({});
Default.args = {
  mimeType: 'image/jpeg',
  size: 30,
};
