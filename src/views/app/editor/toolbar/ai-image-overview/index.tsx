import {
  Box,
  Button as ChakraButton,
  Flex,
  HStack,
  Image,
  Text,
} from '@chakra-ui/react';

import Button from '@/components/Button';
import Colors from '@/theme/colors';
import { AiImage } from '@/components/types';

import { IconMood, IconStyle, IconSubject, IconBackground } from './Icons';
import { IconTrash } from '../Icons';

const { abloBlue } = Colors;

const STEPS = [
  {
    name: 'Art Style',
    icon: <IconStyle />,
  },
  {
    name: 'Color Mood',
    icon: <IconMood />,
  },
  {
    name: 'Subject',
    icon: <IconSubject />,
  },
  {
    name: 'Background',
    icon: <IconBackground />,
  },
];

type Props = {
  aiImage: AiImage;
  onEdit: (step: number) => void;
  onRemove: () => void;
};

export default function ImageOverview({ aiImage, onEdit, onRemove }: Props) {
  const { url } = aiImage;

  return (
    <Box bg="#FFFFFF" h="100%" w="100%">
      <Image borderRadius="6px" src={url} height={365} mb="16px" width={365} />
      {STEPS.map(({ name, icon }, index) => (
        <Flex
          align="center"
          borderTop={index === 0 ? 'none' : '1px solid #D4D4D3'}
          key={name}
          justify="space-between"
          padding="13px 0"
          w="100%"
        >
          <HStack>
            {icon}
            <Text fontSize="sm" ml="12px">
              {name}
            </Text>
          </HStack>
          <ChakraButton
            bg="transparent"
            color={abloBlue}
            fontSize="xs"
            fontWeight={600}
            onClick={() => onEdit(index + 1)}
            padding={0}
            textTransform="uppercase"
          >
            Edit
          </ChakraButton>
        </Flex>
      ))}
      <Flex align="center" padding="14px 0">
        <Button
          flex={1}
          iconRight={<IconTrash width="24px" height="24px" />}
          onClick={onRemove}
          outlined
          title="Remove"
        />
      </Flex>
    </Box>
  );
}
