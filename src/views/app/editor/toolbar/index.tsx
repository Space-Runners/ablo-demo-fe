import {
  Box,
  Button as ChakraButton,
  Flex,
  HStack,
  Input,
} from '@chakra-ui/react';

import IconTrash from '@/components/icons/IconTrash';

import {
  IconAiGenerator,
  IconTextEditor,
  IconImage,
  IconExpand,
  IconShrink,
  IconColorPicker,
} from './Icons';
import { useState } from 'react';

import TextToolbar from './text-toolbar';

import fonts from './text-toolbar/fonts';

const TOOLS = [
  {
    name: 'ai',
    icon: <IconAiGenerator />,
  },
  {
    name: 'text',
    icon: <IconTextEditor />,
  },
  {
    name: 'image',
    icon: <IconImage />,
  },
];

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

export default function FooterToolbar(props) {
  const { onAddText, onRemoveText, onUpdateTextObject, activeTextObject } =
    props;

  const { fontSize, text = '' } = activeTextObject || {};

  const [isExpanded, setExpanded] = useState(true);
  const [selectedTool, setSelectedTool] = useState('');

  console.log('Text object', activeTextObject);

  const isTextEditor = selectedTool === 'text';

  return (
    <Box bottom={0} position="fixed" w="100%" zIndex={2}>
      {isTextEditor || true ? (
        <TextToolbar
          onUpdate={onUpdateTextObject}
          textObject={activeTextObject}
        />
      ) : null}
      <Box
        background="#000000"
        boxShadow="0px -1px 1px #626262"
        padding="11px 20px 13px 17px"
      >
        <Flex justify="space-between">
          {isTextEditor ? (
            <Input
              border="none"
              color="#FFFFFF"
              onChange={(e) => onUpdateTextObject({ text: e.target.value })}
              placeholder="Write your text here"
              value={text}
              _focus={{
                border: 'none',
              }}
            />
          ) : (
            <Button opacity={0.7}>Generate your design with AI</Button>
          )}
          <Button onClick={() => setExpanded(!isExpanded)} opacity={0.7}>
            {isExpanded ? <IconShrink /> : <IconExpand />}
          </Button>
        </Flex>
        <Flex align="center" justify="space-between" mt="10px">
          <HStack spacing="8px">
            {TOOLS.map(({ name, icon }) => (
              <Button
                onClick={() => setSelectedTool(name)}
                opacity={name === selectedTool ? 1 : 0.3}
              >
                {icon}
              </Button>
            ))}
          </HStack>
          <Button onClick={() => null}>
            <IconColorPicker />
          </Button>
        </Flex>
        {isExpanded ? (
          <HStack mb="17px" mt="30px" spacing="14px">
            <Button
              border="1px solid #FFFFFF"
              borderRadius="112px"
              fontWeight={600}
              fontSize="sm"
              color="#FFFFFF"
              height="40px"
              leftIcon={<IconTrash />}
              onClick={onRemoveText}
              padding="8px 32px"
            >
              Remove Text
            </Button>
            <Button
              background="#ffffff"
              color="#212121"
              onClick={onAddText}
              padding="8px 32px"
            >
              Add New Text
            </Button>
          </HStack>
        ) : null}
      </Box>
    </Box>
  );
}
