import { ReactNode, useCallback } from 'react';

import SvgIcon from '@components/Library/SvgIcon';
import { fontSizes, margin } from '@utils/theme';
import { colors } from '@utils/themeConstants';
import { css } from 'glamor';
import { When } from 'react-if';
import { Dropdown } from 'semantic-ui-react';

const styleActionItem = css(fontSizes.xs, {
  '& > span:first-child': {
    ...margin.rightXs,
  },
  '& > span': {
    verticalAlign: 'middle',
  },
});

export interface BaslakeTableActionItemProps {
  item: any;
  label: string;
  icon?: string | ReactNode;
  clickHandler: any;
  disabled?: boolean;
}

const BaslakeTableActionItem = ({
  item,
  label,
  icon = null,
  disabled = false,
  clickHandler,
}: BaslakeTableActionItemProps) => {
  const handleClick = useCallback(() => {
    clickHandler(item);
  }, [item, clickHandler]);

  return (
    <Dropdown.Item
      className={`${styleActionItem}`}
      disabled={disabled}
      onClick={handleClick}
    >
      <When condition={icon && typeof icon === 'string'}>
        {() => <SvgIcon color={colors.greyDarker} path={icon as string} />}
      </When>
      <span>{label}</span>
    </Dropdown.Item>
  );
};

export default BaslakeTableActionItem;
