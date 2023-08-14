import { ReactElement } from 'react';

import { Box, Flex, Modal, ModalOverlay, ModalContent, ModalBody, Show } from '@chakra-ui/react';

import ButtonBack from './ButtonBack';
import ButtonCloseModal from './ButtonCloseModal';
import Header from './Header';

type Props = {
  children: ReactElement;
  onClose: () => void;
  title: string;
  subtitle: string;
};

const ModalContainer = ({ children, onClose, title, subtitle }: Props) => {
  return (
    <Modal isOpen={true} onClose={onClose} motionPreset="slideInBottom" size="full">
      <ModalOverlay />
      <ModalContent
        alignSelf="center"
        borderRadius={{ base: 0, md: '10px' }}
        margin={{ base: 0, md: '0 17px' }}
        height={{ base: '100vh', md: 'calc(100vh - 34px)' }}
        minHeight="none"
      >
        <ModalBody padding={0}>
          <Flex>
            <Show above="md">
              <Box minW="374px">
                <video
                  autoPlay
                  style={{
                    height: 'calc(100vh - 34px)',
                    borderBottomLeftRadius: '10px',
                    borderTopLeftRadius: '10px',
                  }}
                  loop
                  muted
                  playsInline
                  src="https://uploads-ssl.webflow.com/64a578c6af7743f274e283e2/64a5794d3dba19099746487a_ABLO_FP_v05_vertical-transcode.mp4"
                />
              </Box>
            </Show>
            <Flex
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              height={{ base: '100vh', md: 'calc(100vh - 34px)' }}
              overflow="auto"
              padding="50px 14px 14px 14px"
              position="relative"
              textAlign="center"
              w="100%"
            >
              <Show below="md">
                <ButtonBack position="absolute" top="17px" left="8px" onClick={onClose} />
              </Show>
              <Show above="md">
                <ButtonCloseModal position="absolute" top="35px" right="33px" onClick={onClose} />
              </Show>
              <Header title={title} subtitle={subtitle} />
              {children}
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalContainer;
