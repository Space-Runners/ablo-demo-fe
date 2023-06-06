import { useState } from 'react';

import { Box, Flex, Image, VStack } from '@chakra-ui/react';

import Button from '../components/Button';
import Card from '../components/Card';

const OPTIONS = [
  {
    name: 'text',
  },
  {
    name: 'watermark',
  },
  {
    name: 'compression',
  },
  {
    name: 'complex background',
  },
];

const connectorStyle = {
  border: '0.5px solid',
  width: '80px',
};

export default function ChooseItemsToRemove() {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleToggleItem = (name) => {
    if (selectedItems.includes(name)) {
      setSelectedItems(selectedItems.filter((item) => item !== name));
    } else {
      setSelectedItems([...selectedItems, name]);
    }
  };

  return (
    <Card title="What don't you want to see in your art?">
      <VStack spacing={6} mt={10}>
        {OPTIONS.map(({ name }) => (
          <Button
            key={name}
            isSelected={selectedItems.includes(name)}
            onClick={() => handleToggleItem(name)}
            title={name}
          />
        ))}
      </VStack>
    </Card>
  );
}
