import { useState } from 'react';

import {
  Box,
  Button,
  Flex,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { useVideos, useDeleteVideo } from '@/api/videos';

import ConfirmationModal from '@/components/alerts/ConfirmationModal';
import Card from '@/components/card/Card';
import { Video } from '@/components/types';

export default function Videos() {
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [deletingVideo, setDeletingVideo] = useState<number | null>(null);

  const { removeVideo } = useDeleteVideo();

  const handleConfirmDelete = () => {
    if (deletingVideo) {
      removeVideo(deletingVideo);
    }

    setDeletingVideo(null);
  };

  const { data: videos = [], isLoading } = useVideos();

  const textColor = useColorModeValue('secondaryGray.900', 'white');

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <Card
        direction="column"
        w="100%"
        px="0px"
        overflowX={{ sm: 'scroll', lg: 'hidden' }}
      >
        <Flex px="25px" justify="space-between" mb="20px" align="center">
          <Text
            color={textColor}
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
          >
            Videos
          </Text>
          <Button
            colorScheme="brand"
            onClick={() =>
              setEditingVideo({ url: '', maskUrl: '', name: '', metadata: '' })
            }
          >
            Add Video
          </Button>
        </Flex>
        {isLoading ? (
          <Stack padding="16px">
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        ) : null}
      </Card>

      {deletingVideo && (
        <ConfirmationModal
          onConfirm={handleConfirmDelete}
          onClose={() => setDeletingVideo(null)}
          title="Delete video"
        />
      )}
    </Box>
  );
}
