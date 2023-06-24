import {
  Box,
  Button as ChakraButton,
  Flex,
  HStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import { useState } from 'react';

import {
  IconColorPalette,
  IconFontFamily,
  IconTextLeftAlign,
  IconTextCenter,
  IconTextRightAlign,
} from './Icons';

import ColorPicker from './ColorPicker';
import FontPicker from './FontPicker';

const TEXT_ALIGN_OPTIONS = [
  { name: 'left', icon: <IconTextLeftAlign /> },
  { name: 'center', icon: <IconTextCenter /> },
  { name: 'right', icon: <IconTextRightAlign /> },
];

const Button = (props) => {
  const { isSelected, ...rest } = props;

  return (
    <ChakraButton
      width="28px"
      height="28px"
      bg="#383838"
      border={`1px solid ${isSelected ? '#ffffff' : '#484848'}`}
      borderRadius="4px"
      minWidth="auto"
      padding="6px"
      {...rest}
    />
  );
};

export default function TextToolbar({ onUpdate, textObject }) {
  const [selectedTool, setSelectedTool] = useState(null);

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
    <Flex justify="space-between" padding="12px 16px 12px 12px">
      {!selectedTool ? (
        <Slider
          defaultValue={14}
          min={0}
          max={60}
          step={1}
          height="12px"
          onChange={(val) => onUpdate({ fontSize: val })}
          value={fontSize}
          width="175px"
        >
          <SliderTrack
            bg="linear-gradient(to bottom right, transparent 50%, #464646 50% )"
            height="12px"
          >
            <Box position="relative" right={10} />
            <SliderFilledTrack bg="" />
          </SliderTrack>
          <SliderThumb boxSize="20px" />
        </Slider>
      ) : null}
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
      <HStack spacing="16px">
        <Button
          bg="transparent"
          border={isColorActive ? '1px solid #ffffff' : ''}
          onClick={() => setSelectedTool(isColorActive ? null : 'color')}
        >
          <IconColorPalette />
        </Button>
        <Button
          isSelected={isFontFamilyActive}
          onClick={() =>
            setSelectedTool(isFontFamilyActive ? null : 'fontFamily')
          }
        >
          <IconFontFamily />
        </Button>
        <Button onClick={handleTextAlignClick}>{textAlignOption.icon}</Button>
      </HStack>
    </Flex>
  );
}
