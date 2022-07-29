import React from 'react';

import { render } from '@testing-library/react';

import Form from '@components/Library/Form';

import InputTextArea from './InputTextArea';

describe('InputTextArea component', () => {
  it('should be able to display a placeholder.', () => {
    const { queryByPlaceholderText } = render(
      <Form onSubmit={() => {}}>
        <InputTextArea
          name="test"
          spaced
          rounded
          placeholder="Test placeholder"
        />
      </Form>
    );

    const textAreaElement = queryByPlaceholderText('Test placeholder');

    expect(textAreaElement).toBeTruthy();
  });

  it('should be able to display a default placeholder.', () => {
    const { queryByPlaceholderText } = render(
      <Form onSubmit={() => {}}>
        <InputTextArea name="test" />
      </Form>
    );

    const textAreaElement = queryByPlaceholderText('Enter text');

    expect(textAreaElement).toBeTruthy();
  });

  it('should be able to display the label on the placeholder.', () => {
    const { queryByPlaceholderText } = render(
      <Form onSubmit={() => {}}>
        <InputTextArea name="test" label="Test Label" />
      </Form>
    );

    const textAreaElement = queryByPlaceholderText('Enter test label');

    expect(textAreaElement).toBeTruthy();
  });
});
