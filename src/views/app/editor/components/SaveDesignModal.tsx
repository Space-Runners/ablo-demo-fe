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

import { toPng } from 'html-to-image';

import Button from '@/components/Button';

import ButtonClose from '@/components/modal/ButtonCloseModal';
import FormInput from '@/components/modal/FormInput';

import { saveTemplate } from '@/api/image-generator';

type Props = {
  onClose: () => void;
  onSave: (url: string) => void;
  designRef: any;
};

function SaveDesignModal({ onClose, onSave, designRef }: Props) {
  const inputRef = useRef(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [isSaving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    setSaving(true);
    setError(null);

    toPng(designRef.current, {
      cacheBust: false,
    })
      .then((dataUrl) =>
        saveTemplate(`Testing-${Date.now()}`, dataUrl).then(({ url }) => {
          console.log('success');

          onSave(url);
        })
      )
      .catch((err) => {
        setSaving(false);

        console.log(err.message, err.response);

        setError(err.message);
      });

    return;
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
                isLoading={isSaving}
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
