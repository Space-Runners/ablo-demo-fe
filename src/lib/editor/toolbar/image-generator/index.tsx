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

import Button from '../../../components/Button';

import { AiImage, Style, TextToImageRequest } from '../../../types';

import SelectStyle from './select-style';
import SelectColorPalette from './select-color-palette';
import AddSubject from './add-subject';

import Progress from './components/Progress';

const defaultParams = {
  styleId: '',
  toneId: '',
  freeText: '',
  subjectSuggestions: [],
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
  getStyles: () => Promise<Style[]>;
  generateImage: (options: TextToImageRequest) => Promise<string[]>;
};

export default function ImageGenerator({
  onGeneratedImageSelected,
  getStyles,
  generateImage,
}: ImageGeneratorProps) {
  const tonesRef = useRef(null);
  const subjectInputRef = useRef(null);

  const [styles, setStyles] = useState<Style[]>([]);
  const [waiting, setWaiting] = useState(false);

  const [options, setOptions] = useState<TextToImageRequest>(defaultParams);

  const [selectedImage, setSelectedImage] = useState(null);

  const [images, setImages] = useState([]);

  const { background, subjectSuggestions: keywords, styleId, toneId, freeText } = options;

  const style = styles.find(({ id }) => id === styleId);

  useEffect(() => {
    getStyles().then((styles) => {
      setStyles(styles);

      if (styles?.length === 1) {
        setOptions((options) => ({ ...options, styleId: styles[0].id }));
      }
    });
  }, [getStyles]);

  const handleNewArtwork = () => {
    handleReset();
  };

  const handlePlaceArtwork = () => {
    onGeneratedImageSelected({
      options: { ...options, style: style.name },
      url: selectedImage,
    });
  };

  const handleReset = () => {
    setImages([]);
    setSelectedImage(null);

    const options = { ...defaultParams };

    if (styles?.length === 1) {
      options.styleId = styles[0].id;
    }
    setOptions(options);
  };

  const handleUpdateKeywords = (newKeywords) => {
    const added = newKeywords.filter((keyword) => !keywords.includes(keyword));

    const removed = keywords.filter((keyword) => !newKeywords.includes(keyword));

    const updates = { subjectSuggestions: newKeywords } as {
      subjectSuggestions: string[];
      freeText?: string;
    };

    if (added.length > 0 && !freeText.includes(added[0])) {
      const newSubject = freeText ? `${freeText} ${added[0]}` : added[0];

      updates.freeText = newSubject;
    } else if (removed.length > 0 && freeText.includes(removed[0])) {
      const newSubject = freeText.replace(removed[0], '');

      updates.freeText = newSubject;
    }

    handleUpdate(updates);
  };

  const handleUpdate = (updates) => setOptions({ ...options, ...updates });

  const handleGenerate = () => {
    setWaiting(true);
    setImages([]);

    const requestParams = {
      background,
      styleId,
      subjectSuggestions: keywords,
      freeText,
    } as TextToImageRequest;

    if (toneId && toneId !== 'noTone') {
      requestParams.toneId = toneId;
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
      {styles.length > 1 ? (
        <Box>
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
                  onChange={(styleId) => {
                    tonesRef.current?.scrollIntoView({ behavior: 'smooth' });

                    handleUpdate({ styleId });
                  }}
                  options={styles}
                  selectedValue={styleId}
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
                  onChange={(toneId) => {
                    subjectInputRef.current?.focus();

                    handleUpdate({ toneId });
                  }}
                  selectedValue={toneId}
                  style={style}
                />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      ) : null}
      <AddSubject
        background={background}
        onChangeBackground={(background) => handleUpdate({ background })}
        keywords={keywords}
        style={style}
        onUpdateKeywords={handleUpdateKeywords}
      >
        <Input
          bg="#F5F5F5"
          border="none"
          borderRadius="11px"
          h="42px"
          onChange={(e) => handleUpdate({ freeText: e.target.value })}
          ref={subjectInputRef}
          value={freeText}
          placeholder="Write subject..."
        />
      </AddSubject>
      <Box padding="0 14px" mt="22px">
        <Button
          disabled={!freeText && isEmpty(keywords)}
          onClick={handleGenerate}
          title="Generate"
          w="100%"
        />
      </Box>
    </Box>
  );
}
