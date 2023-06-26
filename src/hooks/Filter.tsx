import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from 'react';

import TypeOf from '@constants/typeOfConstants';

export type FilterContextType = {
  isBarVisible: boolean;
  setIsBarVisible: (val: boolean) => void;
  getAppliedFiltersByContext: () => any;
  setOldFiltersByContext: (values: any) => void;
  setFilterByContext: (filter: any, values: any) => void;
  setFacetsByContext: (values: any) => void;
  setSuggestionsByContext: (values: any) => void;
};

export const FilterContext = createContext<FilterContextType | null>(null);

const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be within FilterProvider');
  }

  return context;
};

interface FilterProviderProps {
  children: ReactNode;
  context: string;
}

function FilterProvider({ children, context }: FilterProviderProps) {
  // eslint-disable-next-line no-console
  console.log({ context });
  const [isBarVisible, setIsBarVisible] = useState(false);
  const [filters, setFilters] = useState<Record<string, any> | null>({
    cubes: {
      keyword: '',
      suggestions: [],
    },
    silos: {
      keyword: '',
      suggestions: [],
    },
  });

  const [oldFilters, setOldFilters] = useState<Record<string, any>>({
    cubes: {},
  });

  const [facets, setFacets] = useState<Record<string, any>>({
    cubes: {},
  });

  const setSuggestionsByContext = useCallback(
    (suggestions: any) => {
      setFilters({
        ...filters,
        [context]: {
          ...(filters ? filters[context] : {}),
          suggestions,
        },
      });
    },
    [filters, context],
  );

  const setFacetsByContext = useCallback(
    (facet: any) => {
      setFacets({
        ...facets,
        [context]: {
          ...(facets ? facets[context] : {}),
          ...facet,
        },
      });
    },
    [context, facets],
  );

  const setFilterByContext = useCallback(
    (filter: any, value: any) => {
      setFilters({
        ...filters,
        [context]: {
          ...(filters ? filters[context] : {}),
          [filter]: value,
        },
      });
    },
    [filters, context],
  );

  const setOldFiltersByContext = useCallback(
    (filter: any) => {
      setOldFilters({
        ...oldFilters,
        [context]: filter,
      });
    },
    [context],
  );

  const getFiltersByContext = useCallback(
    () => (filters ? filters[context] : {}),
    [filters, context],
  );

  const getAppliedFiltersByContext = useCallback(() => {
    const values = getFiltersByContext();

    return Object.keys(values).filter((filterKey: any) => {
      const filter = values[filterKey];
      if (Array.isArray(filter)) {
        return filter.length > 0;
      }

      if (typeof filter === TypeOf.string) {
        return filter !== null && Object.keys(filter).some((k) => filter[k]);
      }

      return !!filter;
    });
  }, []);

  const providerValue = useMemo(
    () => ({
      isBarVisible,
      setIsBarVisible,
      getAppliedFiltersByContext,
      setSuggestionsByContext,
      setFacetsByContext,
      setFilterByContext,
      setOldFiltersByContext,
    }),
    [
      setOldFiltersByContext,
      setFilterByContext,
      isBarVisible,
      setIsBarVisible,
      setFacetsByContext,
      setSuggestionsByContext,
      getAppliedFiltersByContext,
    ],
  );

  return <FilterContext.Provider value={providerValue}>{children}</FilterContext.Provider>;
}

export { FilterProvider, useFilter };
