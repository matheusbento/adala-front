import { useMemo, memo, ReactNode } from 'react';

import { css } from 'glamor';
import { Message } from 'semantic-ui-react';

import IconList from 'components/Library/IconList/IconList';
import Text from 'components/Library/Text';

import { border, display, flex, padding } from 'utils/themeConstants';

const iconStyle = css(
  display.flex,
  padding.rightSm,
  flex.alignContentCenter,
  flex.alignItemsStart,
  flex.alignSelfStretch
);

const borderLessStyle = css(border.none, { boxShadow: 'none !important' });

export interface AlertProps {
  icon?: string;
  colorIcon?: string;
  borderless?: boolean;
  header?: ReactNode;
  content?: ReactNode;
  children?: ReactNode;
  info?: boolean;
}

const Alert = ({
  icon,
  colorIcon,
  borderless = true,
  header,
  content,
  children,
  info = false,
}: AlertProps) => {
  const renderIcon = useMemo(() => {
    if (!icon) return undefined;

    return (
      <div className={`${iconStyle}`}>
        <IconList.Item icon={icon} color={colorIcon} />
      </div>
    );
  }, [icon, colorIcon]);

  // For more extended props, see https://react.semantic-ui.com/collections/message
  return (
    <Message
      className={`${borderless && borderLessStyle}`}
      icon={!!icon}
      info={info}
    >
      {renderIcon}
      <Message.Content>
        {header && <Message.Header>{header}</Message.Header>}
        {content && <Text as="p">{content}</Text>}
        {children}
      </Message.Content>
    </Message>
  );
};

export default memo(Alert);
