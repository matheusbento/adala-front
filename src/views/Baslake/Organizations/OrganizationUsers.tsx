import { useCallback, useEffect, useMemo } from 'react';
import BaslakeModal from '@/components/Library/Baslake/BaslakeModal/BaslakeModal';
import BaslakeTitle from '@components/Library/BaslakeTitle';
import Button from '@components/Library/Button';
import Segment from '@components/Library/Segment';
import { useOrganization } from '@hooks/Organization';
import { useUserPolicy } from '@hooks/Policies/UserPolicy';
import { useUser } from '@hooks/User';
import { display, margin } from '@utils/themeConstants';
import BaslakeTable from '@views/Layout/BaslakeTable';
import { css } from 'glamor';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { When } from 'react-if';
import { useParams } from 'react-router-dom';
import { Grid, Menu } from 'semantic-ui-react';
import { UserType } from 'types/UserType';
import OrganizationUsersFormContainer from './_Form/OrganizationUsersFormContainer';
import OrganizationMenu from './OrganizationMenu';

// import OrganizationsModalContainer from './OrganizationsModalContainer';
// import OrganizationsOverviewContainer from './OrganizationsOverviewContainer';

// import OrganizationsModalContainer from './OrganizationsModalContainer';

const styleContainer = css({ minHeight: 'calc(100vh - 100px)' });

const styleSegment = css(margin.sm);

function OrganizationUsers() {
  const { t } = useTranslation();
  const { organizationId } = useParams();
  const { organization } = useOrganization();
  const { canManage } = useUserPolicy();

  const { fetchUsersHandler, users, setShowUserModal, showUserModal, fetchUserHandler } = useUser();

  useEffect(() => {
    if (organizationId) {
      fetchUsersHandler(+organizationId);
    }
  }, [fetchUsersHandler, organizationId]);

  const headers = useMemo(
    () => [
      {
        label: t('Name'),
        key: 'name',
        sortable: false,
        style: `${css({
          minWidth: 300,
          maxWidth: 0,
          wordBreak: 'break-word',
        })}`,
      },
      {
        label: t('Email'),
        key: 'email',
        sortable: false,
        style: `${css({
          minWidth: 300,
          maxWidth: 0,
          wordBreak: 'break-word',
        })}`,
      },
      {
        label: t('Added'),
        key: 'created_at',
        sortable: false,
      },
      { label: '', key: 'actions', sortable: false },
    ],
    [t],
  );

  const rows = useMemo(
    () =>
      users?.map((item: UserType) => {
        return [
          {
            id: item.id,
          },
          <div className={`${css(display.flex)}`} key={item.id}>
            {item.name}
          </div>,
          item.email,
          <div key={`${item.id}-owner`}>
            <div>{moment(item?.created_at).format('MMMM D, YYYY')}</div>
          </div>,
        ];
      }),
    [users],
  );

  const handleEdit = useCallback(
    (item: UserType) => {
      if (organizationId) {
        setShowUserModal('edit');
        fetchUserHandler(+organizationId, +item.id);
      }
    },
    [fetchUserHandler, organizationId, setShowUserModal],
  );

  const handleDelete = useCallback(() => {}, []);

  const actions = useMemo(
    () => [
      {
        label: t('Edit'),
        action: handleEdit,
      },
      {
        label: t('Delete'),
        action: handleDelete,
        confirm: true,
      },
    ],
    [handleDelete, handleEdit, t],
  );

  return (
    <div className={`${styleContainer}`}>
      <BaslakeTitle title={t('Organization: {{name}}', { name: organization?.name })}>
        <When condition={canManage()}>
          {() => (
            <Menu.Item position="right">
              <Button
                pill
                outline
                color="success"
                icon="icon-person-add-line"
                onClick={() => setShowUserModal('new')}
              >
                {t('Create new User')}
              </Button>
            </Menu.Item>
          )}
        </When>
      </BaslakeTitle>

      <Segment className={`${styleSegment}`}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>
              <OrganizationMenu />
            </Grid.Column>
            <Grid.Column width={14}>
              <Segment>
                <BaslakeTable
                  className={`${css(margin.topXl)}`}
                  headers={headers}
                  rows={rows}
                  actions={actions}
                  alignNested="left"
                  highlightNested
                  highlightParentRow
                  condensed
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <BaslakeModal
          title={showUserModal === 'edit' ? 'Editing User' : 'New User'}
          closeHandler={() => setShowUserModal(null)}
          open={!!showUserModal}
          size="large"
        >
          <BaslakeModal.Content>
            <OrganizationUsersFormContainer />
          </BaslakeModal.Content>
        </BaslakeModal>
      </Segment>
    </div>
  );
}

export default OrganizationUsers;
