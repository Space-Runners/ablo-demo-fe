import { Box, Flex, Image, VStack } from '@chakra-ui/react';

import Button from '../components/Button';
import Card from '../components/Card';

import BlackAndWhite from './images/BlackAndWhiteImage.png';
import CleanBlackBackground from './images/CleanBlackBackground.png';
import CleanWhiteBackground from './images/CleanWhiteBackground.png';
import ColorImage from './images/ColorImage.png';

const OPTIONS = [
  {
    key: 'black and white:1.3',
    name: 'black & white image',
    image: BlackAndWhite,
  },
  {
    key: 'color image:1.5',
    name: 'color image',
    image: ColorImage,
  },
  {
    key: 'white background:1.4',
    name: 'Clean white background',
    image: CleanWhiteBackground,
  },
  {
    key: 'black background:1.4',
    name: 'Clean black background',
    image: CleanBlackBackground,
  },
];

const connectorStyle = {
  border: '0.5px solid',
  width: '80px',
};

type Props = {
  keys: string[];
  onUpdate: ({ keys }: { keys: string[] }) => void;
};

export default function ChoosePictureProperties({
  keys = [],
  onUpdate,
}: Props) {
  const handleToggleItem = (key: string) => {
    let newKeys = [];

    if (keys.includes(key)) {
      newKeys = keys.filter((item) => item !== key);
    } else {
      newKeys = [...keys, key];
    }

    onUpdate({ keys: newKeys });
  };

  return (
    <Card title="Choose picture properties, features">
      <VStack spacing={6} mt={10}>
        {OPTIONS.map(({ image, key, name }) => (
          <Flex align="center" key={key}>
            <Button
              isSelected={keys.includes(key)}
              onClick={() => handleToggleItem(key)}
              title={name}
            />
            <Box style={connectorStyle} />
            <Image boxSize="100px" src={image} />
          </Flex>
        ))}
      </VStack>
    </Card>
  );
}
