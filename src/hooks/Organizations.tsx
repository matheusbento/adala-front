import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
  useCallback,
} from 'react';

import { cubesAPI } from '@helpers/api';

import { OrderType } from 'types/OrderType';
import { PaginateParams } from 'types/PaginateParams';

export type CubesType = {
  showModal: boolean;
  setShowModal: (val: boolean) => void;
  setIsOpenCubeViewerModal: (val: boolean) => void;
  showCubeModelHandler: (cubeId: number | string, params?: any) => void;
  fetchCubeViewerHandler: (dimension?: string, params?: any) => void;
  fetchCubesHandler: (
    search?: string | undefined | null,
    params?: PaginateParams | null
  ) => void;
  loadingOverview: boolean;
  showCube: number | string | null;
  isLoadingCubes: boolean;
  isLoadingCube: boolean;
  isUpdating: boolean;
  isLoadingCubeView: boolean;
  isOpenCubeViewerModal: boolean;
  cubes: any;
  cube: any;
  cubeView: any;
};

export const CubesContext = createContext<CubesType | null>(null);

const useCubes = () => {
  const context = useContext(CubesContext);
  if (!context) {
    throw new Error('useCubes must be within CubesProvider');
  }

  return context;
};

interface CubesProviderProps {
  children: ReactNode;
}

const CubesProvider = ({ children }: CubesProviderProps) => {
  const [showModal, setShowModal] = useState(false);
  const [order, setOrder] = useState<OrderType>();
  const [isLoadingCubes, setIsLoadingCubes] = useState(false);
  const [isLoadingCube, setIsLoadingCube] = useState(false);
  const [isLoadingCubeView, setIsLoadingCubeView] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [cubes, setCubes] = useState([]);
  const [cube, setCube] = useState<any>(null);
  const [cubeView, setCubeView] = useState<Record<string, any> | null>({});
  const [currentPage, setCurrentPage] = useState(0);

  const [isOpenCubeViewerModal, setIsOpenCubeViewerModal] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loadingOverview, setLoadingOverview] = useState(false);

  const [showCube, setShowCube] = useState<number | string | null>(null);

  const showCubeModelHandler = useCallback(
    async (cubeId: number | string, params: any = null) => {
      try {
        setIsLoadingCube(true);
        const response = await cubesAPI.get(`cube/${cubeId}/model`, {
          params,
        });
        setShowCube(cubeId);
        setCube(response?.data);
      } catch (e) {
        setCube(null);
        // [todo]
        // toaster(
        //   dispatch,
        //   'Error while trying to load the departmentSources',
        //   'error'
        // );
      } finally {
        setIsLoadingCube(false);
      }
    },
    [setLoadingOverview]
  );

  const fetchCubeViewerHandler = useCallback(
    async (dimension?: string, params: any = {}) => {
      try {
        setIsLoadingCubeView(true);
        const response = await cubesAPI.get(
          dimension
            ? `cube/${cube?.name}/viewer/${dimension}`
            : `cube/${cube?.name}/viewer`,
          {
            params,
          }
        );
        setCubeView(response?.data);
      } catch (e) {
        setCubeView(null);
        // [todo]
        // toaster(
        //   dispatch,
        //   'Error while trying to load the departmentSources',
        //   'error'
        // );
      } finally {
        setIsLoadingCubeView(false);
      }
    },
    [setLoadingOverview, cube]
  );

  const fetchCubesHandler = useCallback(
    async (
      search: string | undefined | null = null,
      params: PaginateParams | null = null
    ) => {
      try {
        setIsLoadingCubes(true);

        if (params?.order_by) {
          setOrder({ ...order, order_by: params?.order_by });
        }
        if (params?.direction) {
          setOrder({ ...order, direction: params?.direction });
        }

        let auxParams: PaginateParams = {
          order_by: order?.order_by,
          direction: order?.direction,
          page: params?.page ?? currentPage,
        };

        if (search && search?.length > 0) {
          auxParams = {
            ...auxParams,
            q: search,
          };
        }

        const response = await cubesAPI.get(`cubes/`, {
          params,
        });

        setCubes(response?.data);
      } catch (e) {
        setCubes([]);
        // [todo]
        // toaster(
        //   dispatch,
        //   'Error while trying to load the departmentSources',
        //   'error'
        // );
      } finally {
        setIsLoadingCubes(false);
      }
    },
    [order, currentPage]
  );

  const providerValue = useMemo(
    () => ({
      showModal,
      setShowModal,
      showCubeModelHandler,
      fetchCubeViewerHandler,
      fetchCubesHandler,
      loadingOverview,
      showCube,
      isLoadingCubes,
      isLoadingCube,
      isLoadingCubeView,
      isOpenCubeViewerModal,
      setIsOpenCubeViewerModal,
      isUpdating,
      cubes,
      cube,
      cubeView,
    }),
    [
      showModal,
      cubes,
      cube,
      isLoadingCubes,
      isLoadingCube,
      isLoadingCubeView,
      isOpenCubeViewerModal,
      setShowModal,
      isUpdating,
      fetchCubesHandler,
      showCubeModelHandler,
      fetchCubeViewerHandler,
      setIsOpenCubeViewerModal,
      showCube,
      cubeView,
      loadingOverview,
    ]
  );

  return (
    <CubesContext.Provider value={providerValue}>
      {children}
    </CubesContext.Provider>
  );
};

export { CubesProvider, useCubes };
