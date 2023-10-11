import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { chunk, isEmpty } from 'lodash';

import { Style } from '../../../../types';

import Colors from '../../../../theme/colors';

import NoToneImage from './images/NoFilters.png';

const { abloBlue } = Colors;

const NO_TONE_OPTION = {
  id: 'noTone',
  imageUrl: NoToneImage,
  tone: {
    name: 'Random tone',
  },
};

type Props = {
  onChange: (value: string) => void;
  selectedValue: string;
  style: Style;
};

export default function SelectColorPalette({ onChange, selectedValue, style }: Props) {
  if (!style || isEmpty(style.tones)) {
    return null;
  }

  const tones = [...style.tones, NO_TONE_OPTION];

  const chunks = chunk(tones, 4);

  return (
    <VStack align="flex-start" spacing="20px">
      {chunks.map((chunk, index) => (
        <HStack key={index} spacing="12px" w="100%">
          {chunk.map((tone, index) => {
            const {
              id,
              imageUrl,
              tone: { name },
            } = tone;
            const isSelected = id === selectedValue;

            let label = name;

            if (name === 'BW') {
              label = 'Black/White';
            }

            return (
              <Box borderRadius="4px" onClick={() => onChange(id)} key={id}>
                <Image
                  border={isSelected ? `3px solid ${abloBlue}` : ''}
                  borderRadius="50%"
                  key={index}
                  mb="8px"
                  h="73px"
                  src={imageUrl}
                  alt={name}
                  w="73px"
                />
                <Text color="#1A1A1A" fontSize="12px" align="center">
                  {label}
                </Text>
              </Box>
            );
          })}
        </HStack>
      ))}
    </VStack>
  );
}
