import { useCallback, useMemo } from 'react';

import AddItem from '@components/Library/AddItem';
import InputText from '@components/Library/InputText';
import BaslakeTable from '@views/Layout/BaslakeTable';

import { useTranslation } from 'react-i18next';
import { FieldArrayTypeSingle } from 'types/FieldArrayType';

const headers = [
  { label: 'Field', sortable: false, key: 'name' },
  {
    label: 'Value',
    sortable: false,
  },
  { label: '', key: 'actions', sortable: false },
];

function CubeMetadataItemBulkForm({ fields, name, push, remove }: FieldArrayTypeSingle) {
  const { t } = useTranslation();
  const baseMetadata = useMemo(
    () => ({
      field: '',
      value: '',
    }),
    [],
  );

  const fieldsPush = useCallback(() => push(baseMetadata), [baseMetadata, push]);
  const handleSetDeletingDepartment = useCallback(
    (_: any, index: number) => {
      remove(index);
    },
    [remove],
  );
  const fieldsList = useMemo(
    () =>
      fields.map((item: any, index: number) => [
        {
          id: item.id,
        },
        <InputText
          name={`${name}[${index}].field`}
          key={`${name}[${item.id}].field`}
          placeholder={t('Field')}
          required
          disabled={false}
        />,
        <InputText
          name={`${name}[${index}].value`}
          key={`${name}[${item.id}].value`}
          placeholder={t('Value')}
          disabled={false}
          required
        />,
      ]),
    [fields, name, t],
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
    [fieldsList?.length, handleSetDeletingDepartment],
  );

  return (
    <>
      <BaslakeTable rows={fieldsList} headers={headers} actions={actions} />
      <AddItem label="Add new metadata" addHandler={fieldsPush} />
    </>
  );
}

export default CubeMetadataItemBulkForm;
