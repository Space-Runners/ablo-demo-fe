import { Box } from '@chakra-ui/react';

import { Redirect, Route, Switch, useLocation } from 'react-router-dom';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { Design, Filters, Garment } from '@/components/types';

import ProductsPage from '@/views/app/products';
import Editor from '@/views/app/editor';
import OrderOrSharePage from '@/views/app/order-or-share';

import { useState } from 'react';

export default function DesignTool() {
  const location = useLocation();

  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    clothingTypes: [],
    price: [20, 90],
  });
  const [selectedGarment, setSelectedGarment] = useState<Garment>(null);

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
                path={`/app/products`}
                render={() => (
                  <ProductsPage
                    filters={selectedFilters}
                    onFiltersChange={setSelectedFilters}
                    selectedGarment={selectedGarment}
                    onSelectedGarment={setSelectedGarment}
                  />
                )}
              />
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
              <Redirect from="/" to="/app/products" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </Box>
    </Box>
  );
}
