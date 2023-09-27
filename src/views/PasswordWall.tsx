import { useState } from 'react';
import { Center, Input, Text, Spinner, VStack } from '@chakra-ui/react';
import { verifyPassword } from '@/api/auth';

import ErrorMessage from '@/components/form/ErrorMessage';
import IconAblo from '@/components/icons/IconAblo';
import { StorageKeys } from '@/constants';

const PasswordWallModal = ({ onPasswordSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkPassword = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await verifyPassword(password);

      localStorage.setItem(StorageKeys.HAS_ACCESS, 'true');
      onPasswordSuccess();
    } catch (error) {
      setError(
        'Your password is incorrect. Please try again! If you’re still having trouble contact ablo@spacerunners.com to request for assistance'
      );
    }
    setIsLoading(false);
  };

  return (
    <Center h="100vh" w="100%">
      <VStack spacing="20px">
        <IconAblo />
        <Text color="primary.500" fontSize="36px" fontWeight={700} mt="8px">
          Enter the Password
        </Text>
        <Text color="secondaryGray.600">Enter the password that was provided by ABLO team</Text>
        <form onSubmit={checkPassword}>
          {isLoading ? (
            <Spinner />
          ) : (
            <Input
              borderColor="secondaryGray.100"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              width="350px"
            />
          )}
        </form>
        {error && <ErrorMessage message={error} width="410px" />}
      </VStack>
    </Center>
  );
};

export default PasswordWallModal;
