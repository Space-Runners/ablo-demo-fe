import { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { AiImage, Style, TextToImageRequest } from '@/lib/types';

import EditorToolbar from './toolbar';

import ImageGenerator from './toolbar/image-generator';
import ImagePicker from './toolbar/components/ImagePicker';
import ComingSoon from './toolbar/components/coming-soon';

type EditorContainerProps = {
  onImageUploaded: (image: File) => void;
  onGeneratedImageSelected: (image: AiImage) => void;
  isEditorToolbarExpanded: boolean;
  onChangeEditorToolbarExpanded: (isExpanded: boolean) => void;
  children: React.ReactNode;
  getStyles: () => Promise<Style[]>;
  generateImage: (options: TextToImageRequest) => Promise<string[]>;
  hideAiImageBackgroundSelector?: boolean;
  hideStyles?: boolean;
};

export default function EditorContainer({
  onImageUploaded,
  onGeneratedImageSelected,
  isEditorToolbarExpanded,
  onChangeEditorToolbarExpanded,
  children,
  getStyles,
  generateImage,
  hideAiImageBackgroundSelector,
  hideStyles,
}: EditorContainerProps) {
  const [selectedTool, setSelectedTool] = useState('textToImage');

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
        onSetExpanded={onChangeEditorToolbarExpanded}
        onImageUploaded={onImageUploaded}
        onGeneratedImageSelected={onGeneratedImageSelected}
        selectedTool={selectedTool}
        onSelectedTool={setSelectedTool}
        hideStyles={hideStyles}
      >
        <Box>
          {selectedTool === 'textToImage' ? (
            <ImageGenerator
              getStyles={getStyles}
              generateImage={generateImage}
              hideBackgroundSelector={hideAiImageBackgroundSelector}
              hideStyles={hideStyles}
              onGeneratedImageSelected={onGeneratedImageSelected}
            />
          ) : null}
          {['fontToImage', 'imageToImage'].includes(selectedTool) ? (
            <ComingSoon feature={selectedTool} />
          ) : null}
          {selectedTool === 'imageUpload' ? (
            <ImagePicker onImageUploaded={onImageUploaded} />
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
