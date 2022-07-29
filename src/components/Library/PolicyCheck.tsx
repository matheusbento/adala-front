export interface PolicyCheckProps {
  children: JSX.Element;
  policy: boolean;
}

const PolicyCheck = ({ policy, children }: PolicyCheckProps): JSX.Element =>
  policy ? children : <div />;

export default PolicyCheck;
