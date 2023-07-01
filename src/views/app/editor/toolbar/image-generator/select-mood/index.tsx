import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { chunk } from 'lodash';

import Button from '@/components/Button';
import { useOptions } from '@/api/image-generator';

import CheckmarkSelected from '../components/CheckmarkSelected';

function getImgUrl(name) {
  return new URL(`./images/${name}.png`, import.meta.url).href;
}

type Props = {
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
  selectedValue: string;
};

export default function SelectMood({
  onChange,
  onNext,
  onBack,
  selectedValue,
}: Props) {
  const { data: options } = useOptions();

  if (!options) {
    return null;
  }

  const moods = Object.keys(options.moods).map((key) => {
    const fullName = options.moods[key];

    const name = fullName.replace(' Mood', '').split(' ').join('');

    return {
      value: key,
      name,
    };
  });

  const chunks = chunk(moods, 2);

  return (
    <Box paddingBottom="100px">
      <Text fontWeight={500} mb="16px" textTransform="uppercase">
        Select your mood
      </Text>
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
                textAlign="center"
              >
                <Image
                  borderRadius="4px"
                  key={index}
                  mb="8px"
                  h="75px"
                  src={getImgUrl(`${name}`)}
                  alt={name}
                  w="100%"
                />

                <Text>{name}</Text>
                {isSelected ? <CheckmarkSelected /> : null}
              </Box>
            );
          })}
        </Flex>
      ))}
      <Box
        bg="#FFFFFF"
        ml="-14px"
        padding="14px"
        position="fixed"
        bottom={0}
        w="100%"
      >
        <Flex align="center" mt="14px">
          <Button flex={1} onClick={onBack} outlined title="Edit style" />
          <Button
            disabled={!selectedValue}
            flex={1}
            ml="10px"
            onClick={onNext}
            title="Next"
          />
        </Flex>
      </Box>
    </Box>
  );
}
