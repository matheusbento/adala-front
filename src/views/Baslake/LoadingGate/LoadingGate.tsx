import { ReactNode } from 'react';

function LoadingGate({
  waitFor,
  meanwhile,
  children,
}: {
  waitFor: boolean;
  meanwhile: ReactNode;
  children: ReactNode;
}) {
  return <div>{waitFor ? children : meanwhile}</div>;
}

export default LoadingGate;
