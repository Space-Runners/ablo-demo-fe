export const GARMENT_IMAGE_DESKTOP_WIDTH = 500;
export const GARMENT_IMAGE_MOBILE_WIDTH = 350;

export const getDrawingArea = (printableAreas, side, isMobile) => {
  const drawingArea = printableAreas[side.toLowerCase()];

  if (!isMobile) {
    return drawingArea;
  }

  const scalingFactorFoMobile = 350 / 500;

  const { left, top, width, height } = drawingArea;

  return {
    left: left * scalingFactorFoMobile,
    top: top * scalingFactorFoMobile,
    width: width * scalingFactorFoMobile,
    height: height * scalingFactorFoMobile,
  };
};
