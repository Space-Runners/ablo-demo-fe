import { useState, Fragment as F } from 'react';
import {
  Box,
  Button as ChakraButton,
  Flex,
  HStack,
  Image,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
} from '@chakra-ui/react';

import { removeBackground } from '@/api/image-generator';
import { AiImage } from '@/components/types';

import Colors from '@/theme/colors';

import ColorPalette from './ColorPalette.png';
import ColorPicker from './ColorPicker';
import FontPicker from './FontPicker';

import {
  IconTrash,
  IconLayerDown,
  IconLayerUp,
  IconCopy,
  IconFontSize,
  IconFontFamily,
  IconTextAlign,
  IconTextLeftAlign,
  IconTextCenter,
  IconTextRightAlign,
} from './Icons';

const { abloBlue } = Colors;

const Button = ({ isSelected = false, ...rest }) => (
  <ChakraButton
    height="28px"
    bg="#FFFFFF"
    borderRadius="4px"
    border={`1px solid ${isSelected ? abloBlue : '#D3D3D3'}`}
    padding="4px 6px"
    minWidth="auto"
    _focus={{
      border: `1px solid ${abloBlue}`,
      boxShadow: '0px 0px 8px 0px #97B9F5',
    }}
    _hover={{
      border: `1px solid ${abloBlue}`,
      boxShadow: '0px 0px 8px 0px #97B9F5',
    }}
    {...rest}
  />
);

const IconButton = (props) => <Button width="28px" {...props} />;

const TEXT_ALIGN_OPTIONS = [
  { name: 'left', icon: <IconTextLeftAlign /> },
  { name: 'center', icon: <IconTextCenter /> },
  { name: 'right', icon: <IconTextRightAlign /> },
];

type ObjectEditToolsProps = {
  activeObject: {
    aiImage: AiImage;
    noBackgroundUrl: string;
    text: string;
    withBackgroundUrl: string;
    fill: string;
    fontFamily: string;
    fontSize: number;
    textAlign: string;
  };
  onCopyActiveObject: () => void;
  onDeleteActiveObject: () => void;
  onImageUpdate: (image: AiImage) => void;
  onUpdateTextObject: (updates: object) => void;
  onLayerUp: () => void;
  onLayerDown: () => void;
};

const ObjectEditTools = ({
  activeObject,
  onDeleteActiveObject,
  onImageUpdate,
  onLayerDown,
  onLayerUp,
  onCopyActiveObject,
  onUpdateTextObject,
}: ObjectEditToolsProps) => {
  const [removingBackground, setRemovingBackground] = useState(false);

  const [selectedTool, setSelectedTool] = useState(null);

  if (!activeObject) {
    return null;
  }

  console.log('Active object', activeObject);

  const { aiImage, fill, fontFamily, fontSize, textAlign, text } = activeObject;
  const { url, noBackgroundUrl, withBackgroundUrl } = aiImage || {};

  const isBackgroundRemoved = url === noBackgroundUrl;

  const handleToggleBackground = () => {
    if (isBackgroundRemoved) {
      onImageUpdate({
        ...aiImage,
        url: withBackgroundUrl,
      });

      return;
    }

    if (noBackgroundUrl) {
      onImageUpdate({
        ...aiImage,
        url: noBackgroundUrl,
      });

      return;
    }

    setRemovingBackground(true);

    removeBackground(aiImage.url).then((url) => {
      console.log('Removed background', url);

      onImageUpdate({
        ...aiImage,
        url,
        noBackgroundUrl: url,
        withBackgroundUrl: aiImage.url,
      });

      setRemovingBackground(false);
    });
  };

  const isText = !!text;

  const isColorActive = selectedTool === 'color';
  const isFontSizeActive = selectedTool === 'fontSize';
  const isFontFamilyActive = selectedTool === 'fontFamily';
  const isTextAlignActive = selectedTool === 'textAlign';
  const isLayeringActive = selectedTool === 'layering';

  return (
    <Box
      bg="#FFFFFF"
      borderRadius="8px"
      boxShadow="0px 1px 2px 0px #0000000F"
      p="8px 11px"
    >
      <HStack position="relative" spacing="6px">
        {isText ? (
          <F>
            <IconButton
              bg="transparent"
              borderRadius="14px"
              isSelected={isColorActive}
              onClick={() => setSelectedTool(isColorActive ? null : 'color')}
            >
              <Image
                maxWidth="none"
                w="28px"
                h="28px"
                src={ColorPalette}
                borderRadius="14px"
                border={isColorActive ? `2px solid ${abloBlue}` : ''}
              />
            </IconButton>
            <IconButton
              isSelected={isFontSizeActive}
              onClick={() =>
                setSelectedTool(isFontSizeActive ? null : 'fontSize')
              }
            >
              <IconFontSize />
            </IconButton>
            <IconButton
              isSelected={isFontFamilyActive}
              onClick={() =>
                setSelectedTool(isFontFamilyActive ? null : 'fontFamily')
              }
            >
              <IconFontFamily />
            </IconButton>
            <IconButton
              isSelected={isTextAlignActive}
              onClick={() =>
                setSelectedTool(isTextAlignActive ? null : 'textAlign')
              }
            >
              <IconTextAlign />
            </IconButton>
          </F>
        ) : null}
        <IconButton
          isSelected={isLayeringActive}
          onClick={() => setSelectedTool(isLayeringActive ? null : 'layering')}
        >
          <IconLayerUp />
        </IconButton>
        <IconButton onClick={onCopyActiveObject}>
          <IconCopy />
        </IconButton>
        <IconButton onClick={onDeleteActiveObject} ml="14px">
          <IconTrash />
        </IconButton>
        {activeObject?.aiImage ? (
          <Button
            isLoading={removingBackground}
            onClick={handleToggleBackground}
          >
            <Text fontSize="11px">
              {isBackgroundRemoved ? 'Restore' : 'Remove'} background
            </Text>
          </Button>
        ) : null}
      </HStack>
      {isText ? (
        <F>
          {isColorActive ? (
            <ColorPicker
              selectedColor={fill}
              onUpdate={(color) => onUpdateTextObject({ fill: color })}
            />
          ) : null}
          {isFontSizeActive ? (
            <Flex align="center" justify="center" mt="8px">
              <Text fontSize="12px">A</Text>
              <Slider
                defaultValue={12}
                min={8}
                max={30}
                step={1}
                margin="0 12px"
                height="2px"
                onChange={(val) => onUpdateTextObject({ fontSize: val })}
                value={fontSize}
                width="180px"
              >
                <SliderTrack bg="#6A6866" height="2px">
                  <Box position="relative" right={10} />
                  <SliderFilledTrack bg="" />
                </SliderTrack>
                <SliderThumb bg="#000000" boxSize="20px" />
              </Slider>
              <Text fontSize="24px">A</Text>
            </Flex>
          ) : null}
          {isFontFamilyActive ? (
            <FontPicker
              fontFamily={fontFamily}
              onUpdate={(fontFamily) => onUpdateTextObject({ fontFamily })}
            />
          ) : null}
          {isTextAlignActive ? (
            <HStack mt="8px">
              {TEXT_ALIGN_OPTIONS.map((option) => {
                const { name, icon } = option;

                return (
                  <IconButton
                    onClick={() => onUpdateTextObject({ textAlign: name })}
                    isSelected={name === textAlign}
                  >
                    {icon}
                  </IconButton>
                );
              })}
            </HStack>
          ) : null}
        </F>
      ) : null}
      {isLayeringActive ? (
        <HStack mt="8px">
          <IconButton isSelected={null} onClick={onLayerUp}>
            <IconLayerUp />
          </IconButton>
          <IconButton onClick={onLayerDown}>
            <IconLayerDown />
          </IconButton>
        </HStack>
      ) : null}
    </Box>
  );
};

export default ObjectEditTools;
