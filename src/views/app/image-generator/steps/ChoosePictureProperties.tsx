import { useState } from 'react';

import { Box, Flex, Image, VStack } from '@chakra-ui/react';

import Button from '../components/Button';
import Card from '../components/Card';

import BlackAndWhite from './images/BlackAndWhiteImage.png';
import CleanBlackBackground from './images/CleanBlackBackground.png';
import CleanWhiteBackground from './images/CleanWhiteBackground.png';
import ColorImage from './images/ColorImage.png';

const OPTIONS = [
  {
    name: 'black & white image',
    image: BlackAndWhite,
  },
  {
    name: 'color image',
    image: ColorImage,
  },
  {
    name: 'Clean white background',
    image: CleanWhiteBackground,
  },
  {
    name: 'Clean black background',
    image: CleanBlackBackground,
  },
];

const connectorStyle = {
  border: '0.5px solid',
  width: '80px',
};

export default function ChoosePictureProperties() {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleToggleItem = (name) => {
    if (selectedItems.includes(name)) {
      setSelectedItems(selectedItems.filter((item) => item !== name));
    } else {
      setSelectedItems([...selectedItems, name]);
    }
  };

  return (
    <Card title="Choose picture properties, features">
      <VStack spacing={6} mt={10}>
        {OPTIONS.map(({ image, name }) => (
          <Flex align="center" key={name}>
            <Button
              isSelected={selectedItems.includes(name)}
              onClick={() => handleToggleItem(name)}
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
