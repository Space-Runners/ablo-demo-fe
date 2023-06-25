import { Box, HStack, Image, Text } from '@chakra-ui/react';
import { chunk, random } from 'lodash';

import Button from '@/components/Button';

import CheckmarkSelected from '../components/CheckmarkSelected';
import IconSpark from '../components/IconSpark';

import OilPainting from './images/OilPainting.png';
import Collage from './images/Collage.png';
import Origami from './images/Origami.png';
import Kidult from './images/Kidult.png';
import Grafitti from './images/Graffiti.png';
import Inflated from './images/Inflated.png';
import PopStainedGlass from './images/PopStainedGlass.png';
import ScrapCollage from './images/ScrapCollage.png';

const STYLES = [
  ['Oil Painting', OilPainting],
  ['Collage', Collage],
  ['Origami', Origami],
  ['Kidult', Kidult],
  ['Grafitti', Grafitti],
  ['Inflated', Inflated],
  ['Pop Stained Glass', PopStainedGlass],
  ['Scrap Collage', ScrapCollage],
];

type Props = {
  onChange: (value: string) => void;
  onNext: () => void;
  selectedValue: string;
};

export default function SelectStyle({
  onChange,
  onNext,
  selectedValue,
}: Props) {
  const chunks = chunk(STYLES, 2);

  const handleSurpriseMe = () => {
    onChange(STYLES[random(0, STYLES.length - 1)][0]);
  };

  return (
    <Box>
      <Text fontWeight={500} mb="16px" textTransform="uppercase">
        Select style
      </Text>
      {chunks.map((chunk) => (
        <HStack mb="16px">
          {chunk.map(([style, image]) => {
            const isSelected = style === selectedValue;

            return (
              <Box onClick={() => onChange(style)} position="relative">
                <Image
                  border={isSelected ? '4px solid #000000' : ''}
                  borderRadius="4px"
                  h={90}
                  mb="10px"
                  w={177}
                  src={image}
                  alt={style}
                />
                {isSelected ? <CheckmarkSelected /> : null}
                <Text>{style}</Text>
              </Box>
            );
          })}
        </HStack>
      ))}
      <Button
        icon={<IconSpark />}
        mb="18px"
        onClick={handleSurpriseMe}
        title="Surprise me"
        w="100%"
      />
      <Button
        disabled={!selectedValue}
        onClick={onNext}
        title="Next"
        w="100%"
      />
    </Box>
  );
}
