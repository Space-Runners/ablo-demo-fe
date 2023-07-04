import { Box, Button as ChakraButton } from '@chakra-ui/react';

import Colors from '@/theme/colors';

const { abloBlue } = Colors;

const disabledStyles = {
  border: `1px solid #AAA9AB`,
  color: '#AAA9AB',
  _hover: {
    border: `2px solid ${abloBlue}`,
    boxShadow: '0px 0px 8px 0px #97B9F5',
    color: '#AAA9AB',
  },
};

const baseStyles = {
  _hover: {
    border: '1px solid #042F7E',
    color: '#042F7E',
  },
  _focus: {
    border: `2px solid ${abloBlue}`,
    color: '#042F7E',
    boxShadow: '0px 0px 8px 0px #97B9F5',
  },
  _active: {
    border: `2px solid ${abloBlue}`,
    color: '#042F7E',
    boxShadow: '0px 0px 8px 0px #97B9F5',
  },
};

const outlinedStyles = {
  _hover: {
    bg: '#EAE9E9',
    border: '1px solid #000000',
    color: '#000000',
  },
  _focus: {
    bg: '#EAE9E9',
    border: `2px solid ${abloBlue}`,
    color: '#000000',
    boxShadow: '0px 0px 8px 0px #97B9F5',
  },
  _active: {
    border: `2px solid ${abloBlue}`,
    color: '#000000',
    boxShadow: '0px 0px 8px 0px #97B9F5',
  },
};

const Button = ({
  icon = null,
  outlined = false,
  iconRight = null,
  title,
  ...rest
}) => {
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
      _disabled={disabledStyles}
      {...(outlined ? outlinedStyles : baseStyles)}
      {...rest}
    >
      {icon ? <Box mr="8px">{icon}</Box> : null}
      {title}
      {iconRight ? <Box ml="8px">{iconRight}</Box> : null}
    </ChakraButton>
  );
};

export default Button;
