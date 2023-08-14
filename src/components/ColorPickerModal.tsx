import {
  Box,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Spacer,
  Text,
} from '@chakra-ui/react';

import { AlphaPicker, HuePicker } from 'react-color';

import IconCloseModalSmall from '@/components/icons/IconCloseModalSmall';

type Props = {
  onClose: () => void;
  onSelectedColor: (color: string) => void;
  selectedColor: string;
};

const ColorPickerModal = ({ onClose, onSelectedColor, selectedColor }: Props) => {
  const;

  return (
    <Modal isOpen={true} onClose={onClose} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent alignSelf="center" borderRadius="10px" h="165px" w="308px">
        <ModalBody padding="15px 12px">
          <Flex alignItems="center" justifyContent="space-between" mb="20px">
            <Text as="b" fontSize="sm">
              Choose Color
            </Text>
            <Button bg="transparent" minWidth="none" onClick={onClose} padding={0}>
              <IconCloseModalSmall />
            </Button>
          </Flex>
          <HuePicker
            color={selectedColor}
            onChangeComplete={({ hex }) => onSelectedColor(hex)}
            width="283px"
          />
          <Box mb="20px" />
          <AlphaPicker
            //  color={selectedColor}
            onChangeComplete={(a) => {
              console.log('Alpha', a);
            }}
            width="283px"
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ColorPickerModal;
