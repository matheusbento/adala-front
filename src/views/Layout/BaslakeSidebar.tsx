import PolicyCheck from '@components/Library/PolicyCheck';
import { useAuth } from '@hooks/Auth';
import { useCubesPolicy } from '@hooks/Policies/CubesPolicy';
import { display, padding, text } from '@utils/themeConstants';
import { css } from 'glamor';
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

  const CubesPolicy = useCubesPolicy();
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
            label="Dashboard"
          />

          <Menu.Menu className={`${styleSubMenu}`}>
            <PolicyCheck policy={CubesPolicy.canAccess()}>
              <BaslakeSidebarMenuItem
                subItem
                active={!!matchPath(pathname, '/cubes')}
                to="/cubes"
                icon="icon-cubes"
                label="Cubes"
              />
            </PolicyCheck>
          </Menu.Menu>
        </>
      )}
    </div>
  );
};

export default BaslakeSidebar;
