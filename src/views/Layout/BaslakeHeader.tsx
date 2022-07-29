import BadgeCounter from '@components/Library/BadgeCounter';
import Button from '@components/Library/Button';
import iconUser from '@components/Library/img/icon-user.svg';
import SvgIcon from '@components/Library/SvgIcon';
import { useSystem } from '@hooks/System';
import {
  colors,
  display,
  buttons,
  text,
  fontSizes,
  margin,
  padding,
  position,
  utils,
} from '@utils/theme';
import SearchBoxContainer from '@views/Baslake/Search/SearchBoxContainer';
import { css } from 'glamor';
import { When } from 'react-if';
import { useLocation } from 'react-router-dom';
import { Icon, Dropdown } from 'semantic-ui-react';

import { SessionType } from 'types/SessionType';

const styleNavbar = css(display.flex, padding.xSm, {
  alignItems: 'center',
  height: '50px',
  color: colors.negative,
  backgroundColor: colors.default,
  '@media (max-width: 1199px)': {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 3,
    ...utils.w100,
  },
});

const styleSearch = css(padding.xSm, display.none, {
  flexGrow: 1,
  maxWidth: '530px',
  '@media (min-width: 360px)': {
    ...display.block,
  },
});

const styleAvatarBg = css({
  width: '40px !important',
  height: '40px !important',
  backgroundColor: 'none !important',
  borderRadius: '50%',
});

const styleButton = css(buttons.plain, text.left, {
  '& > i': {
    color: colors.negative,
  },
});

const styleRightItems = css({
  ...display.flex,
  marginLeft: 'auto',
});

const styleUserMenu = css(display.flex, {
  alignItems: 'center',
  '@media (max-width: 991px)': {
    '& .dropdown.icon': {
      ...display.none,
    },
  },
});

const styleButtonNotifications = css(
  buttons.plain,
  display.inlineBlock,
  margin.rightMd,
  position.relative,
  padding.xXs
);

const styleNotificationsBadge = css(position.absolute, {
  top: 0,
  right: 0,
});

const styleUserName = css(
  fontSizes.xs,
  margin.rightSm,
  display.none,
  display.mdInline
);

interface BaslakeHeaderProps {
  session: SessionType | null;
  logoutHandler: () => void;
  setIsBarVisible: (status: boolean) => void;
  searchContext: string;
  isBarVisible: boolean;
}

const BaslakeHeader = ({
  session,
  logoutHandler,
  searchContext,
  setIsBarVisible,
  isBarVisible,
}: BaslakeHeaderProps) => {
  const location = useLocation();
  // const location: any = null;
  const disableSearchPaths = ['/'];

  // eslint-disable-next-line no-console
  console.log(isBarVisible);

  return (
    <header className={`${styleNavbar}`}>
      <div className={`${css({ flexShrink: 1 })}`}>
        <button
          type="button"
          className={`${styleButton}`}
          onClick={() => setIsBarVisible(!isBarVisible)}
        >
          <Icon name="bars" />
        </button>
      </div>

      <When condition={!disableSearchPaths.includes(location?.pathname)}>
        {() => (
          <SearchBoxContainer
            className={`${styleSearch}`}
            context={searchContext}
          />
        )}
      </When>
      <When condition={session && !!session.user}>
        {() => (
          <div className={`${styleRightItems}`}>
            {/* // TODO NOTIFICATIONS */}
            <Button
              className={`${styleButtonNotifications}`}
              type="button"
              onClick={() => {}}
            >
              <SvgIcon
                color={colors.white}
                size="lg"
                path="icon-bell-notifications"
              />
              <When condition={!!1}>
                {() => (
                  <BadgeCounter
                    className={`${styleNotificationsBadge}`}
                    count="0"
                    bgColor="purpleLight"
                    size="xs"
                  />
                )}
              </When>
            </Button>

            {/* <When condition={notificationsOverlayVisible}>
              {() => <NotificationsOverlayContainer />}
            </When>

            <When condition={showMessagesModal}>
              {() => (
                <MessageModalContainer
                  thread={showMessagesModal}
                  closeHandler={closeThreadModalHandler}
                />
              )}
            </When> */}

            <Dropdown
              className={`${styleUserMenu}`}
              item
              pointing
              trigger={
                <When condition={!!session}>
                  {() => (
                    <>
                      <span className={`${styleUserName}`}>
                        {session?.user?.name}
                      </span>
                      <img
                        src={session?.user?.avatar || `${iconUser}`}
                        className={`${styleAvatarBg}`}
                        alt="a"
                      />
                    </>
                  )}
                </When>
              }
            >
              <Dropdown.Menu direction="left">
                <Dropdown.Item
                  icon="sign-out"
                  text="Logout"
                  onClick={logoutHandler}
                />
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
      </When>
    </header>
  );
};

export default BaslakeHeader;
