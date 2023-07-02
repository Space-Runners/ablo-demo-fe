import { useRef, useState } from 'react';

import {
  Alert,
  AlertDescription,
  Box,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
} from '@chakra-ui/react';

import Button from '@/components/Button';

import ButtonClose from '@/components/modal/ButtonCloseModal';
import FormInput from '@/components/modal/FormInput';

type Props = {
  onClose: () => void;
  onSave: () => void;
  error: string;
  waiting: boolean;
};

function SaveDesignModal({ onClose, onSave, error, waiting }: Props) {
  const inputRef = useRef(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    console.log(title, description);

    onSave();
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody padding={0}>
          <Box position="relative">
            <ButtonClose
              position="absolute"
              top="-1px"
              right="-1px"
              onClick={onClose}
            />
            <Flex
              justifyContent="center"
              flexDirection="column"
              padding="50px 14px 14px 14px"
              textAlign="center"
              w="100%"
            >
              <Text
                fontFamily="Roboto Condensed"
                fontSize="40px"
                fontWeight={700}
                mb="32px"
                textAlign="left"
                textTransform="uppercase"
              >
                Save your design
              </Text>
              <FormInput
                autoFocus
                ref={inputRef}
                name="Design Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                tabIndex={0}
              />
              <FormInput
                name="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {error ? (
                <Alert status="error">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : null}
              <Button
                isLoading={waiting}
                onClick={handleSubmit}
                title="Save my design"
              />
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SaveDesignModal;
