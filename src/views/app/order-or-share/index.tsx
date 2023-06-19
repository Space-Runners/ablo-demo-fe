import { useEffect, useRef, useState } from 'react';

import { Box, Button as ChakraButton, Flex, HStack } from '@chakra-ui/react';

import { fabric } from 'fabric';

import Navbar from '@/components/navbar/Navbar';
import PRODUCTS from '@/data/products';

const Button = (props) => {
  const { isActive, ...rest } = props;

  return (
    <ChakraButton
      bg={isActive ? '#FFFFFF' : '#2A2A2A'}
      color={isActive ? '#212121' : '#FFFFFF'}
      _hover={{ bg: '' }}
      _active={{
        bg: '',
      }}
      _focus={{
        bg: '',
        boxShadow: '',
      }}
      fontSize="md"
      fontWeight={600}
      textTransform="uppercase"
      {...rest}
    />
  );
};

const TopButton = (props) => (
  <Button
    padding="12px 96px"
    width="137.5px"
    height="43px"
    bg="#2A2A2A"
    {...props}
  />
);

export default function ImageGenerator() {
  const canvas = useRef(null);

  const [activeView, setActiveView] = useState('order');
  const [selectedProduct] = useState(PRODUCTS[0]);
  const [selectedVariant] = useState(PRODUCTS[0].variants[0].name);

  const [orientation] = useState('FRONT');

  useEffect(() => {
    canvas.current = initCanvas();

    // destroy fabric on unmount
    return () => {
      if (canvas.current) {
        canvas.current.dispose();
        canvas.current = null;
      }
    };
  }, []);

  const initCanvas = () =>
    new fabric.Canvas('canvas', {
      width: 120,
      height: 120,
      selection: false,
      renderOnAddRemove: true,
    });

  const { urlPrefix } = selectedProduct;

  console.log('Orientation', orientation);

  const variantImageUrl = `${urlPrefix}_${selectedVariant}_${orientation}.png`;

  const isOrder = activeView === 'order';

  return (
    <Box h="100%" w="100%">
      <Navbar onNext={() => null} title="Order/Share" />
      <Flex
        align="center"
        bg="#292929"
        flexDirection="column"
        h="100%"
        position="relative"
        pt="13px"
        w="100%"
      >
        <HStack spacing="24px">
          <TopButton isActive={isOrder} onClick={() => setActiveView('order')}>
            Order
          </TopButton>
          <TopButton isActive={!isOrder} onClick={() => setActiveView('share')}>
            Share
          </TopButton>
        </HStack>
        <Box position="relative">
          <img src={variantImageUrl} width={250} />
          <Box id="drawingArea" className="drawing-area">
            <div className="canvas-container">
              <canvas id="canvas" ref={canvas}></canvas>
            </div>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
