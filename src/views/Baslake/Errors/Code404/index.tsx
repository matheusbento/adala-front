/* eslint-disable import/no-extraneous-dependencies */
import { useMemo } from 'react';

import { css } from 'glamor';
import { Link } from 'react-router-dom';

import PolicyCheck from '@components/Library/PolicyCheck';

import { useAuth } from '@hooks/Auth';
import { useBaslakePolicy } from '@hooks/Policies/BaslakePolicy';

import {
  fontSizes,
  fontWeight,
  text,
  colors,
  margin,
  padding,
  buttons,
} from '@utils/theme';

const styleContainer = css(text.center, padding.yXxl);

const styleTitle = css(
  fontSizes.xxl,
  fontWeight.normal,
  margin.topNone,
  margin.bottomXs,
  {
    color: colors.greyDarker,
  }
);

const styleSubtitle = css(fontSizes.md, {
  color: colors.greyDark,
});

const Code404 = () => {
  const { session } = useAuth();
  const { canAccess } = useBaslakePolicy();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const canAccessVms = useMemo(() => canAccess(), [session]);

  return (
    <div className={`${styleContainer}`}>
      <div>
        <h1 className={`${styleTitle}`}>Page not found</h1>
        <p className={`${styleSubtitle}`}>
          We couldn&lsquo;t find the page you&lsquo;re looking for!
        </p>
        <PolicyCheck policy={canAccessVms}>
          <Link
            className={`${css(buttons.pill, buttons.primary, buttons.lg)}`}
            to="/"
            title="Go to home"
          >
            Go to home
          </Link>
        </PolicyCheck>
      </div>
    </div>
  );
};

export default Code404;
