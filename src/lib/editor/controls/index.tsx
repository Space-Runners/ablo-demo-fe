import { HStack } from '@chakra-ui/react';

import ToolbarButton from '../components/ToolbarButton';

import IconUndo from '../../components/icons/IconUndo';
import IconRedo from '../../components/icons/IconRedo';
import { Design } from '../../types';

import ToolbarContainer from '../components/ToolbarContainer';

import { IconAddText, IconFlipTemplate, IconSave } from './Icons';

const SIDES = ['front', 'back'];

const textProps = {
  editable: true,
  fill: '#00FF29',
  fontFamily: 'Poppins',
  text: '',
  fontSize: 46,
  textAlign: 'left',
  originX: 'center',
  originY: 'center',
  scaleX: 3,
  scaleY: 3,
  centeredScaling: true,
};

type Props = {
  design: Design;
  onAddText: (props: object) => void;
  onSelectedSide?: (side: string) => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onSave: () => void;
  selectedSide?: string;
};

export default function Toolbar({
  design,
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
          {onSelectedSide ? (
            <ToolbarButton
              icon={<IconFlipTemplate />}
              onClick={() => {
                const currentIndex = SIDES.indexOf(selectedSide);

                onSelectedSide(SIDES[(currentIndex + 1) % SIDES.length]);
              }}
              text="Flip"
            />
          ) : null}
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
          {design.id ? <ToolbarButton icon={<IconSave />} onClick={onSave} text="Save" /> : null}
        </HStack>
      </HStack>
    </ToolbarContainer>
  );
}
