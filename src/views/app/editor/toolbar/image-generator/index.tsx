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
  Input,
  Text,
} from '@chakra-ui/react';

import { useRef, useState } from 'react';

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
  tone: '',
  subject: '',
  keywords: [],
  background: true,
};

const accordionButtonStyles = {
  borderRadius: 0,
  color: '#1A1A1A',
  padding: '12px 14px',
  _focus: {
    boxShadow: 'none',
  },
};

type ImageGeneratorProps = {
  aiImage: AiImage;
  isEditingAiImage: boolean;
  onGeneratedImagePreview: (image: AiImage) => void;
  onGeneratedImageSelected: (image: AiImage) => void;
  onGeneratedImageRemoved: (imageUrl: string) => void;
  onSetIsEditingAiImage: (isEditing: boolean) => void;
};

export default function ImageGenerator({
  aiImage,
  isEditingAiImage,
  onGeneratedImagePreview,
  onGeneratedImageSelected,
  onGeneratedImageRemoved,
  onSetIsEditingAiImage,
}: ImageGeneratorProps) {
  const tonesRef = useRef(null);
  const subjectInputRef = useRef(null);

  const [waiting, setWaiting] = useState(false);

  const [options, setOptions] = useState<AiImageOptions>(defaultParams);

  const [selectedImage, setSelectedImage] = useState(null);

  const [images, setImages] = useState([]);

  const { background, keywords, style, tone, subject } = options;

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

    onSetIsEditingAiImage(false);
  };

  const handleUpdate = (updates) => setOptions({ ...options, ...updates });

  const handleEdit = () => {
    const { options } = aiImage;

    setOptions(options);
    setImages([]);
    setSelectedImage(null);

    onSetIsEditingAiImage(true);
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

    if (tone !== 'noTone') {
      requestParams.tone = tone;
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

  if (aiImage && !isEditingAiImage) {
    return (
      <Box padding="8px 14px">
        <ImageOverview
          aiImage={aiImage}
          onEdit={handleEdit}
          onRemove={handleRemove}
        />
      </Box>
    );
  }

  if (waiting) {
    return (
      <Box padding="8px 14px">
        <Progress />
      </Box>
    );
  }

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
        <AccordionItem borderTopWidth={0} paddingBottom="8px">
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
              onChange={(style) => {
                tonesRef.current?.scrollIntoView({ behavior: 'smooth' });

                handleUpdate({ style });
              }}
              selectedValue={style}
            />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem
          borderColor="transparent"
          borderTopWidth={0}
          paddingBottom="10px"
        >
          <h2>
            <AccordionButton {...accordionButtonStyles}>
              <Box as="span" flex="1" textAlign="left" ref={tonesRef}>
                Color Filter
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <SelectColorPalette
              onChange={(tone) => {
                subjectInputRef.current?.focus();

                handleUpdate({ tone });
              }}
              selectedValue={tone}
              style={style}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <AddSubject
        background={background}
        onChangeBackground={(background) => handleUpdate({ background })}
        keywords={keywords}
        onUpdateKeywords={(keywords) => handleUpdate({ keywords })}
        style={style}
      >
        <Input
          bg="#F5F5F5"
          border="none"
          borderRadius="11px"
          h="42px"
          onChange={(e) => handleUpdate({ subject: e.target.value })}
          ref={subjectInputRef}
          value={subject}
          placeholder="Write subject..."
        />
      </AddSubject>
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
