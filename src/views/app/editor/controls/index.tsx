import { HStack } from '@chakra-ui/react';

import ToolbarButton from '../components/ToolbarButton';

import IconUndo from '@/components/icons/IconUndo';
import IconRedo from '@/components/icons/IconRedo';

import ToolbarContainer from '../components/ToolbarContainer';

import { IconAddText, IconFlipTemplate, IconSave } from './Icons';

const SIDES = ['front', 'back'];

const textProps = {
  editable: true,
  fill: '#000000',
  fontFamily: 'Poppins',
  text: '',
  fontSize: 20,
  textAlign: 'left',
  originX: 'center',
  originY: 'center',
  scaleX: 3,
  scaleY: 3,
  centeredScaling: true,
};

type Props = {
  onAddText: (props: object) => void;
  onSelectedSide: (side: string) => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onSave: () => void;
  selectedSide: string;
};

export default function Toolbar({
  onAddText,
  onSelectedSide,
  onUndo,
  onRedo,
  onSave,
  selectedSide,
}: Props) {
  return (
    <ToolbarContainer>
      <HStack justify="space-between" spacing="20px" w="100%">
        <HStack spacing="12px">
          <ToolbarButton
            onClick={(e) => {
              e.stopPropagation();
              onAddText(textProps);
            }}
            icon={<IconAddText />}
            text="Add Text"
          />
          <ToolbarButton
            icon={<IconFlipTemplate />}
            onClick={() => {
              const currentIndex = SIDES.indexOf(selectedSide);

              onSelectedSide(SIDES[(currentIndex + 1) % SIDES.length]);
            }}
            text="Flip"
          />
        </HStack>
        <HStack>
          <ToolbarButton
            isDisabled={!onUndo}
            icon={<IconUndo isDisabled={!onUndo} />}
            onClick={onUndo}
            text="Undo"
          />
          <ToolbarButton
            isDisabled={!onRedo}
            icon={<IconRedo isDisabled={!onRedo} />}
            onClick={onRedo}
            text="Redo"
          />
          <ToolbarButton icon={<IconSave />} onClick={onSave} text="Save" />
        </HStack>
      </HStack>
    </ToolbarContainer>
  );
}
