import { Button as ChakraButton, HStack, Text } from '@chakra-ui/react';

import Fonts from './fonts';

const Button = (props) => {
  const { isSelected, ...rest } = props;

  return (
    <ChakraButton
      width="40px"
      height="40px"
      background="#000000"
      borderRadius="20px"
      border={isSelected ? '1px solid #ffffff' : 'none'}
      _hover={{ bg: '' }}
      _active={{
        bg: '',
      }}
      _focus={{
        bg: '',
        boxShadow: '',
      }}
      {...rest}
    />
  );
};

export default function FontPicker({ fontFamily, onUpdate }) {
  return (
    <HStack overflow="auto" spacing="10px" w="220px">
      {Fonts.map((font) => (
        <Button
          isSelected={font === fontFamily}
          key={font}
          onClick={() => onUpdate(font)}
        >
          <Text
            color="#ffffff"
            fontFamily={font}
            fontWeight={400}
            fontSize="18px"
            lineHeight="20px"
          >
            Aa
          </Text>
        </Button>
      ))}
    </HStack>
  );
}
