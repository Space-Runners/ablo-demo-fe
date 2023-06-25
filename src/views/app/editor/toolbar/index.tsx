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

/* const Button = (props) => (
  <ChakraButton
    color="#FFFFFF"
    fontSize="sm"
    minWidth="auto"
    padding="0 8px"
    variant="ghost"
    {...props}
  />
); */

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
    onAddText,
    onRemoveText,
    onUpdateTextObject,
    activeTextObject,
    onImageUploaded,
    onImageGenerated,
  } = props;

  const { text = '' } = activeTextObject || {};

  const [isExpanded, setExpanded] = useState(true);
  const [selectedTool, setSelectedTool] = useState('imageGenerator');

  const handleToolChange = (name) => {
    setSelectedTool(name);

    setExpanded(true);
  };

  const handleTextUpdate = (text) => {
    if (!activeTextObject) {
      onAddText({ text });

      return;
    }

    onUpdateTextObject({ text });
  };

  const isImageGenerator = selectedTool === 'imageGenerator';
  const isTextEditor = selectedTool === 'text';

  const isImagePicker = selectedTool === 'image';

  return (
    <Box bg="#FFFFFF" bottom={0} position="fixed" w="100%" zIndex={3}>
      {isTextEditor ? (
        <TextToolbar
          onUpdate={onUpdateTextObject}
          textObject={activeTextObject}
        />
      ) : null}
      <Box bg="#FFFFFF" padding="0 14px 12px 14px">
        <Flex align="center" height="50px" justify="space-between">
          {isTextEditor ? (
            <Input
              border="none"
              color="#6A6866"
              fontSize="md"
              onChange={(e) => handleTextUpdate(e.target.value)}
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
          <Button h="24px" onClick={() => setExpanded(!isExpanded)}>
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
            {isTextEditor ? (
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
