import { Moment } from 'moment';

export const formatMoney = (number: number) =>
  Number(number)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const formatNumber = (number: number) => Number(number).toFixed(2);

export const formatTimeShort = (moment: Moment) =>
  moment.format('h:mm a').slice(0, -1);
