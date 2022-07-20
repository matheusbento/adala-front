import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Form from 'components/Library/Form';

import InputText from './InputText';

describe('InputText component', () => {
  it('should display input.', () => {
    const { queryByRole } = render(
      <Form onSubmit={() => {}}>
        <InputText name="test" spaced rounded negative />
      </Form>
    );

    const inputElement = queryByRole('textbox');

    expect(inputElement).toBeTruthy();
  });

  it('should display a placeholder.', () => {
    const { queryByPlaceholderText } = render(
      <Form onSubmit={() => {}}>
        <InputText name="test" placeholder="Test Placeholder" />
      </Form>
    );

    const placeholderElement = queryByPlaceholderText('Test Placeholder');

    expect(placeholderElement).toBeTruthy();
  });

  it('should display the label on placeholder.', () => {
    const { queryByPlaceholderText } = render(
      <Form onSubmit={() => {}}>
        <InputText name="test" label="Test Label" />
      </Form>
    );

    const placeholderElement = queryByPlaceholderText('Enter test label');

    expect(placeholderElement).toBeTruthy();
  });

  it('should display an icon.', () => {
    const { container } = render(
      <Form onSubmit={() => {}}>
        <InputText name="test" icon="test-icon" />
      </Form>
    );

    const iconElement = container.querySelector('i[class="test-icon icon"]');

    expect(iconElement).toBeTruthy();
  });

  it('should display an asterisk on label when field is required.', () => {
    const { queryByText } = render(
      <Form onSubmit={() => {}}>
        <InputText name="test" label="Test Label" required />
      </Form>
    );

    const textElement = queryByText('Test Label *');

    expect(textElement).toBeTruthy();
  });

  it('should be able to change its value.', () => {
    const { queryByPlaceholderText } = render(
      <Form onSubmit={() => {}}>
        <InputText name="test" />
      </Form>
    );

    const inputElement = queryByPlaceholderText('Enter text');

    fireEvent.change(inputElement as Element, {
      target: { value: 'Test Text' },
    });

    expect(inputElement).toHaveProperty('value', 'Test Text');
  });
});
