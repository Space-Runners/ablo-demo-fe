import { Icon } from '@chakra-ui/react';

const IconUndo = ({ isDisabled }) => (
  <Icon
    width="20px"
    height="20px"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.81694 5.80806C5.06102 6.05214 5.06102 6.44786 4.81694 6.69194L2.75888 8.75L4.81694 10.8081C5.06102 11.0521 5.06102 11.4479 4.81694 11.6919C4.57286 11.936 4.17714 11.936 3.93306 11.6919L1.43306 9.19194C1.18898 8.94786 1.18898 8.55214 1.43306 8.30806L3.93306 5.80806C4.17714 5.56398 4.57286 5.56398 4.81694 5.80806Z"
      fill={isDisabled ? '#848484' : '#000000'}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.875 8.75C1.875 8.40482 2.15482 8.125 2.5 8.125H13.9844C16.6403 8.125 18.75 10.3474 18.75 12.9688V13.75C18.75 14.0952 18.4702 14.375 18.125 14.375C17.7798 14.375 17.5 14.0952 17.5 13.75V12.9688C17.5 11.0065 15.9191 9.375 13.9844 9.375H2.5C2.15482 9.375 1.875 9.09518 1.875 8.75Z"
      fill={isDisabled ? '#848484' : '#000000'}
    />
  </Icon>
);

export default IconUndo;
