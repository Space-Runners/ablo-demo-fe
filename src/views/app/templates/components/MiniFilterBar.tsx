import { Button, HStack } from '@chakra-ui/react';

type Option = {
  name: string;
  value: string;
};

type MiniFilterBarProps = {
  selectedValue: string;
  onChange: (value: string) => void;
  options: Option[];
};

const MiniFilterBar = ({ selectedValue, onChange, options }: MiniFilterBarProps) => (
  <HStack overflowX="auto" pl="6px" spacing="16px" w="100%">
    {options.map(({ name, value }) => {
      const isSelected = selectedValue === value;

      return (
        <Button
          bg="transparent"
          color={isSelected ? '#000000' : '#6A6866'}
          h="30px"
          flexShrink={0}
          fontWeight={isSelected ? '600' : '400'}
          key={value}
          onClick={() => onChange(value)}
          padding={0}
        >
          {name}
        </Button>
      );
    })}
  </HStack>
);

export default MiniFilterBar;
