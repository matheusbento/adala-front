import { ReactNode } from 'react';

import { Modal } from 'semantic-ui-react';

interface BaslakeModalActionsProps {
  children?: ReactNode;
}

const BaslakeModalActions = ({
  children,
  ...childProps
}: BaslakeModalActionsProps) => (
  <Modal.Actions {...childProps}>{children}</Modal.Actions>
);

export default BaslakeModalActions;
