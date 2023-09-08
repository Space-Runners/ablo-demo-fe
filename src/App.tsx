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
import { PasswordWallModal } from './components/modals/PasswordWallModal';
import { StorageKeys } from './constants';

const { GOOGLE_CLIENT_ID } = Config;

export const App: React.FC = () => {
  const [hasEnteredPassword, setHasEnteredPassword] = useState(
    localStorage.getItem(StorageKeys.HAS_ACCESS) === 'true'
  );

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
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
              <PasswordWallModal onPasswordSuccess={() => setHasEnteredPassword(true)} />
            )}
          </ChakraProvider>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </React.StrictMode>
  );
};
