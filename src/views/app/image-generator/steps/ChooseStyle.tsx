import { Box, HStack, Image, VStack, Text } from '@chakra-ui/react';

import { capitalize, chunk } from 'lodash';

import Card from '../components/Card';

import Bird from './images/Bird.jpg';

const OPTIONS = [
  {
    id: 'enhance',
  },
  {
    id: 'anime',
  },
  {
    id: 'photographic',
  },
  {
    id: 'digital-art',
  },
  {
    id: 'comic-book',
  },
  {
    id: 'fantasy-art',
  },
  {
    id: 'analog-film',
  },
  {
    id: 'neon-punk',
  },
  {
    id: 'isometric',
  },
  {
    id: 'low-poly',
  },
  {
    id: 'origami',
  },
  {
    id: 'line-art',
  },
  {
    id: 'craft poly',
  },
  {
    id: 'cinematic',
  },
  {
    id: '3d-model',
    name: '3D Model',
  },
  {
    id: 'pixel-art',
  },
  {
    id: 'tile-texture',
  },
];

const selectedImageStyle = {
  borderRadius: '10px',
  border: '3px solid rgb(254, 244, 69)',
};

type Props = {
  stylePreset: string;
  onUpdate: ({ style_preset }: { style_preset: string }) => void;
};

export default function ChooseStyle({ stylePreset, onUpdate }: Props) {
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
            {chunk.map(({ id, name }) => (
              <Box
                cursor="pointer"
                key={id}
                onClick={() => onUpdate({ style_preset: id })}
                title={name}
              >
                <Image
                  borderRadius="10px"
                  boxSize="50px"
                  src={Bird}
                  {...(id === stylePreset ? selectedImageStyle : {})}
                />
                <Text color="rgb(230, 230, 230)" fontSize="8px">
                  {name ||
                    id
                      .split('-')
                      .map((part) => capitalize(part))
                      .join(' ')}
                </Text>
              </Box>
            ))}
          </HStack>
        ))}
      </VStack>
    </Card>
  );
}
