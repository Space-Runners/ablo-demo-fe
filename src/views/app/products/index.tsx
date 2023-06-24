import { useState } from 'react';

import { useHistory } from 'react-router-dom';

import {
  Box,
  Button as ChakraButton,
  Flex,
  HStack,
  Image,
  Text,
} from '@chakra-ui/react';

import { chunk } from 'lodash';

import Navbar from '@/components/navbar/Navbar';
import Panel from '@/components/Panel';

import PRODUCTS from '@/data/products';
import Colors from '@/theme/colors';

import ColorPicker from './ColorPicker';
import Filters from './Filters';

import { IconFilters, IconCloseFilters, IconSustainable } from './Icons';

const { abloBlue } = Colors;

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
};

const Button = (props) => (
  <ChakraButton
    _hover={{ bg: '' }}
    _active={{
      bg: '',
    }}
    _focus={{
      bg: '',
      boxShadow: '',
    }}
    {...props}
  ></ChakraButton>
);

type QuickFiltersBarProps = {
  selectedQuickFilter: string;
  onSelectedQuickFilter: (filter: string) => void;
};

const QuickFiltersBar = ({
  selectedQuickFilter,
  onSelectedQuickFilter,
}: QuickFiltersBarProps) => (
  <HStack mt="20px" overflowX="auto" paddingLeft="14px" spacing="16px" w="100%">
    {CLOTHING_TYPES.map((filter) => (
      <Button
        bg="transparent"
        color={selectedQuickFilter === filter ? '#000000' : '#6A6866'}
        h="30px"
        flexShrink="0"
        fontWeight={selectedQuickFilter === filter ? '600' : '400'}
        key={filter}
        onClick={() => onSelectedQuickFilter(filter)}
        padding={0}
      >
        {selectedQuickFilter === filter ? (
          <Box
            bg={abloBlue}
            borderRadius="50%"
            mr="8px"
            h="11px"
            w="11px"
          ></Box>
        ) : null}
        {filter}
      </Button>
    ))}
  </HStack>
);

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
          src={`${urlPrefix}_${variants[0].name}_FRONT.png`}
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
          <Text fontSize="sm">{fabric}</Text>
          <Box bg="#F9F9F7" borderRadius="4px" padding="0 8px">
            <Text bg="#F9F9F7" fontSize="xs" padding="4px 6px">
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
          onSelectedVariant={setSelectedVariant}
          selectedVariant={selectedVariant}
          variants={product.variants}
        />
      </Box>
      <Panel title="More Info">
        <Box color="#000000" fontSize="md" padding="0 15px 22px 14px">
          <Text as="b">Made in {madeIn}</Text>
          <Text fontWeight={300} mt="8px">
            {description}
          </Text>
        </Box>
      </Panel>
    </Box>
  );
};

const ProductsList = ({ onSelectedProduct }: Props) => {
  const chunks = chunk(PRODUCTS, 2);

  return (
    <Box bg="#ffffff" padding="25px 16px 45px 14px" w="100%">
      {chunks.map((chunk, index) => (
        <Flex key={index} mb="24px">
          {chunk.map((product, index) => {
            const { fabric, fit, name, price, variants, urlPrefix } = product;

            const [variant] = variants;

            return (
              <Box
                color="#6A6866"
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
                <Text display="block" fontSize="12px" textTransform="uppercase">
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
                <Text fontSize="xs">{fabric}</Text>
                <Flex align="center" fontSize="xs">
                  <Text
                    as="b"
                    color="#000000"
                    fontFamily="Roboto Condensed"
                    fontSize="md"
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

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    PRODUCTS[0]
  );

  const [areFiltersVisible, setFiltersVisible] = useState(true);
  const [filters, setFilters] = useState({});

  const [selectedQuickFilter, setSelectedQuickFilter] = useState();

  return (
    <Box bg="#ffffff" w="100%" h="100%">
      <Navbar
        action="Select your clothing"
        onNext={() =>
          history.push(`/app/editor?productName=${selectedProduct.name}`)
        }
        onNextDisabled={!selectedProduct}
        title="Product Selection"
      />
      <Button
        align="center"
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
          onUpdate={(updates) => setFilters({ ...filters, ...updates })}
        />
      ) : (
        <Box>
          {selectedProduct ? (
            <ProductDetails product={selectedProduct || PRODUCTS[0]} />
          ) : null}
          <QuickFiltersBar
            selectedQuickFilter={selectedQuickFilter}
            onSelectedQuickFilter={setSelectedQuickFilter}
          />
          <ProductsList
            onSelectedProduct={(product) => setSelectedProduct(product)}
          />
        </Box>
      )}
    </Box>
  );
}
