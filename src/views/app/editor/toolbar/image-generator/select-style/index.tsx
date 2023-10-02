import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { chunk } from 'lodash';

import { Style } from '@/components/types';

import Colors from '@/theme/colors';

const { abloBlue } = Colors;

type Props = {
  onChange: (value: string) => void;
  options: Style[];
  selectedValue: string;
};

export default function SelectStyle({ onChange, options, selectedValue }: Props) {
  const chunks = chunk(options, 4);

  return (
    <VStack align="flex-start" spacing="20px">
      {chunks.map((chunk, index) => (
        <HStack align="start" key={index} spacing="12px">
          {chunk.map(({ id, name, imageUrl }, index) => {
            const isSelected = id === selectedValue;

            return (
              <Box key={index} onClick={() => onChange(id)} borderRadius="4px">
                <Image
                  border={isSelected ? `3px solid ${abloBlue}` : ''}
                  borderRadius="50%"
                  h="73px"
                  mb="8px"
                  w="73px"
                  src={imageUrl}
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
