import { useCallback, useMemo } from 'react';

import AddItem from '@components/Library/AddItem';
import InputDropdown from '@components/Library/InputDropdown';

import InputText from '@components/Library/InputText';
import { useCubes } from '@hooks/Cubes';
import { useExplore } from '@hooks/Explore';
import { fontWeight, margin } from '@utils/themeConstants';
import BaslakeTable from '@views/Layout/BaslakeTable';
import { css } from 'glamor';
import { Header } from 'semantic-ui-react';
import { FieldArrayTypeSingle } from 'types/FieldArrayType';

const styleTitle = css(margin.topNone, {
  '& > span': {
    fontSize: '20px !important',
    fontWeight: fontWeight.w600,
  },
});

const headers = [
  {
    label: 'Name',
    sortable: false,
    key: 'name',
    style: `${css({
      minWidth: 50,
      maxWidth: 0,
      wordBreak: 'break-word',
    })}`,
  },
  {
    label: 'Operation',
    sortable: false,
    key: 'operation',
    style: `${css({
      minWidth: 150,
      maxWidth: 0,
      wordBreak: 'break-word',
    })}`,
  },
  {
    label: 'Value',
    sortable: false,
  },
  { label: '', key: 'actions', sortable: false },
];

function CubeDashboardExploreFilterItemBulkForm({
  fields,
  name,
  push,
  remove,
}: FieldArrayTypeSingle) {
  const { columns, isLoadingColumns } = useExplore();
  const { cube } = useCubes();

  const baseAggregation = useMemo(
    () => ({
      column: '',
      operation: '',
      value: '',
    }),
    [],
  );

  const fieldsPush = useCallback(() => push(baseAggregation), [baseAggregation, push]);
  const handleSetDeletingDepartment = useCallback(
    (_: any, index: number) => {
      remove(index);
    },
    [remove],
  );
  const operations = useMemo(() => {
    return ['equals', 'does not equals', 'contains', 'does not contains', 'is set', 'is not set'];
  }, []);

  console.log({ columns });

  const fieldsList = useMemo(
    () =>
      fields.map((item: any, index: number) => [
        {
          id: item.id,
        },
        <InputDropdown
          name={`${name}[${index}].column`}
          key={`${name}[${item.id}].column`}
          arrayOptions={columns ?? []}
          loading={isLoadingColumns}
          placeholder="Column"
          disabled={false}
          fluid
          selection
          required
          search
        />,
        <InputDropdown
          name={`${name}[${index}].operation`}
          key={`${name}[${item.id}].operation`}
          arrayOptions={operations}
          placeholder="Operation"
          disabled={false}
          fluid
          selection
          required
          search
        />,
        <InputText
          name={`${name}[${index}].value`}
          key={`${name}[${item.id}].value`}
          placeholder="Value"
          disabled={false}
          fluid
          required
        />,
      ]),
    [columns, fields, isLoadingColumns, name, operations],
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
      <Header as="h5" className={`${styleTitle}`}>
        Filter
      </Header>
      <BaslakeTable rows={fieldsList} headers={headers} actions={actions} />
      <AddItem label="Add new filter" addHandler={fieldsPush} />
    </>
  );
}

export default CubeDashboardExploreFilterItemBulkForm;
