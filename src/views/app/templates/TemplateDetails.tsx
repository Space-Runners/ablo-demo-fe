import { useEffect, useState } from 'react';

import { Box, Button, Center, Flex, HStack, Image, Spinner, Text } from '@chakra-ui/react';

import ButtonCTA from '@/lib/components/Button';
import IconBack from '@/lib/components/icons/IconBack';
import Panel from '@/components/Panel';

import { Garment, Template } from '@/lib/types';

import ColorPicker from './components/ColorPicker';

import { IconSustainable } from './components/Icons';

type TemplateDetailsProps = {
  garment: Garment;
  onBack: () => void;
  onGarmentUpdate: (updates: object) => void;
  template: Template;
};

const TemplateDetails = ({ garment, onBack, onGarmentUpdate, template }: TemplateDetailsProps) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    let templateColorId = garment.templateColorId;

    const { colors } = template;

    if (
      !templateColorId ||
      !template.colors.find((variant) => variant.id === templateColorId) ||
      colors[0]
    ) {
      const defaultColor =
        template.colors.find((variant) => variant.name === 'OatMilk') || colors[0];

      templateColorId = defaultColor.id;
    }

    setSelectedSize(garment.sizeId);
    setSelectedColor(templateColorId);
  }, [template, garment]);

  const handleSelect = () => {
    onGarmentUpdate({
      templateId: template.id,
      sizeId: selectedSize,
      templateColorId: selectedColor,
    });
  };

  const { colors, material, fabric, fit, madeIn, name, price, sizes } = template;

  const variant = colors.find((variant) => variant.id === selectedColor) || colors[0];

  return (
    <Box position="relative">
      <Box padding="30px 17px 20px 17px">
        <Button bg="transparent" height="27px" minWidth="none" onClick={onBack} padding={0}>
          <IconBack />
          <Text as="b" fontSize="18px" ml="10px">
            Back to list
          </Text>
        </Button>
      </Box>
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
        <Image
          w={{ base: 350, md: 500 }}
          src={variant.images[0].url}
          alt={name}
          fallback={
            <Center h="500px" w="100%">
              <Spinner />
            </Center>
          }
        />
      </Flex>
      <Box padding="24px 14px">
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
                border="1px solid"
                borderColor={isSelected ? 'brand.500' : '#6A6866'}
                borderRadius="4px"
                fontWeight={isSelected ? 600 : 400}
                onClick={() => setSelectedSize(id)}
                h="34px"
                key={id}
                justify="center"
                w="34px"
              >
                <Text color={isSelected ? 'brand.500' : '#6A6866'} fontSize="sm">
                  {name}
                </Text>
              </Flex>
            );
          })}
        </HStack>
        <ColorPicker
          onSelectedVariants={([variant]) => setSelectedColor(variant)}
          options={colors}
          selectedVariants={[selectedColor]}
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
