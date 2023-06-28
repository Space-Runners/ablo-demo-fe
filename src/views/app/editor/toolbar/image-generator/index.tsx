import { Box, Flex, HStack, Image } from '@chakra-ui/react';

import { useState } from 'react';

import { generateImage } from '@/api/image-generator';
import Button from '@/components/Button';
import Colors from '@/theme/colors';

import SelectStyle from './select-style';
import SelectMood from './select-mood';
import AddSubject from './add-subject';
import AddBackground from './add-background';

import LinkButton from './components/LinkButton';
import IconSpark from './components/IconSpark';
import IconShuffle from './components/IconShuffle';

const { abloBlue } = Colors;

export default function ImageGenerator({ onImageGenerated }) {
  const [waiting, setWaiting] = useState(false);

  const [style, setStyle] = useState('');
  const [mood, setMood] = useState('');
  const [subject, setSubject] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [background, setBackground] = useState('');
  const [isBackgroundOn, setBackgroundOn] = useState(true);
  const [backgroundKeywords, setBackgroundKeywords] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);

  const [activeStep, setActiveStep] = useState(1);

  const handleEditPrompts = () => setActiveStep(null);

  const handleNewArtwork = () => {
    setImages([]);
    setSelectedImage(null);
    setMood('');
    setStyle('');
    setSubject('');
    setKeywords([]);
    setBackground('');
    setBackgroundOn(true);
    setBackgroundKeywords([]);

    setActiveStep(1);
  };

  const handleGenerate = () => {
    setWaiting(true);
    setImages([]);

    const requestParams = {
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
      })
      .catch(() => {
        setWaiting(false);
      });
  };

  return (
    <Box pt="20px">
      {activeStep === 1 ? (
        <SelectStyle
          onChange={(style) => setStyle(style)}
          onNext={() => setActiveStep(activeStep + 1)}
          selectedValue={style}
        />
      ) : null}
      {activeStep === 2 ? (
        <SelectMood
          onChange={(mood) => setMood(mood)}
          onBack={() => setActiveStep(activeStep - 1)}
          onNext={() => setActiveStep(activeStep + 1)}
          selectedValue={mood}
        />
      ) : null}
      {activeStep === 3 ? (
        <AddSubject
          onChange={(subject) => setSubject(subject)}
          onBack={() => setActiveStep(activeStep - 1)}
          onNext={() => setActiveStep(activeStep + 1)}
          keywords={keywords}
          onUpdateKeywords={setKeywords}
          style={style}
          value={subject}
        />
      ) : null}
      {activeStep === 4 ? (
        <AddBackground
          waiting={waiting}
          onChange={(background) => setBackground(background)}
          onBack={() => setActiveStep(activeStep - 1)}
          onNext={handleGenerate}
          keywords={backgroundKeywords}
          onUpdateKeywords={setBackgroundKeywords}
          isBackgroundOn={isBackgroundOn}
          setBackgroundOn={setBackgroundOn}
          style={style}
          value={background}
        />
      ) : null}
      {images.length ? (
        <Box>
          <HStack>
            {images.map((imageUrl) => (
              <Image
                border={
                  imageUrl === selectedImage ? '4px solid #000000' : 'none'
                }
                borderRadius="5px"
                h={117}
                key={imageUrl}
                w={117}
                src={imageUrl}
                alt="Generated image"
                onClick={() => {
                  setSelectedImage(imageUrl);
                  onImageGenerated(imageUrl);
                }}
              />
            ))}
          </HStack>
          <Flex align="center" mt="22px">
            <LinkButton
              icon={<IconShuffle color={abloBlue} />}
              onClick={handleGenerate}
              title="Generate similar"
            />
            <LinkButton
              icon={<IconSpark color={abloBlue} />}
              onClick={() => null}
              ml="20px"
              title="Generate New"
            />
          </Flex>
          <Flex align="center" mt="34px">
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
