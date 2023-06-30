import { Box, Flex, Switch, Text } from '@chakra-ui/react';

import ButtonCTA from '@/components/Button';
import Colors from '@/theme/colors';

import Input from '../components/Input';
import Keywords from '../components/Keywords';

import { BACKGROUND_KEYWORD_SUGGESTIONS } from '../styles';

const { abloBlue } = Colors;

type Props = {
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
  isBackgroundOn: boolean;
  setBackgroundOn: (boolean) => void;
  style: string;
  value: string;
  keywords: string[];
  onUpdateKeywords: (keywords: string[]) => void;
};

export default function AddBackground({
  keywords,
  onChange,
  onNext,
  onBack,
  isBackgroundOn,
  setBackgroundOn,
  onUpdateKeywords,
  style,
  value,
}: Props) {
  const suggestions = BACKGROUND_KEYWORD_SUGGESTIONS[style]?.map(
    ({ name }) => name
  );

  return (
    <Box>
      <Box>
        <Flex align="center" justify="space-between" mb="16px">
          <Text fontWeight={500} textTransform="uppercase">
            Background
          </Text>
          <Switch
            isChecked={isBackgroundOn}
            onChange={(e) => setBackgroundOn(e.target.checked)}
            position="relative"
          >
            <Text
              as="b"
              color={isBackgroundOn ? abloBlue : '#000000'}
              fontSize="10px"
              position="absolute"
              textTransform="uppercase"
              top="12px"
              left={isBackgroundOn ? '8px' : undefined}
              right={isBackgroundOn ? undefined : '8px'}
            >
              {isBackgroundOn ? 'On' : 'Off'}
            </Text>
          </Switch>
        </Flex>
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
      <Flex align="center" padding="14px 0">
        <ButtonCTA flex={1} onClick={onBack} outlined title="Edit subject" />
        <ButtonCTA flex={1} ml="10px" onClick={onNext} title="Generate" />
      </Flex>
    </Box>
  );
}
