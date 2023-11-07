import axios from 'axios';

import { useQuery } from '@tanstack/react-query';
import { User } from '@/lib/types';

import { Config } from '../config';
import { StorageKeys } from '../constants';

const { API_URL } = Config;

axios.defaults.baseURL = API_URL;

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem(StorageKeys.ACCESS_TOKEN);

  config.headers.Authorization = `Bearer ${token}`;
  config.headers['Target-URL'] = API_URL;

  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    const { response } = error || {};

    if (response && response.status === 401) {
      if (response && response.status === 401 && !response.config.url.includes('/auth')) {
        localStorage.removeItem(StorageKeys.ACCESS_TOKEN);

        window.location.href = '/auth/signin';
      }
    }

    return Promise.reject(error);
  }
);

export const login = (email: string, password: string) =>
  axios
    .post('/auth/login', {
      email,
      password,
    })
    .then(({ data }) => {
      return data;
    });

export const googleLogin = (token: string) =>
  axios
    .post('/auth/google/login', {
      token,
    })
    .then(({ data }) => {
      return data;
    });

export const signUp = (email: string, password: string, firstName: string, lastName: string) =>
  axios
    .post('/auth/register', {
      email,
      password,
      firstName,
      lastName,
    })
    .then(({ data }) => {
      return data;
    });

export const verifyEmail = (token: string) => axios.get(`/users/verify-email/${token}`);

export const useMe = () =>
  useQuery(['me'], () =>
    axios.get<User>('/profile').then(({ data }) => {
      return data;
    })
  );

export const resetPassword = (email: string) =>
  axios
    .post('/auth/forgot-password', {
      email,
    })
    .then(({ data }) => data);

export const setPassword = (password: string, token: string) =>
  axios
    .post('/auth/reset-password', {
      token,
      password,
    })
    .then(({ data }) => data);

/**
 * For verifying password wall password
 * @param password
 */
export const verifyPassword = (password: string) =>
  axios.post('/auth/verify-password', {
    password,
  });
