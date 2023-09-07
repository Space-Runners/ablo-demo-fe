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
} from '@chakra-ui/react';

export const PasswordWallModal = ({ isOpen, onClose, onPasswordSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const checkPassword = () => {
    event.preventDefault();
    if (password === 'correctPassword') {
      onPasswordSuccess();
      onClose();
    } else {
      setError('Incorrect password. Please try again.');
    }
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
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                mt={4}
              />
            </FormControl>
            <ModalFooter>
              <Button colorScheme="blue" type="submit">
                Submit
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
