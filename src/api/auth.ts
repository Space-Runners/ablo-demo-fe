import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

import config from '../config';

const { API_URL } = config;

axios.defaults.baseURL = API_URL;

axios.interceptors.request.use(function (config) {
  const token =
    localStorage.getItem('access-token') ||
    localStorage.getItem('client-token');

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
      const {
        config: { url },
      } = response;

      if (url.startsWith('/generate')) {
        // Guest usage

        localStorage.removeItem('access-token');

        return guestLogin().then(({ access_token: token }) => {
          localStorage.setItem('client-token', token);

          return axios.request(response.config);
        });
      }

      //  window.location.href = '/auth';
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

export const guestLogin = () =>
  axios.post('/auth/guest/login', {}).then(({ data }) => data);

export const googleLogin = (token: string) =>
  axios
    .post('/auth/google/login', {
      token,
    })
    .then(({ data }) => {
      return data;
    });

export const signUp = (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) =>
  axios.post('/auth/register', {
    email,
    password,
    firstName,
    lastName,
  });

export const verifyEmail = (token: string) =>
  axios.get(`/users/verify-email/${token}`);

export const useMe = () =>
  useQuery(['me'], () =>
    axios.get('/profile').then(({ data }) => {
      return data;
    })
  );
