import { Fragment as F } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import IconEmptyState from '../icons/EmptyState';

const DARK_VARIANTS = ['Onyx', 'Oceana'];

type Props = {
  id: string;
  canvasRef: any;
  drawingArea: {
    left: number;
    top: number;
  };
  isDrawingAreaVisible: boolean;
  onHintClick: () => void;
  selectedVariant: any;
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
  side,
  showHint,
}: Props) => (
  <F>
    <img
      src={`${variantImageUrl}_${side.toUpperCase()}.png?timestamp=${Date.now()}`}
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
