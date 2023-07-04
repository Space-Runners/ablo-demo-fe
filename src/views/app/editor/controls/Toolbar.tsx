import { Box, HStack } from '@chakra-ui/react';

import { useHistory } from 'react-router-dom';

import MiniFilterBar from '@/components/MiniFilterBar';
import ColorPicker from '@/components/ColorPicker';
import ToolbarButton from '@/components/ToolbarButton';

import IconToggleSidePicker from './icons/IconToggleSide';
import IconToggleColorPicker from './icons/IconToggleColorPicker';
import IconOpenProductPicker from './icons/IconOpenProductPicker';
import IconUndo from './icons/IconUndo';
import IconRedo from './icons/IconRedo';

import {
  IconDrawingArea,
  IconDrawingAreaDisabled,
} from './icons/IconDrawingArea';
import { useState } from 'react';

const SIDES = ['Front', 'Back'];

type Props = {
  isDrawingAreaVisible: boolean;
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

  const history = useHistory();

  return (
    <Box p="0px 14px" w="100%">
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
          <ToolbarButton onClick={() => history.push('/app/products')}>
            <IconOpenProductPicker />
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
        <HStack spacing="14px">
          {onUndo ? (
            <ToolbarButton icon={<IconUndo />} onClick={onUndo} />
          ) : null}
          {onRedo ? (
            <ToolbarButton icon={<IconRedo />} onClick={onRedo} />
          ) : null}
        </HStack>
      </HStack>
      {isSidePickerVisible ? (
        <Box mb="20px">
          <MiniFilterBar
            options={SIDES}
            selectedValue={selectedSide}
            onChange={onSelectedSide}
          />
        </Box>
      ) : null}
      {isColorPickerVisible ? (
        <Box mb="20px">
          <ColorPicker
            onSelectedVariants={(values) => onSelectedVariant(values[0])}
            selectedVariants={[selectedVariant]}
          />
        </Box>
      ) : null}
    </Box>
  );
}
