import { useCallback, useMemo } from 'react';

import SearchBox from '@components/Library/SearchBox';
import baslakeContext from '@constants/baslakeConstants';
import { debounce } from 'lodash';

import { SuggestionTypeMultiple, SuggestionTypeSingle } from 'types/SuggestionType';

interface SearchBoxContainerProps {
  className?: string;
  suggestions?: SuggestionTypeMultiple;
  context: string;
  currentKeyword?: string;
}

function SearchBoxContainer(props: SearchBoxContainerProps) {
  const { className = '', suggestions = [], context, currentKeyword = '' } = props;

  const methods = useMemo(() => {
    let callback = () => null;

    switch (context) {
      case baslakeContext:
        // eslint-disable-next-line react/display-name
        callback = function () {
          return null;
        };
        break;
      default:
        break;
    }

    return {
      onKeywordChangeHandler: (_context: string, _keyword: string) => {},
      onSuggestionSelectedHandler: (
        _innerContext: string,
        _suggestion: SuggestionTypeSingle,
        _handleSuggestionSelectedCallback: () => void,
      ): void => {},
      handleSuggestionSelectedCallback: callback,
      updateUrlFiltersHandler: (_outeHistory: any, _context: string) => {},
      setFilterHandler: () => {},
    };
  }, [context]);

  const {
    onKeywordChangeHandler,
    onSuggestionSelectedHandler,
    handleSuggestionSelectedCallback,
    updateUrlFiltersHandler,
    setFilterHandler,
  } = methods;

  // eslint-disable-next-line
  const debounceKeywordChangeHandler = useCallback(
    debounce(onKeywordChangeHandler, 300),
    []
  );

  // const routeHistory = useHistory();

  const routeHistory = null;

  const suggestionSelectedHandler = useCallback(
    (suggestion: SuggestionTypeSingle) => {
      onSuggestionSelectedHandler(context, suggestion, handleSuggestionSelectedCallback);
      updateUrlFiltersHandler(routeHistory, context);
    },
    [
      handleSuggestionSelectedCallback,
      context,
      onSuggestionSelectedHandler,
      updateUrlFiltersHandler,
      routeHistory,
    ],
  );

  return (
    <div className={className}>
      <SearchBox
        onChange={(keyword: string) => debounceKeywordChangeHandler(context, keyword)}
        onSuggestionSelected={suggestionSelectedHandler}
        setFilterHandler={setFilterHandler}
        handleSuggestionSelectedCallback={handleSuggestionSelectedCallback}
        updateUrlFiltersHandler={updateUrlFiltersHandler}
        suggestions={suggestions}
        context={context}
        currentKeyword={currentKeyword}
      />
    </div>
  );
}

export default SearchBoxContainer;
