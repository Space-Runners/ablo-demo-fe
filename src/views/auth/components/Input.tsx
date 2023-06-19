import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input as ChakraInput,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useState } from 'react';

import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';

const Input = (props) => (
  <ChakraInput
    padding="12px 16px"
    height="43px"
    bg="#F0F0F0"
    border="none"
    borderRadius="4px"
    variant="auth"
    fontSize="md"
    mb="10px"
    fontWeight="400"
    {...props}
  />
);

const PasswordInput = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputGroup size="md">
      <Input type={showPassword ? 'text' : 'password'} {...props} />
      <InputRightElement display="flex" alignItems="center" mt="4px">
        <Icon
          color="gray.400"
          _hover={{ cursor: 'pointer' }}
          as={showPassword ? RiEyeCloseLine : MdOutlineRemoveRedEye}
          onClick={() => setShowPassword(!showPassword)}
        />
      </InputRightElement>
    </InputGroup>
  );
};

function FormInput(props) {
  const { error, name, type, ...rest } = props;

  return (
    <FormControl w="100%">
      <FormLabel
        display="flex"
        fontSize="sm"
        fontWeight="600"
        color="#212121"
        mb="4px"
      >
        {name}
      </FormLabel>
      {type === 'password' ? <PasswordInput {...rest} /> : <Input {...rest} />}
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
}

export default FormInput;
