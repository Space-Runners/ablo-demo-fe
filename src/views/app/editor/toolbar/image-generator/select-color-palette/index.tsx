import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { chunk } from 'lodash';

import { useOptions } from '@/api/image-generator';

function getImgUrl(name) {
  return new URL(`./images/${name.split(' ').join('')}.png`, import.meta.url)
    .href;
}

type Props = {
  onChange: (value: string) => void;
  selectedValue: string;
};

export default function SelectMood({ onChange, selectedValue }: Props) {
  const { data: options } = useOptions();

  if (!options) {
    return null;
  }

  const noMood = {
    value: 'noMood',
    name: 'No Mood',
  };

  const moods = Object.keys(options.moods).map((key) => {
    const fullName = options.moods[key];

    const name = fullName.replace(' Mood', '').split(' ').join('');

    return {
      value: key,
      name,
    };
  });

  moods.push(noMood);

  const chunks = chunk(moods, 2);

  return (
    <Box>
      {chunks.map((chunk, index) => (
        <Flex key={index} mb="16px" w="100%">
          {chunk.map(({ value, name }, index) => {
            const isSelected = value === selectedValue;

            return (
              <Box
                border={isSelected ? '4px solid #000000' : ''}
                borderRadius="4px"
                flex={1}
                maxW="50%"
                mr={index === 0 ? '16px' : 0}
                onClick={() => onChange(value)}
                key={value}
                position="relative"
                textAlign="left"
              >
                <Image
                  borderRadius="4px"
                  key={index}
                  mb="8px"
                  h="21px"
                  src={getImgUrl(`${name}`)}
                  alt={name}
                  w="100%"
                />

                <Text color="#1A1A1A" fontSize="12px">
                  {name}
                </Text>
              </Box>
            );
          })}
        </Flex>
      ))}
    </Box>
  );
}
