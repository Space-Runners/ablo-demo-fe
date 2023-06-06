import { useState } from 'react';

import { Box, Flex, Image, VStack } from '@chakra-ui/react';

import Button from '../components/Button';
import Card from '../components/Card';

import Logo from './images/Logo.png';
import ConceptArt from './images/ConceptArt.jpg';
import Characters from './images/Characters.png';

const OPTIONS = [
  {
    name: 'Logo',
    image: Logo,
  },
  {
    name: 'Concept Art',
    image: ConceptArt,
  },
  {
    name: 'Characters',
    image: Characters,
  },
];

const connectorStyle = {
  border: '0.5px solid',
  width: '80px',
};

export default function ChooseDirection() {
  const [selectedItem, setSelectedItem] = useState(OPTIONS[0].name);

  return (
    <Card title="Choose direction for your future art work">
      <VStack spacing={6} mt={10}>
        {OPTIONS.map(({ image, name }) => (
          <Flex align="center" key={name}>
            <Button
              isSelected={name === selectedItem}
              onClick={() => setSelectedItem(name)}
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
