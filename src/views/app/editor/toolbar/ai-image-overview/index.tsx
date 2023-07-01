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

import { IconMood, IconStyle, IconSubject, IconBackground } from './Icons';
import { IconTrash } from '../Icons';

const { abloBlue } = Colors;

const TEST_URL =
  'https://d3bezdph00y8ns.cloudfront.net/cc927b25-2d8d-4492-a6e6-a715454e365b/1688127044813.png';

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

export default function ImageOverview() {
  return (
    <Box bg="#FFFFFF" h="100%" w="100%" paddingBottom="32px">
      <Image
        borderRadius="6px"
        src={TEST_URL}
        height={365}
        mb="16px"
        width={365}
      />
      {STEPS.map(({ name, icon }, index) => (
        <Flex
          align="center"
          borderTop={index === 0 ? 'none' : '1px solid #D4D4D3'}
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
          onClick={() => {}}
          outlined
          title="Remove"
        />
        <Button flex={1} ml="10px" onClick={() => {}} title="Add" />
      </Flex>
    </Box>
  );
}
