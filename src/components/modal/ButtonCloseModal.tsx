import { Box, Icon } from '@chakra-ui/react';

const IconClose = () => (
  <Icon
    width="36px"
    height="36px"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_1499_18365)">
      <rect width="36" height="36" fill="black" />
      <path
        d="M27 9L9 27"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 9L27 27"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1499_18365">
        <rect width="36" height="36" fill="white" />
      </clipPath>
    </defs>
  </Icon>
);

const ButtonClose = (props) => (
  <Box as="button" {...props}>
    <IconClose />
  </Box>
);

export default ButtonClose;
