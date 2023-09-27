import React, { useState } from 'react';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import VerifyEmailPage from '@/views/auth/VerifyEmail';
import ResetPasswordPage from '@/views/auth/ResetPassword';

import Dashboard from '@/layouts/design-tool';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/theme/theme';
import Config from './config';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { StorageKeys } from './constants';
import { isAxiosError } from 'axios';

import PasswordWall from './views/PasswordWall';

const { GOOGLE_CLIENT_ID } = Config;

export const App: React.FC = () => {
  const [hasEnteredPassword, setHasEnteredPassword] = useState(
    localStorage.getItem(StorageKeys.HAS_ACCESS) === 'true'
  );

  const MAX_RETRIES = 6;
  const HTTP_STATUS_TO_NOT_RETRY = [400, 401, 403, 404, 409];

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
          if (failureCount > MAX_RETRIES) {
            return false;
          }

          if (
            isAxiosError(error) &&
            HTTP_STATUS_TO_NOT_RETRY.includes(error.response?.status ?? 0)
          ) {
            console.log(`Aborting retry due to ${error.response?.status} status`);
            return false;
          }

          return true;
        },
      },
    },
  });

  return (
    <React.StrictMode>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            {hasEnteredPassword ? (
              <BrowserRouter>
                <Switch>
                  <Route path={`/verify-email`} component={VerifyEmailPage} />
                  <Route path={`/app`} component={Dashboard} />
                  <Route path={`/reset-password`} component={ResetPasswordPage} />
                  <Redirect from="/" to="/app" />
                </Switch>
              </BrowserRouter>
            ) : (
              <PasswordWall onPasswordSuccess={() => setHasEnteredPassword(true)} />
            )}
          </ChakraProvider>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </React.StrictMode>
  );
};
