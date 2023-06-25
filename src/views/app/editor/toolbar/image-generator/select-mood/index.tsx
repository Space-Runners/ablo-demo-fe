import { Box, Flex, HStack, Image, Text } from '@chakra-ui/react';
import { random, times } from 'lodash';

import Button from '@/components/Button';

import CheckmarkSelected from '../components/CheckmarkSelected';
import IconSpark from '../components/IconSpark';

function getImgUrl(name) {
  return new URL(`./images/${name}.png`, import.meta.url).href;
}

const MOODS = ['Pastel', 'Psychedelic', 'Neon', 'Doomsday'];

type Props = {
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
  selectedValue: string;
};

export default function SelectStyle({
  onChange,
  onNext,
  onBack,
  selectedValue,
}: Props) {
  const handleSurpriseMe = () => {
    onChange(MOODS[random(0, MOODS.length - 1)]);
  };

  return (
    <Box>
      <Text fontWeight={500} mb="16px" textTransform="uppercase">
        Select your mood
      </Text>
      {MOODS.map((mood) => {
        const isSelected = mood === selectedValue;

        return (
          <Box key={mood} mb="16px" position="relative">
            <HStack
              border={isSelected ? '4px solid #000000' : ''}
              borderRadius="4px"
              mb="10px"
              onClick={() => onChange(mood)}
              spacing="1px"
            >
              {times(3, (index) => (
                <Image
                  h={112}
                  w={121}
                  src={getImgUrl(`${mood}${index + 1}`)}
                  alt={mood}
                />
              ))}
            </HStack>
            <Text>{mood}</Text>
            {isSelected ? <CheckmarkSelected /> : null}
          </Box>
        );
      })}
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
  );
}
