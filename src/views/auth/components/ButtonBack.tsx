import { Button, Icon } from "@chakra-ui/react";

const IconBack = () => (
  <Icon
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_795_22544)">
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
      <clipPath id="clip0_795_22544">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </Icon>
);

const ButtonBack = (props) => (
  <Button
    {...props}
    bg="none"
    border="none"
    _focus={{ border: "none", boxShadow: "none" }}
    _hover={{ border: "none", boxShadow: "none" }}
  >
    <IconBack />
  </Button>
);

export default ButtonBack;
