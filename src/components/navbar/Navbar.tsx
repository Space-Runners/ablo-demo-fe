import { Button, Flex, Icon, Text } from '@chakra-ui/react';

const IconNext = () => (
  <Icon
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_1999_20945)">
      <path
        d="M5 12H19"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15 16L19 12"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15 8L19 12"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1999_20945">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </Icon>
);

const TOTAL_STEPS = 3;

type Props = {
  onNext?: () => void;
  isNextDisabled?: boolean;
  step: number;
  title: string;
};

export default function Navbar(props: Props) {
  const { onNext, isNextDisabled, step, title } = props;

  return (
    <Flex
      align="center"
      bg="#F9F9F7"
      height="63px"
      justify={onNext ? 'space-between' : 'flex-start'}
      padding="14px"
    >
      <Text
        fontFamily="Roboto Condensed"
        fontSize="24px"
        fontWeight={700}
        textTransform="uppercase"
      >
        {title}
      </Text>
      <Flex align="center" justify="flex-start">
        <Text color="#959392" fontWeight={500} mr="12px">
          {step}/{TOTAL_STEPS}
        </Text>
        <Button
          bg="#000000"
          borderRadius="40px"
          disabled={isNextDisabled}
          height="32px"
          onClick={onNext}
          padding="4px 14px"
          w="52px"
          _disabled={{ background: '#BFBEBE' }}
        >
          <IconNext />
        </Button>
      </Flex>
    </Flex>
  );
}
