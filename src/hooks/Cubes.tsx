import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';

import { cubesAPI } from '@helpers/api';

import { CubeTemplateType } from 'types/CubeTemplateType';
import { MetaType } from 'types/MetaType';
import { OrderType } from 'types/OrderType';
import { PaginateParams } from 'types/PaginateParams';
import SiloFileType from 'types/SiloFileType';

import api from '../helpers/api';

export type CubesType = {
  showModal: string | null;
  setFormState: (val: string) => void;
  setShowModal: (val: string | null) => void;
  setIsOpenCubeViewerModal: (val: boolean) => void;
  setSiloFilesAttributes: (val: any) => void;
  fetchCubeHandler: (cubeId: number | string, params?: any) => void;
  fetchCubeViewerHandler: (dimension?: string, params?: any) => void;
  fetchCubesHandler: (search?: string | undefined | null, params?: PaginateParams | null) => void;
  setSelectedTemplate: (template: CubeTemplateType | null) => void;
  deleteCubeHandler: (cubeId: number) => void;
  saveCubeHandler: (data: any) => void;
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
  siloFilesAttributes: SiloFileType[] | null;
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

interface ICubesProviderProps {
  children: ReactNode;
  organizationId: number;
}

function CubesProvider({ children, organizationId }: ICubesProviderProps) {
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

  const [siloFilesAttributes, setSiloFilesAttributes] = useState<SiloFileType[] | null>(null);

  const [initialValues, setInitialValues] = useState({});

  const [isOpenCubeViewerModal, setIsOpenCubeViewerModal] = useState(false);

  const [loadingOverview, setLoadingOverview] = useState(false);

  const [showCube, setShowCube] = useState<number | string | null>(null);

  const [formSuccess, setFormSuccess] = useState<string[] | null>(null);

  // templates
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoadingCubeTemplates, setIsLoadingCubeTemplates] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<CubeTemplateType | null>(null);

  // cube save handler
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [formState, setFormState] = useState('form');

  const fetchCubeHandler = useCallback(
    async (cubeId: number | string, params: any = null) => {
      try {
        setIsLoadingCube(true);
        const response = await api.get(`organizations/${organizationId}/cubes/${cubeId}`, {
          params,
        });
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
    [setLoadingOverview, organizationId],
  );

  const fetchCubeViewerHandler = useCallback(
    async (dimension?: string, params: any = {}) => {
      try {
        setIsLoadingCubeView(true);
        const response = await cubesAPI.get(
          dimension
            ? `cube/${cube?.identifier}/viewer/${dimension}`
            : `cube/${cube?.identifier}/viewer`,
          {
            params,
          },
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
    [cube],
  );

  const saveCubeHandler = useCallback(
    async (data: any) => {
      try {
        setIsLoadingSave(true);
        const method = data?.id ? 'put' : 'post';
        const url = data?.id
          ? `organizations/${organizationId}/cubes/${data?.id}`
          : `organizations/${organizationId}/cubes`;

        const response = await api({
          method,
          url,
          data,
        });
        setFormSuccess(['Cube created!']);
        setShowModal(null);
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
    [setLoadingOverview, organizationId, cube],
  );


  const fetchCubesHandler = useCallback(
    async (
      search: string | undefined | null = null,
      params: PaginateParams | null = null,
      // eslint-disable-next-line consistent-return
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
          page: params?.page ?? cubesMeta?.current_page,
        };

        if (search && search?.length > 0) {
          auxParams = {
            ...auxParams,
            q: search,
          };
        }

        const response = await api.get(`organizations/${organizationId}/cubes/`, {
          params: auxParams,
        });

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
    [order, organizationId],
  );


  const deleteCubeHandler = useCallback(
    async (cubeId: number) => {
      try {
        setIsLoadingSave(true);
        const method = 'delete';
        const url = `organizations/${organizationId}/cubes/${cubeId}`;

        const response = await api({
          method,
          url,
        });
        setFormSuccess(['Cube delete!']);
        fetchCubesHandler();
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
    [fetchCubesHandler, organizationId],
  );

  const providerValue = useMemo(
    () => ({
      showModal,
      setShowModal,
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
      siloFilesAttributes,
      setSiloFilesAttributes,
      deleteCubeHandler,
    }),
    [
      deleteCubeHandler,
      setSiloFilesAttributes,
      siloFilesAttributes,
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
      fetchCubeViewerHandler,
      setIsOpenCubeViewerModal,
      showCube,
      cubeView,
      loadingOverview,
      cubesMeta,
    ],
  );

  return <CubesContext.Provider value={providerValue}>{children}</CubesContext.Provider>;
}

export { CubesProvider, useCubes };
