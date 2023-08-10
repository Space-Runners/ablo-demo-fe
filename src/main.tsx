import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import VerifyEmailPage from '@/views/auth/VerifyEmail';
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

const { GOOGLE_CLIENT_ID } = Config;

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
          <BrowserRouter>
            <Switch>
              <Route path={`/verify-email`} component={VerifyEmailPage} />
              <Route path={`/app`} component={Dashboard} />
              <Redirect from="/" to="/app" />
            </Switch>
          </BrowserRouter>
        </ChakraProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
