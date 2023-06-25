import { Button as ChakraButton, Text } from '@chakra-ui/react';

import Colors from '@/theme/colors';

const { abloBlue } = Colors;

const Button = ({ icon = null, outlined = false, title, ...rest }) => {
  return (
    <ChakraButton
      bg={abloBlue}
      borderRadius={0}
      height="50px"
      padding="0 14px"
      _disabled={{ bg: '#BFBEBE' }}
      {...(outlined ? { bg: '#FFFFFF', border: '1px solid #000000' } : {})}
      {...rest}
    >
      <Text
        color={outlined ? '#000000' : '#FFFFFF'}
        fontWeight={600}
        mr="18px"
        textTransform="uppercase"
      >
        {title}
      </Text>
      {icon}
    </ChakraButton>
  );
};

export default Button;
