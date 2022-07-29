import { useCallback, useEffect, useMemo, useState } from 'react';

import { css } from 'glamor';
import { useHistory } from 'react-router';
import { Icon } from 'semantic-ui-react';

import baslakeContext from '@constants/baslakeConstants';

import {
  SuggestionTypeSingle,
  SuggestionTypeMultiple,
} from 'types/SuggestionType';

import { buttons, colors, input, styles, position } from '@utils/theme';
import { display, margin, padding, text, utils } from '@utils/themeConstants';

const styleButton = css(
  buttons.pill,
  buttons.primary,
  buttons.lg,
  margin.leftXs,
  {
    padding: '0 22px',
    '& > i': {
      color: colors.negative,
    },
  }
);

const styleInput = css(input.pill, input.lg, utils.w100, {
  paddingLeft: '16px',
  backgroundColor: colors.greyDark,
  color: colors.greyLightest,
  '::placeholder': {
    color: 'white',
  },
  flexGrow: 1,
});

const styleSuggestions = css(
  styles.roundedCornersS,
  styles.fullWidth,
  padding.sm,
  styles.shadow,
  {
    zIndex: 100,
    position: 'absolute',
    top: '45px',
    backgroundColor: colors.white,
    color: colors.default,
    maxHeight: '377px',
    overflowY: 'auto',
  }
);

const styleSuggestion = css(
  buttons.plain,
  utils.w100,
  text.left,
  display.inlineBlock,
  {
    cursor: 'pointer',
    '& + button': {
      marginTop: '12px',
    },
  }
);

const SearchSuggestion = ({
  suggestion,
  onSuggestionSelected,
}: {
  suggestion: SuggestionTypeSingle;
  onSuggestionSelected: (suggestion: SuggestionTypeSingle) => void;
}) => (
  <button
    type="button"
    className={`${styleSuggestion}`}
    onClick={() => onSuggestionSelected(suggestion)}
  >
    <strong>{suggestion.suggestion}</strong>
    <br />
    <small>{suggestion.type}</small>
  </button>
);

const SearchSuggestions = ({
  suggestions,
  onSuggestionSelected,
}: {
  suggestions: SuggestionTypeMultiple;
  onSuggestionSelected: (suggestion: SuggestionTypeSingle) => void;
}) => (
  <div id="suggestions" className={`${styleSuggestions}`}>
    {suggestions.map((s) => (
      <SearchSuggestion
        key={`${s.suggestion}-${s.type}`}
        suggestion={s}
        onSuggestionSelected={onSuggestionSelected}
      />
    ))}
  </div>
);

const styleClearSearch = css(
  buttons.plain,
  display.block,
  position.absolute,
  margin.rightXxs,
  {
    lineHeight: '40px',
    fontSize: '14px',
    fontWeight: 500,
    color: colors.white,
    top: 0,
    right: '10px',
  }
);

interface SearchBoxProps {
  onChange: (val: string) => void;
  onSuggestionSelected: (val: SuggestionTypeSingle) => void;
  setFilterHandler: (
    context: string,
    keyword: string,
    search: string | null,
    handleSuggestionSelectedCallback: (val: any) => void
  ) => void;
  handleSuggestionSelectedCallback: (val: any) => void;
  updateUrlFiltersHandler: (routeHistory: any, context: string) => void;
  suggestions: SuggestionTypeMultiple;
  context: string;
  currentKeyword: string;
}

const SearchBox = ({
  onChange,
  onSuggestionSelected,
  setFilterHandler,
  handleSuggestionSelectedCallback,
  updateUrlFiltersHandler,
  context,
  suggestions = [],
  currentKeyword = '',
}: SearchBoxProps) => {
  const [keyword, setKeyword] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  // const routeHistory = useHistory();
  const routeHistory = null;

  const placeHolder = useMemo(() => {
    const placeholders: Record<string, string> = {
      [baslakeContext]: 'Search by Cube Name',
      default: 'Search',
    };

    return placeholders[context] ?? placeholders.default;
  }, [context]);

  const onSubmitSearchHandler = useCallback(
    (e: any) => {
      let search: string | null = keyword.trim();
      if (!search) {
        search = null;
      }

      setFilterHandler(
        context,
        'keyword',
        search,
        handleSuggestionSelectedCallback
      );
      updateUrlFiltersHandler(routeHistory, context);
      setShowSuggestions(false);
      e?.target?.blur();
    },
    [
      keyword,
      setFilterHandler,
      context,
      handleSuggestionSelectedCallback,
      updateUrlFiltersHandler,
      routeHistory,
    ]
  );

  const clearSearchHandler = useCallback(() => {
    setFilterHandler(context, 'keyword', '', handleSuggestionSelectedCallback);
    updateUrlFiltersHandler(routeHistory, context);
    setShowSuggestions(false);
    setKeyword('');
  }, [
    setFilterHandler,
    context,
    handleSuggestionSelectedCallback,
    updateUrlFiltersHandler,
    routeHistory,
  ]);

  const onSuggestionSelectedHandler = useCallback(
    (suggestion: SuggestionTypeSingle) => {
      setKeyword(suggestion.suggestion);
      setShowSuggestions(false);
      onSuggestionSelected(suggestion);
    },
    [onSuggestionSelected]
  );

  const onKeywordChangedHandler = useCallback(
    (ev: any) => {
      setKeyword(ev.target.value);
      setShowSuggestions(!!ev.target.value);
      onChange(ev.target.value);
    },
    [onChange]
  );

  useEffect(() => {
    setKeyword(currentKeyword || '');
    setShowSuggestions(false);
  }, [currentKeyword]);

  return (
    <div className={`${css(position.relative)}`}>
      <div className={`${css(display.flex)}`}>
        <div className={`${css(position.relative, styles.fullWidth)}`}>
          <input
            value={keyword}
            name="input-search"
            className={`${styleInput}`}
            placeholder={placeHolder}
            onChange={onKeywordChangedHandler}
            autoComplete="off"
            onKeyDown={(e) => e.key === 'Enter' && onSubmitSearchHandler(e)}
          />
          {keyword && !!keyword.trim().length && (
            <button
              type="button"
              onClick={clearSearchHandler}
              className={`${styleClearSearch}`}
            >
              X
            </button>
          )}
        </div>
        <button
          type="button"
          className={`${styleButton}`}
          onClick={onSubmitSearchHandler}
        >
          <Icon name="search" />
        </button>
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <SearchSuggestions
          suggestions={suggestions}
          onSuggestionSelected={onSuggestionSelectedHandler}
        />
      )}
    </div>
  );
};

export default SearchBox;
