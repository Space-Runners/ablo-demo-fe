import {
  Flex,
  Button,
  HStack,
  Icon,
  Image,
  Input as ChakraInput,
  Text,
} from '@chakra-ui/react';

import { useState } from 'react';

import { generateImage } from '@/api/image-generator';

const ENGINE_ID = 'stable-diffusion-xl-beta-v2-2-2';

const IconGenerate = () => (
  <Icon
    width="22px"
    height="22px"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 3L10.5 8.5L16 11L10.5 13.5L8 19L5.5 13.5L0 11L5.5 8.5L8 3ZM8 7.83L7 10L4.83 11L7 12L8 14.17L9 12L11.17 11L9 10L8 7.83ZM18 8L16.74 5.26L14 4L16.74 2.75L18 0L19.25 2.75L22 4L19.25 5.26L18 8ZM18 22L16.74 19.26L14 18L16.74 16.75L18 14L19.25 16.75L22 18L19.25 19.26L18 22Z"
      fill="black"
    />
  </Icon>
);

const Input = (props) => (
  <ChakraInput
    bg="#000000"
    border="1px solid #383838"
    borderRadius="4px"
    color="#FFFFFF"
    fontSize="sm"
    fontWeight={400}
    padding="8px"
    {...props}
  />
);

const ButtonGenerate = (props) => (
  <Button
    bg="#EAEAEA"
    border="1px solid #FFFFFF"
    borderRadius="112px"
    fontWeight={600}
    fontSize="sm"
    color="#212121"
    height="40px"
    leftIcon={<IconGenerate />}
    padding="8px 16px"
    _hover={{ bg: '' }}
    _active={{
      bg: '',
    }}
    _focus={{
      bg: '',
      boxShadow: '',
    }}
    {...props}
  />
);

export default function ImageGenerator({ onImageGenerated }) {
  const [prompt, setPrompt] = useState('');
  const [waiting, setWaiting] = useState(false);

  const [images, setImages] = useState([]);

  const handleGenerate = () => {
    setWaiting(true);

    const requestParams = {
      engineId: ENGINE_ID,
      samples: 3,
      text: [{ text: prompt }],
    };

    generateImage(requestParams)
      .then((images) => {
        setWaiting(false);

        setImages(images);
      })
      .catch(() => {
        setWaiting(false);
      });
  };
  return (
    <Flex
      color="#ffffff"
      direction="column"
      justify="center"
      padding="30px 14px"
      textAlign="center"
    >
      <Text fontSize="md" fontWeight={400} mb="5px">
        {images.length ? 'Select Image' : 'Input your prompts'}
      </Text>
      {images.length ? (
        <HStack>
          {images.map((imageUrl) => (
            <Image
              h={149}
              key={imageUrl}
              w={110}
              src={imageUrl}
              alt="Generated image"
              onClick={() => onImageGenerated(imageUrl)}
            />
          ))}
        </HStack>
      ) : (
        <Input
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          w="307px"
        />
      )}
      <ButtonGenerate isLoading={waiting} mt="34px" onClick={handleGenerate}>
        {images.length ? 'Generate again' : 'Generate artwork'}
      </ButtonGenerate>
    </Flex>
  );
}
