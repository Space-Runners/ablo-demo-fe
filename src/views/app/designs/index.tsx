import { Fragment as F, useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Box,
  Card,
  CardBody,
  Center,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem as ChakraMenuItem,
  Show,
  Spinner,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';

import Button from '@/lib/components/Button';
import IconCreateNew from '@/components/icons/IconCreateNew';
import IconMenu from '@/components/icons/IconMenu';
import Navbar from '@/lib/components/navbar';

import { Design, Template, User } from '@/lib/types';
import { useDesigns, useDeleteDesign, useUpdateBasicDesign } from '@/api/designs';
import { useTemplates } from '@/api/templates';

import Colors from '@/lib/theme/colors';
import {
  GARMENT_IMAGE_DESKTOP_WIDTH,
  GARMENT_IMAGE_MOBILE_WIDTH,
  getDrawingArea,
} from '@/lib/editor/drawingAreas';

import { timeAgo } from '@/utils/time';

import RenameDesignModal from './RenameDesignModal';

const { abloBlue } = Colors;

const MenuItem = (props) => (
  <ChakraMenuItem
    fontSize="sm"
    fontWeight={400}
    padding="8px 18px"
    _focus={{
      bg: '#F4F4F4',
    }}
    _active={{
      bg: 'none',
    }}
    {...props}
  />
);

type DesignsListProps = {
  designs: Design[];
  onSelectedDesign: (design: Design) => void;
  templates: Template[];
};

const DesignsList = ({ designs, onSelectedDesign, templates }: DesignsListProps) => {
  const [renamingDesign, setRenamingDesign] = useState(null);

  const { removeDesign } = useDeleteDesign();

  const isMobile = useBreakpointValue({ base: true, md: false });

  const { updateDesign, isUpdating } = useUpdateBasicDesign();

  const handleRename = (name) => {
    updateDesign({ id: renamingDesign.id, name }).then(() => setRenamingDesign(null));
  };

  const handleDelete = (designId) => removeDesign(designId);

  return (
    <Box bg="#ffffff" padding="22px" w="100%">
      <HStack spacing="16px" wrap="wrap">
        {designs.map((design, index) => {
          const { name, sides, templateId, templateColorId } = design;

          const template = templates.find(({ id }) => id === templateId);

          const images =
            (template && template.colors.find(({ id }) => id === templateColorId).images) || [];

          const side = sides.find(({ hasGraphics, hasText }) => hasGraphics || hasText) || sides[0];

          const { imageUrl, templateSideId } = side;

          const templateSide = template && template.sides.find(({ id }) => id === templateSideId);

          const { id, name: sideName } = templateSide || {};

          const image = images.find(({ templateSideId }) => id === templateSideId);

          const drawingArea = template ? getDrawingArea(template, sideName, isMobile) : {};

          const THUMBNAIL_HEIGHT = 157;

          const scalingFactor =
            THUMBNAIL_HEIGHT /
            (isMobile ? GARMENT_IMAGE_MOBILE_WIDTH : GARMENT_IMAGE_DESKTOP_WIDTH);

          return (
            <Card
              key={index}
              w={`${THUMBNAIL_HEIGHT}px`}
              bgColor="#F4F4F4"
              borderRadius={10}
              boxShadow="0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)"
              alignSelf="stretch"
            >
              <CardBody p={0}>
                <Center
                  cursor="pointer"
                  h={`${THUMBNAIL_HEIGHT}px`}
                  onClick={() => onSelectedDesign(design)}
                  position="relative"
                >
                  <Image
                    src={image?.url}
                    position="absolute"
                    width={{
                      base: GARMENT_IMAGE_MOBILE_WIDTH,
                      md: GARMENT_IMAGE_DESKTOP_WIDTH,
                    }}
                  />
                  <Image
                    src={imageUrl}
                    position="absolute"
                    left={`${drawingArea.left * scalingFactor}px`}
                    top={`${drawingArea.top * scalingFactor}px`}
                    w={`${drawingArea.width * scalingFactor}px`}
                  />
                </Center>
                <Stack m={0} p={3} spacing={0.5} bg={'white'} h="57px" borderBottomRadius={10}>
                  <Flex justify="space-between" position="relative">
                    <Text fontSize="13px" fontWeight={500}>
                      {name}
                    </Text>
                    <Menu>
                      <MenuButton
                        as={Button}
                        bg="transparent"
                        border="none"
                        h="15px"
                        icon={<IconMenu />}
                        minWidth="none"
                        onClick={(e) => e.stopPropagation()}
                        p={0}
                        _hover={{
                          border: 'none',
                          boxShadow: 'none',
                        }}
                        _focus={{
                          border: 'none',
                          boxShadow: 'none',
                        }}
                        _active={{
                          border: 'none',
                          boxShadow: 'none',
                        }}
                      />
                      <MenuList border="none" borderRadius="11px" minWidth="none" p="0" w="124px">
                        <MenuItem
                          onClick={(e) => {
                            e.stopPropagation();

                            setRenamingDesign(design);
                          }}
                        >
                          Rename
                        </MenuItem>
                        <MenuItem
                          onClick={(e) => {
                            e.stopPropagation();

                            handleDelete(design.id);
                          }}
                        >
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Flex>
                  <Text color="#6A6866" fontSize="11px">
                    Edited {timeAgo(design.updatedAt)}
                  </Text>
                </Stack>
              </CardBody>
            </Card>
          );
        })}
      </HStack>
      {renamingDesign && (
        <RenameDesignModal
          designName={renamingDesign.name}
          isRenaming={isUpdating}
          onClose={() => setRenamingDesign(null)}
          onSave={handleRename}
        />
      )}
    </Box>
  );
};

type DesignsPageProps = {
  onCreateNewDesign: () => void;
  user: User;
};

export default function DesignsPage({ onCreateNewDesign, user }: DesignsPageProps) {
  const history = useHistory();

  const { data: designs, isLoading } = useDesigns();

  const { data: templates = [], isLoading: isLoadingTemplates } = useTemplates();

  const onSelectedDesign = (design: Design) => {
    history.push(`/app/editor?designId=${design.id}`);
  };

  const handleGoToTemplatePicker = () => {
    onCreateNewDesign();
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
        onNext={handleGoToTemplatePicker}
        rightSideContent={
          <Show above="md">
            <Button
              h="40px"
              icon={<IconCreateNew color="#FFFFFF" />}
              onClick={handleGoToTemplatePicker}
              textTransform="none"
              title="Create New"
            />
          </Show>
        }
        title="My Designs"
        user={user}
      />
      {isLoading || isLoadingTemplates ? (
        <Center h="300px">
          <Spinner thickness="1px" speed="0.65s" emptyColor="gray" color={abloBlue} size="md" />
        </Center>
      ) : (
        designs && (
          <DesignsList
            onSelectedDesign={onSelectedDesign}
            designs={designs}
            templates={templates}
          />
        )
      )}
    </Box>
  );
}
