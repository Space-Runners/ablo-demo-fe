import { Box, HStack, Image, Text } from '@chakra-ui/react';
import { chunk, random } from 'lodash';

import Button from '@/components/Button';
import { useOptions } from '@/api/image-generator';

import CheckmarkSelected from '../components/CheckmarkSelected';
import IconSpark from '../components/IconSpark';

function getImgUrl(name) {
  return new URL(`./images/${name}.png`, import.meta.url).href;
}

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
  const { data: options } = useOptions();

  if (!options) {
    return null;
  }

  const styles = Object.keys(options.styles)
    .filter((key) => !['line_art', 'mixed_media'].includes(key))
    .map((key) => ({
      value: key,
      name: options.styles[key].split(' ').join(''),
    }));

  const handleSurpriseMe = () => {
    console.log('Styles', styles);
    onChange(styles[random(0, styles.length - 1)].value);
  };

  const chunks = chunk(styles, 2);

  return (
    <Box paddingBottom="146px">
      <Text fontWeight={500} mb="16px" textTransform="uppercase">
        Select style
      </Text>
      {chunks.map((chunk, index) => (
        <HStack key={index} mb="16px">
          {chunk.map(({ value, name }, index) => {
            const isSelected = value === selectedValue;

            return (
              <Box
                key={index}
                onClick={() => onChange(value)}
                borderRadius="4px"
                position="relative"
              >
                <Image
                  border={isSelected ? '4px solid #000000' : ''}
                  borderRadius="4px"
                  h={90}
                  mb="10px"
                  w={177}
                  src={getImgUrl(`${name}`)}
                  alt={name}
                />
                {isSelected ? <CheckmarkSelected /> : null}
                <Text>{name}</Text>
              </Box>
            );
          })}
        </HStack>
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
    </Box>
  );
}
