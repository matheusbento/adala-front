import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import ContentGroup from './ContentGroup';

export default {
  title: 'ContentGroup',
  argTypes: {
    caption: {
      description: 'Group caption text',
      control: { type: 'text' },
      defaultValue: {
        summary: 'null',
      },
    },
    children: {
      description: 'Group content',
    },
    captionColor: {
      description: 'Caption text color',
      defaultValue: {
        summary: 'primary',
      },
      control: {
        type: 'select',
        options: ['primary', 'warning', 'danger', 'success', 'disabled', 'light', 'dark'],
      },
    },
    captionWeight: {
      description: 'Caption text weight',
      defaultValue: {
        summary: 'bold',
      },
      control: {
        type: 'select',
        options: ['light', 'normal', 'demiBold', 'bold'],
      },
    },
    captionSize: {
      description: 'Caption text size',
      defaultValue: {
        summary: 'sm',
      },
      control: {
        type: 'select',
        options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      },
    },
    leftComponent: {
      description: 'Left side component',
      type: {
        summary: 'node',
      },
      defaultValue: {
        summary: 'null',
      },
    },
    rightComponent: {
      description: 'Right side component',
      type: {
        summary: 'node',
      },
      defaultValue: {
        summary: 'null',
      },
    },
    disabled: {
      description: 'Disabled status',
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: false,
      },
      control: {
        type: 'boolean',
      },
    },
    collapsed: {
      description: 'Show children?',
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: true,
      },
      control: {
        type: 'boolean',
      },
    },
    onCaptionClick: {
      description: 'Caption click handler',
      type: {
        summary: 'function',
      },
      defaultValue: {
        summary: 'null',
      },
    },
  },
} as unknown as ComponentMeta<typeof ContentGroup>;

const Template: ComponentStory<typeof ContentGroup> = (args) => <ContentGroup {...args} />;

const Content = (
  <p>
    Vivamus suscipit tortor eget felis porttitor volutpat.
    <br />
    Proin eget tortor risus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
    posuere cubilia Curae;
    <br />
    Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.
  </p>
);

export const Default = Template.bind({});

Default.args = {
  caption: 'Caption Text',
  children: Content,
  leftComponent: <p>Left component</p>,
  rightComponent: <p>Right component</p>,
};
