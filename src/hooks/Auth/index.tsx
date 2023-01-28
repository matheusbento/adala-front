import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from 'react';

import { AxiosError, AxiosResponse } from 'axios';
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
  loginHandler: (email: string, password: string) => void;
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
  const [wasFetched, setWasFetched] = useState(true);

  const logout = () => {
    Cookies.remove('userToken');
    window.sessionStorage.removeItem('isLogged');
    window.sessionStorage.removeItem('organization');
    // eslint-disable-next-line no-console
    console.log('Logout');
    window.location.href = '/login';
  };

  const getAuthenticationHandler = useCallback(async () => {
    const userToken = await Cookies.get('userToken');
    setHeaders(userToken ? JSON.parse(userToken) : {});

    setIsLoadingSession(true);

    api
      .get('/user/me')
      .then((response: AxiosResponse) => {
        setSession(response.data);
        Cookies.set('userToken', JSON.stringify(response.data.authorization));
        setIsLoadingSession(false);
      })
      .catch((e: AxiosError<any>) => {
        if (e?.response?.data?.message === 'Unauthenticated.') {
          logout();
        }
      })
      .finally(() => setIsLoadingSession(false));
  }, []);

  const logoutHandler = () => {
    setIsLoadingLogout(true);

    api.post('/user/logout', {}).then(() => {
      setIsLoadingLogout(true);
      logout();
    });
  };

  const loginHandler = (email: string, password: string) => {
    // eslint-disable-next-line no-console
    console.log('aaaaaa');
    setIsLoadingSession(true);
    setWasFetched(false);

    api
      .post('/user/login', { email, password })
      .then((response: AxiosResponse) => {
        setSession(response.data);
        Cookies.set('userToken', JSON.stringify(response.data.authorization));
        sessionStorage.setItem('isLogged', JSON.stringify(response.data));
        setIsLoadingSession(true);
        setWasFetched(true);
        window.location.href = '/';
      });
  };

  const loggedSession = useMemo(
    () => sessionStorage.getItem('isLogged'),
    [Cookies]
  );

  const loggedIn = useMemo(
    () => !!session?.user?.id || !!loggedSession,
    [session, loggedSession]
  );

  const isUserId = useCallback(
    (userId: string) => session?.user?.id === userId,
    [session]
  );
  const hasPermission = useCallback(
    (permission: string) =>
      (session?.user?.permissions || []).includes(permission),
    [session]
  );
  const hasSession = useCallback(() => session?.user?.permissions, [session]);

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
      loginHandler,
    }),
    [
      loginHandler,
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
