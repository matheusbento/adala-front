import { display, colors, fontSizes, margin } from '@utils/themeConstants';
import { css } from 'glamor';

function BaslakeFooter() {
  const styleFooter = css(display.flex, fontSizes.xxs, margin.topAuto, {
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.negative,
    backgroundColor: colors.greyDarkest,
    height: '50px',
  });
  const year = new Date().getFullYear();

  return <div className={`${styleFooter}`}>{`© ${year} Baslake. All rights reserved.`}</div>;
}

export default BaslakeFooter;
