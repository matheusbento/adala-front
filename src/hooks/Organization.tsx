import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import api from '@helpers/api';
import Cookies from 'js-cookie';

import { OrganizationType } from 'types/OrganizationType';
import { PaginateParams } from 'types/PaginateParams';

export type OrganizationHookType = {
  // showModal: boolean;
  deletOrganizationHandler: (organizationId: number) => void;
  // setShowModal: (val: boolean) => void;
  // setIsOpenCubeViewerModal: (val: boolean) => void;
  setInitialValues: (data: OrganizationType | undefined) => void;
  // showCubeModelHandler: (organizationId: number | string, params?: any) => void;
  saveOrganizationHandler: (data: OrganizationType) => void;
  // fetchCubeViewerHandler: (dimension?: string, params?: any) => void;
  fetchAllOrganizationsHandler: (params?: PaginateParams | null) => void;
  // loadingOverview: boolean;
  // showCube: number | string | null;
  // isLoadingOrganizations: boolean;
  // isLoadingCube: boolean;
  // isUpdating: boolean;
  // isLoadingCubeView: boolean;
  // isOpenCubeViewerModal: boolean;
  handleSetOrganization: (organization: OrganizationType) => void;
  organizations: OrganizationType[] | null;
  currentOrganization: OrganizationType | null;
  initOrganization: () => void;
  getOrganizationId: () => Promise<number | null>;
  initialValues: OrganizationType | undefined;
  isLoadingSave: boolean;
  organization: OrganizationType | null;
  isLoadingOrganization: boolean;
  fetchOrganizationHandler: (organizationId: number, params?: any) => void;
};

export const OrganizationContext = createContext<OrganizationHookType | null>(null);

const useOrganization = () => {
  const context = useContext(OrganizationContext);
  if (!context) {
    throw new Error('useOrganization must be within OrganizationProvider');
  }

  return context;
};

interface IOrganizationProviderProps {
  children: ReactNode;
}

function OrganizationProvider({ children }: IOrganizationProviderProps) {
  // const [showModal, setShowModal] = useState(false);
  // const [order, setOrder] = useState<OrderType>();
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [isLoadingOrganizations, setIsLoadingAllOrganizations] = useState(false);
  // const [isLoadingOrganizations, setIsLoadingOrganizations] = useState(false);
  // const [isLoadingCubeView, setIsLoadingCubeView] = useState(false);
  // const [isUpdating, setIsUpdating] = useState(false);
  const [initialValues, setInitialValues] = useState<OrganizationType | undefined>(undefined);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [organizations, setAllOrganizations] = useState<OrganizationType[] | null>(null);
  const [currentOrganization, setCurrentOrganization] = useState<OrganizationType | null>(null);
  const [isLoadingOrganization, setIsLoadingOrganization] = useState(false);
  const [organization, setOrganization] = useState(null);
  // const [organizationView, setOrganizationView] = useState<Record<string, any> | null>({});
  // const [currentPage, setCurrentPage] = useState(0);

  const [isOpenCubeViewerModal, setIsOpenCubeViewerModal] = useState(false);

  // const fetchOrganizationsHandler = useCallback(
  //   async (search: string | null = null, params: PaginateParams | null = null) => {
  //     try {
  //       setIsLoadingOrganizations(true);

  //       if (params?.order_by) {
  //         setOrder({ ...order, order_by: params?.order_by });
  //       }
  //       if (params?.direction) {
  //         setOrder({ ...order, direction: params?.direction });
  //       }

  //       let auxParams: PaginateParams = {
  //         ...params,
  //         order_by: order?.order_by,
  //         direction: order?.direction,
  //         page: params?.page ?? silosMeta?.current_page,
  //       };

  //       if (search && search?.length > 0) {
  //         auxParams = {
  //           ...auxParams,
  //           q: search,
  //         };
  //       }

  //       const response = await api.get(`organizations/${organizationId}/folders/`, {
  //         params: auxParams,
  //       });

  //       setSilos(response?.data?.data);
  //       setSilosMeta(response?.data?.meta);
  //     } catch (e) {
  //       setSilos([]);
  //       // [todo]
  //       // toaster(
  //       //   dispatch,
  //       //   'Error while trying to load the departmentSources',
  //       //   'error'
  //       // );
  //     } finally {
  //       setIsLoadingOrganizations(false);
  //     }
  //   },
  //   [order, organizationId],
  // );

  const fetchOrganizationHandler = useCallback(async (organizationId: number, params?: any) => {
    try {
      setIsLoadingOrganization(true);
      const response = await api.get(`organizations/${organizationId}`, {
        params,
      });
      setOrganization(response.data.data);
    } catch (e) {
      // [todo]
      // toaster(
      //   dispatch,
      //   'Error while trying to load the departmentSources',
      //   'error'
      // );
    } finally {
      setIsLoadingOrganization(false);
    }
  }, []);

  const getOrganizationId = useCallback(async () => {
    const id = await Cookies.get('organization');
    if (id) {
      return +id;
    }
    return null;
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [loadingOverview, setLoadingOverview] = useState(false);

  // const [showCube, setShowCube] = useState<number | string | null>(null);

  // const fetchOrganizationsHandler = useCallback(
  //   async (
  //     search: string | undefined | null = null,
  //     params: PaginateParams | null = null
  //   ) => {
  //     try {
  //       setIsLoadingAllOrganizations(true);

  //       if (params?.order_by) {
  //         setOrder({ ...order, order_by: params?.order_by });
  //       }
  //       if (params?.direction) {
  //         setOrder({ ...order, direction: params?.direction });
  //       }

  //       let auxParams: PaginateParams = {
  //         order_by: order?.order_by,
  //         direction: order?.direction,
  //         page: params?.page ?? currentPage,
  //       };

  //       if (search && search?.length > 0) {
  //         auxParams = {
  //           ...auxParams,
  //           q: search,
  //         };
  //       }

  //       const response = await organizationsAPI.get(`organizations/`, {
  //         params,
  //       });

  //       setAllOrganizations(response?.data);
  //     } catch (e) {
  //       setAllOrganizations([]);
  //       // [todo]
  //       // toaster(
  //       //   dispatch,
  //       //   'Error while trying to load the departmentSources',
  //       //   'error'
  //       // );
  //     } finally {
  //       setIsLoadingAllOrganizations(false);
  //     }
  //   },
  //   [order, currentPage]
  // );

  const fetchAllOrganizationsHandler = useCallback(async (params: PaginateParams | null = null) => {
    try {
      setIsLoadingAllOrganizations(true);

      const response = await api.get(`organizations/`, {
        params: { ...params, all: true },
      });

      setAllOrganizations(response?.data?.data);
    } catch (e) {
      setAllOrganizations([]);
      // [todo]
      // toaster(
      //   dispatch,
      //   'Error while trying to load the departmentSources',
      //   'error'
      // );
    } finally {
      setIsLoadingAllOrganizations(false);
    }
  }, []);

  const saveOrganizationHandler = useCallback(
    async (data: OrganizationType) => {
      try {
        setIsLoadingSave(true);
        const method = data?.id ? 'put' : 'post';
        const url = data?.id ? `organizations/${data?.id}` : `organizations`;

        const response = await api({
          method,
          url,
          data,
          timeout: 600000,
        });
        fetchAllOrganizationsHandler();
        // setSiloView(response?.data);
      } catch (e) {
        // setSiloView(null);
        // [todo]
        // toaster(
        //   dispatch,
        //   'Error while trying to load the departmentSources',
        //   'error'
        // );
      } finally {
        setIsLoadingSave(false);
      }
    },
    [fetchAllOrganizationsHandler],
  );

  const deletOrganizationHandler = useCallback(
    async (organizationId: number) => {
      try {
        setIsLoadingDelete(true);
        const url = `organizations/${organizationId}`;

        await api({
          method: 'delete',
          url,
        });
        fetchAllOrganizationsHandler();
        // setSiloView(response?.data);
      } catch (e) {
        // setSiloView(null);
        // [todo]
        // toaster(
        //   dispatch,
        //   'Error while trying to load the departmentSources',
        //   'error'
        // );
      } finally {
        setIsLoadingDelete(false);
      }
    },
    [fetchAllOrganizationsHandler],
  );

  const initOrganization = useCallback(async () => {
    const organizationId = await getOrganizationId();
    if (organizationId) {
      const c = organizations?.find((e) => e.id === +organizationId);
      setCurrentOrganization(c as OrganizationType);
    }
  }, [organizations, getOrganizationId]);

  useEffect(() => {
    initOrganization();
  }, []);

  const handleSetOrganization = useCallback((o: any) => {
    Cookies.set('organization', o ? o.id : null);
    setCurrentOrganization(o);
  }, []);

  const providerValue = useMemo(
    () => ({
      // showModal,
      // setShowModal,
      // showCubeModelHandler,
      // fetchCubeViewerHandler,
      // fetchOrganizationsHandler,
      // loadingOverview,
      // showCube,
      isLoadingOrganizations,
      // isLoadingCube,
      // isLoadingCubeView,
      isOpenCubeViewerModal,
      setIsOpenCubeViewerModal,
      // isUpdating,
      organizations,
      currentOrganization,
      // organizationView,
      fetchAllOrganizationsHandler,
      handleSetOrganization,
      initOrganization,
      getOrganizationId,
      isLoadingSave,
      saveOrganizationHandler,
      initialValues,
      deletOrganizationHandler,
      setInitialValues,
      organization,
      isLoadingOrganization,
      fetchOrganizationHandler,
    }),
    [
      fetchOrganizationHandler,
      organization,
      isLoadingOrganization,
      setInitialValues,
      deletOrganizationHandler,
      initialValues,
      saveOrganizationHandler,
      isLoadingSave,
      getOrganizationId,
      initOrganization,
      handleSetOrganization,
      fetchAllOrganizationsHandler,
      // showModal,
      organizations,
      currentOrganization,
      isLoadingOrganizations,
      // isLoadingCube,
      // isLoadingCubeView,
      isOpenCubeViewerModal,
      // setShowModal,
      // isUpdating,
      // fetchOrganizationsHandler,
      // showCubeModelHandler,
      // fetchCubeViewerHandler,
      setIsOpenCubeViewerModal,
      // showCube,
      // organizationView,
      // loadingOverview,
    ],
  );

  return (
    <OrganizationContext.Provider value={providerValue}>{children}</OrganizationContext.Provider>
  );
}

export { OrganizationProvider, useOrganization };
