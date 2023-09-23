import { useCallback, useEffect, useMemo } from 'react';
import BaslakeTitle from '@components/Library/BaslakeTitle';
import Segment from '@components/Library/Segment';
import { useOrganization } from '@hooks/Organization';
import { useUser } from '@hooks/User';
import { display, margin, padding } from '@utils/themeConstants';
import BaslakeTable from '@views/Layout/BaslakeTable';
import { css } from 'glamor';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { UserType } from 'types/UserType';
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

  const { fetchUsersHandler, users } = useUser();

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

  const handleEdit = useCallback(() => {}, []);

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
      <BaslakeTitle title={t('Organization: {{name}}', { name: organization?.name })} />

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
      </Segment>
    </div>
  );
}

export default OrganizationUsers;
