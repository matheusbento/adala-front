import { css } from 'glamor';
import { Tab } from 'semantic-ui-react';

import { border, colors, display, flex, margin, padding, spacing, text } from '../../utils/theme';

const styleTabs = css({
  '& .ui.secondary.pointing.menu': {
    ...display.flex,
    ...flex.justifyContentEvenly,
    ...margin.bottomNone,
  },
  '& .ui.menu:after': {
    ...display.none,
  },
  '& .ui.secondary.pointing.menu .item': {
    ...display.inlineBlock,
    ...text.center,
    ...padding.xNone,
    ...padding.ySm,
  },
  '& .ui.secondary.pointing.menu .active.item': {
    borderColor: colors.green,
    borderWidth: spacing.xxs,
  },
  '& .ui.segment.active.tab': {},
  '& .ui.segment.tab': {
    ...border.none,
    ...margin.topNone,
  },
});

function HorizontalTabs({ panes, className, ...rest }: any) {
  return (
    <Tab
      className={`${styleTabs} ${className}`}
      menu={{ secondary: true, pointing: true }}
      panes={panes}
      {...rest}
    />
  );
}

export default HorizontalTabs;
