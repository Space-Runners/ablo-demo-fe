import { Fragment as F, useEffect, useRef, useState } from 'react';

import { Box, Flex, Image, Text, useBreakpointValue } from '@chakra-ui/react';

import { times } from 'lodash';

import { Canvas, Template } from '@/components/types';

import IconEmptyState from '../icons/EmptyState';
import renderRotateLabel from '../fabric/rotateLabel';
import {
  GARMENT_IMAGE_DESKTOP_WIDTH,
  GARMENT_IMAGE_MOBILE_WIDTH,
  getDrawingArea,
} from '../drawingAreas';

const DARK_VARIANTS = ['Onyx', 'Oceana'];

type Props = {
  canvas: Canvas;
  onHintClick: () => void;
  template: Template;
  selectedVariant: string;
  side: string;
  showHint: boolean;
};

const CanvasContainer = ({
  canvas,
  onHintClick,
  template,
  selectedVariant,
  side,
  showHint,
}: Props) => {
  const [isModifyingObject, setIsModifyingObject] = useState(false);

  const userState = useRef({ angle: 0, isModifying: false, isRotating: false });

  const { colors, sides } = template;

  const sideId = sides.find(({ name }) => name === side).id;
  const variant = colors.find((variant) => variant.id === selectedVariant) || colors[0];

  const image = variant.images.find(({ templateSideId }) => templateSideId === sideId);

  const isMobile = useBreakpointValue({ base: true, md: false });

  const drawingArea = getDrawingArea(template, side, isMobile);

  useEffect(() => {
    if (!canvas) {
      return;
    }

    canvas.on('mouse:up', function (e) {
      const { isRotating } = userState.current;

      if (isRotating) {
        const newAngle = Math.round(e.target.angle);

        const commonAngles = times(9, (index) => index * 45);

        const nearestAngle = commonAngles.find((angle) => Math.abs(newAngle - angle) <= 5);

        e.target.set('angle', nearestAngle !== undefined ? nearestAngle : newAngle);
      }

      userState.current.isRotating = false;

      setIsModifyingObject(false);
    });

    canvas.on('mouse:down', function (e) {
      if (e.target) {
        userState.current.isModifying = true;

        setIsModifyingObject(true);
      }
    });

    canvas.on('object:rotating', function (e) {
      userState.current.isRotating = true;
      userState.current.angle = e.target.angle;
    });

    canvas.on('after:render', function (opt) {
      userState.current.isRotating && renderRotateLabel(opt.ctx, userState.current);
    });
  }, [canvas]);

  return (
    <F>
      <Image
        src={image.url}
        crossOrigin="anonymous"
        width={{ base: GARMENT_IMAGE_MOBILE_WIDTH, md: GARMENT_IMAGE_DESKTOP_WIDTH }}
      />
      <Box
        border={
          isModifyingObject
            ? `2px dashed ${DARK_VARIANTS.includes(selectedVariant) ? '#FFFFFF' : '#a8a8a8'}`
            : 'none'
        }
        borderRadius="4px"
        left={`${drawingArea.left}px`}
        position="absolute"
        top={`${drawingArea.top}px`}
        id="drawingArea"
        className="drawing-area"
      >
        {isModifyingObject ? (
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
          <canvas id={`canvas-${side}`}></canvas>
        </div>

        {showHint && (
          <Flex
            align="center"
            as="button"
            direction="column"
            justify="center"
            onClick={(e) => {
              e.stopPropagation();

              onHintClick();
            }}
            position="absolute"
            top="20%"
            w="100%"
            textAlign="center"
          >
            <IconEmptyState />
            <Text
              color={DARK_VARIANTS.includes(selectedVariant) ? '#FFFFFF' : '#000000'}
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
};

export default CanvasContainer;
