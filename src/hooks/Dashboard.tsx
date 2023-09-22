import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';
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
  updateDashboardItem: (itemId: string, data: any) => void;
  clearDashboardItems: () => void;
  dashboardItems: any;
  getItems: () => void;
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

  const { cube } = useCubes();
  const { organization } = useOrganization();

  const getItems = useCallback(async () => {
    const items = await Cookies.get(`dashItems-${cube.id}`);
    setDashboardItems(JSON.parse(items ?? '[]'));
  }, [cube?.id]);

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

  const updateDashboardItem = useCallback(
    (itemId: string, data: any) => {
      setIsLoadingDashboardItems(true);
      setDashboardItems((prev: any) => {
        let toUpdate = prev.find((e: any) => e.id === itemId);
        const index = prev.indexOf(toUpdate);
        const filtered = prev;
        toUpdate = { ...toUpdate, ...data };
        filtered[index] = toUpdate;
        Cookies.set(`dashItems-${cube.id}`, JSON.stringify(filtered));
        return filtered;
      });
      setIsLoadingDashboardItems(false);
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
      getItems,
      deleteDashboardItem,
      updateDashboardItem,
      isLoadingDashboardItems,
      setIsDraggable,
      isDraggable,
      setIsEditing,
      isEditing,
    }),
    [
      isEditing,
      setIsEditing,
      isDraggable,
      setIsDraggable,
      clearDashboardItems,
      isLoadingDashboardItems,
      updateDashboardItem,
      showDashboard,
      getItems,
      deleteDashboardItem,
      dashboardItems,
      isLoadingDashboardItem,
    ],
  );

  return <DashboardContext.Provider value={providerValue}>{children}</DashboardContext.Provider>;
}

export { DashboardProvider, useDashboard };
