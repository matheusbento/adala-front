import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from 'react';

import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

import api from 'helpers/api';

import { SessionType } from 'types/SessionType';

export type AuthContextType = {
  getAuthenticationHandler: () => Promise<void>;
  logoutHandler: () => void;
  session: SessionType | null;
  isUserId: (userId: string) => boolean;
  isLoadingSession: boolean;
  isLoadingLogout: boolean;
  hasPermission: (permission: string) => boolean;
  hasSession: () => string[] | undefined;
  headers: undefined;
  loggedIn: boolean;
  wasFetched: boolean;
};

export const Auth = createContext<AuthContextType | null>(null);

const useAuth = () => {
  const context = useContext(Auth);
  if (!context) {
    throw new Error('useAuth must be within AuthProvider');
  }

  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);
  const [session, setSession] = useState<SessionType | null>(null);
  const [headers, setHeaders] = useState();

  const getAuthenticationHandler = useCallback(async () => {
    const userToken = await Cookies.get('userToken');
    setHeaders(userToken ? JSON.parse(userToken) : {});

    setIsLoadingSession(true);

    // setSession({
    //   user: {
    //     id: '1',
    //     login: '123',
    //     password: '123',
    //     name: 'Fake User',
    //     avatar: null,
    //   },
    //   permissions: [
    //     'baslake_access',
    //     'baslake_cubes_access',
    //     'baslake_cubes_manage',
    //     'baslake_datasets_access',
    //     'baslake_datasets_manage',
    //   ],
    // });

    setIsLoadingSession(false);

    // api
    //   .get('/user/details')
    //   .then((response: AxiosResponse) => {
    //     setSession(response.data);
    //   })
    //   .finally(() => setIsLoadingSession(false));
  }, []);

  const logoutHandler = () => {
    // eslint-disable-next-line no-console
    console.log('aaaaaa');
    setIsLoadingLogout(true);

    api.post('/user/logout', {}).then(() => {
      setIsLoadingLogout(true);
      window.location.href = '/login';
    });
  };

  const loggedIn = useMemo(() => !!session?.user?.id, [session]);

  const wasFetched = true;

  const isUserId = useCallback(
    (userId: string) => session?.user?.id === userId,
    [session]
  );
  const hasPermission = useCallback(
    (permission: string) => (session?.permissions || []).includes(permission),
    [session]
  );
  const hasSession = useCallback(() => session?.permissions, [session]);

  const providerValue = useMemo(
    () => ({
      loggedIn,
      wasFetched,
      getAuthenticationHandler,
      logoutHandler,
      session,
      isUserId,
      isLoadingSession,
      hasPermission,
      hasSession,
      isLoadingLogout,
      headers,
    }),
    [
      loggedIn,
      wasFetched,
      session,
      isUserId,
      headers,
      isLoadingSession,
      isLoadingLogout,
      hasPermission,
      hasSession,
      getAuthenticationHandler,
      logoutHandler,
    ]
  );

  return <Auth.Provider value={providerValue}>{children}</Auth.Provider>;
};

export { AuthProvider, useAuth };
