import { useState } from "react";

import {
  Alert,
  AlertIcon,
  Button as ChakraButton,
  Flex,
  FormControl,
  FormErrorMessage,
  VStack,
  Text,
} from "@chakra-ui/react";

import FormInput from "@/components/modal/FormInput";

import { GoogleLogin } from "@react-oauth/google";

import { googleLogin, signUp } from "@/api/auth";

import Button from "./components/ButtonCTA";
import ModalContainer from "./components/ModalContainer";

type Props = {
  onClose: () => void;
  onGoToSignin: () => void;
  onSignUp: () => void;
};

function SignUp({ onClose, onGoToSignin, onSignUp }: Props) {
  // Chakra color mode

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (!firstName || !lastName || !email || !password) {
      setError("Please fill all required fields");

      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords have to match");

      return;
    }

    setError("");
    setWaiting(true);
    setSuccess(false);

    signUp(email, password, firstName, lastName)
      .then(() => {
        setWaiting(false);
        setSuccess(true);

        onClose();
      })
      .catch(() => {
        setError("Error signing up");
        setWaiting(false);
      });
  };

  return (
    <ModalContainer onClose={onClose} title="Create an account" subtitle="Start your journey!">
      <VStack mb="12px" spacing="12px" maxW="350px">
        {success ? (
          <Alert height="60px" status="success">
            <AlertIcon />
            We have sent you a verification email. Please check your inbox.
          </Alert>
        ) : null}
        <FormControl isInvalid={!!error}>
          {error && <FormErrorMessage textAlign="center">{error}</FormErrorMessage>}
        </FormControl>
        <FormInput
          name="First Name"
          placeholder="Enter your first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <FormInput
          name="Last Name"
          placeholder="Enter your last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <FormInput
          autoComplete="new-password"
          name="Email Address"
          type="email"
          placeholder="Enter your email"
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
        <FormInput
          autoComplete="new-password"
          name="Confirm Password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          //  type="password"
        />
        <Button isLoading={waiting} onClick={handleSubmit} title="Get started" />
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            googleLogin(credentialResponse.credential).then(({ access_token: accessToken }) => {
              localStorage.setItem("access-token", accessToken);
              localStorage.removeItem("client-token");

              onSignUp();
            });
          }}
          width="350px"
        />
        <Flex align="center">
          <Text color="#6C757D" fontSize="md" mr="4px">
            Already have an account?
          </Text>
          <ChakraButton
            bg="transparent"
            color="#0D6EFD"
            fontSize="md"
            fontWeight={400}
            height="auto"
            onClick={onGoToSignin}
            padding={0}
          >
            Log in
          </ChakraButton>
        </Flex>
      </VStack>
    </ModalContainer>
  );
}

export default SignUp;
