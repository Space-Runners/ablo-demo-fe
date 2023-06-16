import { Box, Button as ChakraButton, Flex, HStack } from '@chakra-ui/react';

import {
  IconColorPicker,
  IconTextEditor,
  IconImage,
  IconExpand,
  IconShrink,
} from './Icons';
import { useState } from 'react';

type Props = {
  isDrawingAreaVisible;
  onToggleDrawingArea: () => void;
  onSettingsClick: () => void;
};

const Button = (props) => (
  <ChakraButton
    color="#FFFFFF"
    fontSize="sm"
    padding="0 8px"
    variant="ghost"
    _hover={{ bg: '' }}
    _active={{
      bg: '',
    }}
    _focus={{
      bg: '',
      boxShadow: '',
    }}
    {...props}
  />
);

export default function FooterToolbar() {
  const [isExpanded, setExpanded] = useState(false);
  const [isColorPickerOpen, setColorPickerOpen] = useState(false);
  const [isTextEditorOpen, setTextEditorOpen] = useState(false);

  return (
    <Box
      background="#000000"
      boxShadow="0px -1px 1px #626262"
      bottom={0}
      height="117px"
      padding="11px 20px 13px 17px"
      position="absolute"
      w="100%"
    >
      <Flex justify="space-between">
        <Button opacity={0.7}>Generate your design with AI</Button>
        <Button onClick={() => setExpanded(!isExpanded)} opacity={0.7}>
          {isExpanded ? <IconShrink /> : <IconExpand />}
        </Button>
      </Flex>
      <HStack mt="10px" spacing="8px">
        <Button onClick={() => setColorPickerOpen(!isColorPickerOpen)}>
          <IconColorPicker />
        </Button>
        <Button onClick={() => setTextEditorOpen(!isTextEditorOpen)}>
          <IconTextEditor />
        </Button>
        <Button onClick={() => null}>
          <IconImage />
        </Button>
      </HStack>
    </Box>
  );
}
