import { useState } from "react";

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input as ChakraInput,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";

const IconEyeClosed = () => (
  <Icon
    width="14px"
    height="15px"
    viewBox="0 0 14 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_882_20960)">
      <rect
        width="13.4805"
        height="13.4805"
        transform="translate(0.0625 0.607544)"
        fill="white"
        fillOpacity="0.01"
      />
      <g clipPath="url(#clip1_882_20960)">
        <path
          d="M11.3174 10.0751C12.7505 8.79611 13.5425 7.34696 13.5425 7.34696C13.5425 7.34696 11.0149 2.71305 6.80225 2.71305C5.99307 2.71584 5.19306 2.88444 4.45159 3.20846L5.10034 3.85805C5.64582 3.65934 6.2217 3.55699 6.80225 3.55558C8.58841 3.55558 10.0704 4.53965 11.1564 5.62567C11.6791 6.15115 12.1477 6.72781 12.555 7.34696C12.5062 7.42026 12.4522 7.50114 12.3907 7.58961C12.1085 7.99402 11.6914 8.53324 11.1564 9.06825C11.0174 9.20727 10.8725 9.3446 10.7208 9.47772L11.3174 10.0751Z"
          fill="#6C757D"
        />
        <path
          d="M9.58007 8.33778C9.76808 7.8119 9.8029 7.24345 9.68047 6.69857C9.55804 6.15368 9.2834 5.65476 8.8885 5.25986C8.4936 4.86497 7.99468 4.59032 7.4498 4.4679C6.90491 4.34547 6.33646 4.38029 5.81059 4.5683L6.50399 5.2617C6.82778 5.21536 7.15792 5.24506 7.46824 5.34845C7.77856 5.45184 8.06054 5.62609 8.29183 5.85738C8.52312 6.08867 8.69736 6.37065 8.80076 6.68097C8.90415 6.99129 8.93385 7.32142 8.88751 7.64522L9.58007 8.33778ZM7.1005 9.43222L7.79306 10.1248C7.26719 10.3128 6.69874 10.3476 6.15385 10.2252C5.60897 10.1028 5.11005 9.82812 4.71515 9.43322C4.32025 9.03832 4.04561 8.5394 3.92318 7.99451C3.80075 7.44963 3.83557 6.88118 4.02358 6.3553L4.71699 7.04871C4.67064 7.3725 4.70034 7.70264 4.80374 8.01296C4.90713 8.32328 5.08137 8.60525 5.31266 8.83654C5.54395 9.06783 5.82593 9.24208 6.13625 9.34547C6.44657 9.44887 6.77671 9.47857 7.1005 9.43222Z"
          fill="#6C757D"
        />
        <path
          d="M2.88448 5.21536C2.73283 5.35017 2.58707 5.48666 2.44805 5.62567C1.92539 6.15115 1.45684 6.72781 1.04946 7.34696L1.21375 7.58961C1.496 7.99402 1.91305 8.53324 2.44805 9.06825C3.53408 10.1543 5.01693 11.1383 6.80225 11.1383C7.4055 11.1383 7.97336 11.0263 8.50416 10.835L9.1529 11.4855C8.41142 11.8095 7.61141 11.9781 6.80225 11.9809C2.5896 11.9809 0.0620117 7.34696 0.0620117 7.34696C0.0620117 7.34696 0.853147 5.89697 2.28713 4.61885L2.88364 5.21621L2.88448 5.21536ZM11.5592 12.7004L1.44881 2.59004L2.04533 1.99353L12.1557 12.1039L11.5592 12.7004Z"
          fill="#6C757D"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_882_20960">
        <rect
          width="13.4805"
          height="13.4805"
          fill="white"
          transform="translate(0.0625 0.607544)"
        />
      </clipPath>
      <clipPath id="clip1_882_20960">
        <rect
          width="13.4805"
          height="13.4805"
          fill="white"
          transform="translate(0.0625 0.607544)"
        />
      </clipPath>
    </defs>
  </Icon>
);

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
      color: "#6C757D",
    }}
    {...props}
  />
);

const PasswordInput = (props) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input type={show ? "text" : "password"} placeholder="Enter password" {...props} />
      <InputRightElement>
        <Button bg="transparent" minW="none" size="sm" onClick={handleClick} w="20px">
          {show ? <IconEyeClosed /> : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

function FormInput(props) {
  const { error, isPassword, name, ...rest } = props;

  return (
    <FormControl w="100%">
      <FormLabel display="flex" fontSize="14px" fontWeight={400} color="#212529" mb="4px">
        {name}
        <Text color="#DC3545" ml="4px">
          *
        </Text>
      </FormLabel>
      {isPassword ? <PasswordInput {...rest} /> : <Input {...rest} />}
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
}

export default FormInput;
