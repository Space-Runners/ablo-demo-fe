import { Box, Button as ChakraButton, Flex, HStack } from '@chakra-ui/react';

import {
  IconAiGenerator,
  IconTextEditor,
  IconImage,
  IconExpand,
  IconShrink,
  IconColorPicker,
} from './Icons';
import { useState } from 'react';

import TextEditor from './text-editor';

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
      position="fixed"
      w="100%"
      zIndex={2}
    >
      <Box height="117px" padding="11px 20px 13px 17px">
        <Flex justify="space-between">
          <Button opacity={0.7}>Generate your design with AI</Button>
          <Button onClick={() => setExpanded(!isExpanded)} opacity={0.7}>
            {isExpanded ? <IconShrink /> : <IconExpand />}
          </Button>
        </Flex>
        <Flex justify="space-between">
          <HStack mt="10px" spacing="8px">
            <Button onClick={() => setColorPickerOpen(!isColorPickerOpen)}>
              <IconAiGenerator />
            </Button>
            <Button onClick={() => setTextEditorOpen(!isTextEditorOpen)}>
              <IconTextEditor />
            </Button>
            <Button onClick={() => null}>
              <IconImage />
            </Button>
          </HStack>
          <Button onClick={() => null}>
            <IconColorPicker />
          </Button>
        </Flex>
      </Box>
      <TextEditor />
    </Box>
  );
}
