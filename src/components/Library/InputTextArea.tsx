import { Component, useMemo } from 'react';

import { css } from 'glamor';
import { get } from 'lodash';
import { useFormContext } from 'react-hook-form';
import { TextArea as SemanticTextArea } from 'semantic-ui-react';

import buildFormField from 'utils/buildFormField';
import { spacing, input as InputStyles, padding, fontSizes } from 'utils/theme';

const styleTextarea = css(InputStyles.select);
const styleSpaced = css({
  '& textarea': {
    ...padding.ySm,
    ...padding.xMd,
    ...fontSizes.md,
  },
});
const styleRounded = css({
  '& textarea': {
    borderRadius: `${spacing.m} !important`,
  },
});

const FieldForm = buildFormField(
  SemanticTextArea,
  (input: Component, error: any, props: Record<string, any>) => ({
    ...input,
    ...props,
    error,
  })
);

export interface RestProps {
  label?: string;
  disabled?: boolean;
}

export interface InputTextAreaProps {
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
}

const InputTextArea = ({
  spaced,
  rounded,
  className,
  placeholder,
  name,
  required,
  formProps,
  ...childProps
}: InputTextAreaProps & RestProps) => {
  const styleField = css(
    styleTextarea,
    spaced && styleSpaced,
    rounded && styleRounded
  );

  const { register, setValue, formState, watch } = useFormContext();

  const defaultPlaceholder = `Enter ${
    childProps.label ? childProps.label.toLowerCase() : 'text'
  }`;

  const message = useMemo(() => {
    const error = get<any, string>(formState?.errors, name);

    if (error?.type === 'required' && !required) {
      return null;
    }

    return error?.message;
  }, [formState, name, required]);

  return (
    <FieldForm
      {...childProps}
      className={`${styleField} ${className}`}
      placeholder={placeholder || defaultPlaceholder}
      required={required}
      {...register(name, { required, ...formProps })}
      onChange={(
        _: any,
        { name: inputName, value: val }: Record<string, any>
      ) => {
        setValue(inputName, val, {
          shouldDirty: true,
        });
      }}
      error={message}
      value={watch(name)}
    />
  );
};

export default InputTextArea;
