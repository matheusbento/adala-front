/* eslint-disable jsx-a11y/control-has-associated-label */
import { ReactNode, useEffect, useMemo, useState } from 'react';

import { useOrganization } from '@/hooks/Organization';
import PolicyCheck from '@components/Library/PolicyCheck';
import { useBaslakePolicy } from '@hooks/Policies/BaslakePolicy';
import { colors, display, utils } from '@utils/theme';
import { css } from 'glamor';

import BaslakeFooter from './BaslakeFooter';
import BaslakeHeaderContainer from './BaslakeHeaderContainer';
import BaslakeSidebarContainer from './BaslakeSidebarContainer';

const style100vh = css(utils.mvh100);
const styleInnerContent = css(display.flex, {
  flexGrow: 1,
  flexDirection: 'column',
});

const transition = {
  transition: 'all 300ms cubic-bezier(0.420, 0.000, 0.580, 1.000)',
  transitionTimingFunction: 'cubic-bezier(0.420, 0.000, 0.580, 1.000)',
};

export interface BaslakePageProps {
  children: ReactNode;
}

function BaslakePage({ children }: BaslakePageProps) {
  const [visible, setVisible] = useState(window.innerWidth >= 1200);

  const { canAccess } = useBaslakePolicy();

  const { fetchAllOrganizationsHandler } = useOrganization();

  const canAccessBaslake = canAccess();

  const styleContent = useMemo(
    () =>
      css(display.flex, utils.mvh100, transition, {
        flexDirection: 'column',
        '@media (min-width: 1200px)': {
          paddingLeft: visible && canAccessBaslake ? '100px' : 0,
        },
        '@media (max-width: 1199px)': {
          paddingTop: '52px',
        },
      }),
    [visible, canAccessBaslake],
  );

  const styleSidebar = useMemo(
    () =>
      css(transition, utils.h100, {
        position: 'fixed',
        top: 0,
        left: visible ? 0 : '-100px',
        bottom: 0,
        width: '100px',
        backgroundColor: colors.blueDarkest,
        zIndex: 9999,
      }),
    [visible],
  );

  const styleSidebarOverlay = useMemo(
    () =>
      css(display.none, utils.h100, utils.w100, {
        position: 'fixed',
        top: 0,
        left: '100px',
        bottom: 0,
        right: 0,
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'default',
        zIndex: 9998,
        '@media (max-width: 1199px)': {
          display: visible ? 'block !important' : 'none',
        },
      }),
    [visible],
  );

  useEffect(() => {
    fetchAllOrganizationsHandler();
  }, []);

  return (
    <div className={`page ${style100vh}`}>
      <PolicyCheck policy={canAccessBaslake}>
        <div className={`${styleSidebar}`}>
          <BaslakeSidebarContainer />
        </div>
      </PolicyCheck>
      <div className={`${styleContent}`}>
        <PolicyCheck policy={canAccessBaslake}>
          <BaslakeHeaderContainer setIsBarVisible={setVisible} isBarVisible={visible} />
        </PolicyCheck>
        <div className={`${styleInnerContent}`}>{children}</div>
        <BaslakeFooter />
      </div>
      <PolicyCheck policy={canAccessBaslake}>
        <button
          type="button"
          className={`${styleSidebarOverlay}`}
          onClick={() => setVisible(false)}
        />
      </PolicyCheck>
    </div>
  );
}

export default BaslakePage;
