import { Box, Flex, Input as ChakraInput } from '@chakra-ui/react';

import IconShuffle from './IconShuffle';

const Input = (props) => (
  <Box position="relative">
    <ChakraInput
      border="none"
      borderBottom="1px solid #000000"
      borderRadius={0}
      height="52px"
      padding={0}
      _placeholder={{ color: '#BFBEBE' }}
      _focus={{ outline: 'none' }}
      {...props}
    />
    <Flex
      align="center"
      bg="#000000"
      h="40px"
      w="40px"
      justify="center"
      position="absolute"
      right={0}
      top="6px"
    >
      <IconShuffle />
    </Flex>
  </Box>
);

export default Input;
