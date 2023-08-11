import { Button, Icon } from "@chakra-ui/react";

const IconClose = () => (
  <Icon
    width="26px"
    height="27px"
    viewBox="0 0 26 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      x1="0.46348"
      y1="1.32363"
      x2="25.4986"
      y2="26.3588"
      stroke="black"
      strokeWidth="0.962891"
    />
    <line
      x1="25.4986"
      y1="1.0045"
      x2="0.463479"
      y2="26.0397"
      stroke="black"
      strokeWidth="0.962891"
    />
  </Icon>
);

const ButtonCloseModal = (props) => (
  <Button
    {...props}
    bg="none"
    border="none"
    _focus={{ border: "none", boxShadow: "none" }}
    _hover={{ border: "none", boxShadow: "none" }}
  >
    <IconClose />
  </Button>
);

export default ButtonCloseModal;
