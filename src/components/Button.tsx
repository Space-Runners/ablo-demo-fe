import { Box, Button as ChakraButton } from '@chakra-ui/react';

import Colors from '@/theme/colors';

const { abloBlue } = Colors;

const Button = ({ icon = null, outlined = false, title, ...rest }) => {
  return (
    <ChakraButton
      bg="#FFFFFF"
      border={`1px solid ${outlined ? '#000000' : abloBlue}`}
      borderRadius="100px"
      color={outlined ? '#000000' : abloBlue}
      height="50px"
      padding="0 14px"
      fontWeight={600}
      textTransform="uppercase"
      _disabled={{
        border: '1px solid #BFBEBE',
        color: '#BFBEBE',
      }}
      {...rest}
    >
      {icon ? <Box mr="8px">{icon}</Box> : null}
      {title}
    </ChakraButton>
  );
};

export default Button;
