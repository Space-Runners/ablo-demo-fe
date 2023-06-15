import { useState } from 'react';

import { Portal, Box, useDisclosure } from '@chakra-ui/react';

// Layout components
import Navbar from '@/components/navbar/NavbarAdmin';
// @ts-ignore
import { SidebarContext } from '@/contexts/SidebarContext';

import { Redirect, Route, Switch } from 'react-router-dom';
import routes from '@/routes';

export default function Dashboard(props: any) {
  const { ...rest } = props;

  // functions for changing the states from components
  const getRoute = () => {
    return window.location.pathname !== '/app/full-screen-maps';
  };

  const getActiveRoute = (routes: any): string => {
    const activeRoute = 'Default Brand Text';
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        const collapseActiveRoute = getActiveRoute(routes[i].items);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        const categoryActiveRoute = getActiveRoute(routes[i].items);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes: any[]): boolean => {
    const activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        const collapseActiveNavbar = getActiveNavbar(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        const categoryActiveNavbar = getActiveNavbar(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].secondary;
        }
      }
    }
    return activeNavbar;
  };
  const getActiveNavbarText = (routes: any[]): string | boolean => {
    const activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        const collapseActiveNavbar = getActiveNavbarText(routes[i].items);
        // @ts-ignore
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        const categoryActiveNavbar = getActiveNavbarText(routes[i].items);
        // @ts-ignore
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].messageNavbar;
        }
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes: any[]): any[] => {
    return routes.map((prop: any, key) => {
      if (prop.layout === '/app') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
    });
  };
  document.documentElement.dir = 'ltr';
  const { onOpen } = useDisclosure();
  return (
    <Box
      className="navbar"
      height="100%"
      display="flex"
      flexDirection="column"
      w={{ base: '100%' }}
    >
      <Navbar
        onOpen={onOpen}
        brandText={getActiveRoute(routes)}
        secondary={getActiveNavbar(routes)}
        message={getActiveNavbarText(routes)}
        {...rest}
      />
      {getRoute() ? (
        <Box
          backgroundColor="#2b2a2a"
          h="calc(100% - 67px)"
          mx="auto"
          flex={1}
          w="100%"
        >
          <Switch>
            {getRoutes(routes)}
            <Redirect from="/" to="/app/image-generator" />
          </Switch>
        </Box>
      ) : null}
    </Box>
  );
}
