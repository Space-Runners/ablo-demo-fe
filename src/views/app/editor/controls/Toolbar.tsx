import { Box, Button, HStack } from '@chakra-ui/react';

import { useHistory } from 'react-router-dom';

import MiniFilterBar from '@/components/MiniFilterBar';
import ColorPicker from '@/components/ColorPicker';

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

const ToolbarButton = ({
  icon,
  isSelected,
  onClick,
}: {
  icon: React.ReactNode;
  isSelected?: boolean;
  onClick: () => void;
}) => (
  <Button
    background={isSelected ? '#000000' : '#F9F9F7'}
    borderRadius="50%"
    height="40px"
    onClick={onClick}
    padding="8px"
    width="40px"
  >
    {icon}
  </Button>
);

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
      <HStack
        mb="20px"
        justify="space-between"
        pt="17px"
        spacing="20px"
        w="100%"
      >
        <HStack spacing="4px">
          <ToolbarButton
            icon={<IconToggleSidePicker isSelected={isSidePickerVisible} />}
            isSelected={isSidePickerVisible}
            onClick={() => {
              setSidePickerVisible(!isSidePickerVisible);
              setColorPickerVisible(false);
            }}
          />
          <ToolbarButton
            icon={
              isDrawingAreaVisible ? (
                <IconDrawingArea />
              ) : (
                <IconDrawingAreaDisabled />
              )
            }
            isSelected={isDrawingAreaVisible}
            onClick={onToggleDrawingArea}
          />
          <ToolbarButton
            icon={<IconOpenProductPicker />}
            onClick={() => history.push('/app/products')}
          />
          <ToolbarButton
            icon={<IconToggleColorPicker isSelected={isColorPickerVisible} />}
            isSelected={isColorPickerVisible}
            onClick={() => {
              setColorPickerVisible(!isColorPickerVisible);
              setSidePickerVisible(false);
            }}
          />
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
