import { useCallback, useMemo } from 'react';

import { css } from 'glamor';

import { styles } from '../../utils/theme';
import { colors, display, fontSizes, padding, margin } from '../../utils/themeConstants';
import Segment from './Segment';
import SvgIcon from './SvgIcon';
import Text from './Text';

const styleSpan = css(fontSizes.sm, {
  color: colors.greyLabel,
  lineHeight: '1',
});

const styleSegment = css(display.flex, padding.yXs, padding.xNone, styles.pointer, {
  minHeight: 50,
  alignItems: 'center',
  width: 'fit-content',
});

const styleDisabled = css({
  opacity: 0.5,
  cursor: 'not-allowed',
});

function AddItem({
  label,
  addHandler,
  icon = 'icon-plus-line',
  className = '',
  disabled = false,
  size = 'lg',
  ...rest
}: {
  label: string;
  icon?: string;
  addHandler: any;
  size?: string;
  className?: string;
  disabled?: boolean;
}) {
  const styleContainer = useMemo(() => css(styleSegment, disabled && styleDisabled), [disabled]);

  const onClickHandler = useCallback(() => {
    if (!disabled) {
      addHandler('new');
    }
  }, [disabled, addHandler]);

  return (
    <Segment className={`${styleContainer} ${className}`} onClick={onClickHandler} {...rest}>
      <SvgIcon
        className={`${css(margin.rightXs)}`}
        path={icon}
        size={size}
        color={colors.primary}
      />
      <Text className={`${styleSpan}`}>{label}</Text>
    </Segment>
  );
}

export default AddItem;
