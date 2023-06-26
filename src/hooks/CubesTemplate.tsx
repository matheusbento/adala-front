import { createContext, useContext, useMemo, useState, ReactNode, useCallback } from 'react';

import { cubesAPI } from '@helpers/api';

import { CubeTemplateType } from 'types/CubeTemplateType';
import { CubeType } from 'types/CubeType';
import { OrderType } from 'types/OrderType';
import { PaginateParams } from 'types/PaginateParams';

export type CubesTemplateType = {
  fetchCubesTemplateHandler: (
    search?: string | undefined | null,
    params?: PaginateParams | null,
  ) => void;
  setSelectedTemplate: (template: CubeTemplateType | null | boolean) => void;
  saveCubeTemplatesHandler: (data: CubeType) => void;
  selectedTemplate: CubeTemplateType | null | boolean;
  isLoadingCubesTemplate: boolean;
  isLoadingSave: boolean;
  cubesTemplates: any;
};

export const CubesTemplateContext = createContext<CubesTemplateType | null>(null);

const useCubesTemplate = () => {
  const context = useContext(CubesTemplateContext);
  if (!context) {
    throw new Error('useCubesTemplate must be within CubesTemplateProvider');
  }

  return context;
};

interface CubesTemplateProviderProps {
  children: ReactNode;
}

function CubesTemplateProvider({ children }: CubesTemplateProviderProps) {
  const [showModal, setShowModal] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderType>();
  const [isLoadingCubesTemplate, setIsLoadingCubesTemplate] = useState(false);
  const [cubesTemplates, setCubesTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState<CubeTemplateType | null | boolean>(null);
  const [isLoadingSave, setIsLoadingSave] = useState(false);

  const saveCubeTemplatesHandler = useCallback(async (data: CubeType) => {
    try {
      setIsLoadingSave(true);
      // const response = await cubesAPI.get(
      //   dimension
      //     ? `cube/${cube?.name}/viewer/${dimension}`
      //     : `cube/${cube?.name}/viewer`,
      //   {
      //     params,
      //   }
      // );
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
  }, []);

  const fetchCubesTemplateHandler = useCallback(
    async (search: string | undefined | null = null, params: PaginateParams | null = null) => {
      try {
        setIsLoadingCubesTemplate(true);

        if (params?.order_by) {
          setOrder({ ...order, order_by: params?.order_by });
        }
        if (params?.direction) {
          setOrder({ ...order, direction: params?.direction });
        }

        let auxParams: PaginateParams = {
          order_by: order?.order_by,
          direction: order?.direction,
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

        setCubesTemplates(response?.data);
      } catch (e) {
        setCubesTemplates([]);
        // [todo]
        // toaster(
        //   dispatch,
        //   'Error while trying to load the departmentSources',
        //   'error'
        // );
      } finally {
        setIsLoadingCubesTemplate(false);
      }
    },
    [order],
  );

  const providerValue = useMemo(
    () => ({
      showModal,
      setShowModal,

      fetchCubesTemplateHandler,
      isLoadingCubesTemplate,

      cubesTemplates,

      saveCubeTemplatesHandler,
      isLoadingSave,
      setSelectedTemplate,
      selectedTemplate,
    }),
    [
      selectedTemplate,
      setSelectedTemplate,
      isLoadingSave,
      saveCubeTemplatesHandler,
      showModal,
      cubesTemplates,

      isLoadingCubesTemplate,
      setShowModal,

      fetchCubesTemplateHandler,
    ],
  );

  return (
    <CubesTemplateContext.Provider value={providerValue}>{children}</CubesTemplateContext.Provider>
  );
}

export { CubesTemplateProvider, useCubesTemplate };
