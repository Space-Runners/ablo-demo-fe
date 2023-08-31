import {
  Box,
  Button as ChakraButton,
  Center,
  Spinner,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';

import { useLocation, useHistory } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';

import { Pagination } from 'swiper';

import { useDesign } from '@/api/designs';

import Button from '@/components/Button';
import IconBack from '@/components/icons/IconBack';
import IconCreateNew from '@/components/icons/IconCreateNew';
import IconShare from '@/components/icons/IconShare';
import Navbar from '@/components/navbar/Navbar';
import { AiImage, CanvasState } from '@/components/types';
import Colors from '@/theme/colors';

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

  console.log('design', design);

  const { sides = [] } = design || {};

  const history = useHistory();

  const handleGoToDesigns = () => history.push('/app/designs');

  const slides = SLIDES.reduce((result, slide) => {
    const newSlides = sides.map((side) => ({
      ...side,
      ...slide,
    }));

    return [...result, ...newSlides];
  }, []);

  console.log('Slides', slides);

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
              onClick={handleGoToDesigns}
              textTransform="none"
              title="Create New"
            />
          </HStack>
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
            h={{ base: '300px', md: '100%' }}
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
                    const { canvasState, previewUrl, background } = slide;

                    const aiImage = null && getAiImageForSide(canvasState);

                    const style = aiImage ? aiImage.options.style : 'kidult';

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
                          <Image
                            src={previewUrl}
                            margin="0 auto"
                            left={0}
                            right={0}
                            top={50}
                            position="absolute"
                            w={{ base: 250, md: 500 }}
                          />
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
