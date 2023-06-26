import { ReactNode } from 'react';

import { Modal } from 'semantic-ui-react';

interface BaslakeModalActionsProps {
  children?: ReactNode;
}

function BaslakeModalActions({ children, ...childProps }: BaslakeModalActionsProps) {
  return <Modal.Actions {...childProps}>{children}</Modal.Actions>;
}

export default BaslakeModalActions;
