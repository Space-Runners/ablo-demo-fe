import { Box, HStack } from '@chakra-ui/react';

import ToolbarButton from '../components/ToolbarButton';

import IconUndo from '@/components/icons/IconUndo';
import IconRedo from '@/components/icons/IconRedo';

import { IconAddText, IconFlipProduct, IconSave } from './Icons';

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
    <Box
      bg="#FFFFFF"
      borderLeft={{ base: 'none', md: '1px solid rgba(26, 26, 26, 0.10)' }}
      boxShadow="0px 0.7647058963775635px 1.529411792755127px 0px rgba(0, 0, 0, 0.06), 0px 0.7647058963775635px 2.2941176891326904px 0px rgba(0, 0, 0, 0.10)"
      h={{ base: '70px', md: 'auto' }}
      p={{ base: '20px 14px 10px 14px', md: '20px 14px' }}
      w="100%"
    >
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
            icon={<IconFlipProduct />}
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
    </Box>
  );
}
