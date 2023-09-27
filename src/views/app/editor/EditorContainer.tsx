import { Box, Flex } from '@chakra-ui/react';

import { AiImage, Garment, Template } from '@/components/types';

import EditorToolbar from './toolbar';
import TemplateDetails from './toolbar/template-picker/TemplateDetails';

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
}: EditorContainerProps) {
  const isMobile = true;

  // useBreakpointValue({ base: true, md: false }, { ssr: false });

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
        templates={templates}
      />
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
