import { Fragment as F } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import IconEmptyState from '../icons/EmptyState';

const DARK_VARIANTS = ['Onyx', 'Oceana'];

type Props = {
  id: string;
  canvasRef: any;
  drawingArea: {
    height: number;
    left: number;
    top: number;
    width: number;
  };
  isDrawingAreaVisible: boolean;
  onHintClick: () => void;
  selectedVariant: any;
  showCenterAxis: boolean;
  side: string;
  showHint: boolean;
  variantImageUrl: string;
};

const CanvasContainer = ({
  canvasRef,
  id,
  drawingArea,
  isDrawingAreaVisible,
  variantImageUrl,
  onHintClick,
  selectedVariant,
  showCenterAxis,
  side,
  showHint,
}: Props) => (
  <F>
    <img
      src={`${variantImageUrl}_${side.toUpperCase()}.webp?timestamp=${Date.now()}`}
      crossOrigin="anonymous"
      width={350}
    />
    <Box
      border={
        isDrawingAreaVisible
          ? `2px dashed ${
              DARK_VARIANTS.includes(selectedVariant) ? '#FFFFFF' : '#a8a8a8'
            }`
          : ''
      }
      borderRadius="4px"
      left={`${drawingArea.left}px`}
      position="absolute"
      top={`${drawingArea.top}px`}
      id="drawingArea"
      className="drawing-area"
    >
      {showCenterAxis ? (
        <F>
          <Box
            borderLeftWidth="1px"
            style={{
              borderImage:
                'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 7.81%, #FFFFFF 91.67%, rgba(255, 255, 255, 0) 100%) 1',
              boxShadow: '0px 0px 4px 0px #97B9F559',
            }}
            height={1.2 * drawingArea.height}
            position="absolute"
            bottom={`${(-0.2 * drawingArea.height) / 2}px`}
            left={drawingArea.width / 2}
          ></Box>
          <Box
            borderTopWidth="1px"
            style={{
              borderImage:
                'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 8.85%, #FFFFFF 91.15%, rgba(255, 255, 255, 0) 100%) 1',
              boxShadow: '0px 0px 4px 0px #97B9F559',
            }}
            width={1.2 * drawingArea.width}
            position="absolute"
            left={`${(-0.2 * drawingArea.width) / 2}px`}
            top={drawingArea.height / 2}
          ></Box>
        </F>
      ) : null}
      <div className="canvas-container">
        <canvas id={id} ref={canvasRef}></canvas>
      </div>
      {showHint && (
        <Flex
          align="center"
          as="button"
          direction="column"
          justify="center"
          onClick={onHintClick}
          position="absolute"
          top="20%"
          w="100%"
          textAlign="center"
        >
          <IconEmptyState />
          <Text
            color={
              DARK_VARIANTS.includes(selectedVariant) ? '#FFFFFF' : '#000000'
            }
            fontSize="sm"
            fontWeight={400}
            mt="17px"
          >
            Select a style to begin
          </Text>
        </Flex>
      )}
    </Box>
  </F>
);

export default CanvasContainer;
