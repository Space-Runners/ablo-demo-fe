import { useState } from 'react';

import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Input,
  FormLabel,
  VStack,
} from '@chakra-ui/react';

import Button from '@/lib/components/Button';

type Props = {
  onClose: () => void;
  onSave: (designName: string) => void;
  designName?: string;
  isRenaming: boolean;
};

function RenameDesignModal({ isRenaming, onClose, onSave, designName }: Props) {
  const [name, setName] = useState(designName);

  return (
    <Modal isOpen={true} onClose={onClose} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent alignSelf="center" borderRadius="10px" w="308px">
        <ModalBody padding="15px 12px">
          <VStack spacing="20px">
            <Box w="100%">
              <FormLabel color="#1A1A1A" fontSize="15px">
                Name of design
              </FormLabel>
              <Input
                autoFocus
                bg="#F5F5F5"
                borderRadius="10px"
                border="none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    onSave(name);
                  }
                }}
                padding="12px 14px"
                tabIndex={0}
                placeholder="Enter a name..."
                _placeholder={{
                  color: '#878787',
                  fontWeight: 500,
                }}
              />
            </Box>
            <Button
              isLoading={isRenaming}
              isDisabled={!name}
              onClick={() => onSave(name)}
              title="Save"
              w="100%"
            />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default RenameDesignModal;
