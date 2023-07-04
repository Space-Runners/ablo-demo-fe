import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Collapse,
  Text,
} from '@chakra-ui/react';

import { useState, Fragment as F } from 'react';

import { AiImage } from '@/components/types';

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
  IconRemoveBackground,
  IconBackgroundRemoved,
} from './Icons';

import { removeBackground } from '@/api/image-generator';

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

type NewText = {
  fill: string;
  fontSize: number;
  text: string;
};

type FooterToolbarProps = {
  isExpanded: boolean;
  onSetExpanded: (isExpaned: boolean) => void;
  onAddText: (text: NewText) => void;
  onUpdateTextObject: (updates: object) => void;
  activeObject: { aiImageUrl?: string; text: string };
  onDeleteActiveObject: () => void;
  aiImage: AiImage;
  onImageUploaded: (image: File) => void;
  onGeneratedImagePreview: (url: string) => void;
  onGeneratedImageSelected: (image: AiImage) => void;
  onGeneratedImageRemoved: (url: string) => void;
  onAiImageUpdate: (image: AiImage) => void;
  onLayerUp: () => void;
  onLayerDown: () => void;
  onSave: () => void;
};

export default function FooterToolbar(props: FooterToolbarProps) {
  const {
    isExpanded,
    onSetExpanded,
    onAddText,
    onUpdateTextObject,
    activeObject,
    onDeleteActiveObject,
    aiImage,
    onImageUploaded,
    onGeneratedImagePreview,
    onGeneratedImageSelected,
    onGeneratedImageRemoved,
    onAiImageUpdate,
    onLayerUp,
    onLayerDown,
    onSave,
  } = props;

  const { text = '' } = activeObject || {};

  const [selectedTool, setSelectedTool] = useState('imageGenerator');
  const [selectedTextEditTool, setSelectedTextEditTool] = useState(null);
  const [removingBackground, setRemovingBackground] = useState(false);

  const isBackgroundRemoved = aiImage?.url === aiImage?.noBackgroundUrl;

  const handleToolChange = (name) => {
    setSelectedTool(name);

    onSetExpanded(true);
  };

  const handleTextUpdate = (text) => {
    if (!activeObject || !activeObject.text) {
      onAddText({ fill: '#000000', fontSize: 20, text });

      return;
    }

    onUpdateTextObject({ text });
  };

  const handleToggleBackground = () => {
    const { noBackgroundUrl, withBackgroundUrl } = aiImage;

    if (isBackgroundRemoved) {
      onAiImageUpdate({
        ...aiImage,
        url: withBackgroundUrl,
      });

      return;
    }

    if (noBackgroundUrl) {
      onAiImageUpdate({
        ...aiImage,
        url: noBackgroundUrl,
      });

      return;
    }

    setRemovingBackground(true);

    removeBackground(aiImage.url).then((url) => {
      console.log('Removed background', url);

      onAiImageUpdate({
        ...aiImage,
        url,
        noBackgroundUrl: url,
        withBackgroundUrl: aiImage.url,
      });

      setRemovingBackground(false);
    });
  };

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
        {activeObject?.aiImageUrl && (
          <HStack mb="16px" mr="16px">
            <Text
              color={isBackgroundRemoved ? '#6A6866' : '000000'}
              fontSize="xs"
              textTransform="uppercase"
            >
              Background
            </Text>
            <IconButton
              isLoading={removingBackground}
              onClick={handleToggleBackground}
            >
              {isBackgroundRemoved ? (
                <IconBackgroundRemoved />
              ) : (
                <IconRemoveBackground />
              )}
            </IconButton>
          </HStack>
        )}
      </Flex>
      <Box
        bg="#FFFFFF"
        maxHeight={
          // aiImage && isImageGenerator ? 'calc(100vh - 121px)' : '400px'
          '400px'
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
