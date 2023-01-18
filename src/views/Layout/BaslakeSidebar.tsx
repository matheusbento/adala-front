import PolicyCheck from '@components/Library/PolicyCheck';
import { useAuth } from '@hooks/Auth';
import { useBaslakePolicy } from '@hooks/Policies/BaslakePolicy';
import { useCubesPolicy } from '@hooks/Policies/CubesPolicy';
import { useDatasetPolicy } from '@hooks/Policies/DatasetPolicy';
import { useOrganizationPolicy } from '@hooks/Policies/OrganizationPolicy';
import { display, padding, text } from '@utils/themeConstants';
import { css } from 'glamor';
import { useTranslation } from 'react-i18next';
import { Link, Location, matchPath, useLocation } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import { SessionType } from 'types/SessionType';

import BaslakeSidebarMenuItem from './BaslakeSidebarMenuItem';

const styleMenu = css({
  fontSize: '0.9rem',
});

const styleBrand = css(display.block, text.center, padding.sm, {
  '& > img': {
    width: '60px',
  },
});

const styleSubMenu = css({
  background: '#ffffff10',
});

const BaslakeSidebar = () => {
  const { pathname } = useLocation();

  const { loggedIn } = useAuth();

  const BaslakePolicy = useBaslakePolicy();
  const CubesPolicy = useCubesPolicy();
  const OrganizationPolicy = useOrganizationPolicy();
  const DatasetPolicy = useDatasetPolicy();
  const { t } = useTranslation();
  return (
    <div className={`${styleMenu}`}>
      <Link className={`${styleBrand}`} to="/">
        <img src="/images/logo/baslake-logo.png" alt="Baslake" />
      </Link>
      {loggedIn && (
        <>
          <BaslakeSidebarMenuItem
            active
            to="/"
            icon="icon-dashboard"
            label={t('Dashboard')}
          />

          <Menu.Menu className={`${styleSubMenu}`}>
            <PolicyCheck policy={CubesPolicy.canAccess()}>
              <BaslakeSidebarMenuItem
                subItem
                active={!!matchPath(pathname, '/cubes')}
                to="/cubes"
                icon="icon-cubes"
                label={t('Cubes')}
              />
            </PolicyCheck>
          </Menu.Menu>

          <Menu.Menu className={`${styleSubMenu}`}>
            <PolicyCheck policy={DatasetPolicy.canAccess()}>
              <BaslakeSidebarMenuItem
                subItem
                active={!!matchPath(pathname, '/silos')}
                to="/silos"
                icon="icon-file-csv"
                label={t('Silos')}
              />
            </PolicyCheck>
          </Menu.Menu>

          <Menu.Menu className={`${styleSubMenu}`}>
            <PolicyCheck policy={OrganizationPolicy.canAccess()}>
              <BaslakeSidebarMenuItem
                subItem
                active={!!matchPath(pathname, '/organizations')}
                to="/organizations"
                icon="icon-settings"
                label={t('Organizations')}
              />
            </PolicyCheck>
          </Menu.Menu>

          <Menu.Menu className={`${styleSubMenu}`}>
            <PolicyCheck policy={BaslakePolicy.canAccess()}>
              <BaslakeSidebarMenuItem
                subItem
                active={!!matchPath(pathname, '/settings')}
                to="/settings"
                icon="icon-settings"
                label={t('Settings')}
              />
            </PolicyCheck>
          </Menu.Menu>
        </>
      )}
    </div>
  );
};

export default BaslakeSidebar;
