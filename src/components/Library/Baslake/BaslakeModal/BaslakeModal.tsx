import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';

import { css } from 'glamor';
import { When } from 'react-if';
import { Modal } from 'semantic-ui-react';

import BaslakeModalActions from './BaslakeModalActions';
import BaslakeModalContent from './BaslakeModalContent';
import BaslakeModalHeader from './BaslakeModalHeader';

interface IBaslakeModalProps {
  title?: string;
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'fullscreen';
  open?: boolean;
  className?: string;
  closeHandler?: () => void;
  isClosable?: boolean;
  children?: React.ReactNode;
  closeByClickingOutside?: boolean;
  closeOnEscape?: boolean;
  headerChildren?: React.ReactNode;
  linkTo?: string;
  minWidth?: number;
}

interface IBaslakeModal {
  (props: IBaslakeModalProps): ReactElement;
  Header?: typeof BaslakeModalHeader;
  Content?: typeof BaslakeModalContent;
  Actions?: typeof BaslakeModalActions;
}

function BaslakeModal({
  title,
  size = 'small',
  open = false,
  className,
  isClosable = true,
  children,
  closeByClickingOutside = false,
  closeOnEscape = false,
  headerChildren,
  linkTo,
  minWidth,
  closeHandler,
  ...rest
}: IBaslakeModalProps) {
  const calcModalSize = useCallback(
    (width: number) => {
      return width <= minWidth ? 'fullscreen' : size;
    },
    [minWidth, size],
  );

  const [modalSize, setModalSize] = useState(calcModalSize(window?.innerWidth));

  const minWidthStyle = useMemo(() => (minWidth ? css({ minWidth }) : null), [minWidth]);

  useEffect(() => {
    const handleResize = () => {
      const newSize = calcModalSize(window?.innerWidth);
      setModalSize((prev) => (prev !== newSize ? newSize : prev));
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [calcModalSize]);

  return (
    <Modal
      size={minWidth ? modalSize : size}
      open={open}
      className={`${className} ${minWidthStyle}`}
      onClose={closeHandler}
      closeOnDimmerClick={isClosable ? closeByClickingOutside : false}
      closeOnEscape={isClosable ? closeOnEscape : false}
      {...rest} // eslint-disable-line react/jsx-props-no-spreading
    >
      <When condition={!!title || !!headerChildren}>
        {() => (
          <BaslakeModal.Header
            title={title}
            closeHandler={closeHandler}
            isClosable={isClosable}
            headerChildren={headerChildren}
            linkTo={linkTo}
          />
        )}
      </When>
      {children}
    </Modal>
  );
}

BaslakeModal.Header = BaslakeModalHeader;
BaslakeModal.Content = BaslakeModalContent;
BaslakeModal.Actions = BaslakeModalActions;

export default BaslakeModal;
