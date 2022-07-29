import { css } from 'glamor';

import SvgIcon from '@components/Library/SvgIcon';

interface BaslakeSidebarIconProps {
  path: string;
  subItem?: boolean;
  color?: string;
  className?: string;
}

const BaslakeSidebarIcon = ({
  path,
  subItem = false,
  color = '',
  className,
}: BaslakeSidebarIconProps) => {
  const styleIcon = css({
    cursor: 'pointer',
  });

  const size = subItem ? 'xl' : 'xxl';

  return (
    <SvgIcon
      path={path}
      size={size}
      className={`${styleIcon} ${className}`}
      color={color}
    />
  );
};
export default BaslakeSidebarIcon;
