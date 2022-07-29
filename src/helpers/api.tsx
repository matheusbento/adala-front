import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

import Config from './config';

const apiDefaultTimeout =
  (process.env.MIX_API_DEFAULT_TIMEOUT || 60, 10) * 1000;

export const getSession = async () => {
  const userToken = await Cookies.get('userToken');
  return userToken ? JSON.parse(userToken) : null;
};

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

api.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const newConfig = config;

  const headers = await getSession();

  if (headers) {
    newConfig.headers = {
      ...(config.headers ? (config.headers.common as unknown as object) : {}),
      Authorization: `${headers.token_type} ${headers.access_token}` as string,
    };
  }

  return newConfig;
});

export default api;
