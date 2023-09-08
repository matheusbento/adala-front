import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';
import { etlAPI } from '@helpers/api';

export type DashboardType = {
  showDashboard: boolean;
  setShowDashboard: (val: boolean) => void;
  isLoadingDashboard: boolean;
  setIsLoadingDashboard: (val: boolean) => void;
  dashboard: any;
  fetchDashboardHandler: (identifier: string, params?: any) => void;
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
    }),
    [showDashboard, fetchDashboardHandler, dashboard, isLoadingDashboard],
  );

  return <DashboardContext.Provider value={providerValue}>{children}</DashboardContext.Provider>;
}

export { DashboardProvider, useDashboard };
