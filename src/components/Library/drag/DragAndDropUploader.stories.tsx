/* eslint-disable no-alert */
import React from 'react';

import { ComponentStory } from '@storybook/react';

import DragAndDropUploader from './DragAndDropUploader';

export default {
  title: 'DragAndDropUploader',
  argTypes: {
    icon: {
      description: 'Panel icon',
      type: {
        required: false,
      },
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'icon-cloud-upload',
        },
      },
    },
    label: {
      description: 'Panel label',
      type: {
        required: false,
      },
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'Drag & Drop your file',
        },
      },
    },
    mobileLabel: {
      description: 'Panel label for small devices',
      type: {
        required: false,
      },
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'Select your file',
        },
      },
    },
    subtitle: {
      description: 'Label subtitle',
      type: {
        required: false,
      },
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'null',
        },
      },
    },
    buttonText: {
      description: 'Browse button label',
      type: {
        required: false,
      },
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'Browse to upload',
        },
      },
    },
    multiple: {
      description: 'Can select multiple files?',
      type: {
        required: false,
      },
      table: {
        type: {
          summary: 'bool',
        },
        defaultValue: {
          summary: false,
        },
      },
    },
    maxSize: {
      description: 'Max file size (unlimited if not set)',
      type: {
        required: false,
      },
      table: {
        type: {
          summary: 'integer',
        },
        defaultValue: {
          summary: 'null',
        },
      },
    },
    allowedTypes: {
      description: 'Allowed file types (allow any type if not set)',
      type: {
        required: false,
      },
      table: {
        type: {
          summary: 'array of string',
        },
        defaultValue: {
          summary: 'null',
        },
      },
    },
    accept: {
      description: 'Allowed extensions on file browser (allow any type if not set)',
      type: {
        required: false,
      },
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'null',
        },
      },
    },
    previousFiles: {
      description: 'List of already uploaded files',
      type: {
        required: false,
      },
      table: {
        type: {
          summary: 'array of string',
        },
        defaultValue: {
          summary: '[]',
        },
      },
    },
    onFileSelected: {
      description: 'File selected callback',
      type: {
        required: true,
      },
      table: {
        type: {
          summary: 'function',
        },
      },
    },
    isLoading: {
      description: 'Is uploading?',
      type: {
        required: false,
      },
      table: {
        type: {
          summary: 'bool',
        },
        defaultValue: {
          summary: false,
        },
      },
    },
    errorMessage: {
      description: 'Error message',
      type: {
        required: false,
      },
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'null',
        },
      },
    },
  },
};

const Template: ComponentStory<typeof DragAndDropUploader> = (args) => (
  <DragAndDropUploader {...args} />
);

export const Default = Template.bind({});
Default.args = {
  icon: 'icon-cloud-upload',
  label: 'Drag & Drop your file',
  mobileLabel: 'Select your file',
  subtitle: 'Some subtitle text',
  buttonText: 'Browse to Upload',
  multiple: false,
  maxSize: null,
  allowedTypes: ['image/jpeg', 'image/png'],
  accept: '.jpg, .jpeg',
  previousFiles: [],
  onFileSelected: () => window.alert('File Selected'),
  isLoading: false,
  errorMessage: null,
};
