import BaslakeSidebarIcon from '@components/Library/Baslake/BaslakeSidebarIcon';
import { colors, text, padding, display } from '@utils/theme';
import { css } from 'glamor';
import { NavLink } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

interface BaslakeSidebarMenuItemProps {
  to: string;
  label: string;
  icon: string;
  subItem?: boolean;
  active: boolean;
  bullet?: boolean;
}

const styleSubMenu = css({
  fontSize: '0.8rem',
  '&:hover': { opacity: 1 },
});

const styleBullet = css({
  '&:after': {
    content: ' ',
    background: colors.purpleLight,
    borderRadius: '50%',
    width: 15,
    height: 15,
    left: 15,
    top: 12,
    position: 'absolute',
  },
});

const styleActive = css({
  position: 'absolute',
  right: 0,
  top: 25,
});

function BaslakeSidebarMenuItem({
  to,
  label,
  icon,
  subItem = false,
  active = false,
  bullet = false,
}: BaslakeSidebarMenuItemProps) {
  const styleMenuItem = css(
    display.block,
    text.center,
    padding.xs,
    {
      position: 'relative',
      fontWeight: 200,
      opacity: active ? 1 : 0.5,
      color: active && subItem ? 'white' : colors.grey,
      borderLeft: active && !subItem ? `4px solid ${colors.green}` : '4px solid transparent',
      '&.active, &:hover': {
        color: colors.negative,
      },
    },
    subItem && styleSubMenu,
    bullet && styleBullet,
  );

  return (
    <NavLink to={{ pathname: to }} state={{ closeFilters: true }} className={`${styleMenuItem}`}>
      {active && subItem && <Icon name="chevron right" className={`${styleActive}`} />}
      <BaslakeSidebarIcon path={icon} subItem={subItem} color={colors.negative} />
      <span className={`${css(display.block, text.center)}`}>{label}</span>
    </NavLink>
  );
}

export default BaslakeSidebarMenuItem;
