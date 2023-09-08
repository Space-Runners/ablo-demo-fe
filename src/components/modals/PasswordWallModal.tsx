import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Text,
  FormControl,
  FormLabel,
  Spinner,
} from '@chakra-ui/react';
import { verifyPassword } from '@/api/auth';
import { StorageKeys } from '../../constants';

export const PasswordWallModal = ({ isOpen, onClose, onPasswordSuccess }) => {
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
      onClose();
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered={true}
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Password Required</ModalHeader>
        <ModalBody>
          <form onSubmit={checkPassword}>
            {error && <Text color="red.500">{error}</Text>}
            {isLoading ? (
              <Spinner />
            ) : (
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  mt={4}
                />
              </FormControl>
            )}
            <ModalFooter>
              <Button colorScheme="blue" type="submit" isLoading={isLoading}>
                Submit
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
