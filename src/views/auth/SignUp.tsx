import { useState } from 'react';

import { useHistory } from 'react-router-dom';

import {
  Alert,
  AlertIcon,
  Button as ChakraButton,
  Flex,
  FormControl,
  FormErrorMessage,
  VStack,
  Text,
} from '@chakra-ui/react';

import FormInput from '@/components/modals/FormInput';

import { GoogleLogin } from '@react-oauth/google';

import { googleLogin, signUp } from '@/api/auth';
import { StorageKeys } from '@/constants';

import Button from './components/ButtonCTA';
import AuthContainer from './components/AuthContainer';

function SignUp() {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [waiting, setWaiting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleGoToSignIn = () => {
    history.push('/auth/signin');
  };

  const handleSignIn = (accessToken) => {
    localStorage.setItem(StorageKeys.ACCESS_TOKEN, accessToken);

    history.push('/app/designs');
  };

  const handleSubmit = () => {
    if (!firstName || !lastName || !email || !password) {
      setError('Please fill all required fields');

      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords have to match');

      return;
    }

    setError('');
    setWaiting(true);
    setSuccess(false);

    signUp(email, password, firstName, lastName)
      .then(({ access_token: accessToken }) => {
        setWaiting(false);

        handleSignIn(accessToken);
      })
      .catch(() => {
        setError('Error signing up');
        setWaiting(false);
      });
  };

  return (
    <AuthContainer title="Create an account" subtitle="Start your journey!">
      <VStack mb="12px" spacing="12px" maxW="350px">
        {success ? (
          <Alert height="60px" status="success">
            <AlertIcon />
            We have sent you a verification email. Please check your inbox.
          </Alert>
        ) : null}
        <FormControl isInvalid={!!error}>
          {error && <FormErrorMessage textAlign="center">{error}</FormErrorMessage>}
        </FormControl>
        <FormInput
          name="First Name"
          placeholder="Enter your first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <FormInput
          name="Last Name"
          placeholder="Enter your last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <FormInput
          autoComplete="new-password"
          name="Email Address"
          type="email"
          placeholder="Enter your email"
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
        <FormInput
          autoComplete="new-password"
          name="Confirm Password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
        />
        <Button isLoading={waiting} onClick={handleSubmit} title="Get started" />
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            googleLogin(credentialResponse.credential).then(({ access_token: accessToken }) =>
              handleSignIn(accessToken)
            );
          }}
          width="350px"
        />
        <Flex align="center">
          <Text color="#6C757D" fontSize="md" mr="4px">
            Already have an account?
          </Text>
          <ChakraButton
            bg="transparent"
            color="#0D6EFD"
            fontSize="md"
            fontWeight={400}
            height="auto"
            onClick={handleGoToSignIn}
            padding={0}
          >
            Log in
          </ChakraButton>
        </Flex>
      </VStack>
    </AuthContainer>
  );
}

export default SignUp;
