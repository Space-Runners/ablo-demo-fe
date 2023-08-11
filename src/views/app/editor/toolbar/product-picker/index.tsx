import { Fragment as F, useState } from 'react';

import { Box, Button, Flex, Image, Text, useBreakpointValue } from '@chakra-ui/react';

import { chunk } from 'lodash';

import MiniFilterBar from '@/components/MiniFilterBar';

import IconBack from '@/components/icons/IconBack';
import { Filters, Garment, Product } from '@/components/types';

import PRODUCTS, { CLOTHING_TYPES } from '@/data/products';
import Colors from '@/theme/colors';

import ProductDetails from './ProductDetails';
import ProductFilters from './Filters';

import { IconFilters, IconCloseFilters, IconSustainable, IconSelected } from './Icons';

const { abloBlue } = Colors;

const matchesClothingType = (types, product) =>
  !types.length || types[0] === 'All' || types.find((type) => type.includes(product.name));

const matchesFit = (fits, product) =>
  !fits.length || fits.find((fit) => fit.includes(product.name));

const matchesPrice = ([min, max], product) => {
  const { price } = product;

  return price >= min && price <= max;
};

const getProductsMatchingFilters = (filters) =>
  PRODUCTS.filter((product) => {
    const { clothingTypes = [], fits = [], price: priceRange } = filters;

    return (
      matchesClothingType(clothingTypes, product) &&
      matchesFit(fits, product) &&
      matchesPrice(priceRange, product)
    );
  });

type ProductsListProps = {
  products: Product[];
  onSelectedProduct: (product: Product) => void;
  selectedGarment: Garment;
};

const ProductsList = ({ products, onSelectedProduct, selectedGarment }: ProductsListProps) => {
  const chunks = chunk(products, 2);

  return (
    <Box bg="#ffffff" padding="25px 16px 45px 14px" w="100%">
      {chunks.map((chunk, index) => (
        <Flex key={index} mb="24px">
          {chunk.map((product, index) => {
            const { fabric, fit, id, name, price, variants, urlPrefix } = product;

            const variant =
              selectedGarment && selectedGarment.variant
                ? variants.find((variant) => variant.name === selectedGarment.variant)
                : variants.find((variant) => variant.name === 'OatMilk');

            const isSelected = selectedGarment && selectedGarment.productId === id;

            const selectedProps = isSelected
              ? { border: '2px solid #000000', borderRadius: '10px' }
              : {};

            return (
              <Box
                flex="1"
                key={index}
                marginLeft={`${index === 0 ? 0 : 8}px`}
                onClick={() => onSelectedProduct(product)}
                position="relative"
                {...selectedProps}
              >
                {isSelected ? (
                  <IconSelected position="absolute" top="8px" right="8px" />
                ) : (
                  <IconSustainable position="absolute" top="8px" right="8px" />
                )}
                <Flex
                  align="center"
                  bg="#F9F9F7"
                  borderRadius="10px"
                  h="180px"
                  justify="center"
                  padding="16px 8px"
                >
                  <Image h={160} src={`${urlPrefix}_${variant.name}_FRONT.webp`} alt={name} />
                </Flex>
                <Box padding="8px">
                  <Text color="#6A6866" display="block" fontSize="xs" textTransform="uppercase">
                    Spaarkd
                  </Text>
                  <Text color="#000000" fontSize="md" fontWeight={500} lineHeight="20px">
                    {fit} {name}
                  </Text>
                  <Text color="#6A6866" fontSize="xs">
                    {fabric}
                  </Text>
                  <Flex color="#6A6866" align="center" fontSize="xs">
                    <Text
                      as="b"
                      color="#000000"
                      fontFamily="Roboto Condensed"
                      fontSize="md"
                      fontWeight={700}
                      mr="4px"
                    >
                      ${price}.00
                    </Text>{' '}
                    (Base Price)
                  </Flex>
                </Box>
              </Box>
            );
          })}
          {chunk.length === 1 ? <Box flex="1" marginLeft="8px" /> : null}
        </Flex>
      ))}
    </Box>
  );
};

type ProductPickerProps = {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  selectedGarment: Garment;
  onSelectedGarment: (garment: Garment) => void;
  selectedProduct: Product;
  onSelectedProduct: (garment: Product) => void;
};

export default function ProductPicker({
  filters,
  onFiltersChange,
  selectedGarment,
  onSelectedGarment,
  selectedProduct,
  onSelectedProduct,
}: ProductPickerProps) {
  const [areFiltersVisible, setFiltersVisible] = useState(false);

  const { clothingTypes } = filters;

  const products = getProductsMatchingFilters(filters);

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box bg="#ffffff" w="100%" h="100%">
      <Flex align="center" height="63px" pl="17px">
        {selectedProduct && isMobile ? (
          <Button
            bg="transparent"
            height="30px"
            minWidth="none"
            mr="10px"
            onClick={() => onSelectedProduct(null)}
            padding={0}
            _hover={{
              bg: '#F9F9F7',
              border: `1px solid ${abloBlue}`,
              boxShadow: '0px 0px 8px 0px #97B9F5',
            }}
          >
            <IconBack />
          </Button>
        ) : null}
        <Text fontFamily="Roboto Condensed" fontSize="18px" fontWeight={600} lineHeight="18px">
          Pick your clothe
        </Text>
      </Flex>
      {!selectedProduct || !isMobile ? (
        <Button
          alignItems="center"
          bg="#FFFFFF"
          borderRadius={0}
          boxShadow="none"
          display="flex"
          height="50px"
          justifyContent="space-between"
          onClick={() => setFiltersVisible(!areFiltersVisible)}
          padding="10px 14px"
          w="100%"
        >
          <Text color="#212121" fontWeight={400}>
            FILTERS
          </Text>
          {areFiltersVisible ? <IconCloseFilters /> : <IconFilters />}
        </Button>
      ) : null}
      {areFiltersVisible ? (
        <ProductFilters
          filters={filters}
          onApply={() => {
            setFiltersVisible(false);

            onSelectedGarment({ ...selectedGarment, productId: null });
          }}
          onUpdate={(updates) => onFiltersChange({ ...filters, ...updates })}
        />
      ) : (
        <Box>
          {selectedProduct && isMobile ? (
            <ProductDetails
              garment={selectedGarment}
              onGarmentUpdate={onSelectedGarment}
              product={selectedProduct}
            />
          ) : (
            <F>
              <MiniFilterBar
                options={['All', ...CLOTHING_TYPES]}
                selectedValue={clothingTypes[0] || 'All'}
                onChange={(value) => onFiltersChange({ ...filters, clothingTypes: [value] })}
              />
              <ProductsList
                onSelectedProduct={onSelectedProduct}
                products={products}
                selectedGarment={selectedGarment}
              />
            </F>
          )}
        </Box>
      )}
    </Box>
  );
}
