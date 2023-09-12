import { Modal } from 'semantic-ui-react';

interface IBaslakeModalContentProps {
  children?: any;
  className?: string;
}

function BaslakeModalContent({ children, ...childProps }: IBaslakeModalContentProps) {
  return <Modal.Content {...childProps}>{children}</Modal.Content>;
}

export default BaslakeModalContent;
