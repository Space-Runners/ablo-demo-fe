import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Flex,
  HStack,
  Image,
  Text,
} from '@chakra-ui/react';

import { useState } from 'react';

import { isEmpty } from 'lodash';

import { generateImage } from '@/api/image-generator';
import Button from '@/components/Button';

import {
  AiImage,
  AiImageOptions,
  TextToImageRequest,
} from '@/components/types';

import SelectStyle from './select-style';
import SelectColorPalette from './select-color-palette';
import AddSubject from './add-subject';

import Progress from './components/Progress';

import ImageOverview from '../ai-image-overview';

const defaultParams = {
  style: 'Botanical',
  mood: '',
  subject: '',
  keywords: [],
  background: true,
};

const accordionButtonStyles = {
  borderRadius: 0,
  color: '#1A1A1A',
  padding: '8px 14px',
  _focus: {
    boxShadow: 'none',
  },
};

type ImageGeneratorProps = {
  aiImage: AiImage;
  onGeneratedImagePreview: (image: AiImage) => void;
  onGeneratedImageSelected: (image: AiImage) => void;
  onGeneratedImageRemoved: (imageUrl: string) => void;
};

export default function ImageGenerator({
  aiImage,
  onGeneratedImagePreview,
  onGeneratedImageSelected,
  onGeneratedImageRemoved,
}: ImageGeneratorProps) {
  const [waiting, setWaiting] = useState(false);

  const [options, setOptions] = useState<AiImageOptions>(defaultParams);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [images, setImages] = useState([]);

  const { background, keywords, style, mood, subject } = options;

  const handleNewArtwork = () => {
    handleReset();

    onGeneratedImageRemoved(selectedImage);
  };

  const handlePlaceArtwork = () => {
    onGeneratedImageSelected({
      options,
      url: selectedImage,
    });

    handleReset();
  };

  const handleReset = () => {
    setImages([]);
    setSelectedImage(null);
    setOptions(defaultParams);

    setIsEditing(false);
  };

  const handleUpdate = (updates) => setOptions({ ...options, ...updates });

  const handleEdit = () => {
    const { options } = aiImage;

    setOptions(options);
    setImages([]);
    setSelectedImage(null);

    setIsEditing(true);
  };

  const handleRemove = () => {
    handleReset();

    onGeneratedImageRemoved(aiImage.url);
  };

  const handleGenerate = () => {
    setWaiting(true);
    setImages([]);

    const requestParams = {
      background,
      style,
      subjectSuggestions: keywords,
      freeText: subject,
    } as TextToImageRequest;

    if (mood !== 'noMood') {
      requestParams.mood = mood;
    }

    generateImage(requestParams)
      .then((images) => {
        setWaiting(false);

        setImages(images);
        setSelectedImage(images[0]);

        onGeneratedImagePreview({ url: images[0], options });
      })
      .catch(() => {
        setWaiting(false);
      });
  };

  if (aiImage && !isEditing) {
    return (
      <ImageOverview
        aiImage={aiImage}
        onEdit={handleEdit}
        onRemove={handleRemove}
      />
    );
  }

  if (waiting) {
    return <Progress />;
  }

  console.log('Images', images);

  if (images.length) {
    return (
      <Box padding="8px 14px">
        <Text mb="22px" textTransform="uppercase">
          Select image
        </Text>
        <HStack justify="center" mb="20px">
          {images.map((imageUrl) => (
            <Image
              border={imageUrl === selectedImage ? '4px solid #000000' : 'none'}
              borderRadius="5px"
              h={117}
              key={imageUrl}
              w="108px"
              src={imageUrl}
              alt="Generated image"
              onClick={() => {
                setSelectedImage(imageUrl);
                onGeneratedImagePreview({ url: imageUrl, options });
              }}
            />
          ))}
        </HStack>
        <Button onClick={handlePlaceArtwork} title="Place artwork" w="100%" />
        <Flex align="center" mt="14px" pb="14px">
          <Button
            flex={1}
            onClick={handleGenerate}
            outlined
            title="Generate similar"
          />
          <Button
            flex={1}
            ml="10px"
            onClick={handleNewArtwork}
            outlined
            title="New"
          />
        </Flex>
      </Box>
    );
  }

  return (
    <Box pb="26px">
      <Accordion defaultIndex={[0, 1]} allowMultiple>
        <AccordionItem borderTopWidth={0}>
          <h2>
            <AccordionButton {...accordionButtonStyles}>
              <Box as="span" flex="1" textAlign="left">
                Style
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <SelectStyle
              onChange={(style) => handleUpdate({ style })}
              selectedValue={style}
            />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem borderColor="transparent" borderTopWidth={0}>
          <h2>
            <AccordionButton {...accordionButtonStyles}>
              <Box as="span" flex="1" textAlign="left">
                Color Palette
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <SelectColorPalette
              onChange={(mood) => handleUpdate({ mood })}
              selectedValue={mood}
              style={style}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <AddSubject
        background={background}
        onChangeBackground={(background) => handleUpdate({ background })}
        onChange={(subject) => handleUpdate({ subject })}
        keywords={keywords}
        onUpdateKeywords={(keywords) => handleUpdate({ keywords })}
        style={style}
        value={subject}
      />
      <Box padding="0 14px" mt="22px">
        <Button
          disabled={!subject && isEmpty(keywords)}
          onClick={handleGenerate}
          title="Generate"
          w="100%"
        />
      </Box>
    </Box>
  );
}
