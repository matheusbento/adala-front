import { useCallback, useMemo, Component, useState } from 'react';

import { css } from 'glamor';
import { get } from 'lodash';
import moment from 'moment';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { useFormContext } from 'react-hook-form';

import buildFormField from 'utils/buildFormField';
import { spacing, display, flex, fontWeight } from 'utils/theme';

import SingleDatePicker from './SingleDatePicker';

const FieldForm = buildFormField(
  SingleDatePicker,
  (input: Component, error: any, props: Record<string, any>) => {
    const { ...childProps } = props;
    delete childProps.onChange;
    delete childProps.onBlur;

    return {
      error,
      ...input,
      ...childProps,
    };
  }
);

const styleMonthElement = css(
  display.flex,
  flex.alignItemsCenter,
  flex.justifyContentCenter,
  {
    marginTop: '-4px',
    paddingBottom: spacing.xxs,
    '& > div': {
      padding: `${spacing.none} ${spacing.xxs} !important`,
    },
    '& select': {
      fontWeight: fontWeight.w600,
      padding: `${spacing.xxs} ${spacing.none} !important`,
      border: 'none !important',
    },
  }
);

const Datepicker = ({
  name,
  withDropdowns = false,
  lastYearAvailable = moment().year() + 5,
  firstYearAvailable = moment().year() - 20,
  placeholder = null,
  required = false,
  formProps = {},
  setDate = null,
  label = null,
  ...rest
}: {
  withDropdowns?: boolean;
  lastYearAvailable?: number;
  firstYearAvailable?: number;
  placeholder?: string | null;
  required?: boolean;
  disabled?: boolean;
  formProps?: any;
  name: string;
  label?: string | null;
  setDate?: any;
}) => {
  const { register, setValue, formState, watch } = useFormContext();

  const [inputFocused, setInputFocused] = useState(false);

  const monthElement = useCallback(
    ({
      month,
      onMonthSelect,
      onYearSelect,
    }: {
      month: any;
      onMonthSelect: any;
      onYearSelect: any;
    }) => {
      const years = [];
      if (!!firstYearAvailable && lastYearAvailable) {
        let i = lastYearAvailable;
        while (i >= firstYearAvailable) {
          years.push(
            <option value={i} key={`year-${i}`}>
              {i}
            </option>
          );
          i -= 1;
        }
      }
      return (
        <div className={`${styleMonthElement}`}>
          <div>
            <select
              value={month.month()}
              onChange={(e) => onMonthSelect(month, e.target.value)}
            >
              {moment.months().map((monthLabel, value) => (
                <option value={value} key={monthLabel}>
                  {monthLabel}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={month.year()}
              onChange={(e) =>
                onYearSelect(month, e.target.value, {
                  shouldDirty: true,
                })
              }
            >
              {years}
            </select>
          </div>
        </div>
      );
    },
    [firstYearAvailable, lastYearAvailable]
  );

  const defaultPlaceholder = useMemo(
    () => placeholder || `Select ${label ? label.toLowerCase() : 'date'}`,
    [placeholder, label]
  );

  const message = useMemo(() => {
    const error = get<any, string>(formState?.errors, name);

    if (error?.type === 'required' && !required) {
      return null;
    }

    return error?.message;
  }, [formState, name, required]);

  return (
    <FieldForm
      {...register(name, {
        required: required ? 'This field is required' : false,
        ...formProps,
      })}
      displayFormat="YYYY-MM-DD"
      block
      noBorder
      numberOfMonths={1}
      focused={!!inputFocused}
      onFocusChange={({ focused }: { focused: boolean }) =>
        setInputFocused(focused)
      }
      renderMonthElement={withDropdowns ? monthElement : null}
      placeholder={defaultPlaceholder}
      required={required}
      error={message}
      onDateChange={(data: any) => {
        const inputData = data?.utc()?.format('YYYY-MM-DD');
        setDate?.(inputData);
        setValue(name, inputData, {
          shouldDirty: true,
        });
      }}
      date={watch(name) ? moment(watch(name)) : null}
      {...rest}
    />
  );
};

export default Datepicker;
