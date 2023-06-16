import { Button as ChakraButton, Icon } from '@chakra-ui/react';

const IconTrash = () => (
  <Icon
    width="12px"
    height="16px"
    viewBox="0 0 12 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.00033 13.8333C1.00033 14.2754 1.17592 14.6993 1.48848 15.0118C1.80104 15.3244 2.22496 15.5 2.66699 15.5H9.33366C9.77569 15.5 10.1996 15.3244 10.5122 15.0118C10.8247 14.6993 11.0003 14.2754 11.0003 13.8333V3.83333H1.00033V13.8333ZM2.66699 5.5H9.33366V13.8333H2.66699V5.5ZM8.91699 1.33333L8.08366 0.5H3.91699L3.08366 1.33333H0.166992V3H11.8337V1.33333H8.91699Z"
      fill="white"
    />
  </Icon>
);

const ButtonDelete = (props) => (
  <ChakraButton
    background="transparent"
    border="1px solid #FFFFFF"
    borderRadius="112px"
    height="40px"
    padding="8px 32px"
    width="72px"
    _hover={{ bg: '' }}
    _active={{
      bg: '',
    }}
    _focus={{
      bg: '',
      boxShadow: '',
    }}
    {...props}
  >
    <IconTrash />
  </ChakraButton>
);

export default ButtonDelete;
