import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import SignInPage from '@/views/auth/signIn';
import AdminLayout from '@/layouts/admin';
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
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <React.StrictMode>
          <ThemeEditorProvider>
            <BrowserRouter>
              <Switch>
                <Route path={`/auth`} component={SignInPage} />
                <Route path={`/app`} component={AdminLayout} />
                <Redirect from="/" to="/app" />
              </Switch>
            </BrowserRouter>
          </ThemeEditorProvider>
        </React.StrictMode>
      </ChakraProvider>
    </QueryClientProvider>
  </GoogleOAuthProvider>
);
