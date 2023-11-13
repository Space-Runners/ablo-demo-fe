import { Box, Button, Flex, Hide, Text } from '@chakra-ui/react';

import IconAblo from '@/components/icons/IconAblo';
import IconBack from '../icons/IconBack';
import { User } from '../../types';
import React, { ReactNode } from 'react';

import { useHistory } from 'react-router-dom';

type Props = {
  callToActionContent?: React.ReactNode;
  icon?: ReactNode;
  onBack?: () => void;
  onNext?: () => void;
  rightSideContent?: React.ReactNode;
  isNextDisabled?: boolean;
  title: string;
  user?: User;
};

export default function Navbar(props: Props) {
  const { callToActionContent, icon, onBack, onNext, rightSideContent, isNextDisabled, title } =
    props;

  const history = useHistory();

  return (
    <Box boxShadow="0px 4px 4px 0px rgba(220, 220, 220, 0.25)" id="ablo-navbar" marginBottom="1px">
      <Flex
        align="center"
        bg="#FFFFFF"
        borderBottom="1px solid #E7E7E7"
        h="58px"
        justify={{ base: 'center', md: 'center' }}
        p={{ base: '0 17px', md: '32px' }}
      >
        <Button bg="transparent" onClick={() => history.push('/app/designs')}>
          {icon || <IconAblo />}
        </Button>
        {rightSideContent ? (
          <Box position="absolute" right="17px">
            {rightSideContent}
          </Box>
        ) : null}
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
                border: '1px solid',
                borderColor: 'brand.500',
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
              color="brand.500"
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
