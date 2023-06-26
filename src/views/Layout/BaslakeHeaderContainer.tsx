import { useAuth } from '@hooks/Auth';

import BaslakeHeader from './BaslakeHeader';

function BaslakeHeaderContainer(props: {
  setIsBarVisible: (status: boolean) => void;
  isBarVisible: boolean;
}) {
  // todo - use contextx
  const searchContext = 'baslake';
  const { logoutHandler, session } = useAuth();

  return (
    <BaslakeHeader
      session={session}
      logoutHandler={logoutHandler}
      searchContext={searchContext}
      {...props}
    />
  );
}

export default BaslakeHeaderContainer;
