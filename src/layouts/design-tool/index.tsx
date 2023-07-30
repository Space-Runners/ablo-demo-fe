import { Box } from '@chakra-ui/react';

import { Redirect, Route, Switch, useLocation } from 'react-router-dom';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { Design } from '@/components/types';

import Editor from '@/views/app/editor';
import OrderOrSharePage from '@/views/app/order-or-share';

import { useState } from 'react';

export default function DesignTool() {
  const location = useLocation();

  const [activeDesign, setActiveDesign] = useState<Design>({
    Front: null,
    Back: null,
  });

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
              <Route
                path={`/app/editor`}
                render={() => (
                  <Editor
                    design={activeDesign}
                    onDesignChange={setActiveDesign}
                  />
                )}
              />
              <Route
                path={`/app/order-or-share`}
                render={() => <OrderOrSharePage design={activeDesign} />}
              />
              <Redirect from="/" to="/app/editor" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </Box>
    </Box>
  );
}
