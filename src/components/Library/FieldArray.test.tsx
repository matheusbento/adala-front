import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import { Grid } from 'semantic-ui-react';

import { FieldArrayTypeSingle } from 'types/FieldArrayType';

import Button from './Button';
import FieldArray from './FieldArray';
import Form from './Form';
import InputCheckbox from './InputCheckbox';
import InputText from './InputText';

const fieldArrayName = 'test';

const component = ({
  fields,
  name,
  watch,
  push,
  remove,
}: FieldArrayTypeSingle) => {
  const add = () => {
    push({ record_id: 3 });
  };

  const rm = () => {
    remove(fields.length - 1);
  };

  return (
    <>
      {fields?.map((item: any, index: any) => [
        <Grid.Row key={item} stretched>
          <Grid.Column mobile={10} tablet={10} computer={10} widescreen={10}>
            <InputText
              name={`${name}[${index}].record_id`}
              label={`record ${index}`}
              placeholder={`Enter record ${index}`}
              fluid
              required
            />
            <InputCheckbox
              name={`${name}[${index}].check`}
              required={!!watch(`${index}].record_id`)}
            />
          </Grid.Column>
        </Grid.Row>,
      ])}
      <Button id="add" type="button" onClick={add}>
        Add new Item
      </Button>
      <Button id="remove" type="button" onClick={rm}>
        Remove last Item
      </Button>
    </>
  );
};

describe('FieldArray component', () => {
  it('FieldArray should display new input text row', () => {
    const { container, queryByText, queryAllByRole } = render(
      <Form onSubmit={() => {}}>
        <FieldArray name={fieldArrayName} component={component} />
      </Form>
    );

    const addElement = container.querySelector('button[id=add]');
    fireEvent.click(addElement as Element);
    fireEvent.click(addElement as Element);

    const inputs = queryAllByRole('textbox');

    const checkboxs = queryAllByRole('checkbox');

    expect(inputs).toHaveLength(2);
    expect(checkboxs).toHaveLength(2);

    const element1 = queryByText('record 0 *');

    expect(element1).toBeTruthy();

    const element2 = queryByText('record 1 *');

    expect(element2).toBeTruthy();
  });

  it('FieldArray should display a new row and delete it', () => {
    const { container, queryByText, queryByPlaceholderText, queryAllByRole } =
      render(
        <Form onSubmit={() => {}}>
          <FieldArray name={fieldArrayName} component={component} />
        </Form>
      );

    const addElement = container.querySelector('button[id=add]');
    fireEvent.click(addElement as Element);
    fireEvent.click(addElement as Element);

    const element1 = queryByText('record 0 *');

    const inputElement = queryByPlaceholderText('Enter record 0');

    fireEvent.change(inputElement as Element, {
      target: { value: 'Test Text' },
    });

    expect(element1).toBeTruthy();

    const element2 = queryByText('record 1 *');

    expect(element2).toBeTruthy();

    const removeElement = container.querySelector('button[id=remove]');
    fireEvent.click(removeElement as Element);

    const element11 = queryByText('record 0 *');

    expect(element11).toBeTruthy();

    const element22 = queryByText('record 1 *');

    expect(element22).toBeFalsy();

    const inputs = queryAllByRole('textbox');

    const checkboxs = queryAllByRole('checkbox');

    expect(inputs).toHaveLength(1);
    expect(checkboxs).toHaveLength(1);
  });
});
