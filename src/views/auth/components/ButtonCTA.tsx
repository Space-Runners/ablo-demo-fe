import { Button } from "@chakra-ui/react";

const ButtonCTA = ({ title, ...rest }) => (
  <Button
    bg="#0D6EFD"
    borderRadius="4px"
    color="#FFFFFF"
    fontWeight={400}
    h="36px"
    padding="6px 0"
    w="100%"
    {...rest}
  >
    {title}
  </Button>
);

export default ButtonCTA;
