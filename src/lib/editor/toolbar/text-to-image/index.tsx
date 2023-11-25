import { Box, ButtonProps, Input, Text } from '@chakra-ui/react';

import { useEffect, useRef, useState } from 'react';

import { isEmpty } from 'lodash';

import Button from '../../../components/Button';

import { AiImage, Style, StyleType, TextToImageRequest } from '../../../types';

import AddSubject from './add-subject';

import StyleSelector from '../components/style-selector';
import ImagesPreview from '../components/ImagesPreview';
import Progress from '../components/Progress';

const defaultParams = {
  styleId: '',
  toneId: '',
  freeText: '',
  subjectSuggestions: [],
  background: true,
};

type TextToImageGeneratorProps = {
  onImagesPreview: (images: string[]) => void;
  onGeneratedImageSelected: (image: AiImage) => void;
  getStyles: (type: StyleType) => Promise<Style[]>;
  generateImageFromText: (options: TextToImageRequest) => Promise<string[]>;
  hideBackgroundSelector: boolean;
  hideStyles: boolean;
  buttonProps?: {
    basic: ButtonProps;
    outlined: ButtonProps;
  };
  subjectText: string;
};

export default function TextToImageGenerator({
  onGeneratedImageSelected,
  onImagesPreview,
  getStyles,
  generateImageFromText,
  hideBackgroundSelector,
  hideStyles,
  buttonProps,
  subjectText,
}: TextToImageGeneratorProps) {
  const subjectInputRef = useRef(null);

  const [styles, setStyles] = useState<Style[]>([]);
  const [waiting, setWaiting] = useState(false);

  const [options, setOptions] = useState<TextToImageRequest>(defaultParams);

  const [selectedImage, setSelectedImage] = useState(null);

  const [images, setImages] = useState([]);

  const { background, subjectSuggestions: keywords, styleId, toneId, freeText } = options;

  const style = styles.find(({ id }) => id === styleId);

  useEffect(() => {
    getStyles('text').then((styles) => {
      setStyles(styles);

      if (styles?.length === 1) {
        setOptions((options) => ({ ...options, styleId: styles[0].id }));
      }
    });
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

    onImagesPreview(null);

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

    generateImageFromText(requestParams)
      .then((images) => {
        setWaiting(false);

        setImages(images);
        setSelectedImage(images[0]);

        onImagesPreview(images);
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
      <ImagesPreview
        images={images}
        selectedImage={selectedImage}
        onSelectedImage={setSelectedImage}
        onPlaceArtwork={handlePlaceArtwork}
        onGenerateSimilar={handleGenerate}
        onNewArtwork={handleReset}
        buttonProps={buttonProps}
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
      {!hideStyles ? (
        <Box>
          <Text as="b" fontSize="md" mb="5px" ml="14px">
            Text to Image
          </Text>
          <StyleSelector
            styles={styles}
            selectedStyle={styleId}
            onSelectedStyle={(styleId) => {
              handleUpdate({ styleId });
            }}
            selectedColorPalette={toneId}
            onSelectedColorPalette={(toneId) => {
              subjectInputRef.current?.focus();

              handleUpdate({ toneId });
            }}
          />
        </Box>
      ) : null}
      <AddSubject
        background={background}
        onChangeBackground={
          hideBackgroundSelector ? null : (background) => handleUpdate({ background })
        }
        keywords={keywords}
        style={style}
        onUpdateKeywords={handleUpdateKeywords}
        subjectText={subjectText}
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
          {...(buttonProps?.basic || {})}
        />
      </Box>
    </Box>
  );
}
