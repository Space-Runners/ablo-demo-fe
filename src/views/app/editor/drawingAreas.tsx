export const GARMENT_IMAGE_DESKTOP_WIDTH = 500;
export const GARMENT_IMAGE_MOBILE_WIDTH = 350;

export const getDrawingArea = (template, side, isMobile) => {
  const { sides } = template;

  const drawingArea = sides.find(({ name }) => name === side.toLowerCase());

  if (!isMobile) {
    const { widthCm, heightCm } = drawingArea;

    return { ...drawingArea, width: widthCm, height: heightCm };
  }

  const scalingFactorFoMobile = 350 / 500;

  const { left, top, widthCm, heightCm } = drawingArea;

  return {
    left: left * scalingFactorFoMobile,
    top: top * scalingFactorFoMobile,
    width: widthCm * scalingFactorFoMobile,
    height: heightCm * scalingFactorFoMobile,
  };
};
