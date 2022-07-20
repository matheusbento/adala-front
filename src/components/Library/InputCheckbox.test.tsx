import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Form from './Form';
import InputCheckbox from './InputCheckbox';

const text = 'Test text';

describe('InputCheckbox component', () => {
  it('should display a text.', () => {
    const { getByText } = render(
      <Form onSubmit={() => {}}>
        <InputCheckbox text={text} name="test" />
      </Form>
    );

    const inputElementLabel = getByText(text);

    expect(inputElementLabel).toBeTruthy();
  });

  it('should display a checked box when prop checked is false', () => {
    const { getByTestId } = render(
      <Form onSubmit={() => {}}>
        <InputCheckbox data-testid="test" text={text} name="test" required />
      </Form>
    );

    const toastElement = getByTestId('test');

    expect(toastElement.children[0]).toHaveProperty('checked', false);

    fireEvent.click(toastElement.children[0]);

    expect(toastElement.children[0]).toHaveProperty('checked', true);
    fireEvent.click(toastElement.children[0]);

    expect(toastElement.children[0]).toHaveProperty('checked', false);
  });

  it('should display a disabled checkbox', () => {
    const { getByTestId } = render(
      <Form onSubmit={() => {}}>
        <InputCheckbox data-testid="test" text={text} name="test" disabled />
      </Form>
    );

    const toastElement = getByTestId('test');

    expect(toastElement.children[0]).toHaveProperty('disabled', true);
  });

  it('should display a small checkbox', () => {
    const { getByTestId } = render(
      <Form onSubmit={() => {}}>
        <InputCheckbox data-testid="test" text={text} name="test" smallBox />
      </Form>
    );

    const toastElement = getByTestId('test');

    expect(toastElement).toBeTruthy();
  });

  it('should display a reverse checkbox', () => {
    const { getByTestId } = render(
      <Form onSubmit={() => {}}>
        <InputCheckbox data-testid="test" text={text} name="test" reverse />
      </Form>
    );

    const toastElement = getByTestId('test');

    expect(toastElement).toBeTruthy();
  });
});
