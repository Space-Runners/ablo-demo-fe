import { Flex, Icon } from '@chakra-ui/react';

const IconCheckmark = () => (
  <Icon
    width="18px"
    height="18px"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1701_11684)">
      <path
        d="M3.75 9L7.5 12.75L15 5.25"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1701_11684">
        <rect width="18" height="18" fill="white" />
      </clipPath>
    </defs>
  </Icon>
);

const CheckmarkSelected = () => (
  <Flex
    align="center"
    bg="#000000"
    borderTopLeftRadius="4px"
    justify="center"
    left={0}
    h="36px"
    position="absolute"
    top={0}
    w="36px"
  >
    <IconCheckmark />
  </Flex>
);

export default CheckmarkSelected;
