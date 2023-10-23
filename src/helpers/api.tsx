import axios, { AxiosRequestConfig } from 'axios';

import { getSession } from '.';
import Config from './config';

const apiDefaultTimeout = (import.meta.env.MIX_API_DEFAULT_TIMEOUT || 60 * 60, 10) * 1000;

const api = axios.create({
  baseURL: Config.SERVER_URL,
  timeout: apiDefaultTimeout,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const cubesAPI = axios.create({
  baseURL: Config.CUBES_URL,
  timeout: apiDefaultTimeout,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const etlAPI = axios.create({
  baseURL: Config.ETL_URL,
  timeout: apiDefaultTimeout,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const newConfig = config;

  const headers = await getSession();

  if (headers) {
    newConfig.headers = {
      ...(config.headers ? (config.headers.common as unknown as object) : {}),
      Authorization: `${headers.type} ${headers.token}` as string,
    };
  }

  return newConfig;
});

export default api;
