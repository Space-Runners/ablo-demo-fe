import { Box, Button, Flex, HStack, Collapse } from '@chakra-ui/react';

import { useState } from 'react';

import ToolbarButton from '@/components/ToolbarButton';
import { AiImage } from '@/components/types';

import { IconAiGenerator, IconImage, IconExpand, IconShrink } from './Icons';

import ImageGenerator from './image-generator';
import ImagePicker from './components/ImagePicker';

const TOOLS = [
  {
    name: 'imageGenerator',
    icon: <IconAiGenerator />,
    iconActive: <IconAiGenerator isSelected />,
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
    aiImage,
    onImageUploaded,
    onGeneratedImagePreview,
    onGeneratedImageSelected,
    onGeneratedImageRemoved,
  } = props;

  const [selectedTool, setSelectedTool] = useState('imageGenerator');

  const handleToolChange = (name) => {
    setSelectedTool(name);

    onSetExpanded(true);
  };

  const isImageGenerator = selectedTool === 'imageGenerator';
  const isImagePicker = selectedTool === 'image';

  return (
    <Box bottom={0} position="fixed" w="100%" zIndex={3}>
      <Box bg="#FFFFFF" maxHeight="400px" overflow="auto">
        <Flex align="center" justify="space-between" padding="10px 14px">
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
