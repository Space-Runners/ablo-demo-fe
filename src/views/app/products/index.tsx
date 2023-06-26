import { useState } from 'react';

import { useHistory } from 'react-router-dom';

import { Box, Button, Flex, HStack, Image, Text } from '@chakra-ui/react';

import { chunk } from 'lodash';

import MiniFilterBar from '@/components/MiniFilterBar';
import Navbar from '@/components/navbar/Navbar';
import Panel from '@/components/Panel';

import PRODUCTS, { CLOTHING_TYPES } from '@/data/products';
import ColorPicker from '@/components/ColorPicker';

import Filters from './Filters';

import { IconFilters, IconCloseFilters, IconSustainable } from './Icons';

const SIZES = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

type Variant = {
  name: string;
  color: string;
};

type Product = {
  fabric: string;
  madeIn: string;
  name: string;
  fit: string;
  price: number;
  urlPrefix: string;
  description: string;
  variants: Variant[];
  tags: string[];
};

type Props = {
  onSelectedProduct: (product: Product) => void;
  products: Product[];
};

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

const ProductDetails = ({ product }: { product: Product }) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  const {
    description,
    fabric,
    fit,
    madeIn,
    name,
    price,
    urlPrefix,
    tags,
    variants,
  } = product;

  console.log('Variant', selectedVariant.name);

  return (
    <Box borderBottom="1px solid #D9D9D9">
      <Flex
        align="center"
        bg="#F9F9F7"
        direction="column"
        justify="center"
        margin="0 auto"
        h="271px"
        w="100%"
      >
        <Image
          h={216}
          src={`${urlPrefix}_${selectedVariant.name}_FRONT.png`}
          alt={name}
        />
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
          {SIZES.map((size) => (
            <Flex
              align="center"
              border="1px solid #6A6866"
              borderRadius="4px"
              h="34px"
              key={size}
              justify="center"
              w="34px"
            >
              <Text color="#6A6866" fontSize="sm">
                {size}
              </Text>
            </Flex>
          ))}
        </HStack>
        <ColorPicker
          onSelectedVariants={([name]) =>
            setSelectedVariant(variants.find((v) => v.name === name))
          }
          selectedVariants={[selectedVariant.name]}
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

const ProductsList = ({ products, onSelectedProduct }: Props) => {
  const chunks = chunk(products, 2);

  return (
    <Box bg="#ffffff" padding="25px 16px 45px 14px" w="100%">
      {chunks.map((chunk, index) => (
        <Flex key={index} mb="24px">
          {chunk.map((product, index) => {
            const { fabric, fit, name, price, variants, urlPrefix } = product;

            const [variant] = variants;

            return (
              <Box
                flex="1"
                key={index}
                marginLeft={`${index === 0 ? 0 : 8}px`}
                onClick={() => onSelectedProduct(product)}
                position="relative"
              >
                <IconSustainable position="absolute" top="8px" right="8px" />
                <Flex
                  align="center"
                  bg="#F9F9F7"
                  borderRadius="10px"
                  h="180px"
                  mb="16px"
                  justify="center"
                  padding="16px 8px"
                >
                  <Image
                    h={160}
                    src={`${urlPrefix}_${variant.name}_FRONT.png`}
                    alt={name}
                  />
                </Flex>
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
            );
          })}
          {chunk.length === 1 ? <Box flex="1" marginLeft="8px" /> : null}
        </Flex>
      ))}
    </Box>
  );
};

export default function ProductsPage() {
  const history = useHistory();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [areFiltersVisible, setFiltersVisible] = useState(false);
  const [filters, setFilters] = useState({ price: [20, 100] });

  const [selectedQuickFilter, setSelectedQuickFilter] = useState('');

  const products = getProductsMatchingFilters(filters);

  return (
    <Box bg="#ffffff" w="100%" h="100%">
      <Navbar
        action="Select your clothing"
        onNext={() =>
          history.push(
            `/app/editor?productName=${selectedProduct.fit} ${selectedProduct.name}`
          )
        }
        onNextDisabled={!selectedProduct}
        title="Product Selection"
      />
      <Button
        alignItems="center"
        borderBottom="1px solid #D4D4D3"
        borderRadius={0}
        display="flex"
        height="50px"
        justifyContent="space-between"
        onClick={() => setFiltersVisible(!areFiltersVisible)}
        padding="10px 14px"
        w="100%"
      >
        <Text fontWeight={400}>FILTERS</Text>
        {areFiltersVisible ? <IconCloseFilters /> : <IconFilters />}
      </Button>
      {areFiltersVisible ? (
        <Filters
          filters={filters}
          onApply={() => {
            setFiltersVisible(false);

            setSelectedProduct(null);
          }}
          onUpdate={(updates) => setFilters({ ...filters, ...updates })}
        />
      ) : (
        <Box>
          {selectedProduct ? (
            <ProductDetails product={selectedProduct || PRODUCTS[0]} />
          ) : null}
          {!selectedProduct && (
            <Box pl="14px">
              <MiniFilterBar
                options={CLOTHING_TYPES}
                selectedValue={selectedQuickFilter}
                onChange={setSelectedQuickFilter}
              />
            </Box>
          )}
          <ProductsList
            onSelectedProduct={(product) => setSelectedProduct(product)}
            products={products}
          />
        </Box>
      )}
    </Box>
  );
}
