import { useCallback, useMemo } from 'react';

import AddItem from '@components/Library/AddItem';
import InputDropdown from '@components/Library/InputDropdown';
import InputText from '@components/Library/InputText';
import BaslakeTable from '@views/Layout/BaslakeTable';

import { FieldArrayTypeSingle } from 'types/FieldArrayType';

const headers = [
  { label: 'Alias', sortable: false, key: 'name' },
  { label: 'Function', sortable: false, key: 'order_type' },
  {
    label: 'Variable',
    sortable: false,
  },
  { label: '', key: 'actions', sortable: false },
];

const CubeAggregationItemBulkForm = ({
  fields,
  name,
  push,
  remove,
}: FieldArrayTypeSingle) => {
  const baseAggregation = useMemo(
    () => ({
      name: '',
      function: '',
      variable: '',
    }),
    []
  );

  const fieldsPush = useCallback(
    () => push(baseAggregation),
    [baseAggregation, push]
  );
  const handleSetDeletingDepartment = useCallback(
    (_: any, index: number) => {
      remove(index);
    },
    [remove]
  );
  const fieldsList = useMemo(
    () =>
      fields.map((item: any, index: number) => [
        {
          id: item.id,
        },
        <InputText
          name={`${name}[${index}].alias`}
          key={`${name}[${item.id}].alias`}
          placeholder="Alias"
          required
          disabled={false}
        />,
        <InputDropdown
          name={`${name}[${index}].function`}
          key={`${name}[${item.id}].function`}
          laravelOptions={[]}
          placeholder="Function"
          disabled={false}
          fluid
          selection
          required
          search
        />,
        <InputDropdown
          name={`${name}[${index}].variable`}
          key={`${name}[${item.id}].variable`}
          laravelOptions={[]}
          placeholder="Variable"
          disabled={false}
          fluid
          selection
          required
          search
        />,
      ]),
    [fields, name]
  );

  const actions = useMemo(
    () => [
      {
        label: 'Delete',
        action: handleSetDeletingDepartment,
        confirm: true,
        shouldShow: () => fieldsList?.length > 1,
      },
    ],
    [fieldsList?.length, handleSetDeletingDepartment]
  );

  return (
    <>
      <BaslakeTable rows={fieldsList} headers={headers} actions={actions} />
      <AddItem label="Add new aggregation" addHandler={fieldsPush} />
    </>
  );
};

export default CubeAggregationItemBulkForm;
