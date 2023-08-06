import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
} from '@chakra-ui/react';

import Button from '@/components/Button';

const buttonStyle = {
  fontSize: '14px',
  h: '40px',
  textTransform: 'none',
};

type Props = {
  onClose: () => void;
  onSave: () => void;
};

export default function ConfirmEditorExitModa({ onClose, onSave }: Props) {
  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius="14px" width="342px" height="170px">
        <ModalBody
          fontSize="sm"
          padding="44px 36px 28px 44px"
          textAlign="center"
        >
          Do you want to save the changes you made to the design?
        </ModalBody>
        <ModalFooter
          bg="#F1F1F1"
          borderBottomLeftRadius="14px"
          borderBottomRightRadius="14px"
          justifyContent="space-between"
          p="10px"
        >
          <Button
            outlined
            onClick={onClose}
            p="12px 14px"
            title="Don't Save"
            {...buttonStyle}
          />
          <Button
            onClick={onSave}
            p="12px 28px"
            title="Save"
            {...buttonStyle}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
