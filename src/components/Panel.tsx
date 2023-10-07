import { useState } from 'react';

import { Box, Button, Icon, Text } from '@chakra-ui/react';

export const IconDown = () => (
  <Icon
    width="16px"
    height="17px"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1179_17997)">
      <path
        d="M4 6.5L8 10.5L12 6.5"
        stroke="#6A6866"
        strokeWidth="0.666667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1179_17997">
        <rect
          width="16"
          height="16"
          fill="white"
          transform="translate(0 0.5)"
        />
      </clipPath>
    </defs>
  </Icon>
);

export const IconUp = () => (
  <Icon
    width="16px"
    height="17px"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1179_19043)">
      <path
        d="M12 10.5L8 6.5L4 10.5"
        stroke="#6A6866"
        strokeWidth="0.666667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1179_19043">
        <rect
          width="16"
          height="16"
          fill="white"
          transform="translate(16 16.5) rotate(-180)"
        />
      </clipPath>
    </defs>
  </Icon>
);

const Panel = ({ children, title }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Box borderBottom="1px solid #D9D9D9" borderTop="1px solid #D9D9D9">
      <Button
        alignItems="center"
        bg="transparent"
        borderRadius={0}
        color="#0000000"
        display="flex"
        fontSize="md"
        fontWeight={400}
        height="63px"
        justifyContent="space-between"
        onClick={() => setOpen(!isOpen)}
        padding="22px 14px"
        w="100%"
        _hover={{ bg: '' }}
        _active={{
          bg: '',
        }}
        _focus={{
          bg: '',
          boxShadow: '',
        }}
      >
        <Text fontSize="md" mr="8px">
          {title}
        </Text>
        {isOpen ? <IconUp /> : <IconDown />}
      </Button>
      {isOpen ? <Box padding="0 14px 22px 14px">{children}</Box> : null}
    </Box>
  );
};

export default Panel;
