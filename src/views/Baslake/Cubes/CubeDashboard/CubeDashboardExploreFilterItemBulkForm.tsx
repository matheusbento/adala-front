import { useCallback, useMemo } from 'react';

import AddItem from '@components/Library/AddItem';
import InputDropdown from '@components/Library/InputDropdown';

import InputText from '@components/Library/InputText';
import { filterOperations } from '@constants/cubesConstants';
import { useCubes } from '@hooks/Cubes';
import { useExplore } from '@hooks/Explore';
import { fontWeight, margin } from '@utils/themeConstants';
import BaslakeTable from '@views/Layout/BaslakeTable';
import { css } from 'glamor';
import { useTranslation } from 'react-i18next';
import { Else, If, Then } from 'react-if';
import { Header } from 'semantic-ui-react';
import { FieldArrayTypeSingle } from 'types/FieldArrayType';

const styleTitle = css(margin.topNone, {
  '& > span': {
    fontSize: '20px !important',
    fontWeight: fontWeight.w600,
  },
});

function CubeDashboardExploreFilterItemBulkForm({
  fields,
  name,
  push,
  remove,
}: FieldArrayTypeSingle) {
  const { columns, isLoadingColumns } = useExplore();
  const { t } = useTranslation();
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
    return filterOperations.map((e) => ({ id: e, name: t(e) }));
  }, [t]);

  const headers = useMemo(
    () => [
      {
        label: t('Name'),
        sortable: false,
        key: 'name',
        style: `${css({
          minWidth: 50,
          maxWidth: 0,
          wordBreak: 'break-word',
        })}`,
      },
      {
        label: t('Operation'),
        sortable: false,
        key: 'operation',
        style: `${css({
          minWidth: 150,
          maxWidth: 0,
          wordBreak: 'break-word',
        })}`,
      },
      {
        label: t('Value'),
        sortable: false,
      },
      { label: '', key: 'actions', sortable: false },
    ],
    [t],
  );

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
          placeholder={t('Dimension')}
          disabled={false}
          fluid
          selection
          required
          search
        />,
        <InputDropdown
          name={`${name}[${index}].operation`}
          key={`${name}[${item.id}].operation`}
          laravelOptions={operations}
          placeholder={t('Operation')}
          disabled={false}
          fluid
          selection
          required
          search
        />,
        <If condition={item.operation === 'between'}>
          <Then>
            <InputText
              name={`${name}[${index}].min_value`}
              key={`${name}[${item.id}].min_value`}
              placeholder={t('Min Value')}
              disabled={false}
              fluid
              required
            />
            <InputText
              name={`${name}[${index}].max_value`}
              key={`${name}[${item.id}].max_value`}
              placeholder={t('Max Value')}
              disabled={false}
              fluid
              required
            />
          </Then>
          <Else>
            <InputText
              name={`${name}[${index}].value`}
              key={`${name}[${item.id}].value`}
              placeholder={t('Value')}
              disabled={false}
              fluid
              required
            />
          </Else>
        </If>,
      ]),
    [columns, fields, isLoadingColumns, name, operations, t],
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
        {t('Filter')}
      </Header>
      <BaslakeTable rows={fieldsList} headers={headers} actions={actions} />
      <AddItem label="Add new filter" addHandler={fieldsPush} />
    </>
  );
}

export default CubeDashboardExploreFilterItemBulkForm;
