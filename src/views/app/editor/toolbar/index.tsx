import { Box, Button, Flex, HStack, Input, Collapse } from '@chakra-ui/react';

import { useState } from 'react';

import ToolbarButton from '@/components/ToolbarButton';
import { AiImage } from '@/components/types';

import {
  IconAiGenerator,
  IconTextEditor,
  IconImage,
  IconExpand,
  IconShrink,
} from './Icons';

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

type FooterToolbarProps = {
  isExpanded: boolean;
  onSetExpanded: (isExpaned: boolean) => void;
  onUpdateTextObject: (updates: object) => void;
  activeObject: { text: string };
  aiImage: AiImage;
  onImageUploaded: (image: File) => void;
  onGeneratedImagePreview: (image: AiImage) => void;
  onGeneratedImageSelected: (image: AiImage) => void;
  onGeneratedImageRemoved: (url: string) => void;
};

export default function FooterToolbar(props: FooterToolbarProps) {
  const {
    isExpanded,
    onSetExpanded,
    onUpdateTextObject,
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

  const handleToolChange = (name) => {
    setSelectedTool(name);

    onSetExpanded(true);
  };

  const handleTextUpdate = (text) => {
    onUpdateTextObject({ text });
  };

  const isImageGenerator = selectedTool === 'imageGenerator';
  const isTextEditor = selectedTool === 'text';

  const isImagePicker = selectedTool === 'image';

  return (
    <Box bottom={0} position="fixed" w="100%" zIndex={3}>
      <Flex align="center" justify="flex-end">
        {activeObject?.text ? (
          <TextToolbar
            onUpdate={onUpdateTextObject}
            textObject={activeObject}
            selectedTool={selectedTextEditTool}
            onSelectedTool={setSelectedTextEditTool}
          />
        ) : null}
      </Flex>
      <Box bg="#FFFFFF" maxHeight="400px" overflow="auto" padding="0 7px">
        <Flex
          align="center"
          height="50px"
          justify="space-between"
          padding="0 7px"
        >
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
            <Box />
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
              <ToolbarButton
                isSelected={selectedTool === name}
                key={name}
                onClick={() => handleToolChange(name)}
              >
                {selectedTool === name ? iconActive : icon}
              </ToolbarButton>
            ))}
          </HStack>
        </Flex>
        <Collapse in={isExpanded} animateOpacity>
          <Box display={isExpanded ? 'block' : 'none'}>
            {isImageGenerator ? (
              <ImageGenerator
                aiImage={aiImage}
                key={aiImage?.url}
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
