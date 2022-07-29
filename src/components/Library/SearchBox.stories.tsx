import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import states from '../../constants/usStatesConstants';
import SearchBox from './SearchBox';

export default {
  title: 'SearchBox',
  argTypes: {
    context: {
      required: true,
      description:
        'Context allows the Search Filter in different Search Context (Staff Pool, Job Orders, etc)',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    currentKeyword: {
      required: false,
      description: 'This is the clue for the search',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    onChange: {
      action: 'onChange Action',
      required: true,
      description: 'Callback used when user types to search',
      table: {
        type: {
          summary: 'func',
        },
      },
    },
    onSuggestionSelected: {
      action: 'onSuggestionSelected Action',
      required: true,
      description: 'Triggers when the user selects a suggestion',
      table: {
        type: {
          summary: 'func',
        },
      },
    },
    setFilterHandler: {
      action: 'setFilter Action',
      required: true,
      description: 'Updates the outer-scope filter with the selected value',
      table: {
        type: {
          summary: 'func',
        },
      },
    },
    handleSuggestionSelectedCallback: {
      action: 'setFilter Action',
      required: true,
      description:
        'Callback called after setting the filter to the selected suggestion',
      table: {
        type: {
          summary: 'func',
        },
      },
    },
    updateUrlFiltersHandler: {
      action: 'updateUrlFilters Action',
      required: true,
      description: 'Triggers URL Filter updating after selecting a suggestion',
      table: {
        type: {
          summary: 'func',
        },
      },
    },
    suggestions: {
      required: false,
      description: 'This is the clue for the search',
      table: {
        type: {
          summary: 'Array of suggestions',
        },
        defaultValue: {
          summary: '[]',
        },
      },
    },
    className: {
      type: { name: 'string' },
      required: false,
    },
  },
} as ComponentMeta<typeof SearchBox>;

const Template: ComponentStory<typeof SearchBox> = (args) => (
  <SearchBox {...args} />
);

export const Default = Template.bind({});

Default.args = {
  suggestions: states.map((state) => ({
    suggestion: state.name,
    type: 'State',
  })),
  context: 'context1',
  currentKeyword: '',
  onChange: () => {},
  // eslint-disable-next-line no-alert
  onSuggestionSelected: () => window.alert('Suggestion selected!'),
  setFilterHandler: () => {},
  handleSuggestionSelectedCallback: () => {},
  updateUrlFiltersHandler: () => {},
};
