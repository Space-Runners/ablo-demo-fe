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

const IconRemoveBackground = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_2455_6091)">
      <path
        d="M24 26C24.5304 26 25.0391 26.2107 25.4142 26.5858C25.7893 26.9609 26 27.4696 26 28C26 27.4696 26.2107 26.9609 26.5858 26.5858C26.9609 26.2107 27.4696 26 28 26C27.4696 26 26.9609 25.7893 26.5858 25.4142C26.2107 25.0391 26 24.5304 26 24C26 24.5304 25.7893 25.0391 25.4142 25.4142C25.0391 25.7893 24.5304 26 24 26ZM24 14C24.5304 14 25.0391 14.2107 25.4142 14.5858C25.7893 14.9609 26 15.4696 26 16C26 15.4696 26.2107 14.9609 26.5858 14.5858C26.9609 14.2107 27.4696 14 28 14C27.4696 14 26.9609 13.7893 26.5858 13.4142C26.2107 13.0391 26 12.5304 26 12C26 12.5304 25.7893 13.0391 25.4142 13.4142C25.0391 13.7893 24.5304 14 24 14ZM17 26C17 24.4087 17.6321 22.8826 18.7574 21.7574C19.8826 20.6321 21.4087 20 23 20C21.4087 20 19.8826 19.3679 18.7574 18.2426C17.6321 17.1174 17 15.5913 17 14C17 15.5913 16.3679 17.1174 15.2426 18.2426C14.1174 19.3679 12.5913 20 11 20C12.5913 20 14.1174 20.6321 15.2426 21.7574C16.3679 22.8826 17 24.4087 17 26Z"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2455_6091">
        <rect width="24" height="24" fill="white" transform="translate(8 8)" />
      </clipPath>
    </defs>
  </svg>
);

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
    onUnselectActiveObject,
    onUpdateTextObject,
    onSetExpanded,
    activeObject,
    aiImage,
    onImageUploaded,
    onGeneratedImagePreview,
    onGeneratedImageSelected,
    onGeneratedImageRemoved,
  } = props;

  const { text = '' } = activeObject || {};

  const [selectedTool, setSelectedTool] = useState('imageGenerator');
  const [selectedTextEditTool, setSelectedTextEditTool] = useState(null);

  const [waiting, setWaiting] = useState(false);

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

  const handleRemoveBackground = () => {
    setWaiting(true);

    removeBackground(aiImage.url).then((url) => {
      console.log('Remove background', url);

      onGeneratedImagePreview(url);
      onGeneratedImageSelected({ ...aiImage, url });

      setWaiting(false);
    });
  };

  const isImageGenerator = selectedTool === 'imageGenerator';
  const isTextEditor = selectedTool === 'text';

  const isImagePicker = selectedTool === 'image';

  const imageSummary = activeObject?.aiImageUrl && aiImage;

  return (
    <Box bottom={0} position="fixed" w="100%" zIndex={3}>
      <Flex align="center" justify="space-between">
        <HStack>
          {activeObject && !selectedTextEditTool && !imageSummary ? (
            <F>
              <IconButton onClick={onDeleteActiveObject} ml="14px" mb="16px">
                <IconTrash />
              </IconButton>
            </F>
          ) : (
            <Box />
          )}
          {aiImage ? (
            <IconButton
              isLoading={waiting}
              onClick={handleRemoveBackground}
              ml="14px"
              mb="16px"
            >
              <IconRemoveBackground />
            </IconButton>
          ) : null}
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
        maxHeight={imageSummary ? 'calc(100vh - 121px)' : '400px'}
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
        </Flex>
        <Box display={isExpanded || imageSummary ? 'block' : 'none'}>
          {isImageGenerator ? (
            <ImageGenerator
              aiImage={imageSummary}
              onGeneratedImagePreview={onGeneratedImagePreview}
              onGeneratedImageSelected={onGeneratedImageSelected}
              onGeneratedImageRemoved={onGeneratedImageRemoved}
              onExitImageSummary={onUnselectActiveObject}
            />
          ) : null}
          {isImagePicker ? (
            <ImagePicker onImageUploaded={onImageUploaded} />
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}
