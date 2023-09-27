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

import { useEffect, useRef, useState } from 'react';

import { isEmpty } from 'lodash';

import { generateImage, getOptions } from '@/api/image-generator';
import Button from '@/components/Button';

import {
  AiImage,
  AiImageOptions,
  ImageGenerationOptions,
  TextToImageRequest,
} from '@/components/types';

import SelectStyle from './select-style';
import SelectColorPalette from './select-color-palette';
import AddSubject from './add-subject';

import Progress from './components/Progress';

const defaultParams = {
  style: '',
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
  onGeneratedImageSelected: (image: AiImage) => void;
};

export default function ImageGenerator({ onGeneratedImageSelected }: ImageGeneratorProps) {
  const tonesRef = useRef(null);
  const subjectInputRef = useRef(null);

  const [allOptions, setAllOptions] = useState<ImageGenerationOptions>(null);
  const [waiting, setWaiting] = useState(false);

  const [options, setOptions] = useState<AiImageOptions>(defaultParams);

  const [selectedImage, setSelectedImage] = useState(null);

  const [images, setImages] = useState([]);

  const { background, keywords, style, tone, subject } = options;

  useEffect(() => {
    getOptions().then(setAllOptions);
  }, []);

  const handleNewArtwork = () => {
    handleReset();
  };

  const handlePlaceArtwork = () => {
    onGeneratedImageSelected({
      options,
      url: selectedImage,
    });
  };

  const handleReset = () => {
    setImages([]);
    setSelectedImage(null);
    setOptions(defaultParams);
  };

  const handleUpdateKeywords = (newKeywords) => {
    const added = newKeywords.filter((keyword) => !keywords.includes(keyword));

    const removed = keywords.filter((keyword) => !newKeywords.includes(keyword));

    const updates = { keywords: newKeywords } as { keywords: string[]; subject?: string };

    if (added.length > 0 && !subject.includes(added[0])) {
      const newSubject = subject ? `${subject} ${added[0]}` : added[0];

      updates.subject = newSubject;
    } else if (removed.length > 0 && subject.includes(removed[0])) {
      const newSubject = subject.replace(removed[0], '');

      updates.subject = newSubject;
    }

    handleUpdate(updates);
  };

  const handleUpdate = (updates) => setOptions({ ...options, ...updates });

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
      })
      .catch(() => {
        setWaiting(false);
      });
  };

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
              }}
            />
          ))}
        </HStack>
        <Button onClick={handlePlaceArtwork} title="Place artwork" w="100%" />
        <Flex align="center" mt="14px" pb="14px">
          <Button flex={1} onClick={handleGenerate} outlined title="Generate similar" />
          <Button flex={1} ml="10px" onClick={handleNewArtwork} outlined title="New" />
        </Flex>
      </Box>
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
      <Text as="b" fontSize="md" mb="5px" ml="14px">
        Text to Image
      </Text>
      <Accordion defaultIndex={[0, 1]} allowMultiple>
        <AccordionItem borderTopWidth={0} paddingBottom="8px">
          <h2>
            <AccordionButton {...accordionButtonStyles}>
              <Box as="span" flex="1" fontSize="sm" textAlign="left">
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
              options={allOptions}
              selectedValue={style}
            />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem borderColor="transparent" borderTopWidth={0} paddingBottom="10px">
          <h2>
            <AccordionButton {...accordionButtonStyles}>
              <Box as="span" flex="1" fontSize="sm" textAlign="left" ref={tonesRef}>
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
              options={allOptions}
              selectedValue={tone}
              style={style}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <AddSubject
        background={background}
        onChangeBackground={(background) => handleUpdate({ background })}
        options={allOptions}
        keywords={keywords}
        onUpdateKeywords={handleUpdateKeywords}
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
