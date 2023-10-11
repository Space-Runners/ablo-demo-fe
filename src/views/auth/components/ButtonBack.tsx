import { Button } from '@chakra-ui/react';

import IconBack from '@/lib/components/icons/IconBack';

const ButtonBack = (props) => (
  <Button
    {...props}
    bg="none"
    border="none"
    _focus={{ border: 'none', boxShadow: 'none' }}
    _hover={{ border: 'none', boxShadow: 'none' }}
  >
    <IconBack />
  </Button>
);

export default ButtonBack;
