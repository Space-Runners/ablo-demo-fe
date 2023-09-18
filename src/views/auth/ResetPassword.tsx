import { useState } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import { isArray } from 'lodash';

import { FormControl, FormErrorMessage, VStack } from '@chakra-ui/react';

import { setPassword } from '@/api/auth';
import FormInput from '@/components/modals/FormInput';
import { StorageKeys } from '@/constants';

import Button from './components/ButtonCTA';
import ModalContainer from './components/ModalContainer';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const history = useHistory();

  const { search } = useLocation();

  const [error, setError] = useState('');
  const [waiting, setWaiting] = useState(false);

  const searchParams = new URLSearchParams(search);

  const token = searchParams.get('token');

  const handleError = (error) => {
    const { response } = error;

    let message = response?.data?.message || 'Error resetting password';

    if (isArray(message)) {
      message = message.join(', ');
    }

    setError(message);
  };

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords have to match');

      return;
    }

    setWaiting(true);

    setPassword(newPassword, token)
      .then(({ access_token: accessToken }) => {
        setWaiting(false);

        localStorage.setItem(StorageKeys.ACCESS_TOKEN, accessToken);

        history.push('/');
      })
      .catch((error) => {
        handleError(error);

        setWaiting(false);
      });
  };

  return (
    <ModalContainer title="Reset password" subtitle="Set a new password">
      <VStack mb="20px" spacing="12px" maxW="350px" w={{ base: '100%', md: '300px' }}>
        <FormControl isInvalid={!!error}>
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
        <FormInput
          isPassword
          name="Password"
          placeholder="Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <FormInput
          isPassword
          name="Confirm Password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button isLoading={waiting} onClick={handleSubmit} title="Reset Password" />
      </VStack>
    </ModalContainer>
  );
};

export default ResetPassword;
