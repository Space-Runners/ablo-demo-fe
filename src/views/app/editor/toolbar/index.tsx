import { Box, Button, Flex, HStack, Input } from '@chakra-ui/react';

import IconTrash from '@/components/icons/IconTrash';

import {
  IconAiGenerator,
  IconTextEditor,
  IconImage,
  IconExpand,
  IconShrink,
} from './Icons';

import { useState, Fragment as F } from 'react';

import TextToolbar from './text-toolbar';
import ImageGenerator from './image-generator';
import ImagePicker from './components/ImagePicker';

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

const TextControls = ({ onAddText, onRemoveText }) => (
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
);

export default function FooterToolbar(props) {
  const {
    isExpanded,
    onAddText,
    onRemoveText,
    onUpdateTextObject,
    onToggleExpanded,
    activeTextObject,
    onImageUploaded,
    onImageGenerated,
  } = props;

  const { text = '' } = activeTextObject || {};

  const [selectedTool, setSelectedTool] = useState('text');

  const handleToolChange = (name) => {
    setSelectedTool(name);
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
      {isTextEditor ? (
        <TextToolbar
          onUpdate={onUpdateTextObject}
          textObject={activeTextObject}
        />
      ) : null}
      <Box
        bg="#FFFFFF"
        maxHeight="400px"
        overflow="auto"
        padding="0 14px 12px 14px"
      >
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
          <Button h="24px" onClick={onToggleExpanded}>
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
              <ImageGenerator onImageGenerated={onImageGenerated} />
            ) : null}
            {isTextEditor && null ? (
              <TextControls
                onAddText={() => onAddText()}
                onRemoveText={onRemoveText}
              />
            ) : null}
            {isImagePicker ? (
              <ImagePicker onImageUploaded={onImageUploaded} />
            ) : null}
          </F>
        ) : null}
      </Box>
    </Box>
  );
}
