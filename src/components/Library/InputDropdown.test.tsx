import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Form from 'components/Library/Form';

import InputDropdown from './InputDropdown';

const options = [
  {
    key: 1,
    value: 'option-1',
    text: 'Option 1',
  },
  {
    key: 2,
    value: 'option-2',
    text: 'Option 2',
  },
  {
    key: 3,
    value: 'option-3',
    text: 'Option 3',
  },
];

const laravelOptions = [
  {
    id: 1,
    description: 'Laravel option 1',
  },
  {
    id: 2,
    name: 'Laravel option 2',
  },
];

const arrayOptions = ['Array option 1', 'Array option 2', 'Array option 3'];

describe('InputDropdown component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should be able to display a title.', () => {
    const { queryByRole } = render(
      <Form onSubmit={() => {}}>
        <InputDropdown name="test" spaced />
      </Form>
    );

    const dropdownElement = queryByRole('listbox');

    expect(dropdownElement).toBeTruthy();
  });

  it('should be able to display a placeholder.', () => {
    const { queryByText } = render(
      <Form onSubmit={() => {}}>
        <InputDropdown placeholder="Test placeholder" name="test" />
      </Form>
    );

    const textElement = queryByText('Test placeholder');

    expect(textElement).toBeTruthy();
  });

  it('should be able to display a default placeholder.', () => {
    const { queryByText } = render(
      <Form onSubmit={() => {}}>
        <InputDropdown name="test" />
      </Form>
    );

    const textElement = queryByText('Select item');

    expect(textElement).toBeTruthy();
  });

  it('should be able to display the label on the placeholder.', () => {
    const { queryByText } = render(
      <Form onSubmit={() => {}}>
        <InputDropdown label="Test Label" name="test" />
      </Form>
    );

    const textElement = queryByText('Select test label');

    expect(textElement).toBeTruthy();
  });

  it('should be able to display options.', () => {
    const { queryByText } = render(
      <Form onSubmit={() => {}}>
        <InputDropdown name="test" options={options} />
      </Form>
    );

    options.forEach((option) => {
      const textElement = queryByText(option.text);

      expect(textElement).toBeTruthy();
    });
  });

  it('should be able to display laravelOptions.', () => {
    const { queryByText } = render(
      <Form onSubmit={() => {}}>
        <InputDropdown name="test" laravelOptions={laravelOptions} />
      </Form>
    );

    laravelOptions.forEach((option) => {
      const textElement = queryByText(
        option?.description || option?.name || ''
      );

      expect(textElement).toBeTruthy();
    });
  });

  it('should be able to render if laravelOptions id empty.', () => {
    const { queryByRole } = render(
      <Form onSubmit={() => {}}>
        <InputDropdown name="test" laravelOptions={[]} />
      </Form>
    );

    const dropdownElement = queryByRole('listbox');

    expect(dropdownElement).toBeTruthy();
  });

  it('should be able to display arrayOptions.', () => {
    const { queryByText } = render(
      <Form onSubmit={() => {}}>
        <InputDropdown name="test" arrayOptions={arrayOptions} />
      </Form>
    );

    arrayOptions.forEach((option) => {
      const textElement = queryByText(option);

      expect(textElement).toBeTruthy();
    });
  });

  it('should be able to render if arrayOptions id empty.', () => {
    const { queryByRole } = render(
      <Form onSubmit={() => {}}>
        <InputDropdown name="test" arrayOptions={[]} />
      </Form>
    );

    const dropdownElement = queryByRole('listbox');

    expect(dropdownElement).toBeTruthy();
  });

  it('should be able to select an option.', () => {
    const { queryByText, queryAllByText } = render(
      <Form onSubmit={() => {}}>
        <InputDropdown
          name="test"
          useDescriptionAsValue
          laravelOptions={laravelOptions}
        />
      </Form>
    );

    const textElement = queryByText(laravelOptions[0].description ?? '');

    fireEvent.click(textElement as Element);

    const placeholderElement = queryByText('Select item');
    const optionElements = queryAllByText(laravelOptions[0].description ?? '');

    expect(placeholderElement).toBeFalsy();
    expect(optionElements).toHaveLength(2);
  });

  it('should be able to select multiple options.', () => {
    const { queryByText, queryAllByText } = render(
      <Form onSubmit={() => {}}>
        <InputDropdown name="test" multiple arrayOptions={arrayOptions} />
      </Form>
    );

    const textElement1 = queryByText(arrayOptions[0]);
    const textElement2 = queryByText(arrayOptions[1]);

    fireEvent.click(textElement1 as Element);
    fireEvent.click(textElement2 as Element);

    const placeholderElement = queryByText('Select item');
    const optionElements1 = queryAllByText(arrayOptions[0]);
    const optionElements2 = queryAllByText(arrayOptions[0]);

    expect(placeholderElement).toBeFalsy();
    expect(optionElements1).toHaveLength(1);
    expect(optionElements2).toHaveLength(1);
  });

  it('should be able to set the input autocomplete attribute.', () => {
    const { container } = render(
      <Form onSubmit={() => {}}>
        <InputDropdown
          name="test"
          id="test-id"
          autoComplete="test-autocomplete"
          search
        />
      </Form>
    );

    const inputElement = container.querySelector(
      'input[autocomplete="test-autocomplete"]'
    );
    fireEvent.blur(inputElement as Element);

    expect(inputElement).toBeTruthy();
  });

  it('should display an asterisk on label when field is required.', () => {
    const { queryByText } = render(
      <Form onSubmit={() => {}}>
        <InputDropdown name="test" label="Test Label" required />
      </Form>
    );

    const textElement = queryByText('Test Label *');

    expect(textElement).toBeTruthy();
  });
});
