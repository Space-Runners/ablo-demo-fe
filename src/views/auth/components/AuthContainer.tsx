import { ReactElement } from 'react';

import { Box, Flex, Show } from '@chakra-ui/react';

import ButtonBack from './ButtonBack';
import ButtonCloseModal from './ButtonCloseModal';
import Header from './Header';

type Props = {
  children: ReactElement;
  onClose?: () => void;
  title: string;
  subtitle: string;
};

const AuthContainer = ({ children, onClose, title, subtitle }: Props) => {
  return (
    <Flex
      alignItems="center"
      bg="#FFFFFF"
      justifyContent="center"
      height="100vh"
      overflow="auto"
      padding={{ base: '50px 14px 14px 14px', md: 0 }}
      position="relative"
      textAlign="center"
      w="100%"
    >
      <Show above="md">
        <Box minW="374px">
          <video
            autoPlay
            style={{
              height: '100vh',
              objectFit: 'cover',
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
        {onClose ? (
          <Show below="md">
            <ButtonBack position="absolute" top="17px" left="8px" onClick={onClose} />
          </Show>
        ) : null}
        {onClose ? (
          <Show above="md">
            <ButtonCloseModal position="absolute" top="35px" right="33px" onClick={onClose} />
          </Show>
        ) : null}
        <Header title={title} subtitle={subtitle} />
        {children}
      </Flex>
    </Flex>
  );
};

export default AuthContainer;
