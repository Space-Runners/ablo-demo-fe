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

import PRODUCTS from '@/data/products';

import { IconDown, IconUp } from './Icons';

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

type Variant = {
  name: string;
  color: string;
};

type Product = {
  name: string;
  fit: string;
  price: number;
  urlPrefix: string;
  description: string;
  variants: Variant[];
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

const ProductDetails = ({ product }: { product: Product }) => {
  const [areDetailsOpen, setDetailsOpen] = useState(false);

  const { description, fit, name, price, urlPrefix, variants } = product;

  return (
    <Box bg="#292929" padding="50px 14px 34px 18px">
      <Flex
        align="center"
        bg="#212121"
        border="3px solid #ffffff"
        direction="column"
        margin="0 auto"
        h="183px"
        w="313px"
      >
        <Image
          h={160}
          src={`${urlPrefix}_${variants[0].name}_FRONT.png`}
          alt={name}
        />
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
      </Flex>
      <Flex justify="space-between" mt="39px">
        <Text color="#ffffff" fontSize="xl" fontWeight={400}>
          {name}
        </Text>
        <Text color="#ffffff" fontSize="xl" fontWeight={600}>
          ${price}
        </Text>
      </Flex>
      <Flex justify="space-between" mt="8px">
        <Text color="#ffffff" fontSize="xl" fontWeight={400} opacity={0.4}>
          Adult {name}
        </Text>
        <Flex
          align="center"
          border="1px solid #ffffff"
          borderRadius="5px"
          color="#ffffff"
          h="20px"
          padding="0px 8px"
          w="93px"
        >
          <Text fontSize="10px" fontWeight={600}>
            MIN. ORDER #: 1
          </Text>
        </Flex>
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
              <Text color="#ffffff" fontSize="sm">
                {size}
              </Text>
            </Flex>
          ))}
        </HStack>
        <Flex align="center" bg="#ffffff" h="20px" padding="0px 8px">
          <Text
            color="#212121"
            fontSize="10px"
            fontWeight={600}
            padding="0 12px"
            textTransform="uppercase"
          >
            {fit} fit
          </Text>
        </Flex>
      </Flex>
      <Flex justify="space-between" mt="35px">
        <Button bg="#626262" onClick={() => setDetailsOpen(!areDetailsOpen)}>
          <Text color="#FFFFFF" fontSize="md" fontWeight={600} mr="8px">
            More info
          </Text>
          {areDetailsOpen ? <IconUp /> : <IconDown />}
        </Button>
        <Button bg="transparent" border="1px solid #626262">
          <Text color="#FFFFFF" fontSize="md" fontWeight={400}>
            Reviews
          </Text>
        </Button>
      </Flex>
      {areDetailsOpen ? (
        <Box mt="30px">
          <Text color="#FFFFFF" fontSize="md" fontWeight={600} mb="24px">
            {name} Softstyle
          </Text>
          <Text color="#FFFFFF" fontSize="md" fontWeight={600} mb="24px">
            100% Ring Spun Cotton
          </Text>
          <Text color="#FFFFFF" fontSize="md" fontWeight={400}>
            {description}
          </Text>
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
        <Flex key={index} mb="20px">
          {chunk.map((product, index) => {
            const { name, variants, urlPrefix } = product;

            const [variant] = variants;

            return (
              <Box
                flex="1"
                key={name}
                marginLeft={`${index === 0 ? 0 : 8}px`}
                onClick={() => onSelectedProduct(product)}
              >
                <Flex
                  align="center"
                  border="1px solid #CCCCCC"
                  h="180px"
                  mb="16px"
                  justify="center"
                >
                  <Image
                    h={160}
                    src={`${urlPrefix}_${variant.name}_FRONT.png`}
                    alt={name}
                  />
                </Flex>
                <Text as="b" fontSize="xl" lineHeight="36px">
                  {name}
                </Text>
                <Text color="#212121" fontSize="sm" fontWeight={400}>
                  Min. Order#:1
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
        onNext={
          selectedProduct
            ? () =>
                history.push(`/app/editor?productName=${selectedProduct.name}`)
            : null
        }
        title="Product Selection"
      />
      <ProductDetails product={selectedProduct || PRODUCTS[0]} />
      <ProductsList
        onSelectedProduct={(product) => setSelectedProduct(product)}
      />
      {selectedProduct ? <Text>Selected Product</Text> : null}
    </Box>
  );
}
