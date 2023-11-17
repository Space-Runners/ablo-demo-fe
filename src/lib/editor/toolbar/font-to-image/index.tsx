import { Box, Input, Text } from '@chakra-ui/react';

import { useEffect, useRef, useState } from 'react';

import Button from '../../../components/Button';

import { AiImage, Style, FontToImageRequest } from '../../../types';

import StyleSelector from '../components/style-selector';

import ImagesPreview from '../components/ImagesPreview';
import Progress from '../components/Progress';

const defaultParams = {
  styleId: '',
  text: '',
};

type FontToImageGeneratorProps = {
  onGeneratedImageSelected: (image: AiImage) => void;
  getStyles: (type: string) => Promise<Style[]>;
  generateImageFromFont: (options: FontToImageRequest) => Promise<string[]>;
  onMaxHeightChange: (maxHeight: number) => void;
};

export default function FontToImageGenerator({
  onGeneratedImageSelected,
  getStyles,
  generateImageFromFont,
  onMaxHeightChange,
}: FontToImageGeneratorProps) {
  const subjectInputRef = useRef(null);

  const [styles, setStyles] = useState<Style[]>([]);
  const [waiting, setWaiting] = useState(false);

  const [options, setOptions] = useState<FontToImageRequest>(defaultParams);

  const [selectedImage, setSelectedImage] = useState(null);

  const [images, setImages] = useState([]);

  const { styleId, text } = options;

  const style = styles.find(({ id }) => id === styleId);

  useEffect(() => {
    getStyles('font').then((styles) => {
      setStyles(styles);
    });

    subjectInputRef.current?.focus();
  }, [getStyles]);

  const handlePlaceArtwork = () => {
    onGeneratedImageSelected({
      options: { ...options, style: style.name },
      url: selectedImage,
    });
  };

  const handleReset = () => {
    setImages([]);
    setSelectedImage(null);

    onMaxHeightChange(null);

    const options = { ...defaultParams };

    setOptions(options);
  };

  const handleUpdate = (updates) => setOptions({ ...options, ...updates });

  const handleGenerate = () => {
    setWaiting(true);
    setImages([]);

    onMaxHeightChange(null);

    const requestParams = {
      styleId: styles[0].id,
      text,
    } as FontToImageRequest;

    generateImageFromFont(requestParams)
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
        <Text as="b" color="#1A1A1A" fontSize="sm">
          Enter your text
        </Text>
        <Input
          bg="#F5F5F5"
          border="none"
          borderRadius="11px"
          h="42px"
          onChange={(e) => handleUpdate({ text: e.target.value.slice(0, 15) })}
          ref={subjectInputRef}
          value={text}
          placeholder="Enter text (max 15 characters)"
        />
      </Box>
      <StyleSelector
        styles={styles}
        selectedStyle={styleId}
        onSelectedStyle={(styleId) => {
          handleUpdate({ styleId });
        }}
        hideColorPalettes
      />
      <Box padding="0 17px">
        <Button isDisabled={!text} onClick={handleGenerate} title={'Generate'} w="100%" />
      </Box>
    </Box>
  );
}
