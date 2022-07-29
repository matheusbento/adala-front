import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import ModalConfirm from './ModalConfirm';

const mockedOnConfirm = jest.fn();
const mockedOnDismiss = jest.fn();

describe('ModalConfirm component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should display a header, confirmation text, confirm label and dismiss label.', () => {
    const { queryByText } = render(
      <ModalConfirm
        onConfirm={mockedOnConfirm}
        onDismiss={mockedOnDismiss}
        header="Test header"
        confirmText="Test confirm text"
        labelConfirm="Label confirm"
        labelDismiss="Label dismiss"
        open
      />
    );

    const textElement1 = queryByText('Test header');
    const textElement2 = queryByText('Test confirm text');
    const textElement3 = queryByText('Label confirm');
    const textElement4 = queryByText('Label dismiss');

    expect(textElement1).toBeTruthy();
    expect(textElement2).toBeTruthy();
    expect(textElement3).toBeTruthy();
    expect(textElement4).toBeTruthy();
  });

  it('should not display the modal if open prop is false.', () => {
    const { queryByText } = render(
      <ModalConfirm
        onConfirm={mockedOnConfirm}
        onDismiss={mockedOnDismiss}
        header="Test header"
      />
    );

    const textElement = queryByText('Test header');

    expect(textElement).toBeFalsy();
  });

  it('should execute onSubmit function on confirm button click.', () => {
    const { queryByText } = render(
      <ModalConfirm
        onConfirm={mockedOnConfirm}
        onDismiss={mockedOnDismiss}
        header="Test header"
        confirmText="Test confirm text"
        labelConfirm="Label confirm"
        labelDismiss="Label dismiss"
        open
      />
    );

    const textElement = queryByText('Label confirm');

    fireEvent.click(textElement as Element);

    expect(mockedOnConfirm).toHaveBeenCalled();
  });

  it('should execute onDismiss function on confirm button click.', () => {
    const { queryByText } = render(
      <ModalConfirm
        onConfirm={mockedOnConfirm}
        onDismiss={mockedOnDismiss}
        header="Test header"
        confirmText="Test confirm text"
        labelConfirm="Label confirm"
        labelDismiss="Label dismiss"
        open
      />
    );

    const textElement = queryByText('Label dismiss');

    fireEvent.click(textElement as Element);

    expect(mockedOnDismiss).toHaveBeenCalled();
  });

  it('should display a captcha input.', () => {
    const { queryByText, queryByPlaceholderText } = render(
      <ModalConfirm
        onConfirm={mockedOnConfirm}
        onDismiss={mockedOnDismiss}
        header="Test header"
        confirmText="Test confirm text"
        labelConfirm="Label confirm"
        labelDismiss="Label dismiss"
        open
        captchaText="Text to check"
      />
    );

    const textElement = queryByText(
      'Please type Text to check to confirm your action'
    );
    const inputElement = queryByPlaceholderText('Type Text to check here');

    expect(textElement).toBeTruthy();
    expect(inputElement).toBeTruthy();
  });

  it('should disable confirm button if a wrong captcha is sent.', () => {
    const { queryByText, queryByPlaceholderText } = render(
      <ModalConfirm
        onConfirm={mockedOnConfirm}
        onDismiss={mockedOnDismiss}
        header="Test header"
        confirmText="Test confirm text"
        labelConfirm="Label confirm"
        labelDismiss="Label dismiss"
        open
        captchaText="Text to check"
      />
    );

    const inputElement = queryByPlaceholderText('Type Text to check here');

    fireEvent.change(inputElement as Element, {
      target: { value: 'wrong captcha' },
    });
    const textElement = queryByText('Test confirm text');
    fireEvent.click(textElement as Element);

    expect(mockedOnConfirm).not.toHaveBeenCalled();
  });

  it('should enable confirm button if the right captcha is sent.', () => {
    const { queryByText, queryByPlaceholderText } = render(
      <ModalConfirm
        onConfirm={mockedOnConfirm}
        onDismiss={mockedOnDismiss}
        header="Test header"
        confirmText="Test confirm text"
        labelConfirm="Label confirm"
        labelDismiss="Label dismiss"
        open
        captchaText="Text to check"
      />
    );

    const inputElement = queryByPlaceholderText('Type Text to check here');

    fireEvent.change(inputElement as Element, {
      target: { value: 'Text to check' },
    });

    const textElement = queryByText('Label confirm');

    fireEvent.click(textElement as Element);

    expect(mockedOnConfirm).toHaveBeenCalled();
  });
});
