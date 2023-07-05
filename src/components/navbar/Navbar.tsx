import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react';

import Colors from '@/theme/colors';

const { abloBlue } = Colors;

const IconBack = () => (
  <Icon
    width="24px"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_2455_20036)">
      <path
        d="M5 12H19"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 12L9 16"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 12L9 8"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2455_20036">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </Icon>
);

const AbloText = () => (
  <Icon
    width="49px"
    height="31px"
    viewBox="0 0 49 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.2915 0.272461H2.74794L0.31543 30.2625H5.20975L5.86672 22.5227H8.21668L8.91615 30.2625H13.6815L11.2915 0.272461ZM6.93644 19.2639C6.00984 19.2639 5.2586 18.3693 5.2586 17.266C5.2586 16.1626 6.00984 15.2681 6.93644 15.2681C7.86304 15.2681 8.61428 16.1626 8.61428 17.266C8.61428 18.3693 7.86304 19.2639 6.93644 19.2639Z"
      fill="black"
    />
    <path
      d="M13.6821 30.2625V0.272461H20.5083C22.34 0.272461 23.673 0.80349 24.5078 1.86555C25.3425 2.9276 25.7597 4.68006 25.7597 7.12232V8.43448C25.7597 9.84319 25.5472 10.9849 25.1227 11.8597C24.6983 12.7345 24.0515 13.308 23.1836 13.5808C24.3187 13.9216 25.0797 14.7196 25.4661 15.9747C25.8525 17.2299 26.0459 18.7608 26.0459 20.5673C26.0459 22.5099 25.893 24.2083 25.5877 25.6624C25.2825 27.1165 24.729 28.2471 23.928 29.0533C23.1264 29.86 21.9864 30.2631 20.5078 30.2631H13.6816L13.6821 30.2625ZM18.6048 11.5695H19.6349C20.1024 11.5695 20.4028 11.3537 20.5366 10.9221C20.67 10.4905 20.7369 9.97348 20.7369 9.37149V6.35515C20.7369 5.38965 20.3793 4.90689 19.6638 4.90689H18.6048V11.5695ZM19.1054 24.9801C20.4126 24.9801 21.0661 24.242 21.0661 22.7647V19.0161C21.0661 18.164 20.9586 17.4911 20.7442 16.9967C20.5298 16.5023 20.1263 16.2557 19.5348 16.2557H18.6048V24.9458C18.8143 24.9685 18.9814 24.9801 19.1054 24.9801Z"
      fill="black"
    />
    <path
      d="M26.0459 30.2625V0.272461H31.0833V25.1505H36.2634V30.2625H26.0459Z"
      fill="black"
    />
    <path
      d="M42.4744 30.5356C40.4614 30.5356 38.9228 29.8115 37.8595 28.3632C36.7956 26.915 36.2637 24.8217 36.2637 22.0839V7.83864C36.2637 5.27132 36.7907 3.32286 37.8448 1.99383C38.8989 0.664804 40.4419 0 42.4744 0C44.5068 0 46.0494 0.664804 47.1039 1.99383C48.158 3.32286 48.6851 5.27132 48.6851 7.83864V22.0839C48.6851 24.8217 48.1531 26.915 47.0893 28.3632C46.0254 29.8115 44.4873 30.5356 42.4744 30.5356ZM42.5174 25.0148C43.2803 25.0148 43.6623 24.1348 43.6623 22.3736V7.73627C43.6623 6.25951 43.2901 5.52084 42.5462 5.52084C41.7065 5.52084 41.2869 6.27638 41.2869 7.78687V22.4073C41.2869 23.3391 41.3822 24.0062 41.5732 24.4093C41.7637 24.8129 42.0787 25.0142 42.5178 25.0142L42.5174 25.0148Z"
      fill="black"
    />
  </Icon>
);

const TOTAL_STEPS = 3;

type Props = {
  onBack?: () => void;
  onNext?: () => void;
  isNextDisabled?: boolean;
  step: number;
  title: string;
};

export default function Navbar(props: Props) {
  const { onBack, onNext, isNextDisabled, step, title } = props;

  return (
    <Box>
      <Flex
        align="center"
        bg="#FFFFFF"
        borderBottom="1px solid #000000"
        h="58px"
        justify="center"
      >
        <AbloText />
      </Flex>
      <Flex
        align="center"
        bg="#FFFFFF"
        height="63px"
        justify="space-between"
        padding="14px 0"
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
        ) : (
          <Box w="48px" />
        )}
        <Box textAlign="center">
          <Text
            color="#959392"
            fontFamily="Roboto Condensed"
            fontSize="xs"
            fontWeight={500}
          >
            {step} of {TOTAL_STEPS}
          </Text>
          <Text
            fontFamily="Roboto Condensed"
            fontSize="19px"
            fontWeight={500}
            lineHeight="26pxs"
          >
            {title}
          </Text>
        </Box>
        {onNext ? (
          <Button
            bg="transparent"
            borderRadius="40px"
            color={abloBlue}
            disabled={isNextDisabled}
            onClick={onNext}
            padding="4px 14px"
            pl={0}
            textTransform="uppercase"
            _disabled={{ color: '#BFBEBE' }}
            _hover={{
              color: '#6A6866',
            }}
          >
            Next
          </Button>
        ) : null}
      </Flex>
    </Box>
  );
}
