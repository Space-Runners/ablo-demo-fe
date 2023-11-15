import { useState } from 'react';

import { useDoubleTap } from 'use-double-tap';

import { Box, Flex, HStack, Image, Text } from '@chakra-ui/react';

import Button from '../../../components/Button';
import ImagePreviewModal from './ImagePreviewModal';

type ImagePreviewProps = {
  images: string[];
  selectedImage: string;
  onSelectedImage: (image: string) => void;
  onPlaceArtwork: () => void;
  onGenerateSimilar: () => void;
  onNewArtwork: () => void;
};

const ImagesPreview = ({
  images,
  selectedImage,
  onSelectedImage,
  onPlaceArtwork,
  onGenerateSimilar,
  onNewArtwork,
}: ImagePreviewProps) => {
  const [isPreviewModalVisible, setPreviewModalVisible] = useState(false);

  const bind = useDoubleTap(
    () => {
      setPreviewModalVisible(true);
    },
    300,
    {
      onSingleTap: (event) => {
        onSelectedImage((event.target as HTMLElement).id);
      },
    }
  );

  return (
    <Box padding="8px 14px">
      <Text mb="22px" textTransform="uppercase">
        Select image
      </Text>
      <HStack justify="center" mb="20px">
        {images.map((imageUrl) => (
          <Image
            border={imageUrl === selectedImage ? '4px solid #000000' : 'none'}
            borderRadius="5px"
            id={imageUrl}
            h={117}
            key={imageUrl}
            w="108px"
            src={imageUrl}
            alt="Generated image"
            {...bind}
          />
        ))}
      </HStack>
      <Button onClick={onPlaceArtwork} title="Place artwork" w="100%" />
      <Flex align="center" mt="14px" pb="14px">
        <Button flex={1} onClick={onGenerateSimilar} outlined title="Generate similar" />
        <Button flex={1} ml="10px" onClick={onNewArtwork} outlined title="New" />
      </Flex>
      {isPreviewModalVisible ? (
        <ImagePreviewModal image={selectedImage} onClose={() => setPreviewModalVisible(false)} />
      ) : null}
    </Box>
  );
};

export default ImagesPreview;
