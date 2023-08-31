import { Fragment as F } from 'react';
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
  MenuItem,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';

import Button from '@/components/Button';
import IconCreateNew from '@/components/icons/IconCreateNew';
import IconMenu from '@/components/icons/IconMenu';
import Navbar from '@/components/navbar/Navbar';

import { Design } from '@/components/types';
import { useDesigns, useDeleteDesign } from '@/api/designs';
import Colors from '@/theme/colors';
import { timeAgo } from '@/utils/time';

const { abloBlue } = Colors;

type DesignsListProps = {
  designs: Design[];
  onSelectedDesign: (design: Design) => void;
};

const DesignsList = ({ designs, onSelectedDesign }: DesignsListProps) => {
  const { removeDesign } = useDeleteDesign();

  const handleDelete = (designId) => removeDesign(designId);

  return (
    <Box bg="#ffffff" padding="22px" w="100%">
      <HStack spacing="16px" wrap="wrap">
        {designs.map((design, index) => {
          const { name, sides } = design;

          console.log('Design', design);
          // Find first previewUrl
          const { previewUrl } = sides.find(({ hasGraphics, hasText }) => hasGraphics || hasText);

          return (
            <Card
              key={index}
              w="157px"
              bgColor="#F4F4F4"
              borderRadius={10}
              boxShadow="0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)"
              alignSelf="stretch"
            >
              <CardBody p={0}>
                <Center cursor="pointer" h="172px" onClick={() => onSelectedDesign(design)}>
                  <Image objectFit="contain" src={previewUrl} alt={name} h={155} px={1} py={4} />
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
                          fontSize="sm"
                          fontWeight={400}
                          onClick={(e) => {
                            e.stopPropagation();

                            handleDelete(design.id);
                          }}
                          padding="8px 18px"
                          _focus={{
                            bg: '#F4F4F4',
                          }}
                          _active={{
                            bg: 'none',
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
    </Box>
  );
};

export default function DesignsPage() {
  const history = useHistory();

  const { data: designs, isLoading } = useDesigns();

  const onSelectedDesign = (design: Design) => {
    history.push(`/app/editor?designId=${design.id}`);
  };

  const handleGoToEditor = () => {
    history.push('/app/editor');
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
        onNext={handleGoToEditor}
        rightSideContent={
          <Button
            h="40px"
            icon={<IconCreateNew color="#FFFFFF" />}
            onClick={handleGoToEditor}
            textTransform="none"
            title="Create New"
          />
        }
        title="My Designs"
      />
      {isLoading ? (
        <Center h="300px">
          <Spinner thickness="1px" speed="0.65s" emptyColor="gray" color={abloBlue} size="md" />
        </Center>
      ) : (
        designs && <DesignsList onSelectedDesign={onSelectedDesign} designs={designs} />
      )}
    </Box>
  );
}
