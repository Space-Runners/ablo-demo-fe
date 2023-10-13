import {
  Box,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
} from '@chakra-ui/react';

import { AlphaPicker, SketchPicker } from 'react-color';

import IconCloseModalSmall from '../icons/IconCloseModalSmall';

type Props = {
  onClose: () => void;
  onSelectedColor: (color: string) => void;
  selectedColor: string;
  onSelectedOpacity: (opacity: number) => void;
  selectedOpacity: number;
};

const ColorPickerModal = ({
  onClose,
  onSelectedColor,
  selectedColor,
  selectedOpacity,
  onSelectedOpacity,
}: Props) => {
  return (
    <Modal isOpen={true} onClose={onClose} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent alignSelf="center" borderRadius="10px" h="500px" w="328px">
        <ModalBody padding="15px 12px">
          <Flex alignItems="center" justifyContent="space-between" mb="20px">
            <Text as="b" fontSize="sm">
              Choose Color
            </Text>
            <Button bg="transparent" minWidth="none" onClick={onClose} padding={0}>
              <IconCloseModalSmall />
            </Button>
          </Flex>
          <SketchPicker
            disableAlpha
            color={selectedColor}
            onChange={({ hex }) => onSelectedColor(hex)}
            width="283px"
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ColorPickerModal;
