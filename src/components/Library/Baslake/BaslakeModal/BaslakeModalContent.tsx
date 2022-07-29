import { ReactNode } from 'react';

import { Modal } from 'semantic-ui-react';

interface BaslakeModalContentProps {
  children?: any;
}

const BaslakeModalContent = ({
  children,
  ...childProps
}: BaslakeModalContentProps) => (
  <Modal.Content {...childProps}>{children}</Modal.Content>
);

export default BaslakeModalContent;
