import { Button as ChakraButton, Icon } from '@chakra-ui/react';

const IconUndo = () => (
  <Icon
    width="21px"
    height="18px"
    viewBox="0 0 21 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.5327 4.93404H14.4536C17.7931 4.93404 20.5 7.641 20.5 10.981C20.5 14.322 17.7961 17.028 14.4536 17.028H2.35907V14.3989H14.4536C16.3436 14.3989 17.8709 12.8704 17.8709 10.981C17.8709 9.09301 16.3411 7.56317 14.4536 7.56317H5.5327L7.63599 9.66646L5.77693 11.5255L0.5 6.2486L5.77693 0.97168L7.63599 2.83075L5.5327 4.93404Z"
      fill="#818181"
    />
  </Icon>
);

const IconRedo = () => (
  <Icon
    width="21px"
    height="18px"
    viewBox="0 0 21 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.4673 4.93404H6.54642C3.20687 4.93404 0.5 7.641 0.5 10.981C0.5 14.322 3.20391 17.028 6.54642 17.028H18.6409V14.3989H6.54642C4.65639 14.3989 3.12912 12.8704 3.12912 10.981C3.12912 9.09301 4.65891 7.56317 6.54642 7.56317H15.4673L13.364 9.66646L15.2231 11.5255L20.5 6.2486L15.2231 0.97168L13.364 2.83075L15.4673 4.93404Z"
      fill="#818181"
    />
  </Icon>
);

const Button = ({ icon, ...rest }) => (
  <ChakraButton
    background="transparent"
    border="1px solid #484848"
    borderRadius="4px"
    height="42px"
    padding="10px 16px"
    width="42px"
    _hover={{ bg: '' }}
    _active={{
      bg: '',
    }}
    _focus={{
      bg: '',
      boxShadow: '',
    }}
    {...rest}
  >
    {icon}
  </ChakraButton>
);

export const UndoButton = (props) => <Button icon={<IconUndo />} {...props} />;

export const RedoButton = (props) => <Button icon={<IconRedo />} {...props} />;
