import { useState } from 'react';
import BaslakeTitle from '@components/Library/BaslakeTitle';
import Header from '@components/Library/Header';
import Segment from '@components/Library/Segment';
import { useOrganization } from '@hooks/Organization';
import { margin } from '@utils/themeConstants';
import { css } from 'glamor';
import { useTranslation } from 'react-i18next';
import { Menu } from 'semantic-ui-react';
import { matchPath } from 'react-router-dom';
import { useLocation } from 'react-router';
import OrganizationMenu from './OrganizationMenu';

// import OrganizationsModalContainer from './OrganizationsModalContainer';
// import OrganizationsOverviewContainer from './OrganizationsOverviewContainer';

// import OrganizationsModalContainer from './OrganizationsModalContainer';

const styleContainer = css({ minHeight: 'calc(100vh - 100px)' });

const styleSegment = css(margin.sm);

function Organization() {
  const { t } = useTranslation();
  const { organization } = useOrganization();

  return (
    <div className={`${styleContainer}`}>
      <BaslakeTitle title={t('Organization: {{name}}', { name: organization?.name })} />

      <Segment className={`${styleSegment}`}>
        <OrganizationMenu />
      </Segment>
    </div>
  );
}

export default Organization;
