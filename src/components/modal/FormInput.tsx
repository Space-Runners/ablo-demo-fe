import { useState } from 'react';

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';

import IconEyeClosed from '@/components/icons/IconEyeClosed';

const Input = (props) => (
  <ChakraInput
    padding="7px 12px"
    height="36px"
    bg="#FFFFFF"
    border="1px solid #CED4DA"
    borderRadius="4px"
    variant="auth"
    fontSize="md"
    fontWeight="400"
    _placeholder={{
      color: '#6C757D',
    }}
    {...props}
  />
);

const PasswordInput = (props) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input type={show ? 'text' : 'password'} placeholder="Enter password" {...props} />
      <InputRightElement>
        <Button bg="transparent" minW="none" size="sm" onClick={handleClick} w="20px">
          {show ? <IconEyeClosed /> : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

function FormInput(props) {
  const { error, isPassword, isOptional = false, name, ...rest } = props;

  return (
    <FormControl w="100%">
      <FormLabel display="flex" fontSize="14px" fontWeight={400} color="#212529" mb="4px">
        {name}
        {!isOptional ? (
          <Text color="#DC3545" ml="4px">
            *
          </Text>
        ) : null}
      </FormLabel>
      {isPassword ? <PasswordInput {...rest} /> : <Input {...rest} />}
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
}

export default FormInput;
