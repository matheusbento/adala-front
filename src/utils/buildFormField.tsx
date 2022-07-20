/* eslint-disable react/display-name */
import { useMemo, useRef, useImperativeHandle, forwardRef } from 'react';

import { css } from 'glamor';
import { When } from 'react-if';
import NumberFormat from 'react-number-format';
import { Ref, Checkbox, TextArea } from 'semantic-ui-react';

import { ErrorTypeMultiple, ErrorTypeSingle } from 'types/ErrorType';

import FormLabel from '../components/Library/FormLabel';
import Text from '../components/Library/Text';
import TypeOf from '../constants/typeOfConstants';
import { margin, input as InputStyles } from './theme';

const styleAlert = css(margin.yXxs);

export interface BuildFormFieldProps {
  name?: string;
  error?: any;
  label?: string;
  required?: boolean;
  multiple?: boolean;
  options?: any;
  selection?: boolean;
  disabled?: boolean;
  onChange?: any;
  checked?: boolean;
  toggle?: boolean;
  slider?: boolean;
  value?: any;
  text?: string;
  placeholder?: string;
}

export interface Rest {
  className?: string;
}

const BuildFormField = (InputComponent: any, selectProps: any) => {
  const buildFormField = forwardRef(
    (
      {
        name,
        error,
        label,
        required,
        disabled,
        ...rest
      }: BuildFormFieldProps & Partial<Rest>,
      ref
    ) => {
      const inputRef = useRef(null);

      useImperativeHandle(ref, () => ({
        // add any ref functions needed here
        // e.g.
        // focus() {
        //   inputRef.current.focus();
        // },
      }));

      const isTextareaOrNumberFormat = useMemo(
        () =>
          InputComponent === TextArea ||
          InputComponent === NumberFormat ||
          InputComponent === Checkbox,
        []
      );

      const hasError = useMemo(
        () =>
          typeof error === TypeOf.string
            ? error?.length === 0 || !!error
            : null,
        [error]
      );

      const styleWrapper = css(
        InputStyles.default,
        hasError ? InputStyles.error : null,
        disabled ? InputStyles.disabled : null
      );

      return (
        <div className={`${styleWrapper} ${rest.className ?? ''}`}>
          <When condition={label}>
            {() => (
              <FormLabel
                required={required}
                htmlFor={name}
                color={hasError ? 'error' : 'default'}
              >
                {label}
              </FormLabel>
            )}
          </When>
          <span>
            <Ref innerRef={inputRef}>
              <InputComponent
                {...selectProps({ name, id: name }, error, rest)}
                error={
                  isTextareaOrNumberFormat ? hasError?.toString() : hasError
                }
                disabled={disabled}
              />
            </Ref>
            <When condition={hasError}>
              {() => (
                <Text
                  as="p"
                  className={`${styleAlert}`}
                  color="danger"
                  size="xxs"
                  weight="demiBold"
                >
                  {error || 'This field is invalid'}
                </Text>
              )}
            </When>
          </span>
        </div>
      );
    }
  );

  return buildFormField;
};

BuildFormField.displayName = 'BuildFormField';

export default BuildFormField;
