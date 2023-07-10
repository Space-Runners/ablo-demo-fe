import {
  Box,
  Button as ChakraButton,
  Flex,
  HStack,
  Image,
  Text,
} from '@chakra-ui/react';

import { useState } from 'react';

import { generateImage } from '@/api/image-generator';
import Button from '@/components/Button';
import { AiImage, AiImageOptions } from '@/components/types';

import SelectStyle from './select-style';
import SelectMood from './select-mood';
import AddSubject from './add-subject';

import IconSpark from './components/IconSpark';
import IconShuffle from './components/IconShuffle';
import Progress from './components/Progress';

import ImageOverview from '../ai-image-overview';

const defaultParams = {
  style: '',
  mood: '',
  subject: '',
  keywords: [],
  background: true,
};

const ButtonGenerateAgain = ({ icon, title, ...rest }) => (
  <ChakraButton
    bg="transparent"
    border="1px solid #555251"
    color="#555251"
    justifyContent="center"
    padding="12px 20px"
    {...rest}
  >
    {icon}
    <Text as="b" color="#555251" fontSize="sm" ml="10px">
      {title}
    </Text>
  </ChakraButton>
);

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

  const [activeStep, setActiveStep] = useState(1);

  const { background, keywords, style, mood, subject } = options;

  const handleEditPrompts = () => {
    setActiveStep(3);
    setImages([]);

    onGeneratedImageRemoved(selectedImage);
  };

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

    setActiveStep(1);
  };

  const handleUpdate = (updates) => setOptions({ ...options, ...updates });

  const handleEdit = (index) => {
    const { options } = aiImage;

    setOptions(options);
    setImages([]);
    setSelectedImage(null);

    setActiveStep(index);

    setIsEditing(true);
  };

  const handleRemove = () => {
    setActiveStep(1);

    handleReset();

    console.log('Handle remove', aiImage);

    onGeneratedImageRemoved(aiImage.url);
  };

  const handleGenerate = () => {
    setWaiting(true);
    setImages([]);

    const requestParams = {
      background,
      style,
      mood,
      subjectSuggestions: keywords,
      freeText: subject,
    };

    generateImage(requestParams)
      .then((images) => {
        setWaiting(false);

        setActiveStep(null);

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

  return (
    <Box pt="20px">
      {activeStep === 1 ? (
        <SelectStyle
          onChange={(style) => handleUpdate({ style })}
          onNext={() => setActiveStep(activeStep + 1)}
          selectedValue={style}
        />
      ) : null}
      {activeStep === 2 ? (
        <SelectMood
          onChange={(mood) => handleUpdate({ mood })}
          onBack={() => setActiveStep(activeStep - 1)}
          onNext={() => setActiveStep(activeStep + 1)}
          selectedValue={mood}
        />
      ) : null}
      {activeStep === 3 && !waiting ? (
        <AddSubject
          background={background}
          onChangeBackground={(background) => handleUpdate({ background })}
          onChange={(subject) => handleUpdate({ subject })}
          onBack={() => setActiveStep(activeStep - 1)}
          onNext={handleGenerate}
          keywords={keywords}
          onUpdateKeywords={(keywords) => handleUpdate({ keywords })}
          style={style}
          value={subject}
        />
      ) : null}
      {waiting ? <Progress /> : null}
      {images.length ? (
        <Box>
          <Text fontSize="md" mb="22px">
            Select image
          </Text>
          <Flex align="center" mb="22px">
            <ButtonGenerateAgain
              icon={<IconShuffle />}
              onClick={handleGenerate}
              title="Generate similar"
            />
            <ButtonGenerateAgain
              icon={<IconSpark />}
              onClick={handleNewArtwork}
              ml="20px"
              title="Generate New"
            />
          </Flex>
          <HStack justify="center" mb="20px">
            {images.map((imageUrl) => (
              <Image
                border={
                  imageUrl === selectedImage ? '4px solid #000000' : 'none'
                }
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
              onClick={handleEditPrompts}
              outlined
              title="Edit prompts"
            />
            <Button
              flex={1}
              ml="10px"
              onClick={handleNewArtwork}
              title="New Artwork"
            />
          </Flex>
        </Box>
      ) : null}
    </Box>
  );
}
