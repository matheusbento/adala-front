import { ReactNode, useEffect } from 'react';

import { useForm, FormProvider, UseFormProps } from 'react-hook-form';
import { Form as SemanticForm } from 'semantic-ui-react';

export interface FormArgsProps {
  mode: string;
  reValidateMode: string;
  defaultValues: Record<string, any>;
  resolver?: string;
  context?: string;
  criteriaMode?: string;
  shouldFocusError: boolean;
  shouldUnregister: boolean;
  shouldUseNativeValidation: boolean;
  delayError: boolean | undefined;
}

export interface FormProps {
  onSubmit: (props: any) => void;
  children?: ReactNode;
  formArgs?: UseFormProps;
}

function Form({
  onSubmit,
  formArgs = {
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {},
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
    delayError: undefined,
  },
  children,
}: FormProps) {
  const methods = useForm(formArgs);

  useEffect(() => {
    methods.reset(formArgs?.defaultValues);
  }, [formArgs?.defaultValues]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <FormProvider {...methods}>
      <SemanticForm onSubmit={methods.handleSubmit(onSubmit)}>{children}</SemanticForm>
    </FormProvider>
  );
}

export default Form;
