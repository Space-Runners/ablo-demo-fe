import { useState } from 'react';

import {
  Alert,
  AlertIcon,
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
import ButtonClose from '@/components/modal/ButtonCloseModal';
import FormInput from '@/components/modal/FormInput';

import { GoogleLogin } from '@react-oauth/google';

import { googleLogin, signUp } from '@/api/auth';
import Colors from '@/theme/colors';

const { abloBlue } = Colors;

type Props = {
  onClose: () => void;
  onGoToSignin: () => void;
  onSignUp: () => void;
};

function SignUp({ onClose, onGoToSignin, onSignUp }: Props) {
  // Chakra color mode

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [waiting, setWaiting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setError('Passwords have to match');

      return;
    }

    setError('');
    setWaiting(true);
    setSuccess(false);

    signUp(email, password, firstName, lastName)
      .then(() => {
        setWaiting(false);
        setSuccess(true);

        onClose();
      })
      .catch((e) => {
        console.log(e);
        setError('Error signing up');
        setWaiting(false);
      });
  };

  console.log('Error', error, waiting, success);

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
                Sign up <br /> to continue
              </Text>
              <Flex align="center">
                <Text fontSize="sm" mr="8px">
                  Already have an account?
                </Text>
                <ChakraButton
                  bg="transparent"
                  color={abloBlue}
                  fontSize="sm"
                  fontWeight={400}
                  height="auto"
                  onClick={onGoToSignin}
                  padding={0}
                  textDecoration="underline"
                >
                  Log in
                </ChakraButton>
              </Flex>
              {success ? (
                <Alert status="success">
                  <AlertIcon />
                  We have sent you a verification email. Please check your
                  inbox.
                </Alert>
              ) : null}
              <Text
                color="#AAA9AB"
                fontSize="sm"
                m="32px 0 16px 0"
                textAlign="left"
              >
                Sign up with
              </Text>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);

                  googleLogin(credentialResponse.credential).then(
                    ({ access_token: accessToken }) => {
                      localStorage.setItem('access-token', accessToken);
                      localStorage.removeItem('client-token');

                      onSignUp();
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
                name="First Name"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <FormInput
                name="Last Name"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <FormInput
                autoComplete="new-password"
                name="Password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                //  type="password"
              />
              <FormInput
                autoComplete="new-password"
                name="Confirm Password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                //  type="password"
              />
              <FormControl isInvalid={!!error}>
                {error && <FormErrorMessage>{error}</FormErrorMessage>}
              </FormControl>
              <Text
                color="rgba(33, 33, 33, 0.7)"
                fontSize="12px"
                fontWeight={400}
                mb="24px"
                mt="10px"
                textAlign="left"
              >
                By accessing or using our website, you agree to comply with
                these Terms and Conditions, including our intellectual property
                rights and usage restrictions.
              </Text>
              <Button
                isLoading={waiting}
                onClick={handleSubmit}
                title="Sign Up"
              />
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SignUp;
