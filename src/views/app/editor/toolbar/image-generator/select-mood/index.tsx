import { Box, Flex, HStack, Image, Text } from '@chakra-ui/react';
import { chunk, random, times } from 'lodash';

import Button from '@/components/Button';

import CheckmarkSelected from '../components/CheckmarkSelected';
import IconSpark from '../components/IconSpark';

function getImgUrl(name) {
  return new URL(`./images/${name}.png`, import.meta.url).href;
}

const MOODS = [
  'Blues',
  'Bloom',
  'Doomsday',
  'Energy',
  'Joy',
  'Love',
  'Mystery',
  'Neon',
  'Pastel',
  'Psychedelic',
];

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
  const handleSurpriseMe = () => {
    onChange(MOODS[random(0, MOODS.length - 1)]);
  };

  const chunks = chunk(MOODS, 2);

  return (
    <Box paddingBottom="146px">
      <Text fontWeight={500} mb="16px" textTransform="uppercase">
        Select your mood
      </Text>
      {chunks.map((chunk, index) => (
        <Flex key={index} mb="16px" w="100%">
          {chunk.map((mood, index) => {
            console.log('Mood', mood);
            const isSelected = mood === selectedValue;

            return (
              <Box
                border={isSelected ? '4px solid #000000' : ''}
                borderRadius="4px"
                flex={1}
                mr={index === 0 ? '16px' : 0}
                onClick={() => onChange(mood)}
                key={mood}
                position="relative"
                textAlign="center"
              >
                <Image
                  key={index}
                  mb="8px"
                  src={getImgUrl(`${mood}`)}
                  alt={mood}
                />

                <Text>{mood}</Text>
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
        <Button
          icon={<IconSpark />}
          mt="18px"
          onClick={handleSurpriseMe}
          title="Surprise me"
          w="100%"
        />
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
