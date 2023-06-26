import { Box, Button as ChakraButton, Text } from '@chakra-ui/react';

import Colors from '@/theme/colors';

const { abloBlue } = Colors;

const Button = ({ icon = null, outlined = false, title, ...rest }) => {
  return (
    <ChakraButton
      bg={abloBlue}
      borderRadius={0}
      color={outlined ? '#000000' : '#FFFFFF'}
      height="50px"
      padding="0 14px"
      fontWeight={600}
      textTransform="uppercase"
      _disabled={{ bg: '#BFBEBE' }}
      {...(outlined
        ? {
            bg: '#FFFFFF',
            border: '1px solid #000000',
            _disabled: {
              bg: '#FFFFFF',
              border: '1px solid #BFBEBE',
              color: '#BFBEBE',
            },
          }
        : {})}
      {...rest}
    >
      {title}
      <Box ml="18px">{icon}</Box>
    </ChakraButton>
  );
};

export default Button;
