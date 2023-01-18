import { css } from 'glamor';
import { ReactSVG } from 'react-svg';

import { colors } from '../../utils/theme';

const sizes: any = {
  xxs: '10px',
  xs: '12px',
  sm: '16px',
  md: '20px',
  lg: '24px',
  xl: '36px',
  xxl: '50px',
};

export interface RestProps {
  display?: string;
}
export interface SvgIconProps {
  path: string;
  size?: string;
  className?: string;
  color?: string;
  wrapper?: 'div' | 'span' | 'svg' | undefined;
}

const SvgIcon = ({
  path,
  color = colors.primary,
  size = 'sm',
  className,
  wrapper = 'span',
}: SvgIconProps & Partial<RestProps>) => {
  const styleIcon = css({
    '&, & > span': {
      display: 'inline-block',
      height: sizes[size] ?? size,
    },
    '& svg': {
      width: sizes[size] ?? size,
      height: sizes[size] ?? size,
    },
    '& path, & use': {
      fill: `${color} !important`,
    },
  });

  return (
    <ReactSVG
      className={`${styleIcon} ${className}`}
      src={`/images/${path}.svg`}
      wrapper={wrapper}
    />
  );
};

export default SvgIcon;
