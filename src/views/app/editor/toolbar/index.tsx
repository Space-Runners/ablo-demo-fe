import { Box, Button, Flex, HStack, Input } from '@chakra-ui/react';

import {
  IconAiGenerator,
  IconTextEditor,
  IconImage,
  IconExpand,
  IconShrink,
  IconTrash,
} from './Icons';

import { useState, Fragment as F } from 'react';

import TextToolbar from './text-toolbar';
import ImageGenerator from './image-generator';
import ImagePicker from './components/ImagePicker';
import GeneratedImageSummary from './ai-image-overview';

const IconButton = (props) => (
  <Button
    bg="transparent"
    h="32px"
    minW="auto"
    padding={0}
    w="32px"
    {...props}
  />
);

const TOOLS = [
  {
    name: 'imageGenerator',
    icon: <IconAiGenerator />,
    iconActive: <IconAiGenerator isSelected />,
  },
  {
    name: 'text',
    icon: <IconTextEditor />,
    iconActive: <IconTextEditor isSelected />,
  },
  {
    name: 'image',
    icon: <IconImage />,
    iconActive: <IconImage isSelected />,
  },
];

export default function FooterToolbar(props) {
  const {
    isExpanded,
    onAddText,
    onDeleteActiveObject,
    onUpdateTextObject,
    onSetExpanded,
    activeTextObject,
    activeImageObject,
    onImageUploaded,
    onImageGenerated,
  } = props;

  const { text = '' } = activeTextObject || {};

  const [selectedTool, setSelectedTool] = useState('imageGenerator');

  const handleToolChange = (name) => {
    setSelectedTool(name);

    onSetExpanded(true);
  };

  const handleTextUpdate = (text) => {
    console.log('Text', text, activeTextObject);
    if (!activeTextObject) {
      onAddText({ fill: '#000000', fontSize: 20, text });

      return;
    }

    onUpdateTextObject({ text });
  };

  const isImageGenerator = selectedTool === 'imageGenerator';
  const isTextEditor = selectedTool === 'text';

  const isImagePicker = selectedTool === 'image';

  return (
    <Box bottom={0} position="fixed" w="100%" zIndex={3}>
      <Flex align="center" justify="space-between">
        <HStack p="16px 14px">
          <IconButton onClick={onDeleteActiveObject}>
            <IconTrash />
          </IconButton>
        </HStack>
        {isTextEditor ? (
          <TextToolbar
            onUpdate={onUpdateTextObject}
            textObject={activeTextObject}
          />
        ) : (
          <Box />
        )}
      </Flex>
      <Box bg="#FFFFFF" maxHeight="400px" overflow="auto" padding="0 14px">
        <Flex align="center" height="50px" justify="space-between">
          {isTextEditor ? (
            <Input
              border="none"
              fontSize="md"
              onChange={(e) => handleTextUpdate(e.target.value)}
              padding={0}
              placeholder="Write your text here"
              value={text}
              _focus={{
                border: 'none',
              }}
              _placeholder={{
                color: '#6A6866',
              }}
            />
          ) : (
            <Button
              bg="transparent"
              color="#6A6866"
              fontSize="md"
              fontWeight={400}
              h="30px"
              padding={0}
            >
              Generate your design with AI
            </Button>
          )}

          <Button
            bg="transparent"
            h="24px"
            minWidth="auto"
            onClick={() => onSetExpanded(!isExpanded)}
            padding={0}
          >
            {isExpanded ? <IconShrink /> : <IconExpand />}
          </Button>
        </Flex>
        <Flex align="center" justify="space-between" padding="10px 0">
          <HStack spacing="8px">
            {TOOLS.map(({ name, icon, iconActive }) => (
              <Button
                bg={selectedTool === name ? '#000000' : 'transparent'}
                borderRadius="50%"
                h="40px"
                key={name}
                onClick={() => handleToolChange(name)}
                w="40px"
              >
                {selectedTool === name ? iconActive : icon}
              </Button>
            ))}
          </HStack>
        </Flex>
        {isExpanded ? (
          <F>
            {isImageGenerator ? (
              <ImageGenerator
                onImageGenerated={onImageGenerated}
                onPlaceArtwork={}
              />
            ) : null}

            {isImagePicker ? (
              <ImagePicker onImageUploaded={onImageUploaded} />
            ) : null}
            {activeImageObject ? <GeneratedImageSummary /> : null}
          </F>
        ) : null}
      </Box>
    </Box>
  );
}
