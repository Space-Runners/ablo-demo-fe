import { useState } from 'react';
import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';

import { AiImage, Filters, Garment, Style, Template, TextToImageRequest } from '@/lib/types';

import EditorToolbar from './toolbar';
import TemplateDetails from './toolbar/template-picker/TemplateDetails';

import TemplatePicker from './toolbar/template-picker';
import ImageGenerator from './toolbar/image-generator';
import ImagePicker from './toolbar/components/ImagePicker';
import ComingSoon from './toolbar/components/coming-soon';

type EditorContainerProps = {
  selectedGarment: Garment;
  onSelectedGarment: (garment: Garment) => void;
  selectedTemplate: Template;
  onSelectedTemplate: (template: Template) => void;
  templates: Template[];
  onImageUploaded: (image: File) => void;
  onGeneratedImageSelected: (image: AiImage) => void;
  isEditorToolbarExpanded: boolean;
  onChangeEditorToolbarExpanded: (isExpanded: boolean) => void;
  children: React.ReactNode;
  getStyles: () => Promise<Style[]>;
  generateImage: (options: TextToImageRequest) => Promise<string[]>;
};

export default function EditorContainer({
  selectedGarment,
  onSelectedGarment,
  selectedTemplate,
  onSelectedTemplate,
  templates,
  onImageUploaded,
  onGeneratedImageSelected,
  isEditorToolbarExpanded,
  onChangeEditorToolbarExpanded,
  children,
  getStyles,
  generateImage,
}: EditorContainerProps) {
  const [selectedTool, setSelectedTool] = useState('textToImage');

  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    clothingTypes: [],
    price: [20, 90],
  });

  const isMobile = useBreakpointValue({ base: true, md: false }, { ssr: false });

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
        selectedGarment={selectedGarment}
        onSelectedGarment={onSelectedGarment}
        selectedTemplate={selectedTemplate}
        onSelectedTemplate={onSelectedTemplate}
        selectedTool={selectedTool}
        onSelectedTool={setSelectedTool}
        templates={templates}
      >
        <Box>
          {selectedTool === 'templatePicker' ? (
            <TemplatePicker
              filters={selectedFilters}
              onFiltersChange={setSelectedFilters}
              selectedGarment={selectedGarment}
              onSelectedGarment={onSelectedGarment}
              selectedTemplate={selectedTemplate}
              onSelectedTemplate={onSelectedTemplate}
              templates={templates}
            />
          ) : null}
          {selectedTool === 'textToImage' ? (
            <ImageGenerator
              getStyles={getStyles}
              generateImage={generateImage}
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
      {!isMobile && selectedTemplate ? (
        <Box flex={1} height="100%" p="20px">
          <Box bg="#FFFFFF" borderRadius="10px" height="100%" overflow="auto">
            <TemplateDetails
              garment={selectedGarment}
              onGarmentUpdate={onSelectedGarment}
              template={selectedTemplate}
            />
          </Box>
        </Box>
      ) : null}
      <Box
        display={{
          base: 'block',
          md: selectedTemplate ? 'none' : 'flex',
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
