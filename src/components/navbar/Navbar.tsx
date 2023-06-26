import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react';

import { useHistory } from 'react-router-dom';

import { useMe } from '@/api/auth';
import Colors from '@/theme/colors';

const { abloBlue } = Colors;

const IconBack = () => (
  <Icon
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 12L4 12M4 12L10 6M4 12L10 18"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

type Props = {
  action?: string;
  message?: string;
  onNext?: () => void;
  onNextDisabled?: boolean;
  onSignUp?: () => void;
  title: string;
};

export default function Navbar(props: Props) {
  const history = useHistory();

  const { data: me } = useMe();

  const { action, onNext, onNextDisabled, onSignUp, title } = props;

  return (
    <Box>
      <Flex
        align="flex-end"
        backgroundColor="#000000"
        fontSize="md"
        h="100px"
        justify="space-between"
        padding="12px 16px 14px 12px"
        w={{
          base: '100vw',
        }}
      >
        <Button
          fontWeight={400}
          onClick={() => history.goBack()}
          padding={0}
          variant="ghost"
        >
          <IconBack />
          <Text color="#FFFFFF" ml="18px">
            {title}
          </Text>
        </Button>
        {!me || true ? (
          <Button
            color="#FFFFFF"
            fontWeight={400}
            onClick={() =>
              onSignUp
                ? onSignUp()
                : history.push(`/signup?returnTo=${window.location.pathname}`)
            }
            padding={0}
            variant="ghost"
          >
            Sign Up
          </Button>
        ) : null}
      </Flex>
      {action ? (
        <Flex
          align="center"
          bg="#FFFFFF"
          height="73px"
          borderBottom="1px solid #D4D4D3"
          justify={onNext ? 'space-between' : 'flex-start'}
          padding="20px 8px 20px 14px"
        >
          <Text
            color="#000000"
            fontFamily="Roboto Condensed"
            fontSize="22px"
            fontWeight={700}
            textTransform="uppercase"
          >
            {action}
          </Text>
          {onNext ? (
            <Button
              bg={abloBlue}
              borderRadius="50px"
              disabled={onNextDisabled}
              color="white"
              fontSize="sm"
              height="32px"
              onClick={onNext}
              padding="8px 16px"
              w="99px"
              _disabled={{ background: '#D8D8D8', color: '#A7A7A7' }}
            >
              NEXT
            </Button>
          ) : null}
        </Flex>
      ) : null}
    </Box>
  );
}
