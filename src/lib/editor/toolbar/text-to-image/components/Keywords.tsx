import { Box, Button, HStack, Text } from '@chakra-ui/react';
import { Keyword } from '../../../../types';

type Props = {
  keywords: Keyword[];
  onChange: (values: string[]) => void;
  selectedValues: string[];
};

const Keywords = ({ keywords, onChange, selectedValues }: Props) => {
  const handleKeywordsChange = (name) => {
    let newSelected;

    if (selectedValues.includes(name)) {
      newSelected = selectedValues.filter((s) => s !== name);
    } else {
      newSelected = [...selectedValues, name];
    }

    onChange(newSelected);
  };

  return (
    <Box mt="8px">
      <HStack overflowX="auto" w="100%">
        <Text color="#2D3748" fontSize="sm" fontWeight={500}>
          Trending:
        </Text>
        {keywords.map(({ id, name }) => {
          const isSelected = selectedValues.includes(name);

          return (
            <Button
              bg={isSelected ? '#000000' : '#EDF2F7'}
              borderRadius="5px"
              color={isSelected ? '#FFFFFF' : '#1A202C'}
              h="18px"
              flexShrink={0}
              fontSize="xs"
              fontWeight={isSelected ? '600' : '500'}
              key={id}
              onClick={() => handleKeywordsChange(name)}
              padding="0 7px"
            >
              {name}
            </Button>
          );
        })}
      </HStack>
    </Box>
  );
};

export default Keywords;
