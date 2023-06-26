import { Button as ChakraButton, HStack } from '@chakra-ui/react';

const COLORS = ['#B8CCB4', '#CA6751', '#FFFFFF', 'red', 'blue', 'green'];

const Button = (props) => {
  const { isSelected, ...rest } = props;

  const size = isSelected ? 35 : 25;

  return (
    <ChakraButton
      minWidth={`${size}px`}
      padding={0}
      width={`${size}px`}
      height={`${size}px`}
      borderRadius="50%"
      {...rest}
    />
  );
};

export default function ColorPicker({ selectedColor, onUpdate }) {
  return (
    <HStack overflow="auto" spacing="10px" w="220px">
      {COLORS.map((color) => (
        <Button
          bg={color}
          border={color === '#FFFFFF' ? '1px solid #EAE9E9' : 'none'}
          isSelected={color === selectedColor}
          key={color}
          onClick={() => onUpdate(color)}
        />
      ))}
    </HStack>
  );
}
