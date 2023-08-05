import { Box } from '@chakra-ui/react';

import { Redirect, Route, Switch, useLocation } from 'react-router-dom';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { Design, EditorState, Garment } from '@/components/types';
import PRODUCTS from '@/data/products';

import DesignsPage from '@/views/app/designs';
import Editor from '@/views/app/editor';
import OrderOrSharePage from '@/views/app/order-or-share';

import { useState } from 'react';

const DEFAULT_SELECTED_GARMENT = {
  productId: PRODUCTS[0].id,
  variant: 'OatMilk',
  size: 'S',
};

export default function DesignTool() {
  const location = useLocation();

  const [selectedDesign, setSelectedDesign] = useState<Design>(null);

  const [activeDesign, setActiveDesign] = useState<EditorState>({
    front: null,
    back: null,
  });

  const [selectedGarment, setSelectedGarment] = useState<Garment>(
    DEFAULT_SELECTED_GARMENT
  );

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
                path={`/app/designs`}
                render={() => <DesignsPage selectedDesign={selectedDesign} />}
              />
              <Route
                path={`/app/editor`}
                render={() => (
                  <Editor
                    design={activeDesign}
                    onDesignChange={setActiveDesign}
                    selectedGarment={selectedGarment}
                    onSelectedGarment={setSelectedGarment}
                  />
                )}
              />
              <Route
                path={`/app/order-or-share`}
                render={() => <OrderOrSharePage design={activeDesign} />}
              />
              <Redirect from="/" to="/app/designs" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </Box>
    </Box>
  );
}
