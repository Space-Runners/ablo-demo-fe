import { useState } from 'react';

import { useHistory } from 'react-router-dom';

import { Box, Button, Flex, HStack, Image, Text } from '@chakra-ui/react';

import { chunk } from 'lodash';

import MiniFilterBar from '@/components/MiniFilterBar';
import Navbar from '@/components/navbar/Navbar';
import Panel from '@/components/Panel';
import { Filters, Garment, Product } from '@/components/types';

import PRODUCTS, { CLOTHING_TYPES } from '@/data/products';
import ColorPicker from '@/components/ColorPicker';
import Colors from '@/theme/colors';

const { abloBlue } = Colors;

import ProductFilters from './Filters';

import { IconFilters, IconCloseFilters, IconSustainable } from './Icons';

const SIZES = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

const matchesClothingType = (types, product) =>
  !types.length || types.find((type) => type.includes(product.name));

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

const ProductDetails = ({
  garment,
  onGarmentUpdate,
  product,
}: {
  garment: Garment;
  onGarmentUpdate: (updates: any) => void;
  product: Product;
}) => {
  const { variant, size: selectedSize } = garment;

  const { description, fabric, fit, madeIn, name, price, urlPrefix, tags } =
    product;

  return (
    <Box borderBottom="1px solid #D9D9D9">
      <Flex
        align="center"
        bg="#F9F9F7"
        direction="column"
        justify="center"
        position="relative"
        margin="0 auto"
        h="271px"
        w="100%"
      >
        <IconSustainable position="absolute" right="14px" top="23px" />
        <Image h={216} src={`${urlPrefix}_${variant}_FRONT.png`} alt={name} />
      </Flex>
      <Box padding="24px 14px">
        <Text color="#959392" fontSize="sm" mb="13px">
          SPAARKD
        </Text>
        <Flex color="#000000" justify="space-between" mb="16px">
          <Text fontSize="md">
            {fit} {name}
          </Text>
          <Text fontSize="md" fontWeight={700}>
            ${price}.00
          </Text>
        </Flex>
        <Flex color="#959392" justify="space-between" mb="23px">
          <Text color="#959392" fontSize="sm">
            {fabric}
          </Text>
          <Box bg="#F9F9F7" borderRadius="4px" padding="0 8px">
            <Text color="#959392" bg="#F9F9F7" fontSize="xs" padding="4px 6px">
              Min. Order #: 1
            </Text>
          </Box>
        </Flex>
        <Text color="#000000" fontSize="sm" mb="20px">
          {tags.join(' / ')}
        </Text>
        <HStack mb="20px" spacing="10px">
          {SIZES.map((size) => {
            const isSelected = size === selectedSize;

            return (
              <Flex
                align="center"
                as="button"
                border={
                  isSelected ? `1px solid ${abloBlue}` : '1px solid #6A6866'
                }
                borderRadius="4px"
                fontWeight={isSelected ? 600 : 400}
                onClick={() => onGarmentUpdate({ size })}
                h="34px"
                key={size}
                justify="center"
                w="34px"
              >
                <Text color={isSelected ? abloBlue : '#6A6866'} fontSize="sm">
                  {size}
                </Text>
              </Flex>
            );
          })}
        </HStack>
        <ColorPicker
          onSelectedVariants={([variant]) => onGarmentUpdate({ variant })}
          selectedVariants={[variant]}
        />
      </Box>
      <Panel title="More Info">
        <Box color="#000000" fontSize="md" padding="0 15px 22px 0">
          <Text as="b">Made in {madeIn}</Text>
          <Text fontWeight={300} mt="8px">
            {description}
          </Text>
        </Box>
      </Panel>
    </Box>
  );
};

type ProductsListProps = {
  products: Product[];
  onSelectedProduct: (product: Product) => void;
  selectedGarment: Garment;
};

const ProductsList = ({
  products,
  onSelectedProduct,
  selectedGarment,
}: ProductsListProps) => {
  const chunks = chunk(products, 2);

  console.log('Product list selected garment', selectedGarment);

  return (
    <Box bg="#ffffff" padding="25px 16px 45px 14px" w="100%">
      {chunks.map((chunk, index) => (
        <Flex key={index} mb="24px">
          {chunk.map((product, index) => {
            const { fabric, fit, id, name, price, variants, urlPrefix } =
              product;

            const variant =
              selectedGarment && selectedGarment.variant
                ? variants.find(
                    (variant) => variant.name === selectedGarment.variant
                  )
                : variants.find((variant) => variant.name === 'OatMilk');

            const selectedProps =
              selectedGarment && selectedGarment.productId === id
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
                <IconSustainable position="absolute" top="8px" right="8px" />
                <Flex
                  align="center"
                  bg="#F9F9F7"
                  borderRadius="10px"
                  h="180px"
                  justify="center"
                  padding="16px 8px"
                >
                  <Image
                    h={160}
                    src={`${urlPrefix}_${variant.name}_FRONT.png`}
                    alt={name}
                  />
                </Flex>
                <Box padding="8px">
                  <Text
                    color="#6A6866"
                    display="block"
                    fontSize="xs"
                    textTransform="uppercase"
                  >
                    Spaarkd
                  </Text>
                  <Text
                    color="#000000"
                    fontSize="md"
                    fontWeight={500}
                    lineHeight="20px"
                  >
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

type ProductPageProps = {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  selectedGarment: Garment;
  onSelectedGarment: (garment: Garment) => void;
};

export default function ProductsPage({
  filters,
  onFiltersChange,
  selectedGarment,
  onSelectedGarment,
}: ProductPageProps) {
  const history = useHistory();

  const [areFiltersVisible, setFiltersVisible] = useState(false);

  const { clothingTypes } = filters;

  const products = getProductsMatchingFilters(filters);

  const { productId, variant } = selectedGarment || {};

  const selectedProduct = PRODUCTS.find(({ id }) => id === productId);

  return (
    <Box bg="#ffffff" w="100%" h="100%">
      <Navbar
        onNext={() =>
          history.push(`/app/editor?productId=${productId}&variant=${variant}`)
        }
        isNextDisabled={!selectedProduct}
        step={1}
        title="Pick your garment"
      />
      <Button
        alignItems="center"
        bg="#FFFFFF"
        borderBottom="1px solid #D4D4D3"
        borderRadius={0}
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
          {selectedProduct ? (
            <ProductDetails
              garment={selectedGarment}
              onGarmentUpdate={(updates) =>
                onSelectedGarment({ ...selectedGarment, ...updates })
              }
              product={selectedProduct}
            />
          ) : null}
          {!selectedProduct && (
            <Box pl="14px">
              <MiniFilterBar
                options={['All', ...CLOTHING_TYPES]}
                selectedValue={clothingTypes[0] || 'All'}
                onChange={(value) =>
                  onFiltersChange({ ...filters, clothingTypes: [value] })
                }
              />
            </Box>
          )}
          <ProductsList
            onSelectedProduct={({ id }) =>
              onSelectedGarment({
                productId: id,
                variant: selectedGarment ? selectedGarment.variant : 'OatMilk',
                size: 'S',
              })
            }
            products={products}
            selectedGarment={selectedGarment}
          />
        </Box>
      )}
    </Box>
  );
}
