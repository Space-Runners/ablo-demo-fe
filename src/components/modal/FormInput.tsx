import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
} from '@chakra-ui/react';

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

/* const PasswordInput = (props) => {
  return (
    <InputGroup size="md">
      <Input type="text" {...props} />
      {<InputRightElement display="flex" alignItems="center" mt="4px">
          <Icon
            color="gray.400"
            _hover={{ cursor: 'pointer' }}
            as={showPassword ? RiEyeCloseLine : MdOutlineRemoveRedEye}
            onClick={() => setShowPassword(!showPassword)}
          />
        </InputRightElement>}
    </InputGroup>
  );
}; */

function FormInput(props) {
  const { error, name, ...rest } = props;

  console.log('Rest', rest);
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
      <Input {...rest} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
}

export default FormInput;
