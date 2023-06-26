import { useState, useEffect } from 'react';

import { css } from 'glamor';
import { When } from 'react-if';

import { styles } from '../../utils/theme';
import {
  border,
  colors,
  display,
  fontSizes,
  fontWeight,
  margin,
  padding,
} from '../../utils/themeConstants';
import SvgIcon from './SvgIcon';
import Text from './Text';

const styleSegment = css(
  display.flex,
  padding.xSm,
  padding.ySm,
  border.rounded,
  styles.shadow,
  margin.bottomMd,
  {
    border: `1px solid ${colors.greyLighter} !important`,
  },
);

const styleHeader = css(margin.bottomXs);
const styleMessage = css(fontSizes.xs, margin.bottomNone, {
  color: colors.greyDarker,
  fontWeight: fontWeight.w100,
});
const styleIcon = css(padding.rightSm);

const icons: Record<string, any> = {
  error: { path: 'icon-alert-circle', color: colors.redDark },
  warning: { path: 'icon-alert-circle', color: colors.warning },
  success: { path: 'icon-checkmark-circle-2', color: colors.primary },
  info: { path: 'icon-info', color: colors.primary },
};

let timer: NodeJS.Timeout;

function FormMessage(props: {
  timeout?: number;
  header?: string;
  content?: string;
  type?: string;
  list?: string[];
  error?: boolean;
  warning?: boolean;
  info?: boolean;
  success?: boolean;
  visible?: boolean;
}) {
  const [timerHidden, setTimerHidden] = useState(false);
  const {
    timeout,
    header,
    content,
    type = 'error',
    list,
    error,
    warning,
    info,
    success,
    visible,
  } = props;

  const messages = list || [content];

  /* Fallback React Semantic Message Component */
  let messageType = type;
  if (error) {
    messageType = 'error';
  }
  if (warning) {
    messageType = 'warning';
  }
  if (info) {
    messageType = 'info';
  }
  if (success) {
    messageType = 'success';
  }

  useEffect(() => {
    if (!timeout) {
      return () => {};
    }
    setTimerHidden(false);

    timer = setTimeout(() => {
      setTimerHidden(true);
    }, timeout);

    return () => {
      clearTimeout(timer);
      setTimerHidden(false);
    };
  }, [timeout, setTimerHidden]);

  return (
    <When condition={visible && !timerHidden}>
      {() => (
        <div className={`${styleSegment}`}>
          <SvgIcon
            className={`${styleIcon}`}
            color={icons[messageType].color}
            size="lg"
            path={icons[messageType].path}
          />
          <div>
            <When condition={header}>
              {() => (
                <Text size="md" className={`${styleHeader}`} weight="demiBold">
                  {header}
                </Text>
              )}
            </When>
            {messages.map((message) => (
              <Text as="p" className={`${styleMessage}`} key={message}>
                {message}
              </Text>
            ))}
          </div>
        </div>
      )}
    </When>
  );
}

export default FormMessage;
