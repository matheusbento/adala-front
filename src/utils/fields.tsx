export const laravelToOptions = (arr: any, key = 'name', id = 'id') =>
  arr.length
    ? arr.map((item: any) => ({
        key: item[id],
        value: item[id],
        text: item[key],
      }))
    : arr;

export const arrayToOptions = (arr: any) =>
  arr.length
    ? arr.map((item: any) => ({
        key: item,
        value: item,
        text: item,
      }))
    : arr;
