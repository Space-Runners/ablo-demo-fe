import { Box, Button, HStack, Text } from '@chakra-ui/react';

type Props = {
  keywords: string[];
  onChange: (values: string[]) => void;
  selectedValues: string[];
};

const Keywords = ({ keywords, onChange, selectedValues }: Props) => {
  const handleKeywordsChange = (value) => {
    let newSelected;

    console.log('Keywords', keywords, value);

    if (selectedValues.includes(value)) {
      newSelected = selectedValues.filter((s) => s !== value);
    } else {
      newSelected = [...selectedValues, value];
    }

    onChange(newSelected);
  };

  return (
    <Box>
      <Text fontWeight={500} mb="6px">
        Keyword Suggestions
      </Text>
      <HStack overflowX="auto" spacing="16px" w="100%">
        {keywords.map((value) => {
          const isSelected = selectedValues.includes(value);

          return (
            <Button
              bg={isSelected ? '#000000' : '#F9F9F7'}
              color={isSelected ? '#FFFFFF' : '#6A6866'}
              h="30px"
              flexShrink={0}
              fontSize="sm"
              fontWeight={isSelected ? '600' : '400'}
              key={value}
              onClick={() => handleKeywordsChange(value)}
              padding="4px 12px"
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
