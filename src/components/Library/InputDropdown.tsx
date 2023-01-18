import { Component, useEffect, useMemo } from 'react';

import { css } from 'glamor';
import { get } from 'lodash';
import { useFormContext } from 'react-hook-form';
import { Dropdown } from 'semantic-ui-react';

import { doubleEscapeSpecialChars, isSelectorValid } from '../../helpers';
import buildFormField from '../../utils/buildFormField';
import { padding, fontSizes } from '../../utils/theme';

const styleSpaced = css(padding.ySm, padding.xMd, fontSizes.md);

const FieldForm = buildFormField(
  Dropdown,
  (input: Component, error: any, props: Record<string, any>) => ({
    ...input,
    autoComplete: props?.autoComplete ?? 'off',
    ...props,
    value:
      props?.multiple && !Array.isArray(props?.value)
        ? [props?.value].filter((item) => !!item)
        : props?.value,
    error,
    className: `${props?.className} scrolling`,
  })
);

export interface InputDropdownProps {
  spaced?: boolean;
  options?: Record<any, any>;
  laravelOptions?: any;
  arrayOptions?: string[];
  placeholder?: string;
  value?: any;
  disabled?: boolean;
  onChange?: any;
  search?: boolean;
  fluid?: boolean;
  useDescriptionAsValue?: boolean;
  name: string;
  formProps?: Record<any, any>;
  selection?: boolean;
  label?: string;
  autoComplete?: string;
  id?: any;
}

export interface RestProps {
  required?: boolean;
  multiple?: boolean;
}

const InputDropdown = ({
  placeholder,
  spaced = false,
  options,
  laravelOptions,
  arrayOptions,
  onChange,
  value,
  multiple = false,
  useDescriptionAsValue = false,
  name,
  required = false,
  formProps,
  selection,
  ...childProps
}: InputDropdownProps & Partial<RestProps>) => {
  const styleField = css(spaced && styleSpaced);

  const { register, setValue, formState, watch } = useFormContext();

  const laravelToOptions = (arr: any) =>
    arr.length
      ? arr.map((item: any) => ({
          key: item.id,
          value: useDescriptionAsValue ? item.description : item.id,
          text: item.description ? item.description : item.name,
        }))
      : arr;

  const arrayToOptions = (arr: any) =>
    arr.length
      ? arr.map((item: any) => ({
          key: item,
          value: item,
          text: item,
        }))
      : arr;

  let childOptions;

  if (options) {
    childOptions = options;
  } else if (laravelOptions) {
    childOptions = laravelToOptions(laravelOptions);
  } else if (arrayOptions) {
    childOptions = arrayToOptions(arrayOptions);
  }

  const defaultPlaceholder = useMemo(
    () =>
      `Select ${childProps.label ? childProps.label.toLowerCase() : 'item'}`,
    [childProps.label]
  );

  const message = useMemo(() => {
    const error = get<any, string>(formState?.errors, name);

    if (error?.type === 'required' && !required) {
      return null;
    }

    return error?.message;
  }, [formState, name, required]);

  useEffect(() => {
    if (childProps?.id && childProps?.autoComplete) {
      const id = doubleEscapeSpecialChars(childProps.id);

      if (isSelectorValid(id)) {
        const input = document.querySelector(`#${id} > input`);
        if (input) input.setAttribute('autocomplete', childProps.autoComplete);
      }
    }
  }, [childProps?.id, childProps?.autoComplete]);

  return (
    <FieldForm
      options={childOptions}
      placeholder={placeholder || defaultPlaceholder}
      className={`${styleField}`}
      {...register(name, {
        required: required ? 'This field is required' : false,
        ...formProps,
      })}
      onChange={(
        _: any,
        { name: inputName, value: val }: Record<string, any>
      ) => {
        onChange?.(val);
        setValue(inputName, val, {
          shouldDirty: true,
        });
      }}
      multiple={multiple}
      required={required}
      error={message}
      selection={selection}
      value={watch(name)}
      {...childProps}
    />
  );
};

export default InputDropdown;
