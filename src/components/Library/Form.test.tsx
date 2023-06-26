/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';

import Form from '@components/Library/Form';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import { Button } from 'semantic-ui-react';

import InputText from './InputText';

const mockedOnSubmit = jest.fn();

describe('InputMoney component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should be able to render a form with default values.', () => {
    act(() => {
      const { queryByRole } = render(
        <Form
          onSubmit={mockedOnSubmit}
          formArgs={{
            defaultValues: {
              input: 'Test Value',
            },
          }}
        >
          <InputText name="input" />
          <Button aria-label="button" name="button" type="submit" />
        </Form>,
      );

      const inputElement = queryByRole('textbox');

      expect(inputElement).toHaveProperty('value', 'Test Value');
    });
  });

  it('should be able to submit a form.', async () => {
    const { queryByRole, rerender } = render(
      <Form onSubmit={mockedOnSubmit}>
        <InputText name="input" />
        <Button aria-label="button" name="button" type="submit" />
      </Form>,
    );

    act(() => {
      rerender(
        <Form
          onSubmit={mockedOnSubmit}
          formArgs={{
            defaultValues: {
              input: 'Test Value',
            },
          }}
        >
          <InputText name="input" />
          <Button aria-label="button" name="button" type="submit" />
        </Form>,
      );
    });

    const inputElement = queryByRole('textbox');
    const buttonElement = queryByRole('button');

    await waitFor(() => {
      fireEvent.change(inputElement as Element, {
        target: { value: 'Other Test Value' },
      });
      fireEvent.click(buttonElement as Element);
    });

    expect(inputElement).toHaveProperty('value', 'Other Test Value');
    expect(mockedOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockedOnSubmit.mock.calls[0][0]).toStrictEqual({
      input: 'Other Test Value',
    });
  });

  it('should not submit a form if no onSubmit function iss passed.', async () => {
    const { queryByRole } = render(
      <Form onSubmit={() => {}}>
        <InputText name="input" />
        <Button aria-label="button" name="button" type="submit" />
      </Form>,
    );

    const inputElement = queryByRole('textbox');
    const buttonElement = queryByRole('button');

    await waitFor(() => {
      fireEvent.change(inputElement as Element, {
        target: { value: 'Other Test Value' },
      });
      fireEvent.click(buttonElement as Element);
    });

    expect(inputElement).toHaveProperty('value', 'Other Test Value');
    expect(mockedOnSubmit).not.toHaveBeenCalled();
  });
});
