import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { chunk } from 'lodash';

import { useOptions } from '@/api/image-generator';

import Colors from '@/theme/colors';

const { abloBlue } = Colors;

function getImgUrl(name) {
  return new URL(`./images/${name}.png`, import.meta.url).href;
}

type Props = {
  onChange: (value: string) => void;
  selectedValue: string;
};

export default function SelectStyle({ onChange, selectedValue }: Props) {
  const { data: options } = useOptions();

  if (!options) {
    return null;
  }

  const styles = Object.keys(options.styles).map((key) => ({
    value: key,
    name: options.styles[key].split(' ').join(' '),
    image: options.styles[key].split(' ').join(''),
  }));

  const chunks = chunk(styles, 4);

  return (
    <VStack align="flex-start" spacing="20px">
      {chunks.map((chunk, index) => (
        <HStack align="start" key={index} spacing="12px">
          {chunk.map(({ value, name, image }, index) => {
            const isSelected = value === selectedValue;

            return (
              <Box
                key={index}
                onClick={() => onChange(value)}
                borderRadius="4px"
              >
                <Image
                  border={isSelected ? `3px solid ${abloBlue}` : ''}
                  borderRadius="50%"
                  h="73px"
                  mb="8px"
                  w="73px"
                  src={getImgUrl(`${image}`)}
                  alt={name}
                />
                <Text color="#1A1A1A" fontSize="11px" align="center">
                  {name}
                </Text>
              </Box>
            );
          })}
        </HStack>
      ))}
    </VStack>
  );
}
