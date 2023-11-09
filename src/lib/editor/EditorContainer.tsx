import { ReactNode, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { AiImage, Style, StyleType, ImageToImageRequest, TextToImageRequest } from '@/lib/types';

import EditorToolbar from './toolbar';

import TextToImageGenerator from './toolbar/text-to-image';
import ImageToImageGenerator from './toolbar/image-to-image';

import ComingSoon from './toolbar/components/coming-soon';

import ToolTypes from './toolbar/ToolTypes';
import ImageUpload from '../components/upload/ImageUpload';

type EditorContainerProps = {
  onImageUploaded: (image: HTMLImageElement) => void;
  onGeneratedImageSelected: (image: AiImage) => void;
  isEditorToolbarExpanded: boolean;
  onChangeEditorToolbarExpanded: (isExpanded: boolean) => void;
  children: React.ReactNode;
  getStyles: (type: StyleType) => Promise<Style[]>;
  generateImageFromText: (options: TextToImageRequest) => Promise<string[]>;
  generateImageFromImage?: (options: ImageToImageRequest) => Promise<string[]>;
  hideAiImageBackgroundSelector?: boolean;
  hideStyles?: boolean;
  customToolbarContent?: ReactNode;
  availableTools?: string[];
};

export default function EditorContainer({
  onImageUploaded,
  onGeneratedImageSelected,
  isEditorToolbarExpanded,
  onChangeEditorToolbarExpanded,
  children,
  getStyles,
  generateImageFromText,
  generateImageFromImage,
  hideAiImageBackgroundSelector,
  hideStyles,
  customToolbarContent,
  availableTools,
}: EditorContainerProps) {
  const [selectedTool, setSelectedTool] = useState(ToolTypes.TEXT_TO_IMAGE);
  const [maxHeight, setMaxHeight] = useState(null);

  const isImageToImage = selectedTool === ToolTypes.IMAGE_TO_IMAGE;

  return (
    <Flex
      align="center"
      bg="#F9F9F7"
      flexDirection={{ base: 'column', md: 'row' }}
      h={{ base: 'calc(100% - 121px)', md: 'calc(100% - 65px)' }}
      w="100%"
    >
      <EditorToolbar
        isExpanded={isEditorToolbarExpanded}
        maxHeight={isImageToImage && maxHeight}
        onSetExpanded={onChangeEditorToolbarExpanded}
        onGeneratedImageSelected={onGeneratedImageSelected}
        selectedTool={selectedTool}
        onSelectedTool={setSelectedTool}
        hideStyles={hideStyles}
        hideButtons={!!customToolbarContent}
        availableTools={availableTools}
      >
        {customToolbarContent || (
          <Box>
            {selectedTool === ToolTypes.TEXT_TO_IMAGE ? (
              <TextToImageGenerator
                getStyles={getStyles}
                generateImageFromText={generateImageFromText}
                hideBackgroundSelector={hideAiImageBackgroundSelector}
                hideStyles={hideStyles}
                onGeneratedImageSelected={onGeneratedImageSelected}
              />
            ) : null}
            {isImageToImage ? (
              <ImageToImageGenerator
                getStyles={getStyles}
                generateImageFromImage={generateImageFromImage}
                hideStyles={hideStyles}
                onGeneratedImageSelected={onGeneratedImageSelected}
                onMaxHeightChange={(height) => {
                  onChangeEditorToolbarExpanded(true);
                  setMaxHeight(height);
                }}
              />
            ) : null}
            {selectedTool === ToolTypes.FONT_TO_IMAGE ? (
              <ComingSoon feature={selectedTool} />
            ) : null}
            {selectedTool === ToolTypes.IMAGE_UPLOAD ? (
              <Box padding="20px">
                <ImageUpload onImageUploaded={onImageUploaded} />
              </Box>
            ) : null}
          </Box>
        )}
      </EditorToolbar>
      <Box
        display={{
          base: 'block',
          md: 'flex',
        }}
        flex={1}
        flexDirection="column"
        h={{ base: 'auto', md: '100%' }}
        w="100%"
      >
        {children}
      </Box>
    </Flex>
  );
}
