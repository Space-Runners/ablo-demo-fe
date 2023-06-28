import { useState } from 'react';

import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
} from '@chakra-ui/react';

import Button from '@/components/Button';

import { GoogleLogin } from '@react-oauth/google';

import { googleLogin, signUp } from '@/api/auth';

import FormInput from './components/Input';

const IconClose = () => (
  <Icon
    width="36px"
    height="36px"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_1499_18365)">
      <rect width="36" height="36" fill="black" />
      <path
        d="M27 9L9 27"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 9L27 27"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1499_18365">
        <rect width="36" height="36" fill="white" />
      </clipPath>
    </defs>
  </Icon>
);

const ButtonClose = (props) => (
  <Box as="button" {...props}>
    <IconClose />
  </Box>
);

type Props = {
  onClose: () => void;
};

function SignUp({ onClose }: Props) {
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
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
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
                textAlign="left"
                textTransform="uppercase"
              >
                Sign up <br /> to continue
              </Text>
              {success ? (
                <Alert status="success">
                  <AlertIcon />
                  We have sent you a verification email. Please check your
                  inbox.
                </Alert>
              ) : null}
              <Text color="#AAA9AB" fontSize="sm" m="40px 0" textAlign="left">
                Sign up with
              </Text>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);

                  return;
                  googleLogin(credentialResponse.credential).then(
                    ({ access_token: accessToken }) => {
                      localStorage.setItem('access-token', accessToken);

                      window.location.href = '/';
                    }
                  );
                }}
                width="300px"
              />
              <Text color="#AAA9AB" fontSize="sm" m="40px 0" textAlign="left">
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
              >
                Sign up
              </Button>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SignUp;
