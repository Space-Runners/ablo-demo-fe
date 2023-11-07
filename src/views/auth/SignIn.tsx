import { useState } from 'react';

import { useHistory } from 'react-router-dom';

import {
  Button as ChakraButton,
  Flex,
  FormControl,
  FormErrorMessage,
  Text,
  VStack,
} from '@chakra-ui/react';

import { GoogleLogin } from '@react-oauth/google';

import { googleLogin, login } from '@/api/auth';
import FormInput from '@/components/modals/FormInput';
import { StorageKeys } from '@/constants';

import AuthContainer from './components/AuthContainer';
import Button from './components/ButtonCTA';

const LinkButton = (props) => (
  <ChakraButton
    bg="transparent"
    color="#0D6EFD"
    fontSize="md"
    fontWeight={400}
    height="auto"
    padding={0}
    {...props}
  />
);

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [waiting, setWaiting] = useState(false);

  const history = useHistory();

  const handleSignIn = (accessToken) => {
    localStorage.setItem(StorageKeys.ACCESS_TOKEN, accessToken);

    history.push('/app/designs');
  };

  const handleGoToForgotPassword = () => {
    history.push('/auth/forgot-password');
  };

  const handleGoToSignup = () => {
    history.push('/auth/signup');
  };

  const handleSubmit = () => {
    setWaiting(true);

    login(email, password)
      .then(({ access_token: accessToken }) => {
        setWaiting(false);

        handleSignIn(accessToken);
      })
      .catch(() => {
        setError('Error signing in');

        setWaiting(false);
      });
  };

  return (
    <AuthContainer
      title="Log in to your account"
      subtitle="Welcome back! Please enter your details."
    >
      <VStack mb="20px" spacing="12px" maxW="350px">
        <FormControl isInvalid={!!error}>
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
        <FormInput
          autoComplete="new-password"
          name="Email Address"
          type="email"
          placeholder="Example@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          autoComplete="new-password"
          name="Password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Flex justify="flex-end" w="100%">
          <LinkButton onClick={handleGoToForgotPassword}>Forgot password?</LinkButton>
        </Flex>
        <Button isLoading={waiting} onClick={handleSubmit} title="Sign in" />
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            googleLogin(credentialResponse.credential).then(({ access_token: accessToken }) => {
              handleSignIn(accessToken);
            });
          }}
          width="347px"
        />
        <Flex align="center">
          <Text color="#6C757D" fontSize="md" mr="4px">
            Don't have an account?
          </Text>
          <LinkButton onClick={handleGoToSignup}>Sign up</LinkButton>
        </Flex>
      </VStack>
    </AuthContainer>
  );
}

export default SignIn;
