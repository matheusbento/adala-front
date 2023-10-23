import { Component, useMemo } from 'react';

import buildFormField from '@utils/buildFormField';
import { get } from 'lodash';
import { useFormContext } from 'react-hook-form';
import DragAndDropUploader from './DragAndDropUploader';

const FieldForm = buildFormField(
  DragAndDropUploader,
  (input: Component, error: any, { inputIcon, autoComplete, ...props }: Record<string, any>) => ({
    icon: inputIcon,
    ...input,
    autoComplete: autoComplete ?? 'off',
    ...props,
    error,
  }),
);

export interface IRestProps {
  label?: string;
  disabled?: boolean;
  fluid?: boolean;
}

export interface IInputDragDropFileProps {
  className?: string;
  icon?: string | null;
  name: string;
  required?: boolean;
  formProps?: Record<string, any>;
  multiple?: boolean;
  showFiles?: boolean;
  label?: string;
  mobileLabel?: string;
  subtitle?: string | null;
  buttonText?: string;
  maxSize?: number | null;
  allowedTypes?: string[] | null;
  accept?: string | null;
  previousFiles?: string[];
  onFileSelected?: (files: FileList, previousFiles: string[]) => void;
  isLoading?: boolean;
  errorMessage?: string | null;
  loaderLabel?: string;
  // input?: IInputProp | null;
  [key: string]: any; // for the ...props spread
}

function InputDragDropFile({
  name,
  icon,
  placeholder,
  width = 'auto',
  className = '',
  required = false,
  formProps = {},
  ...rest
}: IInputDragDropFileProps & Partial<IRestProps>) {
  const { register, setValue, formState, watch } = useFormContext();

  const defaultPlaceholder = useMemo(
    () => placeholder || `Enter ${rest?.label ? rest.label.toLowerCase() : 'text'}`,
    [placeholder, rest.label],
  );

  const message = useMemo(() => {
    const error = get<any, string>(formState?.errors, name);

    if (error?.type === 'required' && !required) {
      return null;
    }

    return error?.message;
  }, [formState, name, required]);

  const handleUpload = (act: any) => {
    setValue(name, act, {
      shouldDirty: true,
    });
  };

  return (
    <>
      <FieldForm
        {...rest}
        {...register(name, {
          required: required ? 'This field is required' : false,
          ...formProps,
        })}
        type="file"
        required={required}
        // error={message}
        errorMessage={message}
        input={{
          id: name,
          onChange: handleUpload,
          value: watch(name) ?? [],
        }}
        // value={fileNames ?? ''}
        className={`${className}`}
        placeholder={placeholder || defaultPlaceholder}
      />
      {icon && <i aria-hidden="true" className={`${icon} icon`} />}
    </>
  );
}

export default InputDragDropFile;
