import { useState, Fragment as F, useEffect } from "react";

import { fabric } from "fabric";

import {
  Box,
  Button as ChakraButton,
  Flex,
  HStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
} from "@chakra-ui/react";

import { removeBackground } from "@/api/image-generator";
import { AiImage } from "@/components/types";

import Colors from "@/theme/colors";

import ColorPicker from "./ColorPicker";
import FontPicker from "./FontPicker";

import ErrorModal from "./ErrorModal";

import {
  IconColorPicker,
  IconTrash,
  IconLayerDown,
  IconLayerUp,
  IconCopy,
  IconCrop,
  IconEraser,
  IconFontSize,
  IconFontFamily,
  IconTextAlign,
  IconTextLeftAlign,
  IconTextCenter,
  IconTextRightAlign,
  IconRemoveBackground,
} from "./Icons";

import ToolbarButton from "../components/ToolbarButton";

const { abloBlue } = Colors;

const CropMaskProps = {
  fill: "rgba(0,0,0,0.3)",
  originX: "left",
  originY: "top",
  stroke: "black",
  left: 0,
  top: 0,
  opacity: 1,
  width: 150,
  height: 150,
  hasRotatingPoint: false,
  transparentCorners: false,
  cornerColor: "white",
  cornerStrokeColor: "black",
  borderColor: "black",
  cornerSize: 20 * 3,
  padding: 0,
  scaleX: 3,
  scaleY: 3,
  cornerStyle: "circle",
  borderDashArray: [5, 5],
  borderScaleFactor: 1.3,
};

const IconButton = ({ isSelected = false, ...rest }) => (
  <ChakraButton
    height="28px"
    bg={isSelected ? "#EDF2F7" : "#FFFFFF"}
    borderRadius="7px"
    border={`1px solid ${isSelected ? abloBlue : "#D3D3D3"}`}
    padding="4px 6px"
    minWidth="auto"
    width="25px"
    _focus={
      {
        // border: `1px solid ${abloBlue}`,
        //  boxShadow: '0px 0px 8px 0px #97B9F5',
      }
    }
    _hover={
      {
        /*    border: `1px solid ${abloBlue}`,
      boxShadow: '0px 0px 8px 0px #97B9F5', */
      }
    }
    {...rest}
  />
);

const TEXT_ALIGN_OPTIONS = [
  { name: "left", icon: <IconTextLeftAlign />, iconActive: <IconTextLeftAlign isSelected /> },
  { name: "center", icon: <IconTextCenter />, iconActive: <IconTextCenter isSelected /> },
  { name: "right", icon: <IconTextRightAlign />, iconActive: <IconTextRightAlign isSelected /> },
];

type ActiveObject = {
  aiImage: AiImage;
  clipPath?: object;
  noBackgroundUrl: string;
  text: string;
  withBackgroundUrl: string;
  fill: string;
  fontFamily: string;
  fontSize: number;
  textAlign: string;
};

type ObjectEditToolsProps = {
  activeObject: ActiveObject;
  canvas: any;
  onCrop: (image: object) => void;
  onImageUpdate: (image: AiImage) => void;
  onSetActiveObject: (activeObject: ActiveObject) => void;
  onStateChange: () => void;
};

const ObjectEditTools = ({
  activeObject,
  canvas,
  onCrop,
  onImageUpdate,
  onSetActiveObject,
  onStateChange,
}: ObjectEditToolsProps) => {
  const [removingBackground, setRemovingBackground] = useState(false);
  const [errorRemovingBackground, setErrorRemovingBackground] = useState(null);

  const [selectedTool, setSelectedTool] = useState(null);
  const [croppingMask, setCroppingMask] = useState(null);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [isErasing, setErasing] = useState(false);

  useEffect(() => {
    if (!activeObject && croppingMask) {
      canvas.remove(croppingMask);

      setCroppingMask(null);
    }
  }, [activeObject, canvas, croppingMask, setCroppingMask]);

  if (!activeObject) {
    return null;
  }

  const { aiImage, fill, fontFamily, fontSize, textAlign, text } = activeObject || {};
  const { url, noBackgroundUrl, withBackgroundUrl } = aiImage || {};

  const isBackgroundRemoved = url === noBackgroundUrl;

  const handleToggleBackground = async () => {
    if (isBackgroundRemoved) {
      onImageUpdate({
        ...aiImage,
        url: withBackgroundUrl,
      });

      return;
    }

    if (noBackgroundUrl) {
      onImageUpdate({
        ...aiImage,
        url: noBackgroundUrl,
      });

      return;
    }

    setRemovingBackground(true);

    try {
      const url = await removeBackground(aiImage.url);
      onImageUpdate({
        ...aiImage,
        url,
        noBackgroundUrl: url,
        withBackgroundUrl: aiImage.url,
      });
    } catch (errResponse) {
      const err = errResponse?.response?.data;

      setErrorRemovingBackground(err);
    } finally {
      setRemovingBackground(false);
    }
  };

  const handleCrop = () => {
    if (isErasing) {
      canvas.isDrawingMode = false;

      setErasing(false);
    }

    if (croppingMask) {
      const rect = new fabric.Rect({
        left: croppingMask.left,
        top: croppingMask.top,
        width: croppingMask.getScaledWidth(),
        height: croppingMask.getScaledHeight(),
        absolutePositioned: true,
      });

      // add to the current image clipPath property
      activeObject.clipPath = rect;

      canvas.remove(croppingMask);

      const cropped = new Image();

      cropped.src = canvas.toDataURL({
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        multiplier: 5,
        format: "png",
        quality: 0.99,
      });

      cropped.onload = function () {
        const image = new fabric.Image(cropped);
        image.left = rect.left;
        image.top = rect.top;
        image.aiImage = activeObject.aiImage;
        image.setCoords();
        image.scaleToWidth(rect.width);

        canvas.add(image);
        canvas.remove(imageToCrop);

        onCrop(image);
      };

      setCroppingMask(null);
      setImageToCrop(null);

      return;
    }

    const selectionRect = new fabric.Rect(CropMaskProps);

    selectionRect.setControlsVisibility({
      mt: true,
      mb: true,
      ml: true,
      mr: true,
    });

    setCroppingMask(selectionRect);
    setImageToCrop(activeObject);

    //  selectionRect.scaleToWidth(300);

    canvas.centerObject(selectionRect);
    canvas.add(selectionRect);
    canvas.setActiveObject(selectionRect);
    canvas.renderAll();
  };

  const handleErase = () => {
    if (canvas.isDrawingMode) {
      canvas.isDrawingMode = false;

      setErasing(false);

      return;
    }

    canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
    canvas.isDrawingMode = true;

    canvas.freeDrawingBrush.width = 10;

    setErasing(true);
  };

  const handleLayerDown = () => {
    const selectedObject = canvas.getActiveObject();

    console.log("sld", selectedObject);

    canvas.sendBackwards(selectedObject);
    canvas.renderAll();

    onStateChange();
  };

  const handleLayerUp = () => {
    const selectedObject = canvas.getActiveObject();

    console.log("s", selectedObject);

    canvas.bringForward(selectedObject);
    canvas.renderAll();

    onStateChange();
  };

  const handleCopyActiveObject = () => {
    const activeObject = canvas.getActiveObject();

    activeObject.clone((clone) => {
      clone.set({
        left: activeObject.left + 10,
        top: activeObject.top + 10,
      });
      canvas.add(clone);
      canvas.bringForward(clone);
      canvas.setActiveObject(clone);
      canvas.renderAll();

      onStateChange();
    });
  };

  const handleUpdateTextObject = (updates) => {
    Object.keys(updates).forEach((key) => {
      canvas.getActiveObject().set(key, updates[key]);

      canvas.renderAll();
    });

    onSetActiveObject({ ...activeObject, ...updates });

    onStateChange();
  };

  const handleRemoveActiveObject = () => {
    const activeObject = canvas.getActiveObject();

    canvas.remove(activeObject);

    canvas.renderAll();

    onSetActiveObject(null);

    onStateChange();
  };

  const isText = !!text;

  const isColorActive = selectedTool === "color";
  const isFontSizeActive = selectedTool === "fontSize";
  const isFontFamilyActive = selectedTool === "fontFamily";
  const isTextAlignActive = selectedTool === "textAlign";

  return (
    <Box
      bg="#FFFFFF"
      boxShadow="0px 1px 2px 0px #0000000F"
      id="object-edit-tools"
      onClick={(e) => {
        e.stopPropagation();
      }}
      p="12px 11px 8px 11px"
    >
      <HStack position="relative" spacing="6px">
        {isText ? (
          <F>
            <ToolbarButton
              onClick={() => setSelectedTool(isColorActive ? null : "color")}
              icon={<IconColorPicker />}
              isSelected={isColorActive}
              text="Color"
            />
            <ToolbarButton
              onClick={() => setSelectedTool(isFontFamilyActive ? null : "fontFamily")}
              icon={<IconFontFamily />}
              isSelected={isFontFamilyActive}
              text="Style"
            />
            <ToolbarButton
              onClick={() => setSelectedTool(isFontSizeActive ? null : "fontSize")}
              icon={<IconFontSize />}
              isSelected={isFontSizeActive}
              text="Size"
            />
            <ToolbarButton
              onClick={() => setSelectedTool(isTextAlignActive ? null : "textAlign")}
              icon={<IconTextAlign />}
              text="Align"
            />
          </F>
        ) : null}
        {activeObject?.aiImage ? (
          <ToolbarButton
            isLoading={removingBackground}
            onClick={handleToggleBackground}
            icon={<IconRemoveBackground />}
            text={`${isBackgroundRemoved ? "Restore" : "Remove"} Bg`}
          />
        ) : null}
        <ToolbarButton onClick={handleLayerUp} icon={<IconLayerUp />} text="To Front" />
        <ToolbarButton onClick={handleLayerDown} icon={<IconLayerDown />} text="To Back" />
        {!isText && <ToolbarButton onClick={handleErase} icon={<IconEraser />} text="Eraser" />}
        <ToolbarButton onClick={handleCopyActiveObject} icon={<IconCopy />} text="Duplicate" />
        {!isText ? <ToolbarButton onClick={handleCrop} icon={<IconCrop />} text="Crop" /> : null}
        <ToolbarButton onClick={handleRemoveActiveObject} icon={<IconTrash />} text="Delete" />
      </HStack>
      {isText ? (
        <F>
          {isColorActive ? (
            <ColorPicker
              selectedColor={fill}
              onUpdate={(color) => handleUpdateTextObject({ fill: color })}
            />
          ) : null}
          {isFontSizeActive ? (
            <Flex align="center" mt="8px">
              <Text fontSize="12px">A</Text>
              <Slider
                defaultValue={12}
                min={8}
                max={30}
                step={1}
                margin="0 12px"
                height="2px"
                onChange={(val) => handleUpdateTextObject({ fontSize: val })}
                value={fontSize}
                width="180px"
              >
                <SliderTrack bg="#6A6866" height="2px">
                  <Box position="relative" right={10} />
                  <SliderFilledTrack bg="" />
                </SliderTrack>
                <SliderThumb bg="#000000" boxSize="20px" />
              </Slider>
              <Text fontSize="24px">A</Text>
            </Flex>
          ) : null}
          {isFontFamilyActive ? (
            <FontPicker
              fontFamily={fontFamily}
              onUpdate={(fontFamily) => handleUpdateTextObject({ fontFamily })}
            />
          ) : null}
          {isTextAlignActive ? (
            <HStack mt="8px">
              {TEXT_ALIGN_OPTIONS.map((option) => {
                const { name, icon, iconActive } = option;

                const isSelected = name === textAlign;

                return (
                  <IconButton
                    onClick={() => handleUpdateTextObject({ textAlign: name })}
                    isSelected={isSelected}
                  >
                    {isSelected ? iconActive : icon}
                  </IconButton>
                );
              })}
            </HStack>
          ) : null}
        </F>
      ) : null}
      {errorRemovingBackground ? (
        <ErrorModal
          error={errorRemovingBackground}
          onClose={() => setErrorRemovingBackground(null)}
        />
      ) : null}
    </Box>
  );
};

export default ObjectEditTools;
