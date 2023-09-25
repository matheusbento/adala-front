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
  fetchUserHandler: (organizationId: number, userId: number) => void;
  fetchUsersHandler: (organizationId: number) => void;
  saveUserHandler: (organizationId: number, values: any) => void;
  setShowUserModal: (val: string | null) => void;
  initialValues: any;
  showUserModal: string | null;
  isLoadingSaveUser: boolean;
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
  const [isLoadingSaveUser, setIsLoadingSaveUser] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [users, setUsers] = useState<any[] | null>(null);
  const [isLoadingUsers, setisLoadingUsers] = useState(false);
  const [showUserModal, setShowUserModal] = useState<string | null>(null);
  const [initialValues, setInitialValues] = useState({});

  const fetchUserHandler = useCallback(async (orgId?: number, userId?: number) => {
    try {
      setIsLoadingUser(true);
      const response = await api.get(`/organizations/${orgId}/users/${userId}`);
      const { permissions } = response.data.data;

      const direct = permissions.reduce((a: any, v: any) => ({ ...a, [v]: true }), {});
      setUser({ ...response.data.data, direct_permissions: direct });
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

  const saveUserHandler = useCallback(
    async (orgId: number, values: any) => {
      try {
        setisLoadingUsers(true);
        const response = await api.post(`/organizations/${orgId}/users`, values);
        fetchUserHandler(orgId, response.data.data.id);
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
    },
    [fetchUserHandler],
  );

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
      setShowUserModal,
      showUserModal,
      isLoadingSaveUser,
      saveUserHandler,
      initialValues,
    }),
    [
      initialValues,
      saveUserHandler,
      isLoadingSaveUser,
      showUser,
      users,
      showUserModal,
      setShowUserModal,
      isLoadingUsers,
      fetchUserHandler,
      fetchUsersHandler,
      user,
      isLoadingUser,
    ],
  );

  return <UserContext.Provider value={providerValue}>{children}</UserContext.Provider>;
}

export { UserProvider, useUser };
