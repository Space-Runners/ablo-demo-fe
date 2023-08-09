import { Button as ChakraButton, HStack } from "@chakra-ui/react";

import Colors from "@/theme/colors";

const { abloBlue } = Colors;

const COLORS = ["#FFFFFF", "#050606", "#EC212B", "#019548", "#3662C0", "#FDDE0A", "#ED227B"];

const Button = ({ isSelected = false, ...rest }) => {
  const size = 25;

  return (
    <ChakraButton
      border={isSelected ? `4px solid ${abloBlue}` : "none"}
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
    <HStack mt="8px" overflow="auto" spacing="10px">
      {COLORS.map((color) => (
        <Button
          bg={color}
          border={
            color === selectedColor
              ? `1px solid ${abloBlue}`
              : color === "#FFFFFF"
              ? "1px solid #EAE9E9"
              : "none"
          }
          isSelected={color === selectedColor}
          key={color}
          onClick={() => onUpdate(color)}
        />
      ))}
    </HStack>
  );
}
