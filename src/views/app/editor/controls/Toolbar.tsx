import { Box, Button, HStack, Text } from '@chakra-ui/react';

import MiniFilterBar from '@/components/MiniFilterBar';
import ColorPicker from '@/components/ColorPicker';
import ToolbarButton from '@/components/ToolbarButton';
import Colors from '@/theme/colors';

import IconToggleSidePicker from './icons/IconToggleSide';
import IconToggleColorPicker from './icons/IconToggleColorPicker';
import IconUndo from './icons/IconUndo';
import IconRedo from './icons/IconRedo';
import IconText from './icons/IconText';

import {
  IconDrawingArea,
  IconDrawingAreaDisabled,
} from './icons/IconDrawingArea';
import { useState } from 'react';

const SIDES = ['Front', 'Back'];

const { abloBlue } = Colors;

type Props = {
  isDrawingAreaVisible: boolean;
  onAddText: () => void;
  onSelectedSide: (side: string) => void;
  onSelectedVariant: (variant: string) => void;
  onToggleDrawingArea: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  selectedSide: string;
  selectedVariant: string;
};

export default function Toolbar({
  isDrawingAreaVisible,
  onAddText,
  onSelectedSide,
  onSelectedVariant,
  onToggleDrawingArea,
  onUndo,
  onRedo,
  selectedSide,
  selectedVariant,
}: Props) {
  const [isSidePickerVisible, setSidePickerVisible] = useState(false);
  const [isColorPickerVisible, setColorPickerVisible] = useState(false);

  return (
    <Box
      bg={{ base: 'transparent', md: '#FFFFFF' }}
      borderLeft="1px solid rgba(26, 26, 26, 0.10)"
      h={{ base: 'auto', md: '80px ' }}
      p="0px 14px"
      w="100%"
    >
      <HStack justify="space-between" pt="17px" spacing="20px" w="100%">
        <HStack spacing="4px">
          <ToolbarButton
            isSelected={isSidePickerVisible}
            onClick={() => {
              setSidePickerVisible(!isSidePickerVisible);
              setColorPickerVisible(false);
            }}
          >
            <IconToggleSidePicker isSelected={isSidePickerVisible} />
          </ToolbarButton>
          <ToolbarButton
            isSelected={isDrawingAreaVisible}
            onClick={onToggleDrawingArea}
          >
            {isDrawingAreaVisible ? (
              <IconDrawingArea />
            ) : (
              <IconDrawingAreaDisabled />
            )}
          </ToolbarButton>
          <ToolbarButton
            isSelected={isColorPickerVisible}
            onClick={() => {
              setColorPickerVisible(!isColorPickerVisible);
              setSidePickerVisible(false);
            }}
          >
            <IconToggleColorPicker isSelected={isColorPickerVisible} />
          </ToolbarButton>
        </HStack>
        <HStack>
          {onUndo ? (
            <ToolbarButton onClick={onUndo}>
              <IconUndo />
            </ToolbarButton>
          ) : null}
          {onRedo ? (
            <ToolbarButton onClick={onRedo}>
              <IconRedo />
            </ToolbarButton>
          ) : null}
          <Button
            bg="transparent"
            border="1px solid #AAA9AB"
            borderRadius="28px"
            color="#AAA9AB"
            fontSize="xs"
            fontWeight={600}
            height="28px"
            p="0 14px"
            w="63px"
            _focus={{
              borderColor: abloBlue,
              color: abloBlue,
            }}
            _active={{
              borderColor: abloBlue,
              color: abloBlue,
            }}
          >
            Save
          </Button>
        </HStack>
      </HStack>
      <Button
        alignItems="center"
        bg="#FFFFFF"
        border="1px solid #D3D3D3"
        borderRadius="4px"
        h="28px"
        mt="7px"
        onClick={(e) => {
          e.stopPropagation();

          onAddText();
        }}
        padding="5px 6px"
      >
        <IconText />
        <Text fontSize="11px" fontWeight={500} lineHeight="13px" ml="6px">
          Add Text
        </Text>
      </Button>
      {isSidePickerVisible ? (
        <Box mb="20px" mt="20px">
          <MiniFilterBar
            options={SIDES}
            selectedValue={selectedSide}
            onChange={onSelectedSide}
          />
        </Box>
      ) : null}
      {isColorPickerVisible ? (
        <Box mb="20px" mt="20px">
          <ColorPicker
            onSelectedVariants={(values) => onSelectedVariant(values[0])}
            selectedVariants={[selectedVariant]}
          />
        </Box>
      ) : null}
    </Box>
  );
}
