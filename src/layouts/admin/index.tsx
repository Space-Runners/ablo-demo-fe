import { Box } from '@chakra-ui/react';

import { Redirect, Route, Switch } from 'react-router-dom';
import routes from '@/routes';

import ProductsPage from '@/views/app/products';

export default function Dashboard() {
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

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      w={{ base: '100%' }}
    >
      <Box
        backgroundColor="#2b2a2a"
        h="calc(100% - 103px)"
        mx="auto"
        flex={1}
        w="100%"
      >
        <Switch>
          {getRoutes(routes)}
          <Route path={`/products`} component={ProductsPage} />
          <Redirect from="/" to="/app/products" />
        </Switch>
      </Box>
    </Box>
  );
}
