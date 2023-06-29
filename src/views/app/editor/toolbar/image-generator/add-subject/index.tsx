import { Box, Flex, Text } from '@chakra-ui/react';
import { isEmpty } from 'lodash';

import ButtonCTA from '@/components/Button';
import { useOptions } from '@/api/image-generator';

import Input from '../components/Input';
import Keywords from '../components/Keywords';

type Props = {
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
  style: string;
  value: string;
  keywords: string[];
  onUpdateKeywords: (keywords: string[]) => void;
};

export default function AddSubject({
  keywords,
  onChange,
  onNext,
  onBack,
  onUpdateKeywords,
  style,
  value,
}: Props) {
  const { data: options } = useOptions();

  if (!options) {
    return null;
  }

  const suggestions = options.suggestions[style] || [];

  return (
    <Box>
      <Text fontWeight={500} mb="16px" textTransform="uppercase">
        Add subject
      </Text>
      <Input
        mb="30px"
        onChange={(e) => onChange(e.target.value)}
        value={value}
        placeholder="No more than 4-5 words"
      />
      {suggestions ? (
        <Keywords
          keywords={suggestions}
          selectedValues={keywords}
          onChange={onUpdateKeywords}
        />
      ) : null}
      <Flex align="center" padding="14px 0">
        <ButtonCTA flex={1} onClick={onBack} outlined title="Edit mood" />
        <ButtonCTA
          disabled={!value && isEmpty(keywords)}
          flex={1}
          ml="10px"
          onClick={onNext}
          title="Next"
        />
      </Flex>
    </Box>
  );
}
