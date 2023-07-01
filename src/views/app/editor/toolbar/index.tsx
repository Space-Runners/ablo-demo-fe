import { Box, Button, Flex, HStack, Input } from '@chakra-ui/react';

import { useState, Fragment as F } from 'react';

import {
  IconAiGenerator,
  IconTextEditor,
  IconImage,
  IconExpand,
  IconShrink,
  IconTrash,
} from './Icons';

import { removeBackground } from '@/api/image-generator';

import TextToolbar from './text-toolbar';
import ImageGenerator from './image-generator';
import ImagePicker from './components/ImagePicker';
import ImageOverview from './ai-image-overview';

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
    activeObject,
    activeTextObject,
    aiImage,
    onImageUploaded,
    onImageGenerated,
    onImageSelected,
  } = props;

  const { text = '' } = activeTextObject || {};

  const [selectedTool, setSelectedTool] = useState('imageGenerator');
  const [selectedTextEditTool, setSelectedTextEditTool] = useState(null);

  const [waiting, setWaiting] = useState(false);

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

  const handleRemoveBackground = () => {
    setWaiting(true);

    removeBackground(aiImage.url).then((url) => {
      console.log('Remove background', url);

      onImageGenerated(url);
      onImageSelected({ ...aiImage, url });

      setWaiting(false);
    });
  };

  const isImageGenerator = selectedTool === 'imageGenerator';
  const isTextEditor = selectedTool === 'text';

  const isImagePicker = selectedTool === 'image';

  console.log('AI image', aiImage);

  return (
    <Box bottom={0} position="fixed" w="100%" zIndex={3}>
      <Flex align="center" justify="space-between">
        <HStack>
          {(activeObject || activeTextObject) && !selectedTextEditTool ? (
            <F>
              <IconButton onClick={onDeleteActiveObject} ml="14px" mb="16px">
                <IconTrash />
              </IconButton>
            </F>
          ) : (
            <Box />
          )}
          {null && (
            <IconButton
              isLoading={waiting}
              onClick={handleRemoveBackground}
              ml="14px"
              mb="16px"
            >
              <IconTrash />
            </IconButton>
          )}
        </HStack>
        {isTextEditor ? (
          <TextToolbar
            onUpdate={onUpdateTextObject}
            textObject={activeTextObject}
            selectedTool={selectedTextEditTool}
            onSelectedTool={setSelectedTextEditTool}
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
              onClick={() => onSetExpanded(true)}
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
        <Box display={isExpanded ? 'block' : 'none'}>
          {isImageGenerator ? (
            <ImageGenerator
              onImageGenerated={onImageGenerated}
              onImageSelected={onImageSelected}
            />
          ) : null}
          {isImagePicker ? (
            <ImagePicker onImageUploaded={onImageUploaded} />
          ) : null}
          {aiImage && activeObject && activeObject.imageUrl ? (
            <ImageOverview aiImage={aiImage} />
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}
