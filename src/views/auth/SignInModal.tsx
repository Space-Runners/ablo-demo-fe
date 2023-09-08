import { useState } from 'react';

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

import Button from './components/ButtonCTA';
import ModalContainer from './components/ModalContainer';

type Props = {
  onClose: () => void;
  onGoToSignup: () => void;
  onGoToForgotPassword: () => void;
  onSignIn: () => void;
};

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

function SignIn({ onClose, onGoToSignup, onGoToForgotPassword, onSignIn }: Props) {
  // Chakra color mode

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [waiting, setWaiting] = useState(false);

  const handleSubmit = () => {
    setWaiting(true);

    login(email, password)
      .then(({ access_token: accessToken }) => {
        localStorage.setItem('access-token', accessToken);
        localStorage.removeItem('client-token');

        setWaiting(false);

        onSignIn();
      })
      .catch(() => {
        setError('Error signing in');

        setWaiting(false);
      });
  };

  return (
    <ModalContainer
      onClose={onClose}
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
          <LinkButton onClick={onGoToForgotPassword}>Forgot password?</LinkButton>
        </Flex>
        <Button isLoading={waiting} onClick={handleSubmit} title="Sign in" />
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            googleLogin(credentialResponse.credential).then(({ access_token: accessToken }) => {
              localStorage.setItem('access-token', accessToken);
              localStorage.removeItem('client-token');

              onSignIn();
            });
          }}
          width="347px"
        />
        <Flex align="center">
          <Text color="#6C757D" fontSize="md" mr="4px">
            Don't have an account?
          </Text>
          <LinkButton onClick={onGoToSignup}>Sign up</LinkButton>
        </Flex>
      </VStack>
    </ModalContainer>
  );
}

export default SignIn;
