import { Button, HStack } from '@chakra-ui/react';

import Colors from '@/theme/colors';

import IconToggleGarment from './icons/IconToggleGarment';
import {
  IconDrawingArea,
  IconDrawingAreaDisabled,
} from './icons/IconDrawingArea';
import IconSettings from './icons/IconSettings';

const { gray } = Colors;

type Props = {
  isDrawingAreaVisible;
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
  onSettingsClick,
}: Props) {
  return (
    <HStack justify="space-between" padding="17px 40px" spacing="20px" w="100%">
      <HStack spacing="11px">
        <ToolbarButton
          icon={<IconToggleGarment />}
          onClick={() => {
            console.log('To do');
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
          onClick={onToggleDrawingArea}
        />
      </HStack>
      <ToolbarButton icon={<IconSettings />} onClick={onSettingsClick} />
    </HStack>
  );
}
