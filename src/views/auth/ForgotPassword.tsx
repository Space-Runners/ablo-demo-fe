import { useState } from 'react';

import { useHistory } from 'react-router-dom';

import {
  Alert,
  AlertIcon,
  Button as ChakraButton,
  FormControl,
  FormErrorMessage,
  Text,
  VStack,
} from '@chakra-ui/react';

import { resetPassword } from '@/api/auth';
import FormInput from '@/components/modals/FormInput';

import Button from './components/ButtonCTA';
import IconBack from './components/IconBack';
import AuthContainer from './components/AuthContainer';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const [error, setError] = useState('');
  const [waiting, setWaiting] = useState(false);
  const [success, setSuccess] = useState(null);

  const history = useHistory();

  const handleGoToSignIn = () => {
    history.push('/auth/signin');
  };

  const handleSubmit = () => {
    setWaiting(true);
    setSuccess(false);

    resetPassword(email)
      .then(() => {
        setWaiting(false);
        setSuccess(true);
      })
      .catch(() => {
        setError('Error resetting password');

        setWaiting(false);
      });
  };

  return (
    <AuthContainer
      title="Forgot Password"
      subtitle="No worries, we’ll send you reset instructions."
    >
      <VStack mb="20px" spacing="12px" maxW="350px" w={{ base: '100%', md: '360px' }}>
        {success ? (
          <Alert height="60px" status="success" textAlign="left" w="350px">
            <AlertIcon />
            We have sent a verification email with instructions. Check your inbox.
          </Alert>
        ) : null}
        <FormControl isInvalid={!!error}>
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
        <FormInput
          name="Email"
          type="email"
          isOptional
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button isLoading={waiting} onClick={handleSubmit} title="Reset password" />
        <ChakraButton bg="transparent" mt="20px" onClick={handleGoToSignIn} padding={0}>
          <IconBack />
          <Text color="gray.600" fontWeight={400} ml="4px">
            Back to log in
          </Text>
        </ChakraButton>
      </VStack>
    </AuthContainer>
  );
}

export default ForgotPassword;
