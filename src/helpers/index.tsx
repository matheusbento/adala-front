/* eslint-disable no-plusplus */
import { useLayoutEffect, useState } from 'react';

import * as fileTypes from '@constants/fileTypesConstants';
import { toasterTypes } from '@constants/toasterConstants';
import TypeOf from '@constants/typeOfConstants';
import usStates from '@constants/usStatesConstants';
import { isArray, isNaN } from 'lodash';
import moment from 'moment-timezone';

export const plural = (singularString: string, pluralString: string, count: number) =>
  count === 1 ? singularString : pluralString;

export const truncate = (text: string, length: number, suffix = '...') =>
  text.length > length ? `${text.substring(0, length)}${suffix}` : text;

export const parseFileName = (fileName: string) =>
  fileName.replace(/[-_]/g, ' ').split('.').slice(0, -1).join('.');

export const parseFileSize = (size: number) => {
  if (size >= 1073741824) {
    return `${(size / 1073741824).toFixed(1)} Gb`;
  }

  if (size >= 1048576) {
    return `${Math.round(size / 1048576)} Mb`;
  }

  if (size >= 1024) {
    return `${Math.round(size / 1024)} kb`;
  }

  return `${size} bytes`;
};

export const boolToString = (bool: boolean) => (bool ? 'true' : 'false');
export const stringToBool = (string: string) => string === 'true';

/* eslint-disable no-bitwise */
export const hexFromEmail = (str: string) => {
  let hash = 0;
  let c = '';

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  c = (hash & 0x00ffffff).toString(16).toUpperCase();
  return '00000'.substring(0, 6 - c.length) + c;
};
// /* eslint-enable no-bitwise */

export const contrastColor = (hex: string) => {
  const result: any = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  const rgb: any = {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };

  const brightness = Math.round(
    (parseInt(rgb.r, 10) * 299 + parseInt(rgb.g, 10) * 587 + parseInt(rgb.b, 10) * 114) / 1000,
  );

  return brightness > 125 ? 'black' : 'white';
};

export const sanitizeUrl = (url: string) => url.replace(/(^\w+:|^)\/\//, '').replace('www.', '');

export const sanitizePhone = (number: string) => number.replace(/[^\d+]/g, '');

export const normalizePhoneInput = (value: string) => {
  if (!value) return value;
  try {
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;

    if (cvLength < 4) return currentValue;
    if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
    return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
  } catch {
    return value;
  }
};

export const normalizeAlphaNumeric = (value: string) => value.replace(/[^a-z0-9]/gi, '');

export const sanitizeInteger = (value: string) => parseInt(value, 10);

export const isPrintable = (fileType: string) => {
  if (fileType) {
    return fileTypes.printable.includes(fileTypes.types[fileType]);
  }
  return false;
};

export const getStateByInitials = (initials: string) => {
  const getState = usStates.filter((state) => state.id === initials);
  return getState.length > 0 ? getState[0] : null;
};

export const capitalize = (s: string) => {
  if (typeof s !== TypeOf.string) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const sortArray = (arr: any, key: any, order: string) => {
  const sortedArr = arr.sort((a: any, b: any) =>
    a[key].toString().localeCompare(b[key].toString()),
  );
  return order === 'desc' ? sortedArr.reverse() : sortedArr;
};

export function orderByCreatedAt(a: any, b: any) {
  if (a.created_at === b.created_at) {
    return 0;
  }
  return a.created_at.localeCompare(b.created_at);
}

export function orderBy(order: any) {
  const { field, direction } = order;
  return (a: any, b: any) => {
    if (a[field] === b[field]) {
      return 0;
    }
    return direction === 'desc'
      ? b[field].localeCompare(a[field])
      : a[field].localeCompare(b[field]);
  };
}

export const useWindowWidth = () => {
  const [size, setSize] = useState(0);

  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
};

export const useDocumentHeight = () => {
  const [size, setSize] = useState(0);

  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.document.documentElement.scrollHeight);
    }

    const resizeObserver = new ResizeObserver(() => updateSize());
    resizeObserver.observe(document.body);
  }, []);

  return size;
};

export const dateRangeToString = (startDate: Date, endDate: Date, isPresent: boolean) => {
  let str = '';
  const momentStartDate = moment(startDate);
  str = momentStartDate.format('MMMM YYYY');

  if (isPresent) {
    str += ' - Present';
  } else if (endDate) {
    const momentEndDate = moment(endDate);
    const momentDiff = momentStartDate.from(momentEndDate, true);
    str += ` - ${momentEndDate.format('MMMM YYYY')} • ${momentDiff}`;
  }

  return str;
};

export const strHasContent = (str: string) => str?.replace(/\s/g, '').length > 0;

export const cityStateToString = (city: string, state: string) => {
  let str = '';

  if (city && strHasContent(city)) {
    str = state ? `${city}, ${state}` : city;
  } else {
    str = state && strHasContent(state) ? state : str;
  }

  return str;
};

export const arrayHasSubChildren = (array: any) => {
  if (![TypeOf.array, TypeOf.object].includes(typeof array)) return false;

  const checkArray = typeof array === TypeOf.object ? Object.values(array) : array;

  for (let i = 0; i < checkArray.length; i += 1) {
    if (Array.isArray(checkArray[i]) && checkArray[i].length) return true;
  }

  return false;
};

export const toggleValuesInArray = (array: any, valueArray: any) => {
  const needExclude = valueArray.filter((i: any) => array.includes(i));
  const needInclude = valueArray.filter((i: any) => !array.includes(i));
  return array.filter((e: any) => !needExclude.includes(e)).concat(needInclude);
};

export const differenceBetweenTwoArrays = (array1: any, array2: any) =>
  array1
    .filter((x: any) => !array2.includes(x))
    .concat(array2.filter((x: any) => !array1.includes(x)));

export const toggleValueInArray = (array: any, value: any) =>
  array.includes(value) ? array.filter((i: any) => i !== value) : array.concat(value);

export const groupByDate = (array: any) => {
  const obj: any = {};
  [].forEach.call(array, (dt) => {
    const date = moment(dt).format('YYYY-MM-DD');
    const time = moment(dt).format('HH:mm');

    if (!obj[date]) {
      obj[date] = [];
    }
    obj[date].push(time);
    obj[date].sort();
  });
  return obj;
};

export const isValidArray = (inputTest: any) =>
  inputTest && Array.isArray(inputTest) && inputTest.length > 0;

export const sortArrayBasedOnArray = (itemsArray: any, sortingArray: any) => {
  const sortedArray = [...itemsArray];
  sortedArray.sort((a: any, b: any) => sortingArray.indexOf(a.id) - sortingArray.indexOf(b.id));
  return sortedArray;
};

export const parseTime = (timeString: string) => {
  let hours = null;
  let minutes = null;
  let meridian = null;
  const cleanString = timeString.trim().replace(/^0+([0-9]+)/g, '$1');
  const re1 = /^[0-9]{1,2} ?([ap]m?)$/gim; // 7a | 11 p
  const re2 = /^[0-9]{1,2}:?[0-9]{2} ?([ap]m?)$/gim; // 715a | 715 p | 1115 a
  const re3 = /^[0-9]{1,2}:?[0-9]{2}$/gim; // 700 | 1900

  const meridianIndex = cleanString.search(/([ap]m?)/gim);

  if (re1.exec(cleanString)) {
    hours = cleanString.substring(0, meridianIndex).trim();
    meridian = cleanString.substring(meridianIndex).trim().substring(0, 1);
    hours = parseInt(hours, 10);
    minutes = 0;
  } else if (re2.exec(cleanString)) {
    const hoursMinutes = cleanString.substring(0, meridianIndex).trim();
    minutes = hoursMinutes.substr(-2).trim();
    hours = hoursMinutes.substring(0, hoursMinutes.indexOf(minutes)).trim();
    meridian = cleanString.substring(meridianIndex).trim().substring(0, 1);
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);
  } else if (re3.exec(cleanString)) {
    minutes = cleanString.substr(-2).trim();
    hours = cleanString.substring(0, cleanString.length - 2).trim();
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);

    meridian = 'a';

    if (hours > 12) {
      hours %= 12;
      meridian = 'p';
    }
  }

  if (
    hours === null ||
    minutes === null ||
    Number.isNaN(hours) ||
    Number.isNaN(minutes) ||
    !meridian
  ) {
    throw new Error(`Invalid format: ${timeString}`);
  }

  return [hours, minutes, meridian];
};

export const roundNearestQtr = (number: number) => {
  const res = Math.round(number * 4) / 4;
  if (Number.isNaN(res)) {
    return null;
  }
  return res.toFixed(2);
};

export const convertToLocalDatetime = (datetime: Date, format = 'YYYY-MM-DD HH:mm:ss') =>
  moment.utc(datetime).local().format(format);

export const convertToUtcDatetime = (datetime: Date, format = 'YYYY-MM-DD HH:mm:ss') =>
  moment(datetime).utc().format(format);

export const toaster = (dispatch: any, message: string, type = 'success') =>
  dispatch({ type: toasterTypes[type], message });

export const convertIntToCurrency = (integer = 0, currencySymbol = '$') =>
  currencySymbol
    ? `${currencySymbol}${Number(integer.toFixed(1)).toLocaleString()}`
    : Number(integer.toFixed(1)).toLocaleString();

export const filterMultContextDataByOptions = (data: any, optionsRef: any, types: any) => {
  const tempData = Array.isArray(data) ? data : [data];
  const unifiedData: any = [];
  types.map((type: any) => {
    const dataByType = tempData.filter((e) => e.type === type);
    dataByType?.map((inner) => {
      const optionFound = optionsRef.find((optionRef: any) => {
        const tempValue = Number.isInteger(inner) ? { id: inner } : inner;
        return optionRef.id === tempValue.id && optionRef.type === type;
      });
      return unifiedData.push(optionFound);
    });
    return {};
  });

  return unifiedData;
};

export const arrayUnique = (array: any) => Array.from(new Set(array));

export const fromPath = (array: any) => {
  if (isArray(array)) {
    return array.reduce((string, item) => {
      const prefix = string === '' ? '' : '.';
      return string + (isNaN(Number(item)) ? prefix + item : `[${item}]`);
    }, '');
  }
  return '';
};

export const doubleEscapeSpecialChars = (str: string) =>
  str
    .replace(/\\\\/g, '\\\\')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/&/g, '\\&')
    .replace(/\//g, '\\/')
    .replace(/</g, '\\<')
    .replace(/>/g, '\\>')
    .replace(/,/g, '\\,');

export const isSelectorValid = (selector: any) => {
  try {
    document.createDocumentFragment().querySelector(selector);
  } catch {
    return false;
  }
  return true;
};
