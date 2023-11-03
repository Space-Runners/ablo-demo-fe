import { Button, Center, Icon, VStack, Text } from '@chakra-ui/react';

import { useRef } from 'react';

const IconUpload = () => (
  <Icon
    xmlns="http://www.w3.org/2000/svg"
    width="24px"
    height="25px"
    viewBox="0 0 24 25"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 14.239C3.55228 14.239 4 14.6867 4 15.239V19.239C4 19.5042 4.10536 19.7586 4.29289 19.9461C4.48043 20.1337 4.73478 20.239 5 20.239H19C19.2652 20.239 19.5196 20.1337 19.7071 19.9461C19.8946 19.7586 20 19.5042 20 19.239V15.239C20 14.6867 20.4477 14.239 21 14.239C21.5523 14.239 22 14.6867 22 15.239V19.239C22 20.0347 21.6839 20.7977 21.1213 21.3603C20.5587 21.9229 19.7957 22.239 19 22.239H5C4.20435 22.239 3.44129 21.9229 2.87868 21.3603C2.31607 20.7977 2 20.0347 2 19.239V15.239C2 14.6867 2.44772 14.239 3 14.239Z"
      fill="#064AC4"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.2929 2.53191C11.6834 2.14138 12.3166 2.14138 12.7071 2.53191L17.7071 7.53191C18.0976 7.92243 18.0976 8.5556 17.7071 8.94612C17.3166 9.33664 16.6834 9.33664 16.2929 8.94612L12 4.65323L7.70711 8.94612C7.31658 9.33664 6.68342 9.33664 6.29289 8.94612C5.90237 8.5556 5.90237 7.92243 6.29289 7.53191L11.2929 2.53191Z"
      fill="#064AC4"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2.23901C12.5523 2.23901 13 2.68673 13 3.23901V15.239C13 15.7913 12.5523 16.239 12 16.239C11.4477 16.239 11 15.7913 11 15.239V3.23901C11 2.68673 11.4477 2.23901 12 2.23901Z"
      fill="#064AC4"
    />
  </Icon>
);

type ImageUploadProps = {
  onFileUploaded?: (file: File) => void;
  onImageUploaded?: (image: HTMLImageElement) => void;
};

export default function ImageUpload({ onFileUploaded, onImageUploaded }: ImageUploadProps) {
  const inputRef = useRef(null);

  const handleClick = () => {
    // 👇️ open file input box on click of another element
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
      const image = new Image();

      image.src = e.target.result as string;

      image.onload = function () {
        onImageUploaded(image);
      };
    };

    if (onImageUploaded) {
      reader.readAsDataURL(fileObj);
    }

    if (onFileUploaded) {
      onFileUploaded(fileObj);
    }

    // 👇️ reset file input
    event.target.value = null;
  };

  return (
    <Center
      borderRadius="15px"
      border="1px dashed #BDD0FF"
      background="#F3F7FF"
      color="#fffffff"
      padding="30px"
      width="100%"
      height="130px"
    >
      <input style={{ display: 'none' }} ref={inputRef} type="file" onChange={handleFileChange} />
      <Button bg="transparent" onClick={handleClick}>
        <VStack>
          <IconUpload />
          <Text as="b" color="rgba(0, 0, 0, 0.64)" fontSize="11px">
            Click to upload your file
          </Text>
        </VStack>
      </Button>
    </Center>
  );
}
