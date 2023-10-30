import {
  Box,
  Button as ChakraButton,
  Center,
  Spinner,
  Flex,
  Image,
  Show,
  Text,
  VStack,
  HStack,
  useBreakpointValue,
} from '@chakra-ui/react';

import { useLocation, useHistory } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';

import { Pagination } from 'swiper';

import { useDesign } from '@/api/designs';
import { useTemplates } from '@/api/templates';

import Button from '@/lib/components/Button';
import IconBack from '@/lib/components/icons/IconBack';
import IconCreateNew from '@/components/icons/IconCreateNew';
import IconShare from '@/components/icons/IconShare';
import Navbar from '@/lib/components/navbar';

import {
  GARMENT_IMAGE_DESKTOP_WIDTH,
  GARMENT_IMAGE_MOBILE_WIDTH,
  getDrawingArea,
} from '@/lib/editor/drawingAreas';

import { AiImage, CanvasState } from '@/lib/types';
import Colors from '@/lib/theme/colors';

import { IconInstagram, IconTikTok, IconFacebook } from './Icons';

import 'swiper/css';
import 'swiper/css/pagination';

function getImgUrl(name) {
  return new URL(`./images/${name}.webp`, import.meta.url).href;
}

const { abloBlue } = Colors;

const NAVBAR_BUTTON_HEIGHT = '40px';

const SHARE_OPTIONS = [
  {
    name: 'getLink',
    icon: <IconShare h="32px" w="32px" />,
    title: 'Get a link',
  },
  {
    name: 'TikTok',
    icon: <IconTikTok />,
    title: 'Share on TikTok',
  },
  {
    name: 'Instagram',
    icon: <IconInstagram />,
    title: 'Share on Instagram',
  },

  {
    name: 'Facebook',
    icon: <IconFacebook />,
    title: 'Share on Facebook',
  },
];

const SLIDES = [
  {
    background: true,
  },
  {
    background: false,
  },
];

const getAiImageForSide = (side: CanvasState): AiImage => {
  const { canvas } = side;

  if (!canvas) {
    return null;
  }

  const canvasState = JSON.parse(canvas);

  if (!canvasState._objects) {
    return null;
  }

  return canvasState._objects.find(({ aiImage }) => !!aiImage)?.aiImage;
};

export default function OrderOrShare() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const designId = searchParams.get('designId');

  const { data: design, isLoading } = useDesign(designId);

  const { sides = [], templateId, templateColorId } = design || { sides: [] };
  const { data: templates = [] } = useTemplates();

  const template = templates.find(({ id }) => id === templateId);
  const images =
    (template && template.colors.find(({ id }) => id === templateColorId).images) || [];

  const history = useHistory();

  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleGoToDesigns = () => history.push('/app/designs');

  const handleGoToTemplates = () => history.push('/app/templates');

  const slides = SLIDES.reduce((result, slide) => {
    const newSlides = sides.map((side) => ({
      ...side,
      ...slide,
    }));

    return [...result, ...newSlides];
  }, []);

  return (
    <Box>
      <Navbar
        callToActionContent={
          <Text color={abloBlue} textTransform="none">
            My Designs
          </Text>
        }
        onBack={() => history.goBack()}
        onNext={handleGoToDesigns}
        rightSideContent={
          <Show above="md">
            <HStack>
              <Button
                h={NAVBAR_BUTTON_HEIGHT}
                icon={<IconBack />}
                onClick={() => history.goBack()}
                outlined
                textTransform="none"
                title="Back To Design"
              />
              <Button
                h={NAVBAR_BUTTON_HEIGHT}
                icon={<IconCreateNew color="#FFFFFF" />}
                onClick={handleGoToTemplates}
                textTransform="none"
                title="Create New"
              />
            </HStack>
          </Show>
        }
        title="Share"
      />
      {isLoading ? (
        <Center bg="#FFFFFF" h={{ base: '300px', md: 'calc(100% - 65px)' }}>
          <Spinner thickness="1px" speed="0.65s" emptyColor="gray" size="md" />
        </Center>
      ) : (
        <Flex
          bg="#FFFFFF"
          direction={{ base: 'column', md: 'row' }}
          h={{ base: 'calc(100vh - 121px)', md: 'calc(100vh - 65px)' }}
          overflow="auto"
          w="100%"
        >
          <Box
            bg={{ base: 'transparent', md: '#CFD3DE' }}
            h={{ base: '375px', md: '100%' }}
            p={{ base: 0, md: '16px' }}
            flex={1}
          >
            <Box
              display="flex"
              alignItems="center"
              bg="#FFFFFF"
              borderRadius={{ base: 0, md: '10px' }}
              h="100%"
              justifyContent="center"
              position="relative"
              w="100%"
            >
              <Box h="100%" w={{ base: '100%', md: '600px' }}>
                <Swiper pagination modules={[Pagination]} className="mySwiper">
                  {slides.map((slide, index) => {
                    const { canvasState, previewUrl, background, templateSide } = slide;

                    const { id, name } = templateSide;

                    const image = images.find(({ templateSideId }) => id === templateSideId);

                    const aiImage = null && getAiImageForSide(canvasState);

                    const style = aiImage ? aiImage.options.style : 'kidult';

                    const drawingArea = template ? getDrawingArea(template, name, isMobile) : {};

                    return (
                      <SwiperSlide key={index}>
                        <Box position="relative">
                          {background ? (
                            <Image
                              h={{ base: 350, md: 'auto' }}
                              w={{ base: '100%', md: '100%' }}
                              src={getImgUrl(`${style}`)}
                              alt={style}
                            />
                          ) : null}
                          <Box
                            position="absolute"
                            margin="0 auto"
                            left={0}
                            right={0}
                            top={{ base: 0, md: 50 }}
                            w={{ base: GARMENT_IMAGE_MOBILE_WIDTH, md: 500 }}
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
                              src={previewUrl}
                              position="absolute"
                              left={`${drawingArea.left}px`}
                              top={`${drawingArea.top}px`}
                              w={`${drawingArea.width}px`}
                            />
                          </Box>
                        </Box>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </Box>
            </Box>
          </Box>
          <Box p={{ base: '20px', md: '45px 20px' }} w={{ base: '100%', md: '328px' }}>
            <Flex mb={{ base: '24px', md: '48px' }}>
              <IconShare />
              <Text as="b" fontSize="18px" ml="20px">
                Share your work
              </Text>
            </Flex>
            <Text as="b" color="#8D8D8D" fontSize="sm">
              Share on your socials
            </Text>
            <VStack align="flex-start" mt="28px" spacing="20px">
              {SHARE_OPTIONS.map(({ icon, title }, index) => (
                <ChakraButton bg="transparent" key={index} padding={0}>
                  {icon}
                  <Text as="b" fontSize="sm" ml="12px">
                    {title}
                  </Text>
                </ChakraButton>
              ))}
            </VStack>
          </Box>
        </Flex>
      )}
    </Box>
  );
}
