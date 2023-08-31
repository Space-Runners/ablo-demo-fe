import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

import { Config } from '../config';
import { StorageKeys } from '../constants';

const { API_KEY, API_URL } = Config;

axios.defaults.baseURL = API_URL;

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem(StorageKeys.ACCESS_TOKEN);

  config.headers.Authorization = `Bearer ${token}`;
  config.headers['Target-URL'] = API_URL;
  config.headers['X-Api-Key'] = API_KEY;

  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    const { response } = error || {};

    if (response && response.status === 401) {
      const {
        config: { url },
      } = response;

      if (url.startsWith('/generate')) {
        // Guest usage

        localStorage.removeItem(StorageKeys.ACCESS_TOKEN);

        return guestLogin().then(({ access_token: token }) => {
          localStorage.setItem(StorageKeys.ACCESS_TOKEN, token);
          return axios.request(response.config);
        });
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

export const guestLogin = () => axios.post('/auth/guest/login', {}).then(({ data }) => data);

export const googleLogin = (token: string) =>
  axios
    .post('/auth/google/login', {
      token,
    })
    .then(({ data }) => {
      return data;
    });

export const signUp = (email: string, password: string, firstName: string, lastName: string) =>
  axios.post('/auth/register', {
    email,
    password,
    firstName,
    lastName,
  });

export const verifyEmail = (token: string) => axios.get(`/users/verify-email/${token}`);

export const useMe = () =>
  useQuery(['me'], () =>
    axios.get('/profile').then(({ data }) => {
      return data;
    })
  );

export const resetPassword = (email: string) =>
  axios.post('/auth/forgot-password', {
    email,
  });
