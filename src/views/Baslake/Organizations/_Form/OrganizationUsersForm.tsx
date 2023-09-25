import { useMemo } from 'react';

import AdalaFormActions from '@components/ADALA/AdalaFormActions';
import AdalaProfileUser from '@components/ADALA/AdalaProfileUser';
import HorizontalTabs from '@components/Library/HorizontalTabs';
import InputCheckbox from '@components/Library/InputCheckbox';
import { useUser } from '@hooks/User';
import BaslakeTable from '@views/Layout/BaslakeTable';
import { css } from 'glamor';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { When } from 'react-if';
import { Menu, Tab } from 'semantic-ui-react';

import { padding } from 'utils/themeConstants';

import OrganizationUserInfoForm from './OrganizationUserInfoForm';

const styleTabs = css(padding.yMd);

const styleToogle = css(padding.bottomSm);

function OrganizationUsersForm({ handleSubmit, initialValues }: any) {
  const { t } = useTranslation();
  const { isLoadingSaveUser } = useUser();
  const { setValue, formState, reset } = useFormContext();
  const { isDirty } = formState;

  const headers = useMemo(
    () => [
      { label: t('Feature'), key: 'feature', sortable: false },
      { label: t('Access'), key: 'access', sortable: false },
    ],
    [t],
  );

  const organizationsRows = useMemo(
    () => [
      [
        t('See Organizations'),
        <InputCheckbox
          id="baslake_organizations_access"
          name="direct_permissions.baslake_organizations_access"
        />,
      ],
      [
        t('Manage Organizations'),
        <InputCheckbox
          id="baslake_organizations_manage"
          name="direct_permissions.baslake_organizations_manage"
        />,
      ],
    ],
    [t],
  );

  const silosRows = useMemo(
    () => [
      [
        t('Silos Access'),
        <InputCheckbox
          id="baslake_datasets_access"
          name="direct_permissions.baslake_datasets_access"
        />,
      ],
      [
        t('Manage Silos'),
        <InputCheckbox
          id="baslake_datasets_manage"
          name="direct_permissions.baslake_datasets_manage"
        />,
      ],
    ],
    [t],
  );

  const cubesRow = useMemo(
    () => [
      [
        t('Cubes Access'),
        <InputCheckbox id="baslake_cubes_access" name="direct_permissions.baslake_cubes_access" />,
      ],
      [
        t('Manage Cubes'),
        <InputCheckbox id="baslake_cubes_manage" name="direct_permissions.baslake_cubes_manage" />,
      ],
    ],
    [t],
  );

  const panes = useMemo(
    () => [
      {
        menuItem: <Menu.Item key="userInfo">{t('User Info')}</Menu.Item>,
        render: () => (
          <Tab.Pane attached={false}>
            <OrganizationUserInfoForm />
          </Tab.Pane>
        ),
      },
      {
        menuItem: <Menu.Item key="admin">{t('Admin')}</Menu.Item>,
        render: () => (
          <Tab.Pane attached={false}>
            <div className={`${styleToogle}`}>
              <InputCheckbox
                toggle
                labelSize="sm"
                label="Admin Access"
                id="access_admin"
                name="access_admin"
              />
            </div>
          </Tab.Pane>
        ),
      },
      {
        menuItem: <Menu.Item key="organizations">{t('Organizations')}</Menu.Item>,
        render: () => (
          <Tab.Pane attached={false}>
            <BaslakeTable rows={organizationsRows} headers={headers} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: <Menu.Item key="silos">{t('Silos')}</Menu.Item>,
        render: () => (
          <Tab.Pane attached={false}>
            <BaslakeTable rows={silosRows} headers={headers} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: <Menu.Item key="cubes">{t('Cubes')}</Menu.Item>,
        render: () => (
          <Tab.Pane attached={false}>
            <BaslakeTable rows={cubesRow} headers={headers} />
          </Tab.Pane>
        ),
      },
    ],
    [t, organizationsRows, headers, silosRows, cubesRow],
  );

  return (
    <>
      <When condition={initialValues?.id}>
        {() => (
          <AdalaProfileUser
            user={initialValues}
            subtitle={<a href={`mailto:${initialValues.email}`}>{initialValues.email}</a>}
          />
        )}
      </When>
      <HorizontalTabs className={`${styleTabs}`} panes={panes} />
      <AdalaFormActions
        submitHandler={handleSubmit}
        deleteHandler={handleSubmit}
        cancelHandler={() => {
          reset();
          setValue('email', '', { shouldDirty: true });
        }}
        action="form"
        pristine={!isDirty}
        loading={isLoadingSaveUser}
      />
    </>
  );
}

export default OrganizationUsersForm;
