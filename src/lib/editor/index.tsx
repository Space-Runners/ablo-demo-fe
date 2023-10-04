import { useCallback, useEffect, useRef, useState, Fragment as F } from 'react';

import { Box, useBreakpointValue } from '@chakra-ui/react';

import { fabric } from 'fabric';
import { isEmpty, partition } from 'lodash';

import { Design, Garment, Template } from '@/lib/types';

import CanvasContainer from './components/CanvasContainer';
import ColorPicker from './components/ColorPicker';
import EditorContainer from './EditorContainer';
import Toolbar from './controls';

import ObjectEditTools from './object-edit-tools';

import { generateImage, getStyles } from '../api/image-generator';

import { getDrawingArea } from './drawingAreas';

const SIDES = ['front', 'back'];

const initCanvas = (side, width, height) => {
  const canvas = new fabric.Canvas(side === 'front' ? 'canvas-front' : 'canvas-back', {
    width: width * 3,
    height: height * 3,
    selection: false,
    renderOnAddRemove: true,
    preserveObjectStacking: true,
  });

  canvas.setDimensions({ height: `${height}px`, width: `${width}px` }, { cssOnly: true });

  return canvas;
};

const reloadCanvasFromState = (canvas, stateAsJson) => {
  canvas.current.clear();
  canvas.current.loadFromJSON(stateAsJson, function () {
    canvas.current.renderAll();
  });
};

type EditorToolProps = {
  design: Design;
  onDesignChange: (design: Design) => void;
  onSave: () => void;
  templates: Template[];
};

export default function EditorTool({ design, onDesignChange, onSave, templates }: EditorToolProps) {
  const canvasFront = useRef(null);
  const canvasBack = useRef(null);

  const state = useRef<string>('');

  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);

  const [activeObject, setActiveObject] = useState(null);
  const [selectedSide, setSelectedSide] = useState(SIDES[0]);
  const [isEditorToolbarExpanded, setEditorToolbarExpanded] = useState(false);

  const [selectedTemplatePreview, setSelectedTemplatePreview] = useState<Template>(null);

  const { template, templateColorId, sizeId, sides: designSides } = design;

  const { sides: templateSides } = template;

  const templateSideId = templateSides.find(({ name }) => name === selectedSide).id;

  const selectedGarment = { templateId: template.id, sizeId, variantId: templateColorId };

  const canvas = selectedSide === 'front' ? canvasFront : canvasBack;

  const isMobile = useBreakpointValue({ base: true, md: false }, { ssr: false });

  const drawingArea = getDrawingArea(template, selectedSide, isMobile);

  const saveState = useCallback(() => {
    setRedoStack([]);

    // Initial call won't have a state
    if (state.current) {
      setUndoStack([...undoStack, state.current]);
    }

    const json = canvas.current.toJSON(['aiImage']);

    state.current = JSON.stringify(json);

    const { sides } = design;

    const [textObjects, imageObjects] = partition(canvas.current._objects, ({ text }) => !!text);

    const newSides = sides.map((side) => {
      if (side.templateSideId === templateSideId) {
        return {
          ...side,
          canvasState: state.current,
          hasGraphics: imageObjects.length > 0,
          hasText: textObjects.length > 0,
        };
      }

      return side;
    });

    onDesignChange({
      ...design,
      sides: newSides,
    });
  }, [canvas, design, templateSideId, onDesignChange, undoStack]);

  useEffect(() => {
    SIDES.forEach((side) => {
      const canvas = side === 'front' ? canvasFront : canvasBack;

      const drawingAreaForSide = getDrawingArea(template, side, isMobile);

      const { sides: templateSides } = template;

      const templateSide = templateSides.find(({ name }) => name === side);

      const { width, height } = drawingAreaForSide;

      canvas.current = initCanvas(side, width, height);

      const { canvasState } = design.sides.find(
        ({ templateSideId }) => templateSide.id === templateSideId
      );

      if (canvasState) {
        // Loading an already active design if you to go another page and come back
        state.current = canvasState;

        reloadCanvasFromState(canvas, canvasState);
      } else {
        state.current = JSON.stringify(canvas.current);
      }

      canvas.current.on('mouse:up', function (e) {
        setActiveObject(e.target);
      });
    });

    return () => {
      SIDES.forEach((side) => {
        const canvas = side === 'front' ? canvasFront : canvasBack;

        if (canvas.current) {
          canvas.current.dispose();
          canvas.current = null;
        }
      });
    };
  }, []);

  useEffect(() => {
    const canvasCurrent = canvas.current;

    function handleClickOutside(e) {
      // On pressing "Next" in the navbar we have to deselect the active object or its handles are seen in the export
      const navbar = document.getElementById('ablo-navbar');

      if (navbar.contains(e.target)) {
        canvasCurrent.discardActiveObject().renderAll();
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    canvasCurrent.on('object:modified', () => {
      saveState();
    });

    canvasCurrent.on('erasing:end', () => {
      saveState();
    });

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);

      if (canvasCurrent) {
        canvasCurrent.off('object:modified');
        canvasCurrent.off('erasing:end');
      }
    };
  }, [canvas, saveState]);

  const handleSelectedGarment = (garment: Garment) => {
    const { sizeId, templateId, variantId } = garment;

    const oldTemplate = templates.find(({ id }) => id === design.template.id);
    const newTemplate = templates.find(({ id }) => id === templateId);

    const newSides = newTemplate.sides.map(({ id, name }) => {
      const sideInOldTemplate = oldTemplate.sides.find((side) => side.name === name);

      if (sideInOldTemplate) {
        const { id: sideId } = sideInOldTemplate;

        const oldDesign = design.sides.find(({ templateSideId }) => templateSideId === sideId);

        if (oldDesign) {
          return {
            ...oldDesign,
            templateSideId: id,
          };
        }
      }

      return {
        templateSideId: id,
      };
    });

    onDesignChange({
      ...design,
      sizeId,
      sides: newSides,
      template: newTemplate,
      templateColorId: variantId,
    });

    setSelectedTemplatePreview(null);

    SIDES.forEach((side) => {
      const canvas = side === 'front' ? canvasFront : canvasBack;

      const template = templates.find((template) => template.id === garment.templateId);

      const { width, height } = getDrawingArea(template, side, isMobile);

      canvas.current.setDimensions({ height: height * 3, width: width * 3 });
      canvas.current.setDimensions(
        { height: `${height}px`, width: `${width}px` },
        { cssOnly: true }
      );
    });
  };

  const handleSave = () => {
    canvas.current.discardActiveObject().renderAll();

    onSave();
  };

  const handleUndo = () => {
    setRedoStack([...redoStack, state.current]);

    state.current = undoStack.pop();

    setUndoStack(undoStack);

    reloadCanvasFromState(canvas, state.current);
  };

  const handleRedo = () => {
    setUndoStack([...undoStack, state.current]);

    state.current = redoStack.pop();

    setRedoStack(redoStack);

    reloadCanvasFromState(canvas, state.current);
  };

  const handleClick = (e) => {
    if (!e.target || e.target.className.includes('canvas')) {
      return;
    }

    canvas.current.discardActiveObject();
    canvas.current.renderAll();
    canvas.current.isDrawingMode = false;

    setActiveObject(null);
  };

  const handleAddText = (defaultProps) => {
    const { width, height } = drawingArea;

    const aiImage = canvas.current._objects.find(({ aiImage }) => aiImage);

    const maxTextOffset = height * 3 - 20;

    const textObject = {
      ...defaultProps,
      left: (width * 3) / 2,
      top: aiImage
        ? Math.min(aiImage.aCoords.tl.y + aiImage.height, maxTextOffset)
        : (height * 3) / 2 - 20,
    };

    const text = new fabric.IText(textObject.text, textObject);

    text.enterEditing();
    text.hiddenTextarea.focus();

    canvas.current.add(text);
    canvas.current.setActiveObject(text);

    setActiveObject(textObject);
  };

  const handleCrop = (image) => {
    canvas.current.setActiveObject(image);
    canvas.current.renderAll();

    setActiveObject(image);

    saveState();
  };

  const handleImageUpload = (image) => {
    const img = new fabric.Image(image);

    addImageToCanvas(img);
  };

  const handlePreviewImageSelected = (image) => {
    addAiImageToCanvas({ ...image });

    saveState();

    setActiveObject(canvas.current.getActiveObject());

    setEditorToolbarExpanded(false);
  };

  const handleImageUpdate = (aiImage) => {
    const oldImage = canvas.current.getActiveObject();

    canvas.current.remove(canvas.current.getActiveObject());

    const { left, top, scaleX, scaleY } = oldImage;

    addAiImageToCanvas(aiImage, { left, top, scaleX, scaleY });

    saveState();
  };

  const addAiImageToCanvas = (image, options = {}) => {
    fabric.Image.fromURL(
      image.url,
      (img) => {
        addImageToCanvas(img, { aiImage: image, ...options });
      },
      { crossOrigin: 'anonymous' }
    );
  };

  const addImageToCanvas = (img, options = {}) => {
    const { width, height } = drawingArea;

    img.scaleToWidth(450);

    img.set({
      left: (width * 3) / 2,
      top: (height * 3) / 2,
      originX: 'center',
      originY: 'center',
      centeredScaling: true,
      ...options,
    });

    img.crossOrigin = 'anonymous';
    canvas.current.add(img);
    canvas.current.setActiveObject(img);
    canvas.current.renderAll();

    setActiveObject(img);

    saveState();
  };

  const handleSelectedSide = (side: string) => {
    canvas.current.discardActiveObject().renderAll();

    setActiveObject(null);
    setSelectedSide(side);
    setRedoStack([]);
    setUndoStack([]);
  };

  const { canvasState } = designSides.find((design) => design.templateSideId === templateSideId);
  const canvasStateFromJson = canvasState && JSON.parse(canvasState);

  const objects = canvasStateFromJson?.objects || [];

  const showHint = isEmpty(objects) && !activeObject;

  const undoHandler = isEmpty(undoStack) ? null : handleUndo;
  const redoHandler = isEmpty(redoStack) ? null : handleRedo;

  return (
    <EditorContainer
      selectedGarment={selectedGarment}
      onSelectedGarment={handleSelectedGarment}
      selectedTemplate={selectedTemplatePreview}
      onSelectedTemplate={setSelectedTemplatePreview}
      templates={templates}
      onImageUploaded={handleImageUpload}
      onGeneratedImageSelected={handlePreviewImageSelected}
      isEditorToolbarExpanded={isEditorToolbarExpanded}
      onChangeEditorToolbarExpanded={setEditorToolbarExpanded}
      generateImage={generateImage}
      getStyles={getStyles}
    >
      <F>
        {activeObject ? (
          <ObjectEditTools
            activeObject={activeObject}
            canvas={canvas.current}
            onStateChange={saveState}
            onCrop={handleCrop}
            onSetActiveObject={setActiveObject}
            onImageUpdate={handleImageUpdate}
            onUndo={undoHandler}
            onRedo={redoHandler}
          />
        ) : (
          <Toolbar
            design={design}
            onAddText={handleAddText}
            onSelectedSide={handleSelectedSide}
            onUndo={undoHandler}
            onRedo={redoHandler}
            onSave={handleSave}
            selectedSide={selectedSide}
          />
        )}
        <Box
          alignItems="center"
          display="flex"
          flex={1}
          flexDirection="column"
          onClick={handleClick}
          justifyContent="center"
          overflowY="auto"
          paddingTop={{ base: '40px', md: 0 }}
          position="relative"
        >
          <Box position="absolute" right="13px" top="12px">
            <ColorPicker
              selectedVariantId={templateColorId}
              onSelectedVariant={(variantId) =>
                onDesignChange({
                  ...design,
                  templateColorId: variantId,
                })
              }
              options={template.colors}
            />
          </Box>
          <Box
            id="#canvas-container-front"
            display={selectedSide === 'front' ? 'block' : 'none'}
            maxHeight="100%"
            position="relative"
            userSelect="none"
          >
            <CanvasContainer
              canvas={canvasFront.current}
              template={template}
              selectedVariant={selectedGarment.variantId}
              showHint={showHint}
              side="front"
              onHintClick={() => {
                setEditorToolbarExpanded(true);
              }}
            />
          </Box>
          <Box
            id="#canvas-container-back"
            display={selectedSide === 'back' ? 'block' : 'none'}
            maxHeight="100%"
            position="relative"
          >
            <CanvasContainer
              canvas={canvasBack.current}
              template={template}
              selectedVariant={selectedGarment.variantId}
              showHint={showHint}
              side="back"
              onHintClick={() => {
                setEditorToolbarExpanded(true);
              }}
            />
          </Box>
        </Box>
      </F>
    </EditorContainer>
  );
}
