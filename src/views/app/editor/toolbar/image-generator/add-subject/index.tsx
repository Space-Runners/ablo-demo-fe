import { Box, Flex, HStack, Switch, Text } from '@chakra-ui/react';
import { isEmpty } from 'lodash';

import ButtonCTA from '@/components/Button';
import { useOptions } from '@/api/image-generator';
import Colors from '@/theme/colors';

import Input from '../components/Input';
import Keywords from '../components/Keywords';

const { abloBlue } = Colors;

type Props = {
  background: boolean;
  onChangeBackground: (value: boolean) => void;
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
  background,
  onChangeBackground,
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
      <Flex align="center" justify="space-between" mb="16px">
        <Text fontWeight={500} textTransform="uppercase">
          Add subject
        </Text>
        <HStack>
          <Text fontSize="sm" mr="8px" textTransform="uppercase">
            Solid background
          </Text>
          <Switch
            isChecked={background}
            onChange={(e) => onChangeBackground(e.target.checked)}
            position="relative"
          >
            <Text
              as="b"
              color={background ? abloBlue : '#000000'}
              fontSize="10px"
              position="absolute"
              textTransform="uppercase"
              top="12px"
              left={background ? '8px' : undefined}
              right={background ? undefined : '8px'}
            >
              {background ? 'On' : 'Off'}
            </Text>
          </Switch>
        </HStack>
      </Flex>
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
        <ButtonCTA flex={1} onClick={onBack} outlined title="Back" />
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
