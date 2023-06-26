import SvgIcon from '@components/Library/SvgIcon';
import { display, colors } from '@utils/theme';
import { css } from 'glamor';
import { When } from 'react-if';
import { Dropdown } from 'semantic-ui-react';

import BaslakeTableActionItem from './BaslakeTableActionItem';

const styleDropdown = css({
  marginLeft: 'auto',
  '& .dropdown.icon': {
    ...display.none,
  },
});

export interface BaslakeTableActionItemProps {
  actions?: any;
  item?: any;
}

function BaslakeTableActions({ actions = null, item = null }: BaslakeTableActionItemProps) {
  return (
    <Dropdown
      trigger={<SvgIcon path="icon-more-vertical" color={colors.default} size="lg" />}
      direction="left"
      className={`${styleDropdown}`}
      disabled={false}
    >
      <Dropdown.Menu>
        {actions?.map((actionItem: any) => (
          <When
            key={`action-item-${item?.id}-${actionItem.label}`}
            condition={actionItem.shouldShow ? actionItem.shouldShow(item) : true}
          >
            {() => (
              <BaslakeTableActionItem
                item={item}
                label={actionItem.label}
                clickHandler={actionItem.action}
              />
            )}
          </When>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default BaslakeTableActions;
