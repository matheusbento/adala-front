import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';
import { etlAPI } from '@helpers/api';
import Cookies from 'js-cookie';

export type DashboardType = {
  showDashboard: boolean;
  setShowDashboard: (val: boolean) => void;
  isLoadingDashboard: boolean;
  setIsLoadingDashboard: (val: boolean) => void;
  dashboard: any;
  fetchDashboardHandler: (identifier: string, params?: any) => void;
  deleteDashboardItem: (itemId: string) => void;
  updateDashboardItem: (itemId: string, data: any) => void;
  dashboardItems: any;
  getItems: () => void;
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
  const [dashboard, setDashboard] = useState<any>(null);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);

  const [dashboardItems, setDashboardItems] = useState<any>([]);

  const getItems = useCallback(async () => {
    const items = await Cookies.get('dashItems');
    setDashboardItems(JSON.parse(items ?? '[]'));
  }, []);

  const deleteDashboardItem = useCallback((itemId: string) => {
    setDashboardItems((prev: any) => {
      const filtered = prev.filter((e: any) => e.id !== itemId);
      Cookies.set('dashItems', JSON.stringify(filtered));
      return filtered;
    });
  }, []);

  const updateDashboardItem = useCallback((itemId: string, data: any) => {
    setDashboardItems((prev: any) => {
      let toUpdate = prev.find((e: any) => e.id === itemId);
      const index = prev.indexOf(toUpdate);
      const filtered = prev;
      toUpdate = { ...toUpdate, ...data };
      filtered[index] = toUpdate;
      Cookies.set('dashItems', JSON.stringify(filtered));
      return filtered;
    });
  }, []);

  const fetchDashboardHandler = useCallback(async (identifier?: string, params: any = {}) => {
    try {
      setIsLoadingDashboard(true);
      const response = await etlAPI.get(`data?identifier=${identifier}`, {
        params,
      });
      setDashboard(response?.data?.data);
    } catch (e) {
      setDashboard(null);
      // [todo]
      // toaster(
      //   dispatch,
      //   'Error while trying to load the departmentSources',
      //   'error'
      // );
    } finally {
      setIsLoadingDashboard(false);
    }
  }, []);

  const providerValue = useMemo(
    () => ({
      showDashboard,
      setShowDashboard,
      isLoadingDashboard,
      setIsLoadingDashboard,
      fetchDashboardHandler,
      dashboard,
      dashboardItems,
      getItems,
      deleteDashboardItem,
      updateDashboardItem,
    }),
    [
      updateDashboardItem,
      showDashboard,
      getItems,
      deleteDashboardItem,
      dashboardItems,
      fetchDashboardHandler,
      dashboard,
      isLoadingDashboard,
    ],
  );

  return <DashboardContext.Provider value={providerValue}>{children}</DashboardContext.Provider>;
}

export { DashboardProvider, useDashboard };
