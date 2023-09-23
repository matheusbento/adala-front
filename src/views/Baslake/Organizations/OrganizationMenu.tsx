import { useCallback } from 'react';
import Header from '@components/Library/Header';
import Text from '@components/Library/Text';
import { css } from 'glamor';
import { useTranslation } from 'react-i18next';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

function OrganizationMenu() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const move = useCallback(
    (url: string) => {
      navigate(url);
    },
    [navigate],
  );

  return (
    <>
      <Text>{t('Organization Menu')}</Text>
      <Menu vertical className={`${css({ width: '100% !important' })}`}>
        <Menu.Item
          name="users"
          active={!!useMatch('/organizations/:organizationId/users')}
          onClick={() => move('users')}
        >
          <Header as="h4">{t('Users')}</Header>
          <p>{t('Manage organization users')}</p>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default OrganizationMenu;
