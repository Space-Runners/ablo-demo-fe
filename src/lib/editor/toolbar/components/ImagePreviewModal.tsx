import { Modal, ModalOverlay, ModalContent, ModalBody, Image } from '@chakra-ui/react';

type Props = {
  onClose: () => void;
  image: string;
};

const ImagePreviewModal = ({ image, onClose }: Props) => (
  <Modal isOpen={true} onClose={onClose} motionPreset="slideInBottom">
    <ModalOverlay />
    <ModalContent alignSelf="center" borderRadius="10px" w="308px">
      <ModalBody p={0}>
        <Image
          borderRadius="5px"
          boxShadow="0px 10px 10px -5px rgba(0, 0, 0, 0.04), 0px 20px 25px -5px rgba(0, 0, 0, 0.10);"
          height={311}
          src={image}
        />
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default ImagePreviewModal;
