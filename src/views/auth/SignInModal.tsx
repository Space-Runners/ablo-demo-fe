import { useState } from 'react';

import {
  Box,
  Button as ChakraButton,
  Flex,
  FormControl,
  FormErrorMessage,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
} from '@chakra-ui/react';

import Button from '@/components/Button';

import { GoogleLogin } from '@react-oauth/google';

import { googleLogin, login } from '@/api/auth';
import ButtonClose from '@/components/modal/ButtonCloseModal';
import FormInput from '@/components/modal/FormInput';
import Colors from '@/theme/colors';

const { abloBlue } = Colors;

type Props = {
  onClose: () => void;
  onGoToSignup: () => void;
  onSignIn: () => void;
};

function SignIn({ onClose, onGoToSignup, onSignIn }: Props) {
  // Chakra color mode

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [waiting, setWaiting] = useState(false);

  const handleSubmit = () => {
    setWaiting(true);

    login(email, password)
      .then(({ access_token: accessToken }) => {
        localStorage.setItem('access-token', accessToken);
        localStorage.removeItem('client-token');

        setWaiting(false);

        onSignIn();
      })
      .catch(() => {
        setError('Error signing in');

        setWaiting(false);
      });
  };

  return (
    <Modal isOpen={true} onClose={onClose} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent alignSelf="flex-end">
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
                Login
              </Text>
              <Flex align="center">
                <Text fontSize="sm" mr="8px">
                  You don't have an account?
                </Text>
                <ChakraButton
                  bg="transparent"
                  color={abloBlue}
                  fontSize="sm"
                  fontWeight={400}
                  height="auto"
                  onClick={onGoToSignup}
                  padding={0}
                  textDecoration="underline"
                >
                  Sign up
                </ChakraButton>
              </Flex>
              <Text
                color="#AAA9AB"
                fontSize="sm"
                m="32px 0 16px 0"
                textAlign="left"
              >
                Login with
              </Text>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  googleLogin(credentialResponse.credential).then(
                    ({ access_token: accessToken }) => {
                      localStorage.setItem('access-token', accessToken);
                      localStorage.removeItem('client-token');

                      onSignIn();
                    }
                  );
                }}
                width="300px"
              />
              <Text
                color="#AAA9AB"
                fontSize="sm"
                m="32px 0 16px 0"
                textAlign="left"
              >
                or
              </Text>
              <FormInput
                autoComplete="new-password"
                name="Email Address"
                type="email"
                placeholder="Example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormInput
                autoComplete="new-password"
                name="Password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
              <FormControl isInvalid={!!error}>
                {error && <FormErrorMessage>{error}</FormErrorMessage>}
              </FormControl>

              <Button
                isLoading={waiting}
                onClick={handleSubmit}
                title="Sign in"
              />
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SignIn;
