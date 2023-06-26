import { Modal } from 'semantic-ui-react';

interface BaslakeModalContentProps {
  children?: any;
}

function BaslakeModalContent({ children, ...childProps }: BaslakeModalContentProps) {
  return <Modal.Content {...childProps}>{children}</Modal.Content>;
}

export default BaslakeModalContent;
