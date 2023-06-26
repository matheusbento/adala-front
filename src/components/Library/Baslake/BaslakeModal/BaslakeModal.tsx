import { ReactNode } from 'react';

import { When } from 'react-if';
import { Modal } from 'semantic-ui-react';

import BaslakeModalActions from './BaslakeModalActions';
import BaslakeModalContent from './BaslakeModalContent';
import BaslakeModalHeader from './BaslakeModalHeader';

interface BaslakeModalProps {
  className?: string;
  size?: 'small' | 'mini' | 'tiny' | 'large' | 'fullscreen';
  open?: boolean;
  title?: string;
  closeHandler: any;
  onDismiss?: any;
  onConfirm?: any;
  isClosable?: boolean;
  children?: ReactNode;
  closeByClickingOutside?: boolean;
  closeOnEscape?: boolean;
  headerChildren?: ReactNode;
  linkTo?: string;
}

function BaslakeModal({
  className = '',
  size = undefined,
  open = false,
  isClosable = true,
  children = null,
  closeByClickingOutside = false,
  closeOnEscape = false,
  headerChildren = null,
  title = undefined,
  linkTo = undefined,
  closeHandler,
  ...rest
}: BaslakeModalProps) {
  return (
    <Modal
      size={size}
      open={open}
      className={`${className}`}
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
