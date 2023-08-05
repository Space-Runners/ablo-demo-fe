import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react';

const ToolbarButton = ({
  icon,
  isDisabled = false,
  isSelected = null,
  text,
  ...rest
}) => {
  return (
    <Button
      background={isSelected ? '#000000' : 'transparent'}
      disabled={isDisabled}
      padding="4px 4px 8px 4px"
      /*  _focus={{
        border: `1px solid ${abloBlue}`,
        boxShadow: '0px 0px 8px 0px #97B9F5',
      }} */
      /*  _hover={{
        border: `1px solid ${abloBlue}`,
        boxShadow: '0px 0px 8px 0px #97B9F5',
      }} */
      {...rest}
    >
      <VStack>
        {icon}
        <Text as="b" fontSize="9px" color={isDisabled ? '#848484' : '#000000'}>
          {text}
        </Text>
      </VStack>
    </Button>
  );
};

import {
  IconAddText,
  IconFlipProduct,
  IconUndo,
  IconRedo,
  IconSave,
} from './Icons';

const SIDES = ['front', 'back'];

type Props = {
  onAddText: () => void;
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
              onAddText();
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
            text="Flip Product"
          />
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
