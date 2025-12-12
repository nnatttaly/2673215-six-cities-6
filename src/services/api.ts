import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { BACKEND_URL, REQUEST_TIMEOUT } from 'consts';
import { getToken } from './token';

type DetailMessageType = {
  type: string;
  message: string;
}


export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {

      throw error;
    }
  );

  return api;
};
