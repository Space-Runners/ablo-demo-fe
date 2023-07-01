import { Box } from '@chakra-ui/react';

import { Redirect, Route, Switch } from 'react-router-dom';

import { Design, Filters, Garment } from '@/components/types';

import ProductsPage from '@/views/app/products';
import Editor from '@/views/app/editor';
import OrderOrSharePage from '@/views/app/order-or-share';
import { useState } from 'react';

/* const AI_IMAGE = {
  options: {
    background: '',
    backgroundKeywords: [],
    keywords: ['Fish in ocean', 'Emoticons'],
    mood: 'cool',
    style: 'kidult',
    subject: '',
  },
  url: 'https://d3bezdph00y8ns.cloudfront.net/8da3ff77-320e-47a5-9994-866fb909c2f3/1688234959368.png',
}; */

export default function DesignTool() {
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    clothingTypes: [],
    price: [20, 90],
  });
  const [selectedGarment, setSelectedGarment] = useState<Garment>(null);

  const [activeDesign, setActiveDesign] = useState<Design>(null);

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      w={{ base: '100%' }}
    >
      <Box backgroundColor="#2b2a2a" h="100%" mx="auto" flex={1} w="100%">
        <Switch>
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
              <Editor design={activeDesign} onDesignChange={setActiveDesign} />
            )}
          />
          <Route
            path={`/app/order-or-share`}
            render={() => <OrderOrSharePage design={activeDesign} />}
          />
          <Redirect from="/" to="/app/products" />
        </Switch>
      </Box>
    </Box>
  );
}
