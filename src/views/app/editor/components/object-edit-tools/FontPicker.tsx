import { Button as ChakraButton, HStack, Text } from '@chakra-ui/react';

import Colors from '@/theme/colors';

const { abloBlue } = Colors;

import Fonts from './fonts';

const Button = (props) => {
  const { isSelected, ...rest } = props;

  return (
    <ChakraButton
      bg="transparent"
      width="36px"
      height="36px"
      borderRadius="50%"
      border={isSelected ? `1px solid ${abloBlue}` : 'none'}
      padding={0}
      {...rest}
    />
  );
};

export default function FontPicker({ fontFamily, onUpdate }) {
  return (
    <HStack mt="8px" overflow="auto" spacing="0" w="220px">
      {Fonts.map((font) => (
        <Button
          isSelected={font === fontFamily}
          key={font}
          onClick={() => onUpdate(font)}
        >
          <Text fontFamily={font} fontWeight={700}>
            Aa
          </Text>
        </Button>
      ))}
    </HStack>
  );
}
