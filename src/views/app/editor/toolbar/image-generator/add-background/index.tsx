import { Box, Flex, Text } from '@chakra-ui/react';

import ButtonCTA from '@/components/Button';

import IconSpark from '../components/IconSpark';
import Input from '../components/Input';
import Keywords from '../components/Keywords';
import Progress from '../components/Progress';

import { BACKGROUND_KEYWORD_SUGGESTIONS } from '../styles';

type Props = {
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
  style: string;
  value: string;
  keywords: string[];
  onUpdateKeywords: (keywords: string[]) => void;
  waiting: boolean;
};

export default function AddBackground({
  keywords,
  onChange,
  onNext,
  onBack,
  onUpdateKeywords,
  style,
  value,
  waiting,
}: Props) {
  const suggestions = BACKGROUND_KEYWORD_SUGGESTIONS[style]?.map(
    ({ name }) => name
  );

  return (
    <Box>
      {waiting ? (
        <Progress />
      ) : (
        <Box>
          <Text fontWeight={500} mb="16px" textTransform="uppercase">
            Background
          </Text>
          <Input
            mb="30px"
            onChange={(e) => onChange(e.target.value)}
            value={value}
            placeholder="Pinochio"
          />
          {suggestions ? (
            <Keywords
              keywords={suggestions}
              selectedValues={keywords}
              onChange={onUpdateKeywords}
            />
          ) : null}
        </Box>
      )}
      <Flex align="center" mt="34px">
        <ButtonCTA
          disabled={waiting}
          flex={1}
          onClick={onBack}
          outlined
          title="Edit subject"
        />
        <ButtonCTA
          disabled={waiting}
          flex={1}
          icon={<IconSpark />}
          ml="10px"
          onClick={onNext}
          title="Generate"
        />
      </Flex>
    </Box>
  );
}
