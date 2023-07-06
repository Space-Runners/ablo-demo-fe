import { useState } from 'react';

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
  onSave: (urls: string[]) => void;
  designRef: any;
  designRefBack: any;
};

const getTemplateImgFromHtml = async (element) => {
  await toPng(element, { cacheBust: false });
  await toPng(element, { cacheBust: false });
  await toPng(element, { cacheBust: false });

  return toPng(element, { cacheBust: false })
    .then((dataUrl) => saveTemplate(`Testing-${Date.now()}`, dataUrl))
    .then(({ url }) => url);
};

function SaveDesignModal({ onClose, onSave, designRef, designRefBack }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [isSaving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    setSaving(true);
    setError(null);

    const front = document.getElementById('#canvas-container-front');
    const back = document.getElementById('#canvas-container-back');
    const drawingAreas = document.getElementsByClassName('drawing-area');

    const frontOld = front.style.display;
    const backOld = back.style.display;
    const drawingAreaOld = (drawingAreas[0] as HTMLElement).style.border;

    front.style.display = 'block';
    back.style.display = 'block';

    [...drawingAreas].forEach((element) => {
      (element as HTMLElement).style.border = 'none';
    });

    const promises = [designRef, designRefBack].map((ref) =>
      ref ? getTemplateImgFromHtml(ref.current) : Promise.resolve(null)
    );

    const reset = () => {
      front.style.display = frontOld;
      back.style.display = backOld;

      [...drawingAreas].forEach((element) => {
        (element as HTMLElement).style.border = drawingAreaOld;
      });
    };

    Promise.all(promises)
      .then(([urlFront, urlBack]) => {
        reset();

        onSave([urlFront, urlBack]);
      })
      .catch((err) => {
        setSaving(false);

        reset();

        console.log(err.message, err.response);

        setError(err.message);
      });
  };

  return (
    <Modal isOpen={true} onClose={onClose} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent alignSelf="flex-end" h="400px">
        <ModalBody padding={0}>
          <Flex direction="column" justify="space-between" h="100%">
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
              </Flex>
            </Box>
            <Box padding="14px" w="100%">
              <Button
                isLoading={isSaving}
                onClick={handleSubmit}
                title="Save my design"
                w="100%"
              />
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SaveDesignModal;
