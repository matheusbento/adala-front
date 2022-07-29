import { ReactNode } from 'react';

const LoadingGate = ({
  waitFor,
  meanwhile,
  children,
}: {
  waitFor: boolean;
  meanwhile: ReactNode;
  children: ReactNode;
}) => <div>{waitFor ? children : meanwhile}</div>;

export default LoadingGate;
