import { Button as ChakraButton, HStack } from '@chakra-ui/react';

import Colors from '@/theme/colors';

const { abloBlue } = Colors;

const COLORS = [
  '#B8CCB4',
  '#CA6751',
  '#FFFFFF',
  '#000000',
  'red',
  'blue',
  'green',
];

const Button = (props) => {
  const size = 25;

  return (
    <ChakraButton
      minWidth={`${size}px`}
      padding={0}
      width={`${size}px`}
      height={`${size}px`}
      borderRadius="50%"
      {...props}
    />
  );
};

export default function ColorPicker({ selectedColor, onUpdate }) {
  return (
    <HStack mt="8px" overflow="auto" spacing="10px">
      {COLORS.map((color) => (
        <Button
          bg={color}
          border={
            color === selectedColor
              ? `1px solid ${abloBlue}`
              : color === '#FFFFFF'
              ? '1px solid #EAE9E9'
              : 'none'
          }
          isSelected={color === selectedColor}
          key={color}
          onClick={() => onUpdate(color)}
        />
      ))}
    </HStack>
  );
}
