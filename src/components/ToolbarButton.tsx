import { Button as ChakraButton } from '@chakra-ui/react';

import Colors from '@/lib/theme/colors';

const { abloBlue } = Colors;

const ToolbarButton = ({ isSelected = null, ...rest }) => {
  return (
    <ChakraButton
      background={isSelected ? '#000000' : 'transparent'}
      borderRadius="50%"
      height="40px"
      padding="8px"
      width="40px"
      _focus={{
        border: `1px solid ${abloBlue}`,
        boxShadow: '0px 0px 8px 0px #97B9F5',
      }}
      _hover={{
        border: `1px solid ${abloBlue}`,
        boxShadow: '0px 0px 8px 0px #97B9F5',
      }}
      {...rest}
    />
  );
};

export default ToolbarButton;
