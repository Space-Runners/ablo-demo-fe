import { Button, HStack } from '@chakra-ui/react';

import Colors from '@/theme/colors';

import IconToggleOrientation from './icons/IconToggleGarment';
import {
  IconDrawingArea,
  IconDrawingAreaDisabled,
} from './icons/IconDrawingArea';
import IconSettings from './icons/IconSettings';

type Props = {
  isDrawingAreaVisible;
  onToggleOrientation: () => void;
  onToggleDrawingArea: () => void;
  onSettingsClick: () => void;
};

const ToolbarButton = ({ icon, onClick }) => (
  <Button
    background="#383838"
    border="1px solid #484848"
    borderRadius="4px"
    height="42px"
    onClick={onClick}
    padding="10px"
    width="42px"
    _hover={{ bg: '' }}
    _active={{
      bg: '',
    }}
    _focus={{
      bg: '',
      boxShadow: '',
    }}
  >
    {icon}
  </Button>
);

export default function Toolbar({
  isDrawingAreaVisible,
  onToggleDrawingArea,
  onToggleOrientation,
  onSettingsClick,
}: Props) {
  return (
    <HStack
      justify="space-between"
      padding="17px 12px 12px 17px"
      spacing="20px"
      w="100%"
    >
      <HStack spacing="11px">
        <ToolbarButton
          icon={<IconToggleOrientation />}
          onClick={onToggleOrientation}
        />
        <ToolbarButton
          icon={
            isDrawingAreaVisible ? (
              <IconDrawingArea />
            ) : (
              <IconDrawingAreaDisabled />
            )
          }
          onClick={onToggleDrawingArea}
        />
      </HStack>
      <ToolbarButton icon={<IconSettings />} onClick={onSettingsClick} />
    </HStack>
  );
}
