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

import Colors from '@/theme/colors';

import {
  IconFontFamily,
  IconTextLeftAlign,
  IconTextCenter,
  IconTextRightAlign,
} from './Icons';

import ColorPicker from './ColorPicker';
import FontPicker from './FontPicker';

import ColorPalette from './ColorPalette.png';

const { abloBlue } = Colors;

const TEXT_ALIGN_OPTIONS = [
  { name: 'left', icon: <IconTextLeftAlign /> },
  { name: 'center', icon: <IconTextCenter /> },
  { name: 'right', icon: <IconTextRightAlign /> },
];

const Button = (props) => (
  <ChakraButton
    width="28px"
    height="28px"
    bg="#FFFFFF"
    borderRadius="4px"
    border="1px solid #000000"
    padding="2px"
    minWidth="auto"
    _focus={{
      border: `1px solid ${abloBlue}`,
      boxShadow: '0px 0px 8px 0px #97B9F5',
    }}
    _hover={{
      border: `1px solid ${abloBlue}`,
      boxShadow: '0px 0px 8px 0px #97B9F5',
    }}
    {...props}
  />
);

export default function TextToolbar({
  onUpdate,
  selectedTool,
  onSelectedTool,
  textObject,
}) {
  const { fill, fontFamily, fontSize, textAlign } = textObject || {};

  const textAlignOption =
    TEXT_ALIGN_OPTIONS.find((option) => option.name === textAlign) ||
    TEXT_ALIGN_OPTIONS[0];

  const handleTextAlignClick = () => {
    const index = TEXT_ALIGN_OPTIONS.findIndex(
      (option) => option.name === textAlign
    );

    const nextIndex = (index + 1) % 3;

    onUpdate({ textAlign: TEXT_ALIGN_OPTIONS[nextIndex].name });
  };

  const isColorActive = selectedTool === 'color';
  const isFontFamilyActive = selectedTool === 'fontFamily';

  return (
    <Box w="100%">
      {isFontFamilyActive ? (
        <Flex align="center" justify="center" padding="0 16px">
          <Text fontSize="12px">A</Text>
          <Slider
            defaultValue={12}
            min={8}
            max={40}
            step={1}
            margin="0 18px"
            height="2px"
            onChange={(val) => onUpdate({ fontSize: val })}
            value={fontSize}
            width="260px"
          >
            <SliderTrack bg="#6A6866" height="2px">
              <Box position="relative" right={10} />
              <SliderFilledTrack bg="" />
            </SliderTrack>
            <SliderThumb bg="#000000" boxSize="20px" />
          </Slider>
          <Text fontSize="40px">A</Text>
        </Flex>
      ) : null}
      <Flex justify="space-between" mt="4px" padding="12px 16px 12px 12px">
        {isColorActive || isFontFamilyActive ? null : <Box />}
        {isColorActive ? (
          <ColorPicker
            selectedColor={fill}
            onUpdate={(color) => onUpdate({ fill: color })}
          />
        ) : null}
        {isFontFamilyActive ? (
          <FontPicker
            fontFamily={fontFamily}
            onUpdate={(fontFamily) => onUpdate({ fontFamily })}
          />
        ) : null}
        <HStack spacing="6px">
          <Button
            bg="transparent"
            borderRadius="14px"
            onClick={() => onSelectedTool(isColorActive ? null : 'color')}
          >
            <Image
              maxWidth="none"
              w="28px"
              h="28px"
              src={ColorPalette}
              borderRadius="14px"
              border={isColorActive ? `2px solid ${abloBlue}` : ''}
            />
          </Button>
          <Button
            onClick={() =>
              onSelectedTool(isFontFamilyActive ? null : 'fontFamily')
            }
          >
            <IconFontFamily />
          </Button>
          <Button onClick={handleTextAlignClick}>{textAlignOption.icon}</Button>
        </HStack>
      </Flex>
    </Box>
  );
}
