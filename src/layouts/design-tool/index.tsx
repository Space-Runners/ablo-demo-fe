import { Box } from '@chakra-ui/react';

import { Redirect, Route, Switch, useLocation } from 'react-router-dom';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import DesignsPage from '@/views/app/designs';
import Editor from '@/views/app/editor';
import OrderOrSharePage from '@/views/app/order-or-share';

export default function DesignTool() {
  const location = useLocation();

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      w={{ base: '100%' }}
    >
      <Box backgroundColor="#FFFFFF" h="100%" mx="auto" flex={1} w="100%">
        <TransitionGroup>
          <CSSTransition
            key={location.pathname}
            classNames="page"
            timeout={300}
          >
            <Switch location={location}>
              <Route path={`/app/designs`} render={() => <DesignsPage />} />
              <Route path={`/app/editor`} render={() => <Editor />} />
              <Route
                path={`/app/order-or-share`}
                render={() => <OrderOrSharePage />}
              />
              <Redirect from="/" to="/app/designs" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </Box>
    </Box>
  );
}
