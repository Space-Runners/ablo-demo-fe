import { useState } from 'react';
import { Button as ChakraButton, HStack, Text } from '@chakra-ui/react';

import { removeBackground } from '@/api/image-generator';
import { AiImage } from '@/components/types';

import {
  IconTrash,
  IconLayerDown,
  IconLayerUp,
  IconCopy,
} from '../toolbar/Icons';

const Button = (props) => (
  <ChakraButton
    bg="transparent"
    border="1px solid #D3D3D3"
    borderRadius="5px"
    h="23px"
    minW="auto"
    padding="6px 8px"
    {...props}
  />
);

const IconButton = (props) => <Button w="25px" {...props} />;

type ObjectEditToolsProps = {
  activeObject: {
    aiImage: AiImage;
    noBackgroundUrl: string;
    text: string;
    withBackgroundUrl: string;
  };
  onCopyActiveObject: () => void;
  onDeleteActiveObject: () => void;
  hasImagePreview: boolean;
  onImageUpdate: (image: AiImage) => void;
  onLayerUp: () => void;
  onLayerDown: () => void;
};

const ObjectEditTools = ({
  activeObject,
  onDeleteActiveObject,
  hasImagePreview,
  onImageUpdate,
  onLayerDown,
  onLayerUp,
  onCopyActiveObject,
}: ObjectEditToolsProps) => {
  const [removingBackground, setRemovingBackground] = useState(false);

  if (!activeObject) {
    return null;
  }

  const { aiImage } = activeObject;
  const { url, noBackgroundUrl, withBackgroundUrl } = aiImage || {};

  const isBackgroundRemoved = url === noBackgroundUrl;

  const handleToggleBackground = () => {
    if (isBackgroundRemoved) {
      onImageUpdate({
        ...aiImage,
        url: withBackgroundUrl,
      });

      return;
    }

    if (noBackgroundUrl) {
      onImageUpdate({
        ...aiImage,
        url: noBackgroundUrl,
      });

      return;
    }

    setRemovingBackground(true);

    removeBackground(aiImage.url).then((url) => {
      console.log('Removed background', url);

      onImageUpdate({
        ...aiImage,
        url,
        noBackgroundUrl: url,
        withBackgroundUrl: aiImage.url,
      });

      setRemovingBackground(false);
    });
  };

  if (!activeObject) {
    return null;
  }

  return (
    <HStack
      bg="#FFFFFF"
      borderRadius="8px"
      h="39px"
      boxShadow="0px 1px 2px 0px #0000000F"
      p="8px 11px"
      position="relative"
      spacing="7px"
      bottom={hasImagePreview ? '90px' : '40px'}
    >
      <IconButton onClick={onLayerUp}>
        <IconLayerUp />
      </IconButton>
      <IconButton onClick={onLayerDown}>
        <IconLayerDown />
      </IconButton>
      <IconButton onClick={onCopyActiveObject}>
        <IconCopy />
      </IconButton>
      <IconButton onClick={onDeleteActiveObject} ml="14px">
        <IconTrash />
      </IconButton>
      {activeObject?.aiImage ? (
        <Button isLoading={removingBackground} onClick={handleToggleBackground}>
          <Text fontSize="11px">
            {isBackgroundRemoved ? 'Restore' : 'Remove'} background
          </Text>
        </Button>
      ) : null}
    </HStack>
  );
};

export default ObjectEditTools;
