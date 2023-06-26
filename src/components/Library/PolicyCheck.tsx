export interface PolicyCheckProps {
  children: JSX.Element;
  policy: boolean;
}

function PolicyCheck({ policy, children }: PolicyCheckProps): JSX.Element {
  return policy ? children : <div />;
}

export default PolicyCheck;
