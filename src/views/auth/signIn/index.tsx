import React, { useState } from 'react';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { HSeparator } from '@/components/separator/Separator';

import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';

// import { GoogleLogin } from '@react-oauth/google';

import { login } from '@/api/auth';

function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';

  const brandStars = useColorModeValue('brand.500', 'brand.400');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [show, setShow] = React.useState(false);
  const [error, setError] = useState(false);

  const handleClick = () => setShow(!show);

  const handleSubmit = () => {
    login(email, password)
      .then(({ access_token: accessToken }) => {
        localStorage.setItem('access-token', accessToken);

        window.location.href = '/';
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <Flex
      maxW={{ base: '100%' }}
      w="100%"
      mx={{ base: 'auto', lg: '0px' }}
      me="auto"
      h="100%"
      alignItems="center"
      justifyContent="center"
      mb={{ base: '30px', md: '60px' }}
      px={{ base: '25px', md: '0px' }}
      mt={{ base: '40px', md: '14vh' }}
      flexDirection="column"
    >
      <Box margin="0 auto" me="auto" w="400px" textAlign="center">
        <Heading color={textColor} fontSize="36px" mb="10px">
          Sign In
        </Heading>
        <Text
          mb="36px"
          ms="4px"
          color={textColorSecondary}
          fontWeight="400"
          fontSize="md"
        >
          Enter your email and password to sign in!
        </Text>
      </Box>
      <Flex
        zIndex="2"
        direction="column"
        w={{ base: '100%', md: '420px' }}
        maxW="100%"
        background="transparent"
        borderRadius="15px"
        mx={{ base: 'auto', lg: 'unset' }}
        me="auto"
        mb={{ base: '20px', md: 'auto' }}
      >
        {/*   <Button
          fontSize="sm"
          me="0px"
          mb="26px"
          py="15px"
          h="50px"
          borderRadius="16px"
          bg={googleBg}
          color={googleText}
          fontWeight="500"
          _hover={googleHover}
          _active={googleActive}
          _focus={googleActive}
        >
          <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
          Sign in with Google
        </Button> */}
        {/*  <GoogleLogin
          onSuccess={(credentialResponse) => {
            googleLogin(credentialResponse.credential).then(
              ({ access_token: accessToken }) => {
                localStorage.setItem('access-token', accessToken);

                window.location.href = '/';
              }
            );
          }}
          width="420px"
          //  onError={() => }
        /> */}
        <Flex align="center" mb="25px">
          <HSeparator />
          <Text color="gray.400" mx="14px">
            or
          </Text>
          <HSeparator />
        </Flex>
        <FormControl>
          <FormLabel
            display="flex"
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color={textColor}
            mb="8px"
          >
            Email<Text color={brandStars}>*</Text>
          </FormLabel>
          <Input
            backgroundColor="rgb(232,240,254)"
            isRequired={true}
            variant="auth"
            fontSize="sm"
            ms={{ base: '0px', md: '0px' }}
            type="email"
            placeholder=""
            mb="24px"
            fontWeight="500"
            size="lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormLabel
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color={textColor}
            display="flex"
          >
            Password<Text color={brandStars}>*</Text>
          </FormLabel>
          <InputGroup size="md">
            <Input
              backgroundColor="rgb(232,240,254)"
              isRequired={true}
              fontSize="sm"
              placeholder="Min. 8 characters"
              mb="24px"
              size="lg"
              type={show ? 'text' : 'password'}
              variant="auth"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement display="flex" alignItems="center" mt="4px">
              <Icon
                color={textColorSecondary}
                _hover={{ cursor: 'pointer' }}
                as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                onClick={handleClick}
              />
            </InputRightElement>
          </InputGroup>
          {/* <Flex justifyContent="space-between" align="center" mb="24px">
            <NavLink to="/auth/forgot-password">
              <Text
                color={textColorBrand}
                fontSize="sm"
                w="124px"
                fontWeight="500"
              >
                Forgot password?
              </Text>
            </NavLink>
          </Flex> */}
          <Button
            fontSize="sm"
            onClick={handleSubmit}
            variant="brand"
            fontWeight="500"
            w="100%"
            h="50"
            mb="24px"
          >
            Sign In
          </Button>
          <FormControl isInvalid={error}>
            {error && (
              <FormErrorMessage>Wrong username or password</FormErrorMessage>
            )}
          </FormControl>
        </FormControl>
      </Flex>
    </Flex>
  );
}

export default SignIn;
