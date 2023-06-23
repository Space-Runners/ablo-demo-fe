import { useState } from 'react';

import { useHistory } from 'react-router-dom';

import {
  Box,
  Button as ChakraButton,
  Flex,
  HStack,
  Image,
  Tag,
  Text,
} from '@chakra-ui/react';

import { chunk } from 'lodash';

import Navbar from '@/components/navbar/Navbar';

import PRODUCTS from '@/data/products';

import { IconDown, IconUp } from './Icons';

import IconEarth from './images/Earth.png';

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
    borderRadius="6px"
    h="40px"
    padding="8px"
    w="168px"
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

const ColorPicker = ({ selectedVariant, onSelectedVariant, variants }) => (
  <HStack align="center" mt="37px" overflowX="auto" spacing="20px">
    {variants.map((variant) => {
      const { name, color } = variant;
      const isSelected = name === selectedVariant.name;

      const size = `${isSelected ? 35 : 25}px`;

      console.log('Color', name, selectedVariant);

      return (
        <Button
          bg={color}
          h={size}
          flexShrink="0"
          key={name}
          padding="0"
          w={size}
          borderRadius="50%"
          marginLeft="20px"
          marginRight="0"
          minWidth="auto"
          onClick={() => onSelectedVariant(variant)}
        />
      );
    })}
  </HStack>
);

const ProductDetails = ({ product }: { product: Product }) => {
  const [areDetailsOpen, setDetailsOpen] = useState(false);

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
    <Box bg="#292929" padding="51px 18px 28px 18px">
      {null && (
        <Box bg="#ffffff" h="23px" textAlign="center" w="100%">
          <Text
            color="#212121"
            fontSize="sm"
            fontWeight={700}
            textTransform="uppercase"
          >
            Popular
          </Text>
        </Box>
      )}
      <Flex
        align="center"
        bg="#212121"
        borderRadius="8px"
        direction="column"
        margin="0 auto"
        h="216px"
        w="100%"
      >
        <Image
          h={216}
          src={`${urlPrefix}_${variants[0].name}_FRONT.png`}
          alt={name}
        />
      </Flex>
      <Flex color="#ffffff" justify="space-between" mt="39px">
        <Box>
          <Text fontSize="md" textTransform="uppercase">
            Spaarkd
          </Text>
          <Text fontSize="xl">
            {fit} {name}
          </Text>
          <Text fontSize="md" opacity={0.4}>
            {fabric}
          </Text>
        </Box>
        <Box>
          <Text fontSize="2xl" fontWeight={600} textAlign="right">
            ${price}.00
          </Text>
          <Box
            border="1px solid #ffffff"
            borderRadius="5px"
            mt="8px"
            padding="0 8px"
          >
            <Text fontSize="10px" fontWeight={600} lineHeight="20px">
              MIN. ORDER #: 1
            </Text>
          </Box>
        </Box>
      </Flex>
      <Flex justify="space-between" mt="8px">
        <HStack spacing={0}>
          {SIZES.map((size, index) => (
            <Flex
              align="center"
              border="1px solid #ffffff"
              borderRightWidth={index === 0 ? 0 : '1px'}
              h="25px"
              key={size}
              justify="center"
              w="25px"
            >
              <Text color="#ffffff" fontSize="11px">
                {size}
              </Text>
            </Flex>
          ))}
        </HStack>
      </Flex>
      <HStack mt="16px" overflowX="auto" spacing="12px">
        {tags.map((tag) => (
          <Tag
            bg="#FFFFFF"
            border="1px solid #CCCCCC"
            h="25px"
            key={tag}
            padding="0 12px"
          >
            <Text
              as="b"
              color="#212121"
              fontSize="sm"
              textTransform="uppercase"
            >
              {tag}
            </Text>
          </Tag>
        ))}
      </HStack>
      <ColorPicker
        onSelectedVariant={setSelectedVariant}
        selectedVariant={selectedVariant}
        variants={product.variants}
      />
      <Flex mt="15px">
        <Button
          bg="transparent"
          border="1px solid #D9D9D9"
          borderRadius="6px"
          onClick={() => setDetailsOpen(!areDetailsOpen)}
          padding="8px"
          w="100%"
        >
          <Text color="#FFFFFF" fontSize="md" mr="8px">
            More info
          </Text>
          {areDetailsOpen ? <IconUp /> : <IconDown />}
        </Button>
      </Flex>
      {areDetailsOpen ? (
        <Box color="#FFFFFF" fontSize="md" mt="30px">
          <Text as="b">Made in {madeIn}</Text>
          <Text mt="24px">{description}</Text>
        </Box>
      ) : null}
    </Box>
  );
};

const ProductsList = ({ onSelectedProduct }: Props) => {
  const chunks = chunk(PRODUCTS, 2);

  return (
    <Box bg="#ffffff" padding="41px 16px 45px 16px" w="100%">
      {chunks.map((chunk, index) => (
        <Flex key={index} mb="8px">
          {chunk.map((product, index) => {
            const { fabric, fit, name, price, variants, urlPrefix } = product;

            const [variant] = variants;

            return (
              <Box
                border="1px solid #EAE9E9"
                borderRadius="5px"
                flex="1"
                key={index}
                marginLeft={`${index === 0 ? 0 : 8}px`}
                onClick={() => onSelectedProduct(product)}
                padding="6px 12px"
                position="relative"
              >
                <Image
                  h="20px"
                  src={IconEarth}
                  w="20px"
                  position="absolute"
                  top="4px"
                  right="4px"
                />
                <Flex align="center" h="180px" mb="16px" justify="center">
                  <Image
                    h={160}
                    src={`${urlPrefix}_${variant.name}_FRONT.png`}
                    alt={name}
                  />
                </Flex>
                <Text
                  as="b"
                  display="block"
                  fontSize="10px"
                  lineHeight="20px"
                  textTransform="uppercase"
                >
                  Spaarkd
                </Text>
                <Text as="b" fontSize="sm" lineHeight="20px">
                  {fit} {name}
                </Text>
                <Text
                  color="rgba(33, 33, 33, 0.5)"
                  fontSize="10px"
                  lineHeight="18px"
                >
                  {fabric}
                </Text>
                <Text color="#212121" fontSize="sm">
                  <Text as="b">${price}.00</Text> (Base Price)
                </Text>
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
      {selectedProduct ? (
        <ProductDetails product={selectedProduct || PRODUCTS[0]} />
      ) : null}
      <ProductsList
        onSelectedProduct={(product) => setSelectedProduct(product)}
      />
    </Box>
  );
}
