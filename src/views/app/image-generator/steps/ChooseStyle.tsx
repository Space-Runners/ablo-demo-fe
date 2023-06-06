import { useState } from 'react';

import { Box, Flex, HStack, Image, VStack, Text } from '@chakra-ui/react';

import { chunk } from 'lodash';

import Card from '../components/Card';

import Bird from './images/Bird.jpg';

const OPTIONS = [
  {
    name: 'Enhance',
  },
  {
    name: 'Anime',
  },
  {
    name: 'Photographic',
  },
  {
    name: 'Digital Art',
  },
  {
    name: 'Comic book',
  },
  {
    name: 'Fantasy art',
  },
  {
    name: 'Analog film',
  },
  {
    name: 'Neon punk',
  },
  {
    name: 'Isometric',
  },
  {
    name: 'Low poly',
  },
  {
    name: 'Origami',
  },
  {
    name: 'Line art',
  },
  {
    name: 'Craft poly',
  },
  {
    name: 'Cinematic',
  },
  {
    name: '3D Model',
  },
  {
    name: 'Pixel art',
  },
];

const selectedImageStyle = {
  borderRadius: '10px',
  border: '3px solid rgb(254, 244, 69)',
};

export default function ChooseStyle() {
  const [selectedItem, setSelectedItem] = useState(OPTIONS[0].name);

  const chunks = chunk(OPTIONS, 3);

  return (
    <Card title="Choose visual style or leave it unselected">
      <VStack
        backgroundColor="black"
        spacing={4}
        mt={10}
        px="20ps"
        py="10px"
        width="300px"
      >
        {chunks.map((chunk, index) => (
          <HStack align="center" key={index} spacing={2}>
            {chunk.map(({ name }) => (
              <Box
                cursor="pointer"
                key={name}
                onClick={() => setSelectedItem(name)}
                title={name}
              >
                <Image
                  borderRadius="10px"
                  boxSize="50px"
                  src={Bird}
                  {...(name === selectedItem ? selectedImageStyle : {})}
                />
                <Text color="rgb(230, 230, 230)" fontSize="8px">
                  {name}
                </Text>
              </Box>
            ))}
          </HStack>
        ))}
      </VStack>
    </Card>
  );
}
