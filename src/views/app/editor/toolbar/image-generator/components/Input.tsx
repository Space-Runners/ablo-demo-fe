import { Box, Input as ChakraInput } from '@chakra-ui/react';

const Input = (props) => (
  <Box position="relative">
    <ChakraInput
      border="none"
      borderBottom="1px solid #000000"
      borderRadius={0}
      height="52px"
      padding={0}
      textAlign="center"
      _placeholder={{ color: '#BFBEBE' }}
      _focus={{ outline: 'none' }}
      {...props}
    />
  </Box>
);

export default Input;
