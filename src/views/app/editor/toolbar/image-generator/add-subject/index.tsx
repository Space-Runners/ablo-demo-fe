import { Box, Flex, HStack, Switch, Text } from '@chakra-ui/react';
import { isEmpty } from 'lodash';

import ButtonCTA from '@/components/Button';
import { useOptions } from '@/api/image-generator';
import Colors from '@/theme/colors';

import Input from '../components/Input';
import Keywords from '../components/Keywords';

const { abloBlue } = Colors;

type Props = {
  flatBackground: boolean;
  onChangeFlatBackground: (value: boolean) => void;
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
  flatBackground,
  onChangeFlatBackground,
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
            Flat background
          </Text>
          <Switch
            isChecked={flatBackground}
            onChange={(e) => onChangeFlatBackground(e.target.checked)}
            position="relative"
          >
            <Text
              as="b"
              color={flatBackground ? abloBlue : '#000000'}
              fontSize="10px"
              position="absolute"
              textTransform="uppercase"
              top="12px"
              left={flatBackground ? '8px' : undefined}
              right={flatBackground ? undefined : '8px'}
            >
              {flatBackground ? 'On' : 'Off'}
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
        <ButtonCTA flex={1} onClick={onBack} outlined title="Edit color mood" />
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
