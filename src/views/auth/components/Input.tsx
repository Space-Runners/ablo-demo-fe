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
    padding="5px 0"
    height="30px"
    bg="#FFFFFF"
    border="none"
    borderBottom="1px solid #404040"
    borderRadius={0}
    variant="auth"
    fontSize="md"
    mb="20px"
    fontWeight="400"
    _placeholder={{
      fontSize: 'sm',
    }}
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
        fontSize="11px"
        fontWeight={400}
        color="#959595"
        mb="8px"
      >
        {name}
      </FormLabel>
      {type === 'password' ? <PasswordInput {...rest} /> : <Input {...rest} />}
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
}

export default FormInput;
