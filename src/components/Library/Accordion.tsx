import { useCallback } from 'react';

import { css } from 'glamor';

import { styles } from '../../utils/theme';
import Segment from './Segment';
import SvgIcon from './SvgIcon';

const styleSegment = css(styles.pointer);
const styleDisabled = css({ opacity: 0.5 });

interface AccordionProps {
  accordionHandler?: any;
  active?: boolean;
  disabled?: boolean;
  token?: string | number;
  size?: string;
}

function Accordion({
  accordionHandler = undefined,
  active = undefined,
  disabled = undefined,
  token = '',
  size = 'sm',
  ...rest
}: AccordionProps) {
  const styleIcon = css(disabled && styleDisabled);

  const handleAccordionClick = useCallback(
    () => !disabled && accordionHandler(token),
    [disabled, accordionHandler, token],
  );

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Segment className={`${styleSegment}`} onClick={handleAccordionClick} {...rest}>
      <SvgIcon
        size={size}
        path={active ? 'icon-arrow-circle-down-line' : 'icon-arrow-circle-up-line'}
        className={`${styleIcon}`}
      />
    </Segment>
  );
}

export default Accordion;
