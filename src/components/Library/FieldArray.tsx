import { FunctionComponent, useCallback } from 'react';

import { useFormContext, useFieldArray } from 'react-hook-form';

export interface FieldArrayProps {
  component: FunctionComponent<any>;
  name: string;
  required?: boolean;
  formProps?: Record<string, any>;
}

const FieldArray = ({
  name,
  required = false,
  formProps,
  ...childProps
}: FieldArrayProps) => {
  const { control, watch } = useFormContext();

  const { fields, append, prepend, remove, swap, move, update } = useFieldArray(
    {
      control,
      name,
    }
  );

  const handleWatch = useCallback(
    (index: string) => watch(`${name}${index}`),
    [name, watch]
  );

  const { component: InnerComponent } = childProps;

  const watchFieldArray = watch(name);

  const controlledFields = fields.map((field, index) => ({
    ...field,
    ...watchFieldArray[index],
  }));

  return (
    <InnerComponent
      fields={controlledFields}
      name={name}
      push={append}
      prepend={prepend}
      update={update}
      required={required}
      remove={remove}
      swap={swap}
      watch={handleWatch}
      move={move}
      control={control}
      {...childProps}
    />
  );
};

export default FieldArray;
