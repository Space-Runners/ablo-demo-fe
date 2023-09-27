import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { capitalize, chunk } from 'lodash';

import { ImageGenerationOptions } from '@/components/types';

import Colors from '@/theme/colors';

const { abloBlue } = Colors;

const NO_TONE = 'noTone';

function getImgUrl(tone, style) {
  let filename = `${tone}_${style
    .split('_')
    .map((word) => capitalize(word))
    .join('')}.png`;

  if (tone === NO_TONE) {
    filename = `NoFilters.png`;
  }

  return new URL(`./images/${filename}`, import.meta.url).href;
}

type Props = {
  onChange: (value: string) => void;
  options: ImageGenerationOptions;
  selectedValue: string;
  style: string;
};

export default function SelectColorPalette({ onChange, options, selectedValue, style }: Props) {
  if (!options) {
    return null;
  }

  const tones = style ? [...options.tones[style.toLowerCase()], NO_TONE] : [NO_TONE];

  if (!tones) {
    return;
  }

  const chunks = chunk(tones, 4);

  return (
    <VStack align="flex-start" spacing="20px">
      {chunks.map((chunk, index) => (
        <HStack key={index} spacing="12px" w="100%">
          {chunk.map((name: string, index) => {
            const isSelected = name === selectedValue;

            const tone = name.replace(' Tones', '').replace('B/W', 'BW');

            let label = tone;

            if (tone === 'BW') {
              label = 'Black/White';
            } else if (tone === NO_TONE) {
              label = 'Random tone';
            }

            return (
              <Box borderRadius="4px" onClick={() => onChange(name)} key={name}>
                <Image
                  border={isSelected ? `3px solid ${abloBlue}` : ''}
                  borderRadius="50%"
                  key={index}
                  mb="8px"
                  h="73px"
                  src={getImgUrl(tone, style)}
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
