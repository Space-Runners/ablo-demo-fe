// Chakra Imports
// @ts-nocheck
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const IconBack = () => (
  <svg
    width="7"
    height="13"
    viewBox="0 0 7 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.420417 6.12586L6.16782 1.01706C6.49027 0.730438 7 0.959341 7 1.39077V11.6084C7 12.0398 6.49027 12.2687 6.16782 11.9821L0.420418 6.87327C0.19666 6.67438 0.19666 6.32476 0.420417 6.12586Z"
      fill="black"
    />
  </svg>
);

export default function Navbar(props: any) {
  const { secondary, message } = props;

  // Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)

  const navbarBg = useColorModeValue(
    'rgba(244, 247, 254, 0.2)',
    'rgba(11,20,55,0.5)'
  );
  const navbarBorder = 'transparent';
  const secondaryMargin = '0px';
  const paddingX = '15px';
  const gap = '0px';

  return (
    <Box
      bg={navbarBg}
      borderColor={navbarBorder}
      backgroundColor="#ffffff"
      alignItems={{ xl: 'center' }}
      display={secondary ? 'block' : 'flex'}
      h="67px"
      justifyContent={{ xl: 'center' }}
      lineHeight="25.6px"
      mx="auto"
      mt={secondaryMargin}
      pb="8px"
      right={{ base: '12px', md: '30px', lg: '30px', xl: '30px' }}
      top={0}
      px={{
        sm: paddingX,
        md: '10px',
      }}
      pt="8px"
      w={{
        base: '100vw',
      }}
    >
      <Flex
        w="100%"
        flexDirection={{
          sm: 'column',
          md: 'row',
        }}
        alignItems={{ xl: 'center' }}
        mb={gap}
      >
        <Box mb={{ sm: '8px', md: '0px' }}></Box>
      </Flex>
      {secondary ? <Text color="white">{message}</Text> : null}
    </Box>
  );
}

Navbar.propTypes = {
  brandText: PropTypes.string,
  variant: PropTypes.string,
  secondary: PropTypes.bool,
  fixed: PropTypes.bool,
  onOpen: PropTypes.func,
};
