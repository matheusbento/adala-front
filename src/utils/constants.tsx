export const getArrayNameById = (arr: any, key: any, label = 'name') =>
  arr ? arr.find((item: any) => item.id === key)[label] : [];

export default {};
