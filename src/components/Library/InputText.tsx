import { Component, useMemo } from 'react';

import { css } from 'glamor';
import { get, NumericDictionary, String } from 'lodash';

import { useFormContext } from 'react-hook-form';
import { Input } from 'semantic-ui-react';

import buildFormField from '@utils/buildFormField';
import { spacing } from '@utils/theme';
import { ErrorTypeMultiple, ErrorTypeSingle } from 'types/ErrorType';

const styleSpaced = css({
  '& input': {
    padding: `${spacing.s} ${spacing.m} !important`,
    fontSize: '1.3rem !important',
  },
});

const styleNegative = css({
  '& input': {
    backgroundColor: '#ffffff10 !important',
    color: 'white !important',
  },
});

const styleRounded = css({
  '& input': {
    borderRadius: `${spacing.m} !important`,
  },
});

const FieldForm = buildFormField(
  Input,
  (
    input: Component,
    error: any,
    { inputIcon, autoComplete, ...props }: Record<string, any>
  ) => ({
    icon: inputIcon,
    ...input,
    autoComplete: autoComplete ?? 'off',
    ...props,
    error,
  })
);

export interface RestProps {
  label?: string;
  disabled?: boolean;
  fluid?: boolean;
}

export interface InputTextProps {
  width?: string;
  className?: string;
  placeholder?: string;
  negative?: boolean;
  spaced?: boolean;
  rounded?: boolean;
  icon?: string | null;
  name: string;
  inputIcon?: string | null;
  required?: boolean;
  formProps?: Record<string, any>;
  type?: string;
  min?: number;
}

const InputText = ({
  name,
  icon,
  placeholder,
  width = 'auto',
  className = '',
  negative = false,
  spaced = false,
  rounded = false,
  required = false,
  formProps = {},
  ...rest
}: InputTextProps & Partial<RestProps>) => {
  const { register, setValue, formState, watch } = useFormContext();

  const styleField = css(
    spaced && styleSpaced,
    rounded && styleRounded,
    negative && styleNegative,
    {
      width,
    }
  );

  const defaultPlaceholder = useMemo(
    () =>
      placeholder || `Enter ${rest?.label ? rest.label.toLowerCase() : 'text'}`,
    [placeholder, rest.label]
  );

  const message = useMemo(() => {
    const error = get<any, string>(formState?.errors, name);

    if (error?.type === 'required' && !required) {
      return null;
    }

    return error?.message;
  }, [formState, name, required]);

  return (
    <>
      <FieldForm
        {...rest}
        {...register(name, {
          required: required ? 'This field is required' : false,
          ...formProps,
        })}
        onChange={(
          _: any,
          { name: inputName, value: val }: Record<string, string>
        ) => {
          setValue(inputName, val, {
            shouldDirty: true,
          });
        }}
        required={required}
        error={message}
        value={watch(name) ?? ''}
        className={`${styleField} ${className}`}
        placeholder={placeholder || defaultPlaceholder}
      />
      {icon && <i aria-hidden="true" className={`${icon} icon`} />}
    </>
  );
};

export default InputText;
