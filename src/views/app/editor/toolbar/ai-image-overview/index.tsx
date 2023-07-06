import {
  Box,
  Button as ChakraButton,
  Flex,
  Icon,
  HStack,
  Image,
  Text,
} from '@chakra-ui/react';

import Button from '@/components/Button';
import Colors from '@/theme/colors';
import { AiImage } from '@/components/types';

import { IconMood, IconStyle, IconSubject, IconBackground } from './Icons';

export const IconTrash = (props) => (
  <Icon
    width="32px"
    height="32px"
    viewBox="0 0 32 32"
    fill="none"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1817_26146)">
      <path
        d="M5.33301 9.33301H26.6663"
        stroke="black"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.333 14.6665V22.6665"
        stroke="black"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.666 14.6665V22.6665"
        stroke="black"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.66602 9.33301L7.99935 25.333C7.99935 26.0403 8.2803 26.7185 8.7804 27.2186C9.28049 27.7187 9.95877 27.9997 10.666 27.9997H21.3327C22.0399 27.9997 22.7182 27.7187 23.2183 27.2186C23.7184 26.7185 23.9994 26.0403 23.9994 25.333L25.3327 9.33301"
        stroke="black"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 9.33333V5.33333C12 4.97971 12.1405 4.64057 12.3905 4.39052C12.6406 4.14048 12.9797 4 13.3333 4H18.6667C19.0203 4 19.3594 4.14048 19.6095 4.39052C19.8595 4.64057 20 4.97971 20 5.33333V9.33333"
        stroke="black"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1817_26146">
        <rect width="32" height="32" fill="white" />
      </clipPath>
    </defs>
  </Icon>
);
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
