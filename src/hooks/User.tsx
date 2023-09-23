import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';
import api from '@helpers/api';

export type UserType = {
  showUser: boolean;
  setShowUser: (val: boolean) => void;
  isLoadingUser: boolean;
  setIsLoadingUser: (val: boolean) => void;
  user: any;
  users: any[] | null;
  isLoadingUsers: boolean;
  fetchUserHandler: (identifier: string, params?: any) => void;
  fetchUsersHandler: (organizationId: number) => void;
};

export const UserContext = createContext<UserType | null>(null);

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be within UserProvider');
  }

  return context;
};

interface IUserProviderProps {
  children: ReactNode;
}

function UserProvider({ children }: IUserProviderProps) {
  const [showUser, setShowUser] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [users, setUsers] = useState<any[] | null>(null);
  const [isLoadingUsers, setisLoadingUsers] = useState(false);

  const fetchUserHandler = useCallback(async (identifier?: string, params: any = {}) => {
    try {
      setIsLoadingUser(true);
    } catch (e) {
      setUser(null);
      // [todo]
      // toaster(
      //   dispatch,
      //   'Error while trying to load the departmentSources',
      //   'error'
      // );
    } finally {
      setIsLoadingUser(false);
    }
  }, []);

  const fetchUsersHandler = useCallback(async (orgId: number) => {
    try {
      setisLoadingUsers(true);
      const response = await api.get(`/organizations/${orgId}/users`);
      setUsers(response?.data?.data);
    } catch (e) {
      setUsers(null);
      // [todo]
      // toaster(
      //   dispatch,
      //   'Error while trying to load the departmentSources',
      //   'error'
      // );
    } finally {
      setisLoadingUsers(false);
    }
  }, []);

  const providerValue = useMemo(
    () => ({
      showUser,
      setShowUser,
      isLoadingUser,
      setIsLoadingUser,
      fetchUserHandler,
      fetchUsersHandler,
      isLoadingUsers,
      user,
      users,
    }),
    [showUser, users, isLoadingUsers, fetchUserHandler, fetchUsersHandler, user, isLoadingUser],
  );

  return <UserContext.Provider value={providerValue}>{children}</UserContext.Provider>;
}

export { UserProvider, useUser };
