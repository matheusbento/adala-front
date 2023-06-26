import SvgIcon from '@components/Library/SvgIcon';
import { css } from 'glamor';

interface BaslakeSidebarIconProps {
  path: string;
  subItem?: boolean;
  color?: string;
  className?: string;
}

function BaslakeSidebarIcon({
  path,
  subItem = false,
  color = '',
  className,
}: BaslakeSidebarIconProps) {
  const styleIcon = css({
    cursor: 'pointer',
  });

  const size = subItem ? 'xl' : 'xxl';

  return <SvgIcon path={path} size={size} className={`${styleIcon} ${className}`} color={color} />;
}
export default BaslakeSidebarIcon;
