import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import DragAndDropUploader from './DragAndDropUploader';

const mockedOnFileSelected = jest.fn();

const mockedOnChange = jest.fn();

const file1 = { size: 30, type: 'image/jpeg' };
const file2 = { size: 300, type: 'image/png' };
const file3 = { size: 20, type: 'image/gif' };

const errorMessage = 'You cannot select multiple files';

describe('DragAndDropUploader component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should display a default icon, a default label, a default mobile label, a default button text and a default load label.', () => {
    const { container, queryByText } = render(
      <DragAndDropUploader
        onFileSelected={mockedOnFileSelected}
        icon={null}
        label={null}
        mobileLabel={null}
        subtitle={null}
        buttonText={null}
        multiple={false}
        maxSize={null}
        allowedTypes={null}
        accept={null}
        previousFiles={[]}
        input={null}
        isLoading={false}
        errorMessage={null}
        loaderLabel={null}
        showFiles={false}
        name={null}
      />
    );

    const iconElement = container.querySelector(
      'span[data-src="/images/icon-cloud-upload.svg"]'
    );
    const labelElement = queryByText('Drag & Drop your file');
    const mobileLabelElement = queryByText('Select your file');
    const buttonElement = queryByText('Browse to Upload');
    const loaderLabel = queryByText('Uploading');

    expect(iconElement).toBeTruthy();
    expect(labelElement).toBeTruthy();
    expect(mobileLabelElement).toBeTruthy();
    expect(buttonElement).toBeTruthy();
    expect(loaderLabel).toBeTruthy();
  });

  it('should display an icon.', () => {
    const { container } = render(
      <DragAndDropUploader
        onFileSelected={mockedOnFileSelected}
        icon="test-icon"
        label={null}
        mobileLabel={null}
        subtitle={null}
        buttonText={null}
        multiple={false}
        maxSize={null}
        allowedTypes={null}
        accept={null}
        previousFiles={[]}
        input={null}
        isLoading={false}
        errorMessage={null}
        loaderLabel={null}
        showFiles={false}
        name={null}
      />
    );

    const iconElement = container.querySelector(
      'span[data-src="/images/test-icon.svg"]'
    );

    expect(iconElement).toBeTruthy();
  });

  it('should display a label.', () => {
    const { queryByText } = render(
      <DragAndDropUploader
        onFileSelected={mockedOnFileSelected}
        label="Test Label"
        icon={null}
        mobileLabel={null}
        subtitle={null}
        buttonText={null}
        multiple={false}
        maxSize={null}
        allowedTypes={null}
        accept={null}
        previousFiles={[]}
        input={null}
        isLoading={false}
        errorMessage={null}
        loaderLabel={null}
        showFiles={false}
        name={null}
      />
    );

    const labelElement = queryByText('Test Label');

    expect(labelElement).toBeTruthy();
  });

  it('should display a mobile label.', () => {
    const { queryByText } = render(
      <DragAndDropUploader
        onFileSelected={mockedOnFileSelected}
        mobileLabel="Test Mobile Label"
        icon={null}
        label={null}
        subtitle={null}
        buttonText={null}
        multiple={false}
        maxSize={null}
        allowedTypes={null}
        accept={null}
        previousFiles={[]}
        input={null}
        isLoading={false}
        errorMessage={null}
        loaderLabel={null}
        showFiles={false}
        name={null}
      />
    );

    const mobileLabelElement = queryByText('Test Mobile Label');

    expect(mobileLabelElement).toBeTruthy();
  });

  it('should display a button text.', () => {
    const { queryByText } = render(
      <DragAndDropUploader
        onFileSelected={mockedOnFileSelected}
        buttonText="Test Button Text"
        icon={null}
        label={null}
        mobileLabel={null}
        subtitle={null}
        multiple={false}
        maxSize={null}
        allowedTypes={null}
        accept={null}
        previousFiles={[]}
        input={null}
        isLoading={false}
        errorMessage={null}
        loaderLabel={null}
        showFiles={false}
        name={null}
      />
    );

    const buttonElement = queryByText('Test Button Text');

    expect(buttonElement).toBeTruthy();
  });

  it('should display a load label.', () => {
    const { queryByText } = render(
      <DragAndDropUploader
        onFileSelected={mockedOnFileSelected}
        loaderLabel="Test Loader Label"
        icon={null}
        label={null}
        mobileLabel={null}
        subtitle={null}
        buttonText={null}
        multiple={false}
        maxSize={null}
        allowedTypes={null}
        accept={null}
        previousFiles={[]}
        input={null}
        isLoading={false}
        errorMessage={null}
        showFiles={false}
        name={null}
      />
    );

    const loaderLabelElement = queryByText('Test Loader Label');

    expect(loaderLabelElement).toBeTruthy();
  });

  it('should display a subtitle.', () => {
    const { queryByText } = render(
      <DragAndDropUploader
        onFileSelected={mockedOnFileSelected}
        subtitle="Test Subtitle Label"
        icon={null}
        label={null}
        mobileLabel={null}
        buttonText={null}
        multiple={false}
        maxSize={null}
        allowedTypes={null}
        accept={null}
        previousFiles={[]}
        input={null}
        isLoading={false}
        errorMessage={null}
        loaderLabel={null}
        showFiles={false}
        name={null}
      />
    );

    const subtitleElement = queryByText('Test Subtitle Label');

    expect(subtitleElement).toBeTruthy();
  });

  it('should execute onFileSelected function on drop.', () => {
    const { getByText } = render(
      <DragAndDropUploader
        onFileSelected={mockedOnFileSelected}
        icon={null}
        label={null}
        mobileLabel={null}
        subtitle={null}
        buttonText={null}
        multiple={false}
        maxSize={null}
        allowedTypes={null}
        accept={null}
        previousFiles={[]}
        input={null}
        isLoading={false}
        errorMessage={null}
        loaderLabel={null}
        showFiles={false}
        name={null}
      />
    );

    fireEvent.drop(getByText(/Drag & Drop your file/i), {
      dataTransfer: {
        files: [file1],
        clearData: jest.fn(),
      },
    });

    expect(mockedOnFileSelected).toHaveBeenCalledWith([file1], []);
  });

  it('should execute onFileSelected function on input change.', () => {
    const { container, queryByRole } = render(
      <DragAndDropUploader
        onFileSelected={mockedOnFileSelected}
        icon={null}
        label={null}
        mobileLabel={null}
        subtitle={null}
        buttonText={null}
        multiple={false}
        maxSize={null}
        allowedTypes={null}
        accept={null}
        previousFiles={[]}
        input={null}
        isLoading={false}
        errorMessage={null}
        loaderLabel={null}
        showFiles={false}
        name={null}
      />
    );

    const buttonElement = queryByRole('button') as Element;
    const inputElement = container.querySelector(
      'input[type="file"]'
    ) as Element;

    fireEvent.click(buttonElement);
    fireEvent.change(inputElement, { target: { files: [file1] } });

    expect(mockedOnFileSelected).toHaveBeenCalledWith([file1], []);
  });

  it('should execute onFileSelected function with previous files on drop.', () => {
    const { getByText } = render(
      <DragAndDropUploader
        onFileSelected={mockedOnFileSelected}
        previousFiles={['file2']}
        icon={null}
        label={null}
        mobileLabel={null}
        subtitle={null}
        buttonText={null}
        multiple={false}
        maxSize={null}
        allowedTypes={null}
        accept={null}
        input={null}
        isLoading={false}
        errorMessage={null}
        loaderLabel={null}
        showFiles={false}
        name={null}
      />
    );

    const dropElement = getByText(/Drag & Drop your file/i);

    fireEvent.dragEnter(dropElement, {
      dataTransfer: {
        items: [file1],
      },
    });

    fireEvent.dragOver(dropElement, {
      dataTransfer: {
        items: [file1],
      },
    });

    fireEvent.drop(dropElement, {
      dataTransfer: {
        files: [file1],
        clearData: jest.fn(),
      },
    });

    fireEvent.dragLeave(dropElement, {
      dataTransfer: {
        items: [],
      },
    });

    expect(mockedOnFileSelected).toHaveBeenCalledWith([file1], ['file2']);
  });

  it('should execute onFileSelected function with previous files on input change.', () => {
    const { container } = render(
      <DragAndDropUploader
        onFileSelected={mockedOnFileSelected}
        previousFiles={['file2']}
        icon={null}
        label={null}
        mobileLabel={null}
        subtitle={null}
        buttonText={null}
        multiple={false}
        maxSize={null}
        allowedTypes={null}
        accept={null}
        input={null}
        isLoading={false}
        errorMessage={null}
        loaderLabel={null}
        showFiles={false}
        name={null}
      />
    );

    const inputElement = container.querySelector(
      'input[type="file"]'
    ) as Element;

    fireEvent.change(inputElement, { target: { files: [file1] } });

    expect(mockedOnFileSelected).toHaveBeenCalledWith([file1], ['file2']);
  });

  it('should execute onFileSelected function on drop with multiple files.', () => {
    const { getByText } = render(
      <DragAndDropUploader
        multiple
        onFileSelected={mockedOnFileSelected}
        icon={null}
        label={null}
        mobileLabel={null}
        subtitle={null}
        buttonText={null}
        maxSize={null}
        allowedTypes={null}
        accept={null}
        previousFiles={[]}
        input={null}
        isLoading={false}
        errorMessage={null}
        loaderLabel={null}
        showFiles={false}
        name={null}
      />
    );

    const dropElement = getByText(/Drag & Drop your file/i);

    fireEvent.drop(dropElement, {
      dataTransfer: {
        files: [file2, file1],
        clearData: jest.fn(),
      },
    });

    expect(mockedOnFileSelected).toHaveBeenCalledWith([file2, file1], []);
  });

  it('should execute onFileSelected function on input change with multiple files.', () => {
    const { container } = render(
      <DragAndDropUploader
        multiple
        onFileSelected={mockedOnFileSelected}
        icon={null}
        label={null}
        mobileLabel={null}
        subtitle={null}
        buttonText={null}
        maxSize={null}
        allowedTypes={null}
        accept={null}
        previousFiles={[]}
        input={null}
        isLoading={false}
        errorMessage={null}
        loaderLabel={null}
        showFiles={false}
        name={null}
      />
    );

    const inputElement = container.querySelector(
      'input[type="file"]'
    ) as Element;

    fireEvent.change(inputElement, { target: { files: [file2, file1] } });

    expect(mockedOnFileSelected).toHaveBeenCalledWith([file2, file1], []);
  });

  it('should not execute onFileSelected function on drop if multiples files are selected but not permitted.', () => {
    const { queryByText } = render(
      <DragAndDropUploader
        onFileSelected={mockedOnFileSelected}
        icon={null}
        label={null}
        mobileLabel={null}
        subtitle={null}
        buttonText={null}
        multiple={false}
        maxSize={null}
        allowedTypes={null}
        accept={null}
        previousFiles={[]}
        input={null}
        isLoading={false}
        errorMessage={null}
        loaderLabel={null}
        showFiles={false}
        name={null}
      />
    );

    const dropElement = queryByText(/Drag & Drop your file/i) as Element;

    fireEvent.drop(dropElement, {
      dataTransfer: {
        files: [file2, file1],
        clearData: jest.fn(),
      },
    });

    const textElement = queryByText(errorMessage);

    expect(mockedOnFileSelected).not.toHaveBeenCalled();
    expect(textElement).toBeTruthy();
  });

  it('should not execute onFileSelected function on input change if multiples files are selected but not permitted.', () => {
    const { container, queryByText } = render(
      <DragAndDropUploader
        onFileSelected={mockedOnFileSelected}
        icon={null}
        label={null}
        mobileLabel={null}
        subtitle={null}
        buttonText={null}
        multiple={false}
        maxSize={null}
        allowedTypes={null}
        accept={null}
        previousFiles={[]}
        input={null}
        isLoading={false}
        errorMessage={null}
        loaderLabel={null}
        showFiles={false}
        name={null}
      />
    );

    const inputElement = container.querySelector(
      'input[type="file"]'
    ) as Element;

    fireEvent.change(inputElement, { target: { files: [file2, file1] } });

    const textElement = queryByText(errorMessage);

    expect(mockedOnFileSelected).not.toHaveBeenCalled();
    expect(textElement).toBeTruthy();
  });

  it('should be able to set an error message.', () => {
    const { queryByText } = render(
      <DragAndDropUploader
        onFileSelected={mockedOnFileSelected}
        errorMessage="Test Error Message"
        icon={null}
        label={null}
        mobileLabel={null}
        subtitle={null}
        buttonText={null}
        multiple={false}
        maxSize={null}
        allowedTypes={null}
        accept={null}
        previousFiles={[]}
        input={null}
        isLoading={false}
        loaderLabel={null}
        showFiles={false}
        name={null}
      />
    );

    const textElement = queryByText('Test Error Message');

    expect(textElement).toBeTruthy();
  });

  it('should be able to replace the internal error message with an external one.', () => {
    const { container, queryByText, rerender } = render(
      <DragAndDropUploader
        onFileSelected={mockedOnFileSelected}
        icon={null}
        label={null}
        mobileLabel={null}
        subtitle={null}
        buttonText={null}
        multiple={false}
        maxSize={null}
        allowedTypes={null}
        accept={null}
        previousFiles={[]}
        input={null}
        isLoading={false}
        errorMessage={null}
        loaderLabel={null}
        showFiles={false}
        name={null}
      />
    );

    const inputElement = container.querySelector(
      'input[type="file"]'
    ) as Element;

    fireEvent.change(inputElement, { target: { files: [file2, file1] } });

    rerender(
      <DragAndDropUploader
        onFileSelected={mockedOnFileSelected}
        errorMessage="Test Error Message"
        icon={null}
        label={null}
        mobileLabel={null}
        subtitle={null}
        buttonText={null}
        multiple={false}
        maxSize={null}
        allowedTypes={null}
        accept={null}
        previousFiles={[]}
        input={null}
        isLoading={false}
        loaderLabel={null}
        showFiles={false}
        name={null}
      />
    );

    const textElement = queryByText('Test Error Message');

    expect(textElement).toBeTruthy();
  });

  it('should not allow files larger than maxSize limit.', () => {
    const { queryByText } = render(
      <DragAndDropUploader
        onFileSelected={mockedOnFileSelected}
        maxSize={50}
        icon={null}
        label={null}
        mobileLabel={null}
        subtitle={null}
        buttonText={null}
        multiple={false}
        allowedTypes={null}
        accept={null}
        previousFiles={[]}
        input={null}
        isLoading={false}
        errorMessage={null}
        loaderLabel={null}
        showFiles={false}
        name={null}
      />
    );

    const dropElement = queryByText(/Drag & Drop your file/i) as Element;

    fireEvent.drop(dropElement, {
      dataTransfer: {
        files: [file2],
        clearData: jest.fn(),
      },
    });

    const textElement = queryByText(
      'File size is too large. Please try again.'
    );

    expect(textElement).toBeTruthy();
    expect(mockedOnFileSelected).not.toHaveBeenCalled();
  });

  it('should allow files smaller than maxSize limit.', () => {
    const { queryByText } = render(
      <DragAndDropUploader
        onFileSelected={mockedOnFileSelected}
        maxSize={50}
        icon={null}
        label={null}
        mobileLabel={null}
        subtitle={null}
        buttonText={null}
        multiple={false}
        allowedTypes={null}
        accept={null}
        previousFiles={[]}
        input={null}
        isLoading={false}
        errorMessage={null}
        loaderLabel={null}
        showFiles={false}
        name={null}
      />
    );

    const dropElement = queryByText(/Drag & Drop your file/i) as Element;

    fireEvent.drop(dropElement, {
      dataTransfer: {
        files: [file1],
        clearData: jest.fn(),
      },
    });

    const textElement = queryByText(
      'File size is too large. Please try again.'
    );

    expect(textElement).toBeFalsy();
    expect(mockedOnFileSelected).toHaveBeenCalledWith([file1], []);
  });

  it('should not allow files with not allowed types.', () => {
    const { queryByText } = render(
      <DragAndDropUploader
        onFileSelected={mockedOnFileSelected}
        allowedTypes={['image/jpeg', 'image/png']}
        icon={null}
        label={null}
        mobileLabel={null}
        subtitle={null}
        buttonText={null}
        multiple={false}
        maxSize={null}
        accept={null}
        previousFiles={[]}
        input={null}
        isLoading={false}
        errorMessage={null}
        loaderLabel={null}
        showFiles={false}
        name={null}
      />
    );

    const dropElement = queryByText(/Drag & Drop your file/i) as Element;

    fireEvent.drop(dropElement, {
      dataTransfer: {
        files: [file3],
        clearData: jest.fn(),
      },
    });

    const textElement = queryByText('File type not allowed');

    expect(textElement).toBeTruthy();
    expect(mockedOnFileSelected).not.toHaveBeenCalled();
  });

  it('should not allow files multiple files with not allowed types.', () => {
    const { queryByText } = render(
      <DragAndDropUploader
        onFileSelected={mockedOnFileSelected}
        allowedTypes={['image/jpeg', 'image/png']}
        multiple
        icon={null}
        label={null}
        mobileLabel={null}
        subtitle={null}
        buttonText={null}
        maxSize={null}
        accept={null}
        previousFiles={[]}
        input={null}
        isLoading={false}
        errorMessage={null}
        loaderLabel={null}
        showFiles={false}
        name={null}
      />
    );

    const dropElement = queryByText(/Drag & Drop your file/i) as Element;

    fireEvent.drop(dropElement, {
      dataTransfer: {
        files: [file1, file3],
        clearData: jest.fn(),
      },
    });

    const textElement = queryByText('One or more file types are not allowed');

    expect(textElement).toBeTruthy();
    expect(mockedOnFileSelected).not.toHaveBeenCalled();
  });

  it('should execute function on input change without onFileSelected.', () => {
    const { container, queryByRole } = render(
      <DragAndDropUploader
        input={{ value: null, onChange: mockedOnChange }}
        showFiles
        icon={null}
        label={null}
        mobileLabel={null}
        subtitle={null}
        buttonText={null}
        multiple={false}
        maxSize={null}
        allowedTypes={null}
        accept={null}
        previousFiles={[]}
        onFileSelected={undefined}
        isLoading={false}
        errorMessage={null}
        loaderLabel={null}
        name={null}
      />
    );

    const buttonElement = queryByRole('button') as Element;
    const inputElement = container.querySelector(
      'input[type="file"]'
    ) as Element;

    fireEvent.click(buttonElement);
    fireEvent.change(inputElement, { target: { files: [file1] } });

    expect(mockedOnFileSelected).not.toHaveBeenCalled();
    expect(mockedOnChange).toHaveBeenCalled();
  });

  it('should execute function on input change without onFileSelected with a array value preset.', () => {
    const { queryByText } = render(
      <DragAndDropUploader
        input={{ value: [{ name: 'stringfile' }], onChange: mockedOnChange }}
        showFiles
        icon={null}
        label={null}
        mobileLabel={null}
        subtitle={null}
        buttonText={null}
        multiple={false}
        maxSize={null}
        allowedTypes={null}
        accept={null}
        previousFiles={[]}
        onFileSelected={undefined}
        isLoading={false}
        errorMessage={null}
        loaderLabel={null}
        name={null}
      />
    );

    const textElement = queryByText('stringfile');
    expect(textElement).toBeTruthy();
  });
});
