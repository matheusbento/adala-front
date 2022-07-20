import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Grid } from 'semantic-ui-react';

import Form from 'components/Library/Form';

import { FieldArrayTypeSingle } from 'types/FieldArrayType';

import Button from './Button';
import FieldArray from './FieldArray';
import InputDropdown from './InputDropdown';

export default {
  title: 'Form/FieldArray',
  argTypes: {},
} as ComponentMeta<typeof FieldArray>;

const initialValues = {
  defaultValues: {
    data: [
      { id: 1, agency_id: 1 },
      { id: 2, agency_id: 2 },
    ],
  },
};

const options = [
  {
    id: 1,
    name: 'Agency Test 1',
  },
  {
    id: 2,
    name: 'Agency Test 2',
  },
  {
    id: 3,
    name: 'Agency Test 3',
  },
];

const component = ({ fields, name, push, remove }: FieldArrayTypeSingle) => {
  const add = () => {
    push({ agency_id: 3 });
  };
  const rm = () => {
    remove(fields.length - 1);
  };
  return (
    <>
      {fields?.map((item: any, index: any) => [
        <Grid.Row key={item} stretched>
          <Grid.Column mobile={10} tablet={10} computer={10} widescreen={10}>
            <InputDropdown
              name={`${name}[${index}].agency_id`}
              label={`Agency ${index}`}
              laravelOptions={options}
              placeholder="Search agency"
              disabled={false}
              required
              fluid
              selection
              search
            />
          </Grid.Column>
        </Grid.Row>,
      ])}
      <Button type="button" onClick={add}>
        Add new Item
      </Button>
      <Button type="button" onClick={rm}>
        Remove last Item
      </Button>
    </>
  );
};

const Template: ComponentStory<typeof FieldArray> = (args) => (
  <Form onSubmit={() => {}} formArgs={{ mode: 'onChange', ...initialValues }}>
    <FieldArray {...args} />
  </Form>
);

export const Default = Template.bind({});
Default.args = {
  component,
  name: 'data',
};
