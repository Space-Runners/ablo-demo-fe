import { Box, Button, Flex, HStack, Input, Collapse } from '@chakra-ui/react';

import { useState, Fragment as F } from 'react';

import {
  IconAiGenerator,
  IconTextEditor,
  IconImage,
  IconExpand,
  IconShrink,
  IconTrash,
  IconLayerDown,
  IconLayerUp,
  IconSave,
} from './Icons';

// import { removeBackground } from '@/api/image-generator';

import TextToolbar from './text-toolbar';
import ImageGenerator from './image-generator';
import ImagePicker from './components/ImagePicker';

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
    aiImage,
    onImageUploaded,
    onGeneratedImagePreview,
    onGeneratedImageSelected,
    onGeneratedImageRemoved,
    onLayerUp,
    onLayerDown,
    onSave,
  } = props;

  const { text = '' } = activeObject || {};

  const [selectedTool, setSelectedTool] = useState('imageGenerator');
  const [selectedTextEditTool, setSelectedTextEditTool] = useState(null);

  const handleToolChange = (name) => {
    setSelectedTool(name);

    onSetExpanded(true);
  };

  const handleTextUpdate = (text) => {
    console.log(activeObject);
    if (!activeObject || !activeObject.text) {
      onAddText({ fill: '#000000', fontSize: 20, text });

      return;
    }

    onUpdateTextObject({ text });
  };

  /*  const handleRemoveBackground = () => {
    setWaiting(true);

    removeBackground(aiImage.url).then((url) => {
      console.log('Remove background', url);

      onGeneratedImagePreview(url);
      onGeneratedImageSelected({ ...aiImage, url });

      setWaiting(false);
    });
  }; */

  const isImageGenerator = selectedTool === 'imageGenerator';
  const isTextEditor = selectedTool === 'text';

  const isImagePicker = selectedTool === 'image';

  return (
    <Box bottom={0} position="fixed" w="100%" zIndex={3}>
      <Flex align="center" justify="space-between">
        <HStack>
          {activeObject && !selectedTextEditTool ? (
            <F>
              <IconButton onClick={onDeleteActiveObject} ml="14px">
                <IconTrash />
              </IconButton>
              <IconButton onClick={onLayerUp}>
                <IconLayerUp />
              </IconButton>
              <IconButton onClick={onLayerDown}>
                <IconLayerDown />
              </IconButton>
            </F>
          ) : (
            <Box />
          )}
        </HStack>
        {isTextEditor ? (
          <TextToolbar
            onUpdate={onUpdateTextObject}
            textObject={activeObject}
            selectedTool={selectedTextEditTool}
            onSelectedTool={setSelectedTextEditTool}
          />
        ) : (
          <Box />
        )}
      </Flex>
      <Box
        bg="#FFFFFF"
        maxHeight={
          aiImage && isImageGenerator ? 'calc(100vh - 121px)' : '400px'
        }
        overflow="auto"
        padding="0 14px"
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
          <Button
            bg="transparent"
            onClick={onSave}
            padding={0}
            minWidth="auto"
            w="26px"
          >
            <IconSave />
          </Button>
        </Flex>
        <Collapse in={isExpanded} animateOpacity>
          <Box display={isExpanded ? 'block' : 'none'}>
            {isImageGenerator ? (
              <ImageGenerator
                aiImage={aiImage}
                onGeneratedImagePreview={onGeneratedImagePreview}
                onGeneratedImageSelected={onGeneratedImageSelected}
                onGeneratedImageRemoved={onGeneratedImageRemoved}
              />
            ) : null}
            {isImagePicker ? (
              <ImagePicker onImageUploaded={onImageUploaded} />
            ) : null}
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
}
