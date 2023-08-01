import { Box, Button, HStack } from '@chakra-ui/react';

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
  onSave: () => void;
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
  onSave,
  selectedSide,
  selectedVariant,
}: Props) {
  const [isSidePickerVisible, setSidePickerVisible] = useState(false);
  const [isColorPickerVisible, setColorPickerVisible] = useState(false);

  return (
    <Box
      bg="#FFFFFF"
      borderLeft={{ base: 'none', md: '1px solid rgba(26, 26, 26, 0.10)' }}
      h={{ base: '70px', md: 'auto' }}
      p={{ base: '20px 14px 10px 14px', md: '20px 14px' }}
      w="100%"
    >
      <HStack justify="space-between" spacing="20px" w="100%">
        <HStack spacing="4px">
          <ToolbarButton
            onClick={(e) => {
              e.stopPropagation();
              onAddText();
            }}
          >
            <IconText />
          </ToolbarButton>
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
            border={`1px solid ${abloBlue}`}
            borderRadius="28px"
            color={abloBlue}
            fontSize="xs"
            fontWeight={600}
            height="28px"
            onClick={onSave}
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
      {isSidePickerVisible ? (
        <Box mt="20px">
          <MiniFilterBar
            options={SIDES}
            selectedValue={selectedSide}
            onChange={onSelectedSide}
          />
        </Box>
      ) : null}
      {isColorPickerVisible ? (
        <Box mt="20px">
          <ColorPicker
            onSelectedVariants={(values) => onSelectedVariant(values[0])}
            selectedVariants={[selectedVariant]}
          />
        </Box>
      ) : null}
    </Box>
  );
}
