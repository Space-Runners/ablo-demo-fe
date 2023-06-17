import { Button as ChakraButton } from '@chakra-ui/react';

import IconTrash from '@/components/icons/IconTrash';

const ButtonDelete = (props) => (
  <ChakraButton
    background="transparent"
    border="1px solid #FFFFFF"
    borderRadius="112px"
    height="40px"
    padding="8px 32px"
    width="72px"
    _hover={{ bg: '' }}
    _active={{
      bg: '',
    }}
    _focus={{
      bg: '',
      boxShadow: '',
    }}
    {...props}
  >
    <IconTrash />
  </ChakraButton>
);

export default ButtonDelete;
