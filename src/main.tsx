import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import SignInPage from '@/views/auth/SignIn';
import SignUpPage from '@/views/auth/SignUp';
import VerifyEmailPage from '@/views/auth/VerifyEmail';
import Dashboard from '@/layouts/admin';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';

import config from './config';

const { GOOGLE_CLIENT_ID } = config;

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <ThemeEditorProvider>
            <BrowserRouter>
              <Switch>
                <Route path={`/auth`} component={SignInPage} />
                <Route path={`/signup`} component={SignUpPage} />
                <Route path={`/verify-email`} component={VerifyEmailPage} />
                <Route path={`/app`} component={Dashboard} />
                <Redirect from="/" to="/app" />
              </Switch>
            </BrowserRouter>
          </ThemeEditorProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
