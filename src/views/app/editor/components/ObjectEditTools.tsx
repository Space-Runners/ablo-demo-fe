import { useState } from 'react';
import { Button as ChakraButton, HStack, Text } from '@chakra-ui/react';

import { removeBackground } from '@/api/image-generator';
import { AiImage } from '@/components/types';

import { IconTrash, IconLayerDown, IconLayerUp } from '../toolbar/Icons';

const Button = (props) => (
  <ChakraButton
    bg="transparent"
    border="1px solid #D3D3D3"
    borderRadius="5px"
    h="32px"
    minW="auto"
    padding="6px 8px"
    {...props}
  />
);

const IconButton = (props) => <Button w="32px" {...props} />;

type ObjectEditToolsProps = {
  activeObject: { aiImageUrl?: string; text: string };
  onDeleteActiveObject: () => void;
  aiImage: AiImage;
  onAiImageUpdate: (image: AiImage) => void;
  onLayerUp: () => void;
  onLayerDown: () => void;
};

const ObjectEditTools = ({
  activeObject,
  onDeleteActiveObject,
  aiImage,
  onAiImageUpdate,
  onLayerDown,
  onLayerUp,
}: ObjectEditToolsProps) => {
  const [removingBackground, setRemovingBackground] = useState(false);

  const isBackgroundRemoved = aiImage?.url === aiImage?.noBackgroundUrl;

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

  if (!activeObject) {
    return null;
  }

  return (
    <HStack
      bg="#FFFFFF"
      borderRadius="10px"
      h="51px"
      boxShadow="0px 1px 2px 0px #0000000F"
      p="11px 15px"
      position="relative"
      bottom="100px"
    >
      <IconButton onClick={onLayerUp}>
        <IconLayerUp />
      </IconButton>
      <IconButton onClick={onLayerDown}>
        <IconLayerDown />
      </IconButton>
      <IconButton onClick={onDeleteActiveObject} ml="14px">
        <IconTrash />
      </IconButton>
      {activeObject?.aiImageUrl && aiImage ? (
        <Button isLoading={removingBackground} onClick={handleToggleBackground}>
          <Text>{isBackgroundRemoved ? 'Restore' : 'Remove'} background</Text>
        </Button>
      ) : null}
    </HStack>
  );
};

export default ObjectEditTools;
