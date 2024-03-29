import { ReactNode, useState } from 'react';
import { Box, ButtonProps, Flex } from '@chakra-ui/react';

import {
  AiImage,
  Style,
  StyleType,
  ImageToImageRequest,
  TextToImageRequest,
  FontToImageRequest,
} from '@/lib/types';

import EditorToolbar from './toolbar';

import TextToImageGenerator from './toolbar/text-to-image';
import ImageToImageGenerator from './toolbar/image-to-image';
import FontToImageGenerator from './toolbar/font-to-image';

import ToolType from './toolbar/ToolTypes';
import ImageUpload from '../components/upload/ImageUpload';

type EditorContainerProps = {
  onImageUploaded: (image: HTMLImageElement) => void;
  onImagesPreview?: (images: string[]) => void;
  onGeneratedImageSelected: (image: AiImage) => void;
  isEditorToolbarExpanded: boolean;
  onChangeEditorToolbarExpanded: (isExpanded: boolean) => void;
  children: React.ReactNode;
  getStyles: (type: StyleType) => Promise<Style[]>;
  generateImageFromText: (options: TextToImageRequest) => Promise<string[]>;
  generateImageFromImage?: (options: ImageToImageRequest) => Promise<string[]>;
  generateImageFromFont?: (options: FontToImageRequest) => Promise<string[]>;
  hideAiImageBackgroundSelector?: boolean;
  hideStyles?: boolean;
  customToolbarContent?: ReactNode;
  buttonProps?: {
    basic: ButtonProps;
    outlined: ButtonProps;
  };
  availableTools?: ToolType[];
  subjectText?: string;
  maxToolbarHeight?: number;
};

export default function EditorContainer({
  onImageUploaded,
  onImagesPreview,
  onGeneratedImageSelected,
  isEditorToolbarExpanded,
  onChangeEditorToolbarExpanded,
  children,
  getStyles,
  generateImageFromText,
  generateImageFromImage,
  generateImageFromFont,
  hideAiImageBackgroundSelector,
  hideStyles,
  customToolbarContent,
  availableTools,
  buttonProps,
  subjectText,
  maxToolbarHeight,
}: EditorContainerProps) {
  const [selectedTool, setSelectedTool] = useState(ToolType.TEXT_TO_IMAGE);
  const [maxHeight, setMaxHeight] = useState(null);

  const isImageToImage = selectedTool === ToolType.IMAGE_TO_IMAGE;

  return (
    <Flex
      align="center"
      bg="#F9F9F7"
      flexDirection={{ base: 'column', md: 'row' }}
      h="100%"
      w="100%"
    >
      <EditorToolbar
        isExpanded={isEditorToolbarExpanded}
        maxHeight={maxToolbarHeight || (isImageToImage && maxHeight)}
        onSetExpanded={onChangeEditorToolbarExpanded}
        onGeneratedImageSelected={onGeneratedImageSelected}
        selectedTool={selectedTool}
        onSelectedTool={setSelectedTool}
        hideStyles={hideStyles}
        hideButtons={
          !!customToolbarContent || (isEditorToolbarExpanded && availableTools?.length === 1)
        }
        availableTools={availableTools}
      >
        {customToolbarContent}
        <Box display={customToolbarContent ? 'none' : 'block'}>
          {selectedTool === ToolType.TEXT_TO_IMAGE ? (
            <TextToImageGenerator
              getStyles={getStyles}
              generateImageFromText={generateImageFromText}
              hideBackgroundSelector={hideAiImageBackgroundSelector}
              hideStyles={hideStyles}
              onGeneratedImageSelected={onGeneratedImageSelected}
              onImagesPreview={onImagesPreview}
              buttonProps={buttonProps}
              subjectText={subjectText}
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
          {selectedTool === ToolType.FONT_TO_IMAGE ? (
            <FontToImageGenerator
              getStyles={getStyles}
              generateImageFromFont={generateImageFromFont}
              onGeneratedImageSelected={onGeneratedImageSelected}
              onMaxHeightChange={(height) => {
                onChangeEditorToolbarExpanded(true);
                setMaxHeight(height);
              }}
            />
          ) : null}
          {selectedTool === ToolType.IMAGE_UPLOAD ? (
            <Box padding="20px">
              <ImageUpload onImageUploaded={onImageUploaded} />
            </Box>
          ) : null}
        </Box>
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
