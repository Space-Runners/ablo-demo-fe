import { Button as ChakraButton, HStack, Text } from '@chakra-ui/react';

import Colors from '../../theme/colors';
import Fonts from '../../components/fonts';

const { abloBlue } = Colors;

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
    <HStack mt="8px" overflow="auto" spacing="0" w="100%">
      {Fonts.map(({ name: font, icon }) => (
        <Button isSelected={font === fontFamily} key={font} onClick={() => onUpdate(font)}>
          {/* We have to preload these fonts or they won't be applied to the canvas */}
          <Text fontFamily={font} fontWeight={700} visibility="hidden" w={0}>
            A
          </Text>
          {icon}
        </Button>
      ))}
    </HStack>
  );
}
