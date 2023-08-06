import { Fragment as F } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Box,
  Card,
  CardBody,
  Center,
  Flex,
  Icon,
  Image,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { chunk } from 'lodash';
import Navbar from '@/components/navbar/Navbar';
import { Design } from '@/components/types';
import { deleteDesign, useDesigns } from '@/api/designs';
import Colors from '@/theme/colors';
import { timeAgo } from '@/utils/time';

const { abloBlue } = Colors;

const IconCreateNew = (props) => (
  <Icon
    width="17px"
    height="17px"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.50016 2.12516C4.97935 2.12516 2.12516 4.97935 2.12516 8.50016C2.12516 12.021 4.97935 14.8752 8.50016 14.8752C12.021 14.8752 14.8752 12.021 14.8752 8.50016C14.8752 4.97935 12.021 2.12516 8.50016 2.12516ZM0.708496 8.50016C0.708496 4.19694 4.19694 0.708496 8.50016 0.708496C12.8034 0.708496 16.2918 4.19694 16.2918 8.50016C16.2918 12.8034 12.8034 16.2918 8.50016 16.2918C4.19694 16.2918 0.708496 12.8034 0.708496 8.50016Z"
      fill="#064AC4"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.49984 4.9585C8.89104 4.9585 9.20817 5.27563 9.20817 5.66683V11.3335C9.20817 11.7247 8.89104 12.0418 8.49984 12.0418C8.10864 12.0418 7.7915 11.7247 7.7915 11.3335V5.66683C7.7915 5.27563 8.10864 4.9585 8.49984 4.9585Z"
      fill="#064AC4"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.9585 8.49984C4.9585 8.10864 5.27563 7.7915 5.66683 7.7915H11.3335C11.7247 7.7915 12.0418 8.10864 12.0418 8.49984C12.0418 8.89104 11.7247 9.20817 11.3335 9.20817H5.66683C5.27563 9.20817 4.9585 8.89104 4.9585 8.49984Z"
      fill="#064AC4"
    />
  </Icon>
);

type DesignsListProps = {
  designs: Design[];
  onSelectedDesign: (design: Design) => void;
};

const DesignsList = ({ designs, onSelectedDesign }: DesignsListProps) => {
  const chunks = chunk(designs, 2);
  return (
    <Box bg="#ffffff" padding="22px" w="100%">
      {chunks.map((chunk, index) => (
        <Flex key={index} mb={4} gap={4}>
          {chunk.map((design, index) => {
            const { name, editorState } = design;
            // Find first templateUrl
            let templateUrl = '';
            for (const side in editorState) {
              if (editorState[side].templateUrl) {
                templateUrl = editorState[side].templateUrl;
                break;
              }
            }
            return (
              <Card
                key={index}
                onClick={() => onSelectedDesign(design)}
                w="165px"
                bgColor="#F4F4F4"
                borderRadius={10}
                boxShadow="0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)"
                alignSelf="stretch"
              >
                <CardBody p={0}>
                  <Center h="172px">
                    <Image
                      objectFit="contain"
                      src={templateUrl}
                      alt={name}
                      h={155}
                      px={1}
                      py={4}
                    />
                  </Center>
                  <Stack
                    m={0}
                    p={3}
                    spacing={0.5}
                    bg={'white'}
                    h="57px"
                    borderBottomRadius={10}
                  >
                    <Text fontSize="13px" fontWeight={500}>
                      {name}
                    </Text>
                    <Text color="#6A6866" fontSize="11px">
                      Edited {timeAgo(design.updatedAt)}
                    </Text>
                  </Stack>
                </CardBody>
              </Card>
            );
          })}
          {chunk.length === 1 ? <Box flex="1" marginLeft="8px" /> : null}
        </Flex>
      ))}
    </Box>
  );
};

export default function DesignsPage() {
  const history = useHistory();

  const { data: designs, isLoading } = useDesigns();

  const onSelectedDesign = (design: Design) => {
    history.push(`/app/editor?designId=${design.id}`);
  };

  return (
    <Box bg="#ffffff" w="100%" h="100%">
      <Navbar
        callToActionContent={
          <F>
            <IconCreateNew mr="4px" />
            <Text color={abloBlue}>Create New</Text>
          </F>
        }
        onNext={() => history.push('/app/editor')}
        title="My Designs"
      />
      {isLoading ? (
        <Center h="300px">
          <Spinner
            thickness="1px"
            speed="0.65s"
            emptyColor="gray"
            color={abloBlue}
            size="md"
          />
          ;
        </Center>
      ) : (
        designs && (
          <DesignsList onSelectedDesign={onSelectedDesign} designs={designs} />
        )
      )}
    </Box>
  );
}
