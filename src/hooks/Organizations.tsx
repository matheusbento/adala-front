import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
  useCallback,
} from 'react';

import api from '@helpers/api';
import Cookies from 'js-cookie';

import { OrganizationType } from 'types/OrganizationType';
import { PaginateParams } from 'types/PaginateParams';

export type OrganizationHookType = {
  // showModal: boolean;
  // setShowModal: (val: boolean) => void;
  // setIsOpenCubeViewerModal: (val: boolean) => void;
  // showCubeModelHandler: (organizationId: number | string, params?: any) => void;
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
  organization: OrganizationType | null;
  initOrganization: () => void;
  getOrganizationId: () => Promise<number | null>;
};

export const OrganizationContext = createContext<OrganizationHookType | null>(
  null
);

const useOrganizations = () => {
  const context = useContext(OrganizationContext);
  if (!context) {
    throw new Error('useOrganizations must be within OrganizationsProvider');
  }

  return context;
};

interface OrganizationsProviderProps {
  children: ReactNode;
}

const OrganizationsProvider = ({ children }: OrganizationsProviderProps) => {
  // const [showModal, setShowModal] = useState(false);
  // const [order, setOrder] = useState<OrderType>();
  const [isLoadingOrganizations, setIsLoadingAllOrganizations] =
    useState(false);
  // const [isLoadingCube, setIsLoadingCube] = useState(false);
  // const [isLoadingCubeView, setIsLoadingCubeView] = useState(false);
  // const [isUpdating, setIsUpdating] = useState(false);
  const [organizations, setAllOrganizations] = useState<
    OrganizationType[] | null
  >(null);
  const [organization, setOrganization] = useState<OrganizationType | null>(
    null
  );
  // const [organizationView, setOrganizationView] = useState<Record<string, any> | null>({});
  // const [currentPage, setCurrentPage] = useState(0);

  const [isOpenCubeViewerModal, setIsOpenCubeViewerModal] = useState(false);

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

  // const showCubeModelHandler = useCallback(
  //   async (organizationId: number | string, params: any = null) => {
  //     try {
  //       setIsLoadingCube(true);
  //       const response = await organizationsAPI.get(`organization/${organizationId}/model`, {
  //         params,
  //       });
  //       setShowCube(organizationId);
  //       setOrganization(response?.data);
  //     } catch (e) {
  //       setOrganization(null);
  //       // [todo]
  //       // toaster(
  //       //   dispatch,
  //       //   'Error while trying to load the departmentSources',
  //       //   'error'
  //       // );
  //     } finally {
  //       setIsLoadingCube(false);
  //     }
  //   },
  //   [setLoadingOverview]
  // );

  // const fetchCubeViewerHandler = useCallback(
  //   async (dimension?: string, params: any = {}) => {
  //     try {
  //       setIsLoadingCubeView(true);
  //       const response = await organizationsAPI.get(
  //         dimension
  //           ? `organization/${organization?.name}/viewer/${dimension}`
  //           : `organization/${organization?.name}/viewer`,
  //         {
  //           params,
  //         }
  //       );
  //       setOrganizationView(response?.data);
  //     } catch (e) {
  //       setOrganizationView(null);
  //       // [todo]
  //       // toaster(
  //       //   dispatch,
  //       //   'Error while trying to load the departmentSources',
  //       //   'error'
  //       // );
  //     } finally {
  //       setIsLoadingCubeView(false);
  //     }
  //   },
  //   [setLoadingOverview, organization]
  // );

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

  const fetchAllOrganizationsHandler = useCallback(
    async (params: PaginateParams | null = null) => {
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
    },
    []
  );

  const initOrganization = useCallback(async () => {
    const organizationId = getOrganizationId();
    if (organizationId) {
      const currentOrganization = organizations?.find(
        (e) => e.id === +organizationId
      );
      setOrganization(currentOrganization as OrganizationType);
    }
  }, [organizations, getOrganizationId]);

  const handleSetOrganization = useCallback((o: any) => {
    Cookies.set('organization', o.id);
    setOrganization(o);
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
      organization,
      // organizationView,
      fetchAllOrganizationsHandler,
      handleSetOrganization,
      initOrganization,
      getOrganizationId,
    }),
    [
      getOrganizationId,
      initOrganization,
      handleSetOrganization,
      fetchAllOrganizationsHandler,
      // showModal,
      organizations,
      organization,
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
    ]
  );

  return (
    <OrganizationContext.Provider value={providerValue}>
      {children}
    </OrganizationContext.Provider>
  );
};

export { OrganizationsProvider, useOrganizations };
