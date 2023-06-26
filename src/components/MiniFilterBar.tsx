import { Box, Button, HStack } from '@chakra-ui/react';

import Colors from '@/theme/colors';

const { abloBlue } = Colors;

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
  <HStack mt="20px" overflowX="auto" spacing="16px" w="100%">
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
        {selectedValue === value ? (
          <Box
            bg={abloBlue}
            borderRadius="50%"
            mr="8px"
            h="11px"
            w="11px"
          ></Box>
        ) : null}
        {value}
      </Button>
    ))}
  </HStack>
);

export default MiniFilterBar;
