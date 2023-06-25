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

import { Styles, MOODS, KEYWORD_SUGGESTIONS } from './styles';

const { abloBlue } = Colors;

const getKeywordPrompts = (keywords, style) => {
  const keywordsForStyle = KEYWORD_SUGGESTIONS[style];

  return keywords.reduce((result, keyword) => {
    const keywordObject = keywordsForStyle.find((k) => k.name === keyword);

    if (keywordObject) {
      return [...result, keywordObject.prompt];
    }

    return result;
  }, []);
};

export default function ImageGenerator({ onImageGenerated }) {
  const [waiting, setWaiting] = useState(false);

  const [style, setStyle] = useState('Kidult');
  const [mood, setMood] = useState('');
  const [subject, setSubject] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [background, setBackground] = useState('');
  const [backgroundKeywords, setBackgroundKeywords] = useState([]);

  const [activeStep, setActiveStep] = useState(1);

  const [images, setImages] = useState([]);

  const handleEditPrompts = () => {};

  const handleNewArtwork = () => {};

  const handleGenerate = () => {
    setWaiting(true);
    setActiveStep(null);

    const paramsForStyle = Styles[style];

    const { text: textArray, ...rest } = paramsForStyle;

    const keywordPrompts = getKeywordPrompts(keywords, style).join(', ');

    const promptElements = [
      subject,
      keywordPrompts,
      background,
      textArray[0].text,
      MOODS[mood],
    ].filter((item) => !!item);

    const requestParams = {
      ...rest,
      samples: 3,
      text: [{ text: promptElements.join(', ') }],
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
          style={style}
          value={background}
        />
      ) : null}
      {images.length ? (
        <Box>
          <HStack>
            {images.map((imageUrl) => (
              <Image
                h={117}
                key={imageUrl}
                w={117}
                src={imageUrl}
                alt="Generated image"
                onClick={() => onImageGenerated(imageUrl)}
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
