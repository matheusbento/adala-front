import { ReactNode, useCallback, useMemo, useState } from 'react';

import { css } from 'glamor';
import { Else, If, Then, When } from 'react-if';

import { colors, display, text } from '../../utils/theme';
import { flex } from '../../utils/themeConstants';

const styleDefault = css(display.flex, flex.justifyContentAround, flex.alignItemsStretch);

const styleContent = css({
  width: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: 'block',
  position: 'relative',
});

const styleVisible = css({
  whiteSpace: 'normal',
});

const styleMoreButton = css(flex.alignSelfEnd, text.right, display.block, {
  flex: '0 0 110px',
  cursor: 'pointer',
  color: colors.primary,
});

export interface TextEllipsisProps {
  as?: string;
  paragraph?: boolean;
  className?: string;
  children: ReactNode;
  count?: number;
  minCount?: number;
}
function TextEllipsis({
  children,
  as = 'span',
  className = '',
  paragraph = false,
  count = 0,
  minCount = 1,
}: TextEllipsisProps) {
  const showOverflow = useMemo(() => count > minCount, [count, minCount]);
  const [visible, setVisible] = useState(!showOverflow);
  const toggleVisible = useCallback(() => setVisible(!visible), [setVisible, visible]);
  const Component: any = useMemo(() => (paragraph ? 'p' : as), [paragraph, as]);

  const styleContainer = css(showOverflow && styleDefault, visible && display.block);
  const styleText = css(styleContent, visible && styleVisible);

  return (
    <Component className={`${styleContainer} ${className}`}>
      <When condition={!!children}>
        {() => (
          <>
            <span className={`${styleText}`}>{children}</span>
            <When condition={showOverflow}>
              {() => (
                <span className={`${styleMoreButton}`} onClick={toggleVisible} aria-hidden="true">
                  <If condition={!visible}>
                    <Then>View All</Then>
                    <Else>View less</Else>
                  </If>{' '}
                  <When condition={count}>{`(${count})`}</When>
                </span>
              )}
            </When>
          </>
        )}
      </When>
    </Component>
  );
}

export default TextEllipsis;
