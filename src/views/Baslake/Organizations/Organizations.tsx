import { useCallback, useState } from 'react';
import BaslakeModal from '@components/Library/Baslake/BaslakeModal/BaslakeModal';
import BaslakeTitle from '@components/Library/BaslakeTitle';
import Button from '@components/Library/Button';
import ModalConfirm from '@components/Library/ModalConfirm';
import Segment from '@components/Library/Segment';
import { useOrganization } from '@hooks/Organization';
import { useOrganizationPolicy } from '@hooks/Policies/OrganizationPolicy';
import { margin } from '@utils/themeConstants';
import { css } from 'glamor';
import { useTranslation } from 'react-i18next';
import { When } from 'react-if';
import { Link } from 'react-router-dom';
import { Card, Menu } from 'semantic-ui-react';
import { OrganizationType } from 'types/OrganizationType';
import OrganizationFormContainer from './_Form/OrganizationFormContainer';

// import OrganizationsModalContainer from './OrganizationsModalContainer';
// import OrganizationsOverviewContainer from './OrganizationsOverviewContainer';

// import OrganizationsModalContainer from './OrganizationsModalContainer';

const styleContainer = css({ minHeight: 'calc(100vh - 100px)' });

const styleSegment = css(margin.sm);

function Organizations() {
  const [showModal, setShowModal] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<OrganizationType | null>(null);
  const { canCreate } = useOrganizationPolicy();

  const { organizations, deletOrganizationHandler, setInitialValues } = useOrganization();

  const { t } = useTranslation();

  const handleConfirmDelete = useCallback(() => {
    if (deleting?.id) {
      deletOrganizationHandler(deleting?.id);
      setDeleting(null);
    }
  }, [deletOrganizationHandler, deleting?.id]);

  return (
    <div className={`${styleContainer}`}>
      <BaslakeTitle title={t('Organizations')}>
        <When condition={canCreate()}>
          {() => (
            <Menu.Item position="right">
              <Button
                pill
                outline
                color="success"
                icon="icon-folder-add"
                onClick={() => setShowModal('new')}
              >
                {t('Create new Organization')}
              </Button>
            </Menu.Item>
          )}
        </When>
      </BaslakeTitle>

      <Segment className={`${styleSegment}`}>
        <Card.Group>
          {organizations?.map((organization: OrganizationType) => (
            <Card>
              <Card.Content>
                <Card.Header>
                  <Link to={`/organizations/${organization.id}/users`}>{organization.name}</Link>
                </Card.Header>
                <Card.Description>{organization.description}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button
                    basic
                    color="green"
                    onClick={() => {
                      setInitialValues(organization);
                      setShowModal('edit');
                    }}
                  >
                    {t('Edit')}
                  </Button>
                  <Button
                    basic
                    color="red"
                    onClick={() => {
                      setDeleting(organization);
                    }}
                  >
                    {t('Delete')}
                  </Button>
                </div>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </Segment>

      <ModalConfirm
        open={!!deleting}
        header={t('Delete {{name}}', { name: deleting?.name })}
        confirmText={t('Are you sure you want to delete this organization?')}
        labelConfirm="Delete"
        onConfirm={handleConfirmDelete}
        onDismiss={() => setDeleting(null)}
      />

      <BaslakeModal
        size="small"
        title={t(`${showModal === 'new' ? 'Create' : 'Edit'} Organization`)}
        open={!!showModal}
        closeHandler={() => setShowModal(null)}
      >
        <BaslakeModal.Content>
          <OrganizationFormContainer setShowModal={setShowModal} />
        </BaslakeModal.Content>
      </BaslakeModal>
    </div>
  );
}

export default Organizations;
