import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import VerifyEmailPage from '@/views/auth/VerifyEmail';
import ResetPasswordPage from '@/views/auth/ResetPassword';

import Dashboard from '@/layouts/design-tool';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/theme/theme';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto-condensed/700.css';

import Config from './config';
import { isAxiosError } from 'axios';

const { GOOGLE_CLIENT_ID } = Config;

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const MAX_RETRIES = 6;
const HTTP_STATUS_TO_NOT_RETRY = [400, 401, 403, 404, 409];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (failureCount > MAX_RETRIES) {
          return false;
        }

        if (isAxiosError(error) && HTTP_STATUS_TO_NOT_RETRY.includes(error.response?.status ?? 0)) {
          console.log(`Aborting retry due to ${error.response?.status} status`);
          return false;
        }

        return true;
      },
    },
  },
});

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <Switch>
              <Route path={`/verify-email`} component={VerifyEmailPage} />
              <Route path={`/app`} component={Dashboard} />
              <Route path={`/reset-password`} component={ResetPasswordPage} />
              <Redirect from="/" to="/app" />
            </Switch>
          </BrowserRouter>
        </ChakraProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
