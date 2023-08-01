import { useEffect, useState } from 'react';

import { Box, Flex, HStack, Image, Text } from '@chakra-ui/react';

import ButtonCTA from '@/components/Button';
import Panel from '@/components/Panel';

import { Garment, Product } from '@/components/types';

import ColorPicker from '@/components/ColorPicker';
import Colors from '@/theme/colors';

import { IconSustainable } from './Icons';

const { abloBlue } = Colors;

const SIZES = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

type ProductDetailsProps = {
  garment: Garment;
  onGarmentUpdate: (updates: any) => void;
  product: Product;
};

const ProductDetails = ({
  garment,
  onGarmentUpdate,
  product,
}: ProductDetailsProps) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedVariant, setSelectedVariant] = useState('');

  useEffect(() => {
    setSelectedSize(garment.size);
    setSelectedVariant(garment.variant);
  }, []);

  const handleSelect = () => {
    onGarmentUpdate({
      productId: product.id,
      size: selectedSize,
      variant: selectedVariant,
    });
  };

  const { description, fabric, fit, madeIn, name, price, urlPrefix, tags } =
    product;

  return (
    <Box position="relative">
      <Flex
        align="center"
        bg={{ base: '#F9F9F7', md: 'transparent' }}
        direction="column"
        justify="center"
        position="relative"
        margin="0 auto"
        h="271px"
        w="100%"
      >
        <IconSustainable position="absolute" right="14px" top="23px" />
        <Image
          h={216}
          src={`${urlPrefix}_${selectedVariant}_FRONT.webp`}
          alt={name}
        />
      </Flex>
      <Box padding="24px 14px">
        <Text color="#959392" fontSize="sm" mb="13px">
          SPAARKD
        </Text>
        <Flex
          color="#000000"
          justify={{ base: 'space-between', md: 'flex-start' }}
          mb="16px"
        >
          <Text fontSize="md">
            {fit} {name}
          </Text>
          <Text fontSize="md" fontWeight={700} ml={{ base: 0, md: '20px' }}>
            ${price}.00
          </Text>
        </Flex>
        <Flex
          color="#959392"
          justify={{ base: 'space-between', md: 'flex-start' }}
          mb="23px"
        >
          <Text color="#959392" fontSize="sm">
            {fabric}
          </Text>
          <Box
            bg="#F9F9F7"
            borderRadius="4px"
            ml={{ base: 0, md: '20px' }}
            padding="0 8px"
          >
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
                onClick={() => setSelectedSize(size)}
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
          onSelectedVariants={([variant]) => setSelectedVariant(variant)}
          selectedVariants={[selectedVariant]}
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
      <Box p="14px">
        <ButtonCTA
          onClick={handleSelect}
          title="Select"
          w={{ base: '100%', md: '218px' }}
        />
      </Box>
    </Box>
  );
};

export default ProductDetails;
