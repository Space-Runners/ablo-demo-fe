import {
  Box,
  Button as ChakraButton,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';

import Cropper from 'react-easy-crop';

import Button from '../../../components/Button';
import IconTrash from '../../../components/icons/IconTrash';
import ImageUpload from '../../../components/upload/ImageUpload';

import { AiImage, Style, ImageToImageRequest } from '../../../types';

import StyleSelector from '../components/style-selector';

import ImagesPreview from '../components/ImagesPreview';
import Progress from '../components/Progress';

import getCroppedImg from './cropImage';

const defaultParams = {
  styleId: '',
  imageFile: null,
};

const IMAGE_WIDTH = 350;

type ImageToImageGeneratorProps = {
  onGeneratedImageSelected: (image: AiImage) => void;
  getStyles: (type: string) => Promise<Style[]>;
  generateImageFromImage: (options: ImageToImageRequest) => Promise<string[]>;
  hideStyles: boolean;
  onMaxHeightChange: (maxHeight: number) => void;
};

export default function ImageToImageGenerator({
  onGeneratedImageSelected,
  getStyles,
  generateImageFromImage,
  hideStyles,
  onMaxHeightChange,
}: ImageToImageGeneratorProps) {
  const [styles, setStyles] = useState<Style[]>([]);
  const [waiting, setWaiting] = useState(false);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const toast = useToast();

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedInputImage, setSelectedInputImage] = useState(null);

  const [options, setOptions] = useState<ImageToImageRequest>(defaultParams);

  const [selectedImage, setSelectedImage] = useState(null);

  const [images, setImages] = useState([]);

  const { styleId, toneId } = options;

  const style = styles.find(({ id }) => id === styleId);

  useEffect(() => {
    getStyles('image').then((styles) => {
      setStyles(styles);

      if (styles?.length === 1) {
        setOptions((options) => ({ ...options, styleId: styles[0].id }));
      }
    });
  }, [getStyles]);

  const onCropComplete = (_croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handlePlaceArtwork = () => {
    onGeneratedImageSelected({
      options: { ...options, style: style.name },
      url: selectedImage,
    });
  };

  const handleImageUploaded = (image) => {
    setUploadedImage({ file: image, preview: URL.createObjectURL(image) });

    onMaxHeightChange(650);
  };

  const handleReset = () => {
    setImages([]);
    setSelectedImage(null);

    setSelectedInputImage(null);

    onMaxHeightChange(null);

    const options = { ...defaultParams };

    if (styles?.length === 1) {
      options.styleId = styles[0].id;
    }
    setOptions(options);
  };

  const handleUpdate = (updates) => setOptions({ ...options, ...updates });

  const handleSelectUploadedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(uploadedImage.preview, croppedAreaPixels);

      setSelectedInputImage({
        preview: URL.createObjectURL(croppedImage),
        file: new File([croppedImage], 'image', { type: 'image/png' }),
      });

      setUploadedImage(null);
    } catch (e) {
      console.error(e);

      toast({
        title: 'Error cropping image',
        description: e.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleGenerate = () => {
    setWaiting(true);
    setImages([]);

    onMaxHeightChange(null);

    const requestParams = {
      styleId,
      imageFile: selectedInputImage.file,
    } as ImageToImageRequest;

    generateImageFromImage(requestParams)
      .then((images) => {
        setWaiting(false);

        setImages(images);
        setSelectedImage(images[0]);
      })
      .catch(() => {
        setWaiting(false);
      });
  };

  if (waiting) {
    return (
      <Box padding="8px 14px">
        <Progress duration={30} />
      </Box>
    );
  }

  if (images.length) {
    return (
      <ImagesPreview
        images={images}
        selectedImage={selectedImage}
        onSelectedImage={setSelectedImage}
        onPlaceArtwork={handlePlaceArtwork}
        onGenerateSimilar={handleGenerate}
        onNewArtwork={handleReset}
      />
    );
  }

  return (
    <Box
      mt="20px"
      pb="26px"
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          handleGenerate();
        }
      }}
    >
      <Box padding="0 17px">
        <Text alignSelf="flex-start" as="b" color="black.600" fontSize="18px">
          Photo transformer
        </Text>
        {selectedInputImage ? (
          <Flex align="center" justify="space-between" mb="12px" mt="30px" w="100%">
            <HStack>
              <Image src={selectedInputImage.preview} height={83} width={75} />
              <VStack align="flex-start">
                <Text color="black.600" fontSize="md">
                  {selectedInputImage.file.name}
                </Text>
                <Text color="#959392" fontSize="sm">
                  {(selectedInputImage.file.size / 1024).toFixed(2)}kb
                </Text>
              </VStack>
            </HStack>
            <ChakraButton
              borderRadius="7px"
              bg="#C2C2C2"
              h="32px"
              onClick={() => setSelectedInputImage(null)}
              padding="8px"
              w="32px"
            >
              <IconTrash />
            </ChakraButton>
          </Flex>
        ) : (
          <VStack mb="50px">
            <Text
              alignSelf="flex-start"
              as="b"
              color="black.200"
              fontSize="13px"
              mb="18px"
              mt="9px"
            >
              Upload image
            </Text>
            {uploadedImage ? (
              <Box position="relative" w={`${IMAGE_WIDTH}px`} h={`${IMAGE_WIDTH}px`}>
                <Cropper
                  image={uploadedImage.preview}
                  crop={crop}
                  cropSize={{
                    width: IMAGE_WIDTH,
                    height: IMAGE_WIDTH,
                  }}
                  zoom={zoom}
                  aspect={4 / 3}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </Box>
            ) : null}
            {selectedInputImage ? <Image src={selectedInputImage} /> : null}
            <ImageUpload onFileUploaded={handleImageUploaded} />
          </VStack>
        )}
      </Box>
      {!hideStyles && selectedInputImage ? (
        <StyleSelector
          styles={styles}
          selectedStyle={styleId}
          onSelectedStyle={(styleId) => {
            handleUpdate({ styleId });
          }}
          selectedColorPalette={toneId}
          onSelectedColorPalette={(toneId) => {
            handleUpdate({ toneId });
          }}
          hideColorPalettes
        />
      ) : null}
      <Box padding="0 17px">
        <Button
          isDisabled={!uploadedImage && !selectedInputImage}
          onClick={selectedInputImage ? handleGenerate : handleSelectUploadedImage}
          title={selectedInputImage ? 'Generate' : 'Next'}
          w="100%"
        />
      </Box>
    </Box>
  );
}
