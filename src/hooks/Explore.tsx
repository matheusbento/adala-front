import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';
import api from '@helpers/api';
import { CubeType } from 'types/CubeType';
import { useOrganization } from './Organization';

export type ExploreType = {
  showExplore: boolean;
  setShowExplore: (val: boolean) => void;
  isLoadingExplore: boolean;
  setIsLoadingExplore: (val: boolean) => void;
  Explore: any;
  columns: any[] | null;
  isLoadingColumns: boolean;
  fetchExploreHandler: (identifier: string, params?: any) => void;
  fetchColumnsHandler: (cube: CubeType) => void;
};

export const ExploreContext = createContext<ExploreType | null>(null);

const useExplore = () => {
  const context = useContext(ExploreContext);
  if (!context) {
    throw new Error('useExplore must be within ExploreProvider');
  }

  return context;
};

interface IExploreProviderProps {
  children: ReactNode;
  organizationId: number;
}

function ExploreProvider({ children, organizationId }: IExploreProviderProps) {
  const { currentOrganization } = useOrganization();
  const [showExplore, setShowExplore] = useState(false);
  const [Explore, setExplore] = useState<any>(null);
  const [isLoadingExplore, setIsLoadingExplore] = useState(false);
  const [columns, setColumns] = useState<any[] | null>(null);
  const [isLoadingColumns, setisLoadingColumns] = useState(false);

  const fetchExploreHandler = useCallback(async (identifier?: string, params: any = {}) => {
    try {
      setIsLoadingExplore(true);
    } catch (e) {
      setExplore(null);
      // [todo]
      // toaster(
      //   dispatch,
      //   'Error while trying to load the departmentSources',
      //   'error'
      // );
    } finally {
      setIsLoadingExplore(false);
    }
  }, []);

  const fetchColumnsHandler = useCallback(
    async (cube: CubeType) => {
      try {
        setisLoadingColumns(true);
        const response = await api.get(
          `/organizations/${currentOrganization?.id}/cubes/${cube.id}/attributes`,
        );
        setColumns(response?.data?.attributes);
      } catch (e) {
        setColumns(null);
        // [todo]
        // toaster(
        //   dispatch,
        //   'Error while trying to load the departmentSources',
        //   'error'
        // );
      } finally {
        setisLoadingColumns(false);
      }
    },
    [currentOrganization],
  );

  const providerValue = useMemo(
    () => ({
      showExplore,
      setShowExplore,
      isLoadingExplore,
      setIsLoadingExplore,
      fetchExploreHandler,
      fetchColumnsHandler,
      isLoadingColumns,
      Explore,
      columns,
    }),
    [
      showExplore,
      columns,
      isLoadingColumns,
      fetchExploreHandler,
      fetchColumnsHandler,
      Explore,
      isLoadingExplore,
    ],
  );

  return <ExploreContext.Provider value={providerValue}>{children}</ExploreContext.Provider>;
}

export { ExploreProvider, useExplore };
