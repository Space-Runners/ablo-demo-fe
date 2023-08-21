import { Box, Flex, HStack, Switch, Text } from '@chakra-ui/react';

import { useOptions } from '@/api/image-generator';
import Colors from '@/theme/colors';

import Keywords from '../components/Keywords';

const { abloBlue } = Colors;

type Props = {
  background: boolean;
  children: React.ReactNode;
  onChangeBackground: (value: boolean) => void;
  style: string;
  keywords: string[];
  onUpdateKeywords: (keywords: string[]) => void;
};

export default function AddSubject({
  children,
  keywords,
  background,
  onChangeBackground,
  onUpdateKeywords,
  style,
}: Props) {
  const { data: options } = useOptions();

  if (!options) {
    return null;
  }

  const suggestions = options.suggestions[style] || [];

  return (
    <Box padding="8px 14px">
      <Flex align="center" justify="space-between" mb="8px">
        <Text as="b" color="#1A1A1A" fontSize="sm">
          Subject
        </Text>
        <HStack>
          <Text color="#1A1A1A" fontSize="sm" mr="8px">
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
      {children}
      {suggestions ? (
        <Keywords
          keywords={suggestions}
          selectedValues={keywords}
          onChange={onUpdateKeywords}
        />
      ) : null}
    </Box>
  );
}
