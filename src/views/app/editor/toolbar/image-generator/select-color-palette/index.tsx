import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { chunk } from 'lodash';

import { useOptions } from '@/api/image-generator';

import Colors from '@/theme/colors';

const { abloBlue } = Colors;

function getImgUrl(tone, style) {
  let url = `./images/${tone}_${style
    .split('_')
    .map((word) => word.toUpperCase())
    .join('')}.png`;

  if (tone === 'noMood') {
    url = `./images/NoFilters.png`;
  }

  return new URL(url, import.meta.url).href;
}

type Props = {
  onChange: (value: string) => void;
  selectedValue: string;
  style: string;
};

export default function SelectColorPalette({
  onChange,
  selectedValue,
  style,
}: Props) {
  const { data: options } = useOptions();

  if (!options) {
    return null;
  }

  const tones = [...options.tones[style.toLowerCase()], 'noMood'];

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

            return (
              <Box borderRadius="4px" onClick={() => onChange(name)} key={name}>
                <Image
                  border={isSelected ? `3px solid ${abloBlue}` : ''}
                  borderRadius="50%"
                  key={index}
                  mb="8px"
                  h="80px"
                  src={getImgUrl(tone, style)}
                  alt={name}
                  w="73px"
                />

                <Text color="#1A1A1A" fontSize="12px" align="center">
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
