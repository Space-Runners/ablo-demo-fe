import { Box, Button, Flex, Hide, Show, Text } from '@chakra-ui/react';

import IconAblo from '@/components/icons/IconAblo';
import IconBack from '@/components/icons/IconBack';
import Colors from '@/theme/colors';
import React from 'react';

const { abloBlue } = Colors;

type Props = {
  callToActionContent?: React.ReactNode;
  onBack?: () => void;
  onNext?: () => void;
  rightSideContent?: React.ReactNode;
  isNextDisabled?: boolean;
  title: string;
};

export default function Navbar(props: Props) {
  const { callToActionContent, onBack, onNext, rightSideContent, isNextDisabled, title } = props;

  return (
    <Box boxShadow="0px 2px 4px 0px rgba(173, 173, 173, 0.25)" id="ablo-navbar">
      <Flex
        align="center"
        bg="#FFFFFF"
        borderBottom="1px solid #E7E7E7"
        h="58px"
        justify={{ base: 'center', md: 'space-between' }}
        p={{ base: 0, md: '32px' }}
      >
        <IconAblo />
        <Show above="md">{rightSideContent}</Show>
      </Flex>
      <Hide above="md">
        <Flex
          align="center"
          bg="#FFFFFF"
          height="63px"
          justify="space-between"
          padding={0}
          pl={onBack ? 0 : '20px'}
        >
          {onBack ? (
            <Button
              bg="transparent"
              height="30px"
              minWidth="none"
              onClick={onBack}
              padding={0}
              w="48px"
              _hover={{
                bg: '#F9F9F7',
                border: `1px solid ${abloBlue}`,
                boxShadow: '0px 0px 8px 0px #97B9F5',
              }}
            >
              <IconBack />
            </Button>
          ) : null}
          <Box p="14px 0" textAlign="center">
            <Text fontFamily="Roboto Condensed" fontSize="19px" fontWeight={500} lineHeight="26px">
              {title}
            </Text>
          </Box>
          {onNext ? (
            <Button
              bg="transparent"
              borderRadius="40px"
              color={abloBlue}
              disabled={isNextDisabled}
              fontSize="sm"
              onClick={onNext}
              padding="18px 14px"
              pl={0}
              textTransform="uppercase"
              _disabled={{ color: '#BFBEBE' }}
              _hover={{
                color: '#6A6866',
              }}
            >
              {callToActionContent || 'Next'}
            </Button>
          ) : (
            <Box w="56px" />
          )}
        </Flex>
      </Hide>
    </Box>
  );
}
