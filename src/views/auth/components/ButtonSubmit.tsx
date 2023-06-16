import { Button as ChakraButton } from '@chakra-ui/react';

const Button = (props) => (
  <ChakraButton
    color="#ffffff"
    fontSize="sm"
    padding="8px 32px"
    width="100%"
    height="51px"
    background="#212121"
    borderRadius="112px"
    _hover={{ bg: '' }}
    _active={{
      bg: '',
    }}
    _focus={{
      bg: '',
      boxShadow: '',
    }}
    {...props}
  />
);

export default Button;
