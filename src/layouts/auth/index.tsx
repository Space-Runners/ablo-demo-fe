import { Flex } from '@chakra-ui/react';

import { Redirect, Route, Switch } from 'react-router-dom';

import routes from './routes';

export default function Auth() {
  return (
    <Flex h="100vh" w="100%">
      <Switch>
        {routes.map((route, key) => {
          const { path, component } = route;

          return <Route path={`/auth${path}`} component={component} key={key} />;
        })}
        <Redirect from="/" to="/auth/signin" />
      </Switch>
    </Flex>
  );
}
