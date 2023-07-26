import { Box, Button, HStack, Text } from '@chakra-ui/react';

type Props = {
  keywords: string[];
  onChange: (values: string[]) => void;
  selectedValues: string[];
};

const Keywords = ({ keywords, onChange, selectedValues }: Props) => {
  const handleKeywordsChange = (value) => {
    let newSelected;

    if (selectedValues.includes(value)) {
      newSelected = selectedValues.filter((s) => s !== value);
    } else {
      newSelected = [...selectedValues, value];
    }

    onChange(newSelected);
  };

  return (
    <Box mt="8px">
      <HStack overflowX="auto" w="100%">
        <Text color="#2D3748" fontSize="sm" fontWeight={500}>
          Trending:
        </Text>
        {keywords.map((value) => {
          const isSelected = selectedValues.includes(value);

          return (
            <Button
              bg={isSelected ? '#000000' : '#EDF2F7'}
              borderRadius="5px"
              color={isSelected ? '#FFFFFF' : '#1A202C'}
              h="18px"
              flexShrink={0}
              fontSize="xs"
              fontWeight={isSelected ? '600' : '500'}
              key={value}
              onClick={() => handleKeywordsChange(value)}
              padding="0 7px"
            >
              {value}
            </Button>
          );
        })}
      </HStack>
    </Box>
  );
};

export default Keywords;
