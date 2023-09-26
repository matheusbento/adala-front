import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';
import api from '@helpers/api';
import Cookies from 'js-cookie';
import { useCubes } from './Cubes';
import { useOrganization } from './Organization';

export type DashboardType = {
  showDashboard: boolean;
  isLoadingDashboardItems: boolean;
  setShowDashboard: (val: boolean) => void;
  isLoadingDashboardItem: any;
  setIsLoadingDashboardItem: (val: boolean) => void;
  deleteDashboardItem: (itemId: string) => void;
  // updateDashboardItem: (itemId: string, data: any) => void;
  clearDashboardItems: () => void;
  dashboardItems: any;
  fetchCubeItemsHandler: () => void;
  saveCubeItemHandler: (values: any) => void;
  setIsDraggable: any;
  isDraggable: any;
  setIsEditing: any;
  isEditing: any;
};

export const DashboardContext = createContext<DashboardType | null>(null);

const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be within DashboardProvider');
  }

  return context;
};

interface IDashboardProviderProps {
  children: ReactNode;
  organizationId: number;
}

function DashboardProvider({ children, organizationId }: IDashboardProviderProps) {
  const [showDashboard, setShowDashboard] = useState(false);
  const [isLoadingDashboardItem, setIsLoadingDashboardItem] = useState<any>({});
  const [isDraggable, setIsDraggable] = useState<any>({});
  const [isEditing, setIsEditing] = useState<any>({});

  const [dashboardItems, setDashboardItems] = useState<any>([]);
  const [isLoadingDashboardItems, setIsLoadingDashboardItems] = useState(false);
  const [isLoadingSaveDashboardItem, setIsLoadingSaveDashboardItem] = useState(false);

  const { cube } = useCubes();
  const { currentOrganization } = useOrganization();

  // const fetchCubeItemsHandler = useCallback(async () => {
  //   const items = await Cookies.get(`dashItems-${cube.id}`);
  //   setDashboardItems(JSON.parse(items ?? '[]'));
  // }, [cube?.id]);

  const fetchCubeItemsHandler = useCallback(
    async (params: any = {}) => {
      try {
        setIsLoadingDashboardItems(true);
        const response = await api.get(
          `/organizations/${currentOrganization?.id}/cubes/${cube?.id}/dashboard/items?all=true`,
          {
            params,
          },
        );
        setDashboardItems(response?.data?.data);
      } catch (e) {
        setDashboardItems(null);
        // [todo]
        // toaster(
        //   dispatch,
        //   'Error while trying to load the departmentSources',
        //   'error'
        // );
      } finally {
        setIsLoadingDashboardItems(false);
      }
    },
    [cube?.id, currentOrganization?.id],
  );

  const saveCubeItemHandler = useCallback(
    async (data: any = {}) => {
      try {
        setIsLoadingSaveDashboardItem(true);
        const url = data?.id
          ? `/organizations/${currentOrganization?.id}/cubes/${cube?.id}/dashboard/items/${data?.id}`
          : `/organizations/${currentOrganization?.id}/cubes/${cube?.id}/dashboard/items`;
        const method = data?.id ? 'PUT' : 'POST';
        const response = await api({ url, method, data });
        if (!data?.id) {
          fetchCubeItemsHandler();
        }
      } catch (e) {
        // [todo]
        // toaster(
        //   dispatch,
        //   'Error while trying to load the departmentSources',
        //   'error'
        // );
      } finally {
        setIsLoadingSaveDashboardItem(false);
      }
    },
    [cube?.id, currentOrganization?.id, fetchCubeItemsHandler],
  );

  const deleteDashboardItem = useCallback(
    (itemId: string) => {
      setDashboardItems((prev: any) => {
        const filtered = prev.filter((e: any) => e.id !== +itemId);
        console.log({ filtered, itemId });
        Cookies.set(`dashItems-${cube.id}`, JSON.stringify(filtered));
        return filtered;
      });
    },
    [cube.id],
  );

  // const fetchDashboardHandler = useCallback(async (identifier?: string, params: any = {}) => {
  //   try {
  //     setIsLoadingDashboardItem(true);
  //     const response = await etlAPI.get(`data?identifier=${identifier}`, {
  //       params,
  //     });
  //     setDashboard(response?.data?.data);
  //   } catch (e) {
  //     setDashboard(null);
  //     // [todo]
  //     // toaster(
  //     //   dispatch,
  //     //   'Error while trying to load the departmentSources',
  //     //   'error'
  //     // );
  //   } finally {
  //     setIsLoadingDashboardItem(false);
  //   }
  // }, []);

  const clearDashboardItems = useCallback(() => {
    setDashboardItems([]);
  }, []);

  const providerValue = useMemo(
    () => ({
      showDashboard,
      setShowDashboard,
      isLoadingDashboardItem,
      setIsLoadingDashboardItem,
      clearDashboardItems,
      dashboardItems,
      fetchCubeItemsHandler,
      deleteDashboardItem,
      isLoadingDashboardItems,
      setIsDraggable,
      isDraggable,
      setIsEditing,
      isEditing,
      saveCubeItemHandler,
    }),
    [
      saveCubeItemHandler,
      isEditing,
      setIsEditing,
      isDraggable,
      setIsDraggable,
      clearDashboardItems,
      isLoadingDashboardItems,
      showDashboard,
      fetchCubeItemsHandler,
      deleteDashboardItem,
      dashboardItems,
      isLoadingDashboardItem,
    ],
  );

  return <DashboardContext.Provider value={providerValue}>{children}</DashboardContext.Provider>;
}

export { DashboardProvider, useDashboard };
