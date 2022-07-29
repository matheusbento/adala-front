import { Component, useMemo } from 'react';

import { css } from 'glamor';
import { get, isNaN } from 'lodash';
import { useFormContext } from 'react-hook-form';
import { Checkbox } from 'semantic-ui-react';

import buildFormField from '@utils/buildFormField';
import { display, flex } from '@utils/themeConstants';

import {
  colors,
  fontSizes,
  padding,
  fontWeight,
  spacing,
} from '../../utils/theme';

const styleDefault = css({
  '&.ui.checkbox': {
    ...display.flex,
    ...flex.alignItemsCenter,
    minHeight: 20,
  },
  '&.ui.checkbox > label': {
    fontWeight: fontWeight.w500,
  },
  '&.ui.checkbox > label:before': {
    width: '20px',
    height: '20px',
    top: '-3px',
    borderRadius: spacing.xxs,
  },
  '&.ui.checkbox.checked > label:before': {
    backgroundColor: `${colors.primary} !important`,
    borderColor: `${colors.primary} !important`,
  },
  '&.ui.checkbox.checked > label:after': {
    color: `${colors.white} !important`,
    content: "'\\E800'",
  },
  '&.ui.checkbox input:not([type=radio]):indeterminate ~ label:after': {
    color: `${colors.white} !important`,
  },
  '&.ui.checkbox > label:after': {
    width: '20px',
    height: '20px',
    top: '0px',
  },
});

const styleReverse = css({
  '&.ui.checkbox.checked > label:before': {
    top: '-2px',
    backgroundColor: `${colors.white} !important`,
  },
  '&.ui.checkbox.checked > label:after': {
    color: `${colors.primary} !important`,
  },
  '&.ui.checkbox input:not([type=radio]):indeterminate ~ label:after': {
    color: `${colors.primary} !important`,
  },
});

const styleSmallBox = css({
  '&.ui.checkbox': {
    height: 20,
  },
  '&.ui.checkbox > label': {
    ...padding.leftMd,
    fontWeight: fontWeight.w400,
  },
  '&.ui.checkbox > label:before': {
    width: '14px',
    height: '14px',
    top: '2px',
    left: '2px',
    borderRadius: '2px',
    backgroundColor: `${colors.greyLighter} !important`,
  },
  '&.ui.checkbox.checked > label:before': {
    backgroundColor: `${colors.primary} !important`,
    borderColor: `${colors.greyLight} !important`,
  },
  '&.ui.checkbox.checked > label:after': {
    content: 'none',
  },
});

const FieldForm = buildFormField(
  Checkbox,
  (input: Component, error: any, props: Record<string, any>) => ({
    ...input,
    ...props,
    label: props?.text,
    error,
  })
);

export interface InputCheckboxProps {
  label?: string;
  text?: string;
  labelSize?: string;
  labelColor?: string;
  reverse?: boolean;
  smallBox?: boolean;
  disabled?: boolean;
  className?: string;
  name: string;
  required?: boolean;
  formProps?: any;
  toggle?: boolean;
  slider?: boolean;
  input?: any;
}

const InputCheckbox = ({
  label,
  text,
  labelSize = 'sm',
  labelColor,
  reverse = false,
  name,
  required = false,
  formProps,
  smallBox = false,
  disabled = false,
  className,
  slider,
  toggle = false,
  ...rest
}: InputCheckboxProps) => {
  const { register, setValue, formState, watch } = useFormContext();

  const styleProps = css({
    '&.ui.checkbox > label': {
      ...fontSizes[labelSize],
      color: labelColor,
    },
  });

  const styleForm = css(
    smallBox ? styleSmallBox : styleDefault,
    reverse && styleReverse,
    !!labelSize && styleProps
  );

  const message = useMemo(() => {
    const error = get<any, string>(formState?.errors, name);

    if (error?.type === 'required' && !required) {
      return null;
    }

    return error?.message;
  }, [formState, name, required]);

  const value = watch(name);

  const isChecked = useMemo(() => (isNaN(value) ? 0 : value), [value]);

  return (
    <FieldForm
      {...rest}
      checked={!!isChecked}
      label={label}
      text={text}
      className={`${toggle || slider ? '' : styleForm} ${className}`}
      disabled={disabled}
      {...register(name, {
        required: required ? 'This field is required' : false,
        ...formProps,
      })}
      onChange={(
        _: any,
        { name: inputName, value: val }: Record<string, any>
      ) => {
        setValue(inputName, val ? 0 : 1, {
          shouldDirty: true,
        });
      }}
      required={required}
      error={message}
      value={isChecked}
      toggle={toggle}
      slider={slider}
    />
  );
};
export default InputCheckbox;
