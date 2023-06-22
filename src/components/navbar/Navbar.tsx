import { Box, Button, Flex, Icon, HStack, Text } from '@chakra-ui/react';

import { useHistory } from 'react-router-dom';

import { useMe } from '@/api/auth';

const IconBack = () => (
  <Icon
    width="7px"
    height="12px"
    viewBox="0 0 7 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.420417 5.62635L6.16782 0.517549C6.49027 0.230927 7 0.45983 7 0.891254V11.1089C7 11.5403 6.49027 11.7692 6.16782 11.4826L0.420418 6.37376C0.19666 6.17486 0.19666 5.82525 0.420417 5.62635Z"
      fill="black"
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

  const { action, message, onNext, onNextDisabled, onSignUp, title } = props;

  console.log(window.location);

  return (
    <Box>
      <Flex
        align="center"
        backgroundColor="#ffffff"
        h="62px"
        w={{
          base: '100vw',
        }}
      >
        <Button
          color="#000000"
          fontWeight={400}
          onClick={() => history.goBack()}
          padding="8px"
          variant="ghost"
        >
          <IconBack />
          <Text marginLeft="6px">Back</Text>
        </Button>
        <Flex
          align="center"
          borderLeft="1px solid #EAEAEA"
          borderRight="1px solid #EAEAEA"
          flex={1}
          justify="center"
          padding="0 12px"
        >
          <HStack backgroundColor="#212121" padding="6px 12px">
            <Text
              as="b"
              color="white"
              fontFamily="Roboto"
              fontSize="md"
              textTransform="uppercase"
            >
              {title}
            </Text>
          </HStack>
        </Flex>
        <Text color="white">{message}</Text>
        {!me || true ? (
          <Button
            color="#000000"
            fontWeight={400}
            ml={0}
            onClick={() =>
              onSignUp
                ? onSignUp()
                : history.push(`/signup?returnTo=${window.location.pathname}`)
            }
            padding="16px"
            variant="ghost"
          >
            Sign Up
          </Button>
        ) : null}
      </Flex>
      {action ? (
        <Flex
          align="center"
          height="53px"
          border="1px solid #EAEAEA"
          justify={onNext ? 'space-between' : 'flex-start'}
          padding="6px 6px 6px 12px"
        >
          <Text
            color="#212121"
            fontFamily="Roboto"
            fontSize="md"
            fontWeight={500}
          >
            {action}
          </Text>
          {onNext ? (
            <Button
              bg="#353535"
              borderRadius="5px"
              disabled={onNextDisabled}
              color="white"
              onClick={onNext}
              padding="10px 24px"
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
