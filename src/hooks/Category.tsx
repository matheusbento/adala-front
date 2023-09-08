import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import api from '@helpers/api';
import Cookies from 'js-cookie';

import { CategoryType } from 'types/CategoryType';
import { PaginateParams } from 'types/PaginateParams';

export type CategoryHookType = {
  fetchAllCategoriesHandler: (params?: PaginateParams | null) => void;
  categories: CategoryType[] | null;
};

export const CategoryContext = createContext<CategoryHookType | null>(null);

const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be within CategoryProvider');
  }

  return context;
};

interface ICategoryProviderProps {
  children: ReactNode;
}

function CategoryProvider({ children }: ICategoryProviderProps) {
  const [isLoadingCategories, setIsLoadingAllCategorys] = useState(false);
  const [categories, setAllCategorys] = useState<CategoryType[] | null>(null);

  const fetchAllCategoriesHandler = useCallback(async (params: PaginateParams | null = null) => {
    try {
      setIsLoadingAllCategorys(true);

      const response = await api.get(`categories/`, {
        params: { ...params, all: true },
      });

      setAllCategorys(response?.data?.data);
    } catch (e) {
      setAllCategorys([]);
      // [todo]
      // toaster(
      //   dispatch,
      //   'Error while trying to load the departmentSources',
      //   'error'
      // );
    } finally {
      setIsLoadingAllCategorys(false);
    }
  }, []);

  const providerValue = useMemo(
    () => ({
      isLoadingCategories,
      categories,
      fetchAllCategoriesHandler,
    }),
    [fetchAllCategoriesHandler, categories, isLoadingCategories],
  );

  return <CategoryContext.Provider value={providerValue}>{children}</CategoryContext.Provider>;
}

export { CategoryProvider, useCategory };
