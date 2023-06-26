import { colors, fontWeight } from '@utils/themeConstants';
import { css } from 'glamor';
import { Menu } from 'semantic-ui-react';

const styleText = css({
  borderTop: `3px solid ${colors.white}`,
  borderBottom: `3px solid ${colors.white}`,
  cursor: 'pointer',
  display: 'block',
  '&.active.item': {
    background: `${colors.white} !important`,
  },
});

const styleActiveText = css({
  borderBottom: `3px solid ${colors.green}`,
  '&.active.item': {
    fontWeight: fontWeight.w700,
  },
});

function BaslakePageTab(props: { active?: boolean; text?: string }) {
  const { active = false, text = null } = props;

  const styleTab = css(styleText, active && styleActiveText);

  return (
    <Menu.Item className={`${styleTab}`} {...props}>
      {text}
    </Menu.Item>
  );
}

export default BaslakePageTab;
