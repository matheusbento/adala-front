import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
  useCallback,
} from 'react';

import { cubesAPI } from '@helpers/api';

import { CubeTemplateType } from 'types/CubeTemplateType';
import { CubeType } from 'types/CubeType';
import { MetaType } from 'types/MetaType';
import { OrderType } from 'types/OrderType';
import { PaginateParams } from 'types/PaginateParams';

import api from '../helpers/api';
import { useOrganizations } from './Organizations';

export type CubesType = {
  showModal: string | null;
  setFormState: (val: string) => void;
  setShowModal: (val: string | null) => void;
  setIsOpenCubeViewerModal: (val: boolean) => void;
  fetchCubeHandler: (cubeId: number | string, params?: any) => void;
  showCubeModelHandler: (cubeId: number | string, params?: any) => void;
  fetchCubeViewerHandler: (dimension?: string, params?: any) => void;
  fetchCubesHandler: (
    search?: string | undefined | null,
    params?: PaginateParams | null
  ) => void;
  setSelectedTemplate: (template: CubeTemplateType | null) => void;
  saveCubeHandler: (data: CubeType) => void;
  loadingOverview: boolean;
  showCube: number | string | null;
  selectedTemplate: CubeTemplateType | null;
  isLoadingCubes: boolean;
  isLoadingCube: boolean;
  isLoadingSave: boolean;
  initialValues: any;
  formState: string;
  isUpdating: boolean;
  isLoadingCubeView: boolean;
  formSuccess: string[] | null;
  isOpenCubeViewerModal: boolean;
  cubes: any;
  cube: any;
  cubeModel: any;
  cubeView: any;
  cubesMeta: MetaType | null;
  setInitialValues: (obj: any) => void;
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
  const [showModal, setShowModal] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderType>();
  const [isLoadingCubes, setIsLoadingCubes] = useState(false);
  const [isLoadingCube, setIsLoadingCube] = useState(false);
  const [isLoadingCubeView, setIsLoadingCubeView] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [cubes, setCubes] = useState([]);
  const [cube, setCube] = useState<any>(null);
  const [cubeModel, setCubeModel] = useState<any>(null);
  const [cubeView, setCubeView] = useState<Record<string, any> | null>({});
  const [cubesMeta, setCubesMeta] = useState<MetaType | null>(null);

  const [initialValues, setInitialValues] = useState({});

  const [isOpenCubeViewerModal, setIsOpenCubeViewerModal] = useState(false);

  const [loadingOverview, setLoadingOverview] = useState(false);

  const [showCube, setShowCube] = useState<number | string | null>(null);

  const [formSuccess, setFormSuccess] = useState<string[] | null>(null);

  // templates
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoadingCubeTemplates, setIsLoadingCubeTemplates] = useState(false);
  const [selectedTemplate, setSelectedTemplate] =
    useState<CubeTemplateType | null>(null);

  // cube save handler
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [formState, setFormState] = useState('form');

  const { getOrganizationId } = useOrganizations();

  const fetchCubeHandler = useCallback(
    async (cubeId: number | string, params: any = null) => {
      try {
        const organizationId = await getOrganizationId();
        setIsLoadingCube(true);
        const response = await api.get(
          `organizations/${organizationId}/cubes/${cubeId}`,
          {
            params,
          }
        );
        setShowCube(cubeId);
        setCube(response?.data?.data);
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
    [setLoadingOverview, getOrganizationId]
  );

  const showCubeModelHandler = useCallback(
    async (cubeId: number | string, params: any = null) => {
      try {
        setIsLoadingCube(true);
        const response = await cubesAPI.get(`cube/${cubeId}/model`, {
          params,
        });
        setCubeModel(response?.data);
      } catch (e) {
        setCubeModel(null);
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
        // eslint-disable-next-line no-console
        console.log('CUBE ATUAL', cube);
        setIsLoadingCubeView(true);
        const response = await cubesAPI.get(
          dimension
            ? `cube/${cube?.identifier}/viewer/${dimension}`
            : `cube/${cube?.identifier}/viewer`,
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

  const saveCubeHandler = useCallback(
    async (data: CubeType) => {
      try {
        // eslint-disable-next-line no-console
        console.log({ data });
        setIsLoadingSave(true);
        const organizationId = await getOrganizationId();
        const method = data?.id ? 'put' : 'post';
        const url = data?.id
          ? `organizations/${organizationId}/cubes/${data?.id}`
          : `organizations/${organizationId}/cubes`;

        const response = await api({
          method,
          url,
          data: {
            ...data,
            model: JSON.parse(data.model),
            // metadata: [
            //   {
            //     field: 'start_date',
            //     value: data?.start_date,
            //   },
            //   {
            //     field: 'end_date',
            //     value: data?.end_date,
            //   },
            //   ...data.metadata,
            // ],
          },
        });
        // eslint-disable-next-line no-console
        console.log(response?.data);
        setFormSuccess(['Cube created!']);
        // setCubeView(response?.data);
      } catch (e) {
        // setCubeView(null);
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
    [setLoadingOverview, cube]
  );

  const fetchCubesHandler = useCallback(
    async (
      search: string | undefined | null = null,
      params: PaginateParams | null = null
      // eslint-disable-next-line consistent-return
    ) => {
      const organizationId = await getOrganizationId();
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
          page: params?.page ?? cubesMeta?.current_page,
        };

        if (search && search?.length > 0) {
          auxParams = {
            ...auxParams,
            q: search,
          };
        }

        // eslint-disable-next-line no-console
        console.log(organizationId);
        const response = await api.get(
          `organizations/${organizationId}/cubes/`,
          {
            params: auxParams,
          }
        );

        setCubes(response?.data?.data);
        setCubesMeta(response?.data?.meta);
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
    [order, getOrganizationId]
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
      saveCubeHandler,
      isLoadingSave,
      setSelectedTemplate,
      selectedTemplate,
      setFormState,
      formState,
      formSuccess,
      initialValues,
      cubesMeta,
      cubeModel,
      fetchCubeHandler,
      setInitialValues,
    }),
    [
      setInitialValues,
      fetchCubeHandler,
      cubeModel,
      initialValues,
      formSuccess,
      formState,
      setFormState,
      selectedTemplate,
      setSelectedTemplate,
      isLoadingSave,
      saveCubeHandler,
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
      cubesMeta,
    ]
  );

  return (
    <CubesContext.Provider value={providerValue}>
      {children}
    </CubesContext.Provider>
  );
};

export { CubesProvider, useCubes };
