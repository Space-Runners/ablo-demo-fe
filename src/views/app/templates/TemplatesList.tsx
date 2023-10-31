import { Box, Flex, HStack, Image, Text } from '@chakra-ui/react';

import { Garment, Template } from '@/lib/types';

type TemplatesListProps = {
  templates: Template[];
  onSelectedTemplate: (template: Template) => void;
  selectedGarment: Garment;
};

const TemplatesList = ({ templates, onSelectedTemplate, selectedGarment }: TemplatesListProps) => {
  return (
    <Box bg="#ffffff" padding="25px 16px 45px 14px" w="100%">
      <HStack align="flex-start" spacing="16px" wrap="wrap">
        {templates.map((template, index) => {
          const { fabric, fit, id, name, price, colors, sides } = template;

          const color = colors.find(({ name }) => name === 'OatMilk') || colors[0];

          const imageUrl = color.images.find(
            ({ templateSideId }) => templateSideId === sides[0]?.id
          )?.url;

          const isSelected = selectedGarment && selectedGarment.templateId === id;

          const selectedColor =
            isSelected && colors.find(({ id }) => id === selectedGarment.templateColorId).hex;

          const selectedProps = isSelected
            ? { border: '1px solid #BABABA', borderRadius: '10px' }
            : {};

          return (
            <Box
              key={index}
              onClick={() => onSelectedTemplate(template)}
              position="relative"
              w={{ base: '157px', md: '180px' }}
            >
              <Flex
                align="center"
                bg="#F9F9F7"
                borderRadius="10px"
                h="180px"
                justify="center"
                padding="16px 8px"
                position="relative"
                {...selectedProps}
              >
                <Image h={160} src={imageUrl} alt={name} />
                {isSelected ? (
                  <HStack
                    borderRadius="50px"
                    border="1px solid #DDD"
                    bottom="1"
                    background="#FFFFFF"
                    padding="5px 8px"
                    position="absolute"
                  >
                    <Box bg={selectedColor} borderRadius="50%" width="26px" height="26px" />
                    <Text color="#828282" fontSize="13px" fontWeight={500}>
                      Selected
                    </Text>
                  </HStack>
                ) : null}
              </Flex>
              <Box padding="8px">
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
      </HStack>
    </Box>
  );
};

export default TemplatesList;
