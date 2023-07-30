import { Button, HStack } from '@chakra-ui/react';

type MiniFilterBarProps = {
  selectedValue: string;
  onChange: (value: string) => void;
  options: string[];
};

const MiniFilterBar = ({
  selectedValue,
  onChange,
  options,
}: MiniFilterBarProps) => (
  <HStack overflowX="auto" pl="6px" spacing="16px" w="100%">
    {options.map((value) => (
      <Button
        bg="transparent"
        color={selectedValue === value ? '#000000' : '#6A6866'}
        h="30px"
        flexShrink={0}
        fontWeight={selectedValue === value ? '600' : '400'}
        key={value}
        onClick={() => onChange(value)}
        padding={0}
      >
        {value}
      </Button>
    ))}
  </HStack>
);

export default MiniFilterBar;
