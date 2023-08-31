import { useState } from 'react';

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
import FormInput from '@/components/modal/FormInput';

import Button from './components/ButtonCTA';
import IconBack from './components/IconBack';
import ModalContainer from './components/ModalContainer';

type Props = {
  onClose: () => void;
  onGoToSignin: () => void;
};

function ForgotPassword({ onClose, onGoToSignin }: Props) {
  const [email, setEmail] = useState('');

  const [error, setError] = useState('');
  const [waiting, setWaiting] = useState(false);
  const [success, setSuccess] = useState(null);

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
    <ModalContainer
      onClose={onClose}
      title="Forgot Password"
      subtitle="No worries, we’ll send you reset instructions."
    >
      <VStack mb="20px" spacing="12px" maxW="350px" w={{ base: 'auto', md: '360px' }}>
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
        <ChakraButton bg="transparent" mt="20px" onClick={onGoToSignin} padding={0}>
          <IconBack />
          <Text color="gray.600" fontWeight={400} ml="4px">
            Back to log in
          </Text>
        </ChakraButton>
      </VStack>
    </ModalContainer>
  );
}

export default ForgotPassword;
