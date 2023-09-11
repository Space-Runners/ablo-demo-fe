import { useEffect, useState } from 'react';

import { Box, Flex, HStack, Image, Text } from '@chakra-ui/react';

import ButtonCTA from '@/components/Button';
import Panel from '@/components/Panel';

import { Garment, Template } from '@/components/types';

import ColorPicker from '@/components/ColorPicker';
import Colors from '@/theme/colors';

import { IconSustainable } from './Icons';

const { abloBlue } = Colors;

type TemplateDetailsProps = {
  garment: Garment;
  onGarmentUpdate: (updates: object) => void;
  template: Template;
};

const TemplateDetails = ({ garment, onGarmentUpdate, template }: TemplateDetailsProps) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState('');

  useEffect(() => {
    let variantId = garment.variantId;

    const { colors } = template;

    if (!variantId || !template.colors.find((variant) => variant.id === variantId) || colors[0]) {
      const defaultVariant =
        template.colors.find((variant) => variant.name === 'OatMilk') || colors[0];

      variantId = defaultVariant.id;
    }

    setSelectedSize(garment.sizeId);
    setSelectedVariant(variantId);
  }, [template, garment]);

  const handleSelect = () => {
    onGarmentUpdate({
      templateId: template.id,
      sizeId: selectedSize,
      variantId: selectedVariant,
    });
  };

  const { colors, material, fabric, fit, madeIn, name, price, sizes } = template;

  const variant = colors.find((variant) => variant.id === selectedVariant) || colors[0];

  return (
    <Box position="relative">
      <Flex
        align="center"
        bg={{ base: '#F9F9F7', md: 'transparent' }}
        direction="column"
        justify="center"
        paddingTop="20px"
        position="relative"
        margin="0 auto"
        w="100%"
      >
        <IconSustainable position="absolute" right="14px" top="23px" />
        <Image w={{ base: 350, md: 500 }} src={variant.images[0].url} alt={name} />
      </Flex>
      <Box padding="24px 14px">
        <Text color="#959392" fontSize="sm" mb="13px">
          SPAARKD
        </Text>
        <Flex color="#000000" justify={{ base: 'space-between', md: 'flex-start' }} mb="16px">
          <Text fontSize="md">
            {fit} {name}
          </Text>
          <Text fontSize="md" fontWeight={700} ml={{ base: 0, md: '20px' }}>
            ${price}.00
          </Text>
        </Flex>
        <Flex color="#959392" justify={{ base: 'space-between', md: 'flex-start' }} mb="23px">
          <Text color="#959392" fontSize="sm">
            {fabric}
          </Text>
          <Box bg="#F9F9F7" borderRadius="4px" ml={{ base: 0, md: '20px' }} padding="0 8px">
            <Text color="#959392" bg="#F9F9F7" fontSize="xs" padding="4px 6px">
              Min. Order #: 1
            </Text>
          </Box>
        </Flex>

        <HStack mb="20px" spacing="10px">
          {sizes.map(({ id, name }) => {
            const isSelected = id === selectedSize;

            return (
              <Flex
                align="center"
                as="button"
                border={isSelected ? `1px solid ${abloBlue}` : '1px solid #6A6866'}
                borderRadius="4px"
                fontWeight={isSelected ? 600 : 400}
                onClick={() => setSelectedSize(id)}
                h="34px"
                key={id}
                justify="center"
                w="34px"
              >
                <Text color={isSelected ? abloBlue : '#6A6866'} fontSize="sm">
                  {name}
                </Text>
              </Flex>
            );
          })}
        </HStack>
        <ColorPicker
          onSelectedVariants={([variant]) => setSelectedVariant(variant)}
          options={colors}
          selectedVariants={[selectedVariant]}
        />
      </Box>
      <Panel title="More Info">
        <Box color="#000000" fontSize="md" padding="0 15px 22px 0">
          <Text as="b">Made in {madeIn}</Text>
          <Text fontWeight={300} mt="8px">
            {material}
          </Text>
        </Box>
      </Panel>
      <Box p="14px">
        <ButtonCTA onClick={handleSelect} title="Select" w={{ base: '100%', md: '218px' }} />
      </Box>
    </Box>
  );
};

export default TemplateDetails;
