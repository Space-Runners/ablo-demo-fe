import { Flex, Button, Icon } from '@chakra-ui/react';

import { useRef } from 'react';

import { saveTemplate } from '@/api/image-generator';

const IconUpload = () => (
  <Icon
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1817_25973)">
      <path
        d="M4 17V19C4 19.5304 4.21071 20.0391 4.58579 20.4142C4.96086 20.7893 5.46957 21 6 21H18C18.5304 21 19.0391 20.7893 19.4142 20.4142C19.7893 20.0391 20 19.5304 20 19V17"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 9L12 4L17 9"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 4V16"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1817_25973">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </Icon>
);

const ButtonUpload = (props) => (
  <Button
    bg="#FFFFFF"
    borderRadius="50%"
    height="32px"
    padding="13px"
    {...props}
  >
    <IconUpload />
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

    saveTemplate('Upload file', fileObj);

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
