import React, { useEffect, useState } from 'react';

import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Text,
} from '@chakra-ui/react';

import { HSeparator } from '@/components/separator/Separator';

import { GoogleLogin } from '@react-oauth/google';

import Navbar from '@/components/navbar/Navbar';

import { googleLogin, signUp } from '@/api/auth';

import FormInput from './components/Input';
import Button from './components/ButtonSubmit';

const SocialButton = (props) => (
  <Button
    background="#1B1B1B"
    border="1.6px solid #484848"
    borderRadius="6px"
    padding="12px"
    width="56px"
    height="56px"
    _focus={{ bg: '#1B1B1B' }}
    _active={{ bg: '#1B1B1B' }}
    _hover={{ bg: '#1B1B1B' }}
    {...props}
  ></Button>
);

function SignIn() {
  // Chakra color mode

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [waiting, setWaiting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setError('Passwords have to match');

      return;
    }

    setError('');
    setWaiting(true);
    setSuccess(false);

    signUp(email, password, firstName, lastName)
      .then(() => {
        setWaiting(false);
        setSuccess(true);
      })
      .catch(() => {
        setError('Error signing up');
        setWaiting(false);
      });
  };

  console.log('Error', error, waiting, success);

  return (
    <Box w="100%" h="100%">
      <Navbar action="Sign up to continue" />
      <Flex
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        padding="35px 24px 8px 24px"
        textAlign="center"
        w="100%"
      >
        {success ? (
          <Alert status="success">
            <AlertIcon />
            We have sent you a verification email. Please check your inbox.
          </Alert>
        ) : null}
        <Text as="b" color="#383838" mb="24px">
          Sign up with
        </Text>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);

            return;
            googleLogin(credentialResponse.credential).then(
              ({ access_token: accessToken }) => {
                localStorage.setItem('access-token', accessToken);

                window.location.href = '/';
              }
            );
          }}
          width="300px"
        />
        <Flex align="center" mb="25px" mt="24px" w="100%">
          <HSeparator bg="#CCCCCC" />
          <Text color="#CCCCCC" mx="14px">
            or
          </Text>
          <HSeparator bg="#CCCCCC" />
        </Flex>
        <FormInput
          autoComplete="new-password"
          name="Email Address"
          type="email"
          placeholder="Example@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          name="First Name"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <FormInput
          name="Last Name"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <FormInput
          autoComplete="new-password"
          name="Password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          //  type="password"
        />
        <FormInput
          autoComplete="new-password"
          name="Confirm Password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          //  type="password"
        />
        <FormControl isInvalid={!!error}>
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
        <Text
          color="rgba(33, 33, 33, 0.7)"
          fontSize="12px"
          fontWeight={400}
          mb="24px"
          mt="10px"
          textAlign="left"
        >
          By accessing or using our website, you agree to comply with these
          Terms and Conditions, including our intellectual property rights and
          usage restrictions.
        </Text>
        <Button isLoading={waiting} onClick={handleSubmit}>
          Sign up
        </Button>
      </Flex>
    </Box>
  );
}

export default SignIn;
