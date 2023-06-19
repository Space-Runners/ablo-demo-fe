import { Flex, Button, Icon } from '@chakra-ui/react';

import { useRef, useState } from 'react';

const IconUpload = () => (
  <Icon
    width="19px"
    height="14px"
    viewBox="0 0 19 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.91634 13.6673C3.64967 13.6673 2.56912 13.2312 1.67467 12.359C0.78023 11.4812 0.333008 10.4118 0.333008 9.15065C0.333008 8.06732 0.658008 7.10065 1.30801 6.25065C1.96356 5.40065 2.81912 4.85898 3.87467 4.62565C4.22467 3.34787 4.91912 2.31454 5.95801 1.52565C7.00245 0.731206 8.18301 0.333984 9.49968 0.333984C11.1275 0.333984 12.5052 0.900651 13.633 2.03398C14.7663 3.16176 15.333 4.53954 15.333 6.16732C16.2941 6.27843 17.0886 6.6951 17.7163 7.41732C18.3497 8.12843 18.6663 8.96176 18.6663 9.91732C18.6663 10.9618 18.3025 11.8479 17.5747 12.5757C16.8469 13.3034 15.9608 13.6673 14.9163 13.6673H10.333C9.87745 13.6673 9.48579 13.5034 9.15801 13.1756C8.83023 12.8534 8.66634 12.4618 8.66634 12.0007V7.70898L7.33301 9.00065L6.16634 7.83398L9.49968 4.50065L12.833 7.83398L11.6663 9.00065L10.333 7.70898V12.0007H14.9163C15.4997 12.0007 15.9913 11.7979 16.3913 11.3923C16.7969 10.9923 16.9997 10.5007 16.9997 9.91732C16.9997 9.33398 16.7969 8.84232 16.3913 8.44232C15.9913 8.03676 15.4997 7.83398 14.9163 7.83398H13.6663V6.16732C13.6663 5.01732 13.2608 4.03398 12.4497 3.21732C11.6386 2.40621 10.6552 2.00065 9.49968 2.00065C8.34968 2.00065 7.36634 2.40621 6.54968 3.21732C5.73856 4.03398 5.33301 5.01732 5.33301 6.16732H4.91634C4.11079 6.16732 3.42467 6.45343 2.85801 7.02565C2.28579 7.59232 1.99967 8.27843 1.99967 9.08398C1.99967 9.88954 2.28579 10.584 2.85801 11.1673C3.42467 11.7229 4.11079 12.0007 4.91634 12.0007H6.99968V13.6673"
      fill="white"
    />
  </Icon>
);

const ButtonUpload = (props) => (
  <Button
    bg="#0000000"
    border="1px solid #FFFFFF"
    borderRadius="112px"
    fontWeight={600}
    fontSize="sm"
    color="#FFFFFF"
    height="32px"
    leftIcon={<IconUpload />}
    padding="6px 32px"
    _hover={{ bg: '' }}
    _active={{
      bg: '',
    }}
    _focus={{
      bg: '',
      boxShadow: '',
    }}
    {...props}
  >
    Upload Image
  </Button>
);

export default function ImagePicker(props) {
  const inputRef = useRef(null);

  const { onImageUploaded } = props;

  const handleClick = () => {
    // 👇️ open file input box on click of another element
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    console.log('fileObj is', fileObj);

    onImageUploaded(fileObj);

    // 👇️ reset file input
    event.target.value = null;

    // 👇️ is now empty
    console.log(event.target.files);

    // 👇️ can still access file object here
    console.log(fileObj);
    console.log(fileObj.name);
  };

  return (
    <Flex color="#fffffff" justify="center" padding="30px">
      <input
        style={{ display: 'none' }}
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
      />
      <ButtonUpload onClick={handleClick}></ButtonUpload>
    </Flex>
  );
}
