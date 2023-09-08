import { Component, useMemo } from 'react';

import { display, flex, margin } from '@/utils/themeConstants';
import buildFormField from '@utils/buildFormField';
import { spacing } from '@utils/theme';
import { css } from 'glamor';
import { get } from 'lodash';
import { useFormContext } from 'react-hook-form';
import { When } from 'react-if';
import { Segment } from 'semantic-ui-react';
import { InputFile as FileInput } from 'semantic-ui-react-input-file';
import Button from './Button';
import Text from './Text';

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
  FileInput,
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

export interface IInputFileProps {
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

function InputFile({
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
}: IInputFileProps & Partial<IRestProps>) {
  const { register, setValue, formState, watch } = useFormContext();

  const styleField = css(
    spaced && styleSpaced,
    rounded && styleRounded,
    negative && styleNegative,
    {
      width,
    },
  );

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
    setValue(name, act.target.files, {
      shouldDirty: true,
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const currentFile = useMemo(() => Array.from(watch(name) ?? {}), [watch()]);

  console.log({ currentFile });

  return (
    <>
      <When condition={currentFile?.length}>
        {currentFile?.map((file: any) => {
          return (
            <Segment className={`${css(display.flex, flex.alignItemsCenter)}`}>
              <Text>{file.name}</Text>
              <div>
                <Button
                  outline
                  color="default"
                  fluid
                  pill
                  onClick={() => {
                    setValue(name, null, { shouldDirty: true });
                  }}
                  type="button"
                  icon="icon-trash-line"
                  className={`${css(margin.leftSm)}`}
                />
              </div>
            </Segment>
          );
        })}
      </When>
      <FieldForm
        {...rest}
        {...register(name, {
          required: required ? 'This field is required' : false,
          ...formProps,
        })}
        type="file"
        required={required}
        error={message}
        input={{
          id: name,
          onChange: handleUpload,
        }}
        // value={fileNames ?? ''}
        className={`${styleField} ${className}`}
        placeholder={placeholder || defaultPlaceholder}
      />
      {icon && <i aria-hidden="true" className={`${icon} icon`} />}
    </>
  );
}

export default InputFile;
