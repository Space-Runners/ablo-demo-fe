import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';

import Button from '../../components/Button';

type Props = {
  error: {
    message:
      | string
      | [
          {
            title: string;
            code: string;
          }
        ];
  };
  onClose: () => void;
};

export default function ErrorModal({ error, onClose }: Props) {
  let errMessage = '';
  let errCode = '';

  const { message } = error;

  if (Array.isArray(message)) {
    errMessage = message[0]?.title;
    errCode = message[0]?.code;
  } else {
    errMessage = message;
  }

  if (errCode === 'unknown_foreground') {
    errMessage =
      'Background could not be removed due to unclear image foreground. Please try another image.';
  }

  return (
    <Modal isOpen onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent p={2} pb={5} m={4}>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{errMessage}</ModalBody>
        <ModalFooter>
          <Button onClick={onClose} title="Close" />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
