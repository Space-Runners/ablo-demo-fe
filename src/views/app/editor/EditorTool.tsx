import { useCallback, useEffect, useRef, useState } from 'react';

import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';

import { fabric } from 'fabric';
import { isEmpty } from 'lodash';

import { AiImage, Design, Garment, Product } from '@/components/types';
import PRODUCTS from '@/data/products';

import CanvasContainer from './components/CanvasContainer';
import Toolbar from './controls';

import ObjectEditTools from './object-edit-tools';
import EditorToolbar from './toolbar';
import ProductDetails from './toolbar/product-picker/ProductDetails';

const sides = ['front', 'back'];

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

type ImageEditorProps = {
  design: Design;
  onDesignChange: (design: Design) => void;
  onSave: () => void;
};

export default function ImageEditorTool({ design, onDesignChange, onSave }: ImageEditorProps) {
  const canvasFront = useRef(null);
  const canvasBack = useRef(null);

  const state = useRef<string>('');

  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);

  const [activeObject, setActiveObject] = useState(null);
  const [selectedSide, setSelectedSide] = useState(sides[0]);
  const [isEditorToolbarExpanded, setEditorToolbarExpanded] = useState(false);

  const [selectedProductPreview, setSelectedProductPreview] = useState<Product>(null);

  const { editorState, garmentId, garmentColor, size } = design;

  const selectedGarment = { productId: garmentId, size, variant: garmentColor };

  const product = PRODUCTS.find((product) => product.id === selectedGarment.productId);

  const { printableAreas } = product;

  const canvas = selectedSide === 'front' ? canvasFront : canvasBack;

  const isMobile = useBreakpointValue({ base: true, md: false }, { ssr: false });

  const drawingArea = printableAreas[selectedSide.toLowerCase()][isMobile ? 'base' : 'md'];

  const saveState = useCallback(() => {
    setRedoStack([]);

    // Initial call won't have a state
    if (state.current) {
      setUndoStack([...undoStack, state.current]);
    }

    const json = canvas.current.toJSON(['aiImage']);

    state.current = JSON.stringify(json);

    onDesignChange({
      ...design,
      editorState: {
        ...editorState,
        [selectedSide]: {
          ...editorState[selectedSide],
          canvas: state.current,
        },
      },
    });
  }, [canvas, design, editorState, onDesignChange, selectedSide, undoStack]);

  useEffect(() => {
    console.log('Use effect');
    sides.forEach((side) => {
      const canvas = side === 'front' ? canvasFront : canvasBack;

      const drawingAreaForSide = printableAreas[side.toLowerCase()];

      const { width, height } = drawingAreaForSide[isMobile ? 'base' : 'md'];

      canvas.current = initCanvas(side, width, height);

      const canvasState = editorState[side]?.canvas;

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
      sides.forEach((side) => {
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
    const { productId, variant } = garment;

    onDesignChange({
      ...design,
      garmentId: productId,
      garmentColor: variant,
    });

    setSelectedProductPreview(null);

    sides.forEach((side) => {
      const canvas = side === 'front' ? canvasFront : canvasBack;

      const product = PRODUCTS.find((product) => product.id === garment.productId);

      const { width, height } =
        product.printableAreas[side.toLowerCase()][isMobile ? 'base' : 'md'];

      canvas.current.setDimensions({ width, height });
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

    console.log(
      'Add text',
      aiImage.aCoords.tl.y,
      aiImage.height,
      aiImage.aCoords.tl.y + aiImage.height,
      height
    );

    const maxTextOffset = height * 3 - 20;

    const textObject = {
      ...defaultProps,
      left: (width * 3) / 2,
      top: aiImage
        ? Math.min(aiImage.aCoords.tl.y + aiImage.height, maxTextOffset)
        : (height * 3) / 2 - 20,
    };

    console.log('Text object', textObject);

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

  const handleGeneratedImagePreview = (image: AiImage) => {
    const imagesToRemove = canvas.current._objects.filter(({ aiImage }) => aiImage?.isPreview);

    imagesToRemove.forEach((image) => {
      canvas.current.remove(image);
    });

    addAiImageToCanvas({ ...image, isPreview: true });
  };

  const handlePreviewImageSelected = () => {
    const aiImage = canvas.current._objects.find(({ aiImage }) => aiImage && !aiImage.isPreview);

    if (aiImage) {
      aiImage.set('aiImage', null);
    }

    const imagePreview = canvas.current._objects.find(({ aiImage }) => aiImage?.isPreview);

    if (imagePreview) {
      imagePreview.set('aiImage', {
        ...imagePreview.aiImage,
        isPreview: false,
      });
    }

    saveState();

    setActiveObject(canvas.current.getActiveObject());

    setEditorToolbarExpanded(false);
  };

  const handleGeneratedImageRemoved = (imageUrl: string) => {
    const aiImages = canvas.current._objects.filter((obj) => obj.aiImage?.url === imageUrl);

    canvas.current.remove(aiImages[0]);
    canvas.current.renderAll();

    setActiveObject(null);

    saveState();
  };

  const handleImageUpdate = (aiImage) => {
    canvas.current.remove(canvas.current.getActiveObject());

    addAiImageToCanvas(aiImage);

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

  const canvasState = editorState[selectedSide]?.canvas;
  const canvasStateFromJson = canvasState && JSON.parse(canvasState);

  const objects = canvasStateFromJson?.objects || [];

  const aiImage = objects.find(({ aiImage }) => aiImage && !aiImage.isPreview)?.aiImage;

  const imagePreview = objects.find(({ aiImage }) => aiImage?.isPreview);

  const showHint = isEmpty(objects) && !activeObject;

  const undoHandler = isEmpty(undoStack) ? null : handleUndo;
  const redoHandler = isEmpty(redoStack) ? null : handleRedo;

  return (
    <Flex
      align="center"
      bg="#F9F9F7"
      flexDirection={{ base: 'column', md: 'row' }}
      h={{ base: 'calc(100% - 121px)', md: 'calc(100% - 65px)' }}
      position="relative"
      w="100%"
    >
      <EditorToolbar
        isExpanded={isEditorToolbarExpanded}
        onSetExpanded={setEditorToolbarExpanded}
        activeObject={activeObject}
        aiImage={!imagePreview && aiImage}
        onImageUploaded={handleImageUpload}
        onGeneratedImagePreview={handleGeneratedImagePreview}
        onGeneratedImageSelected={handlePreviewImageSelected}
        onGeneratedImageRemoved={handleGeneratedImageRemoved}
        selectedGarment={selectedGarment}
        onSelectedGarment={handleSelectedGarment}
        selectedProduct={selectedProductPreview}
        onSelectedProduct={setSelectedProductPreview}
      />
      {!isMobile && selectedProductPreview ? (
        <Box flex={1} height="100%" p="20px">
          <Box bg="#FFFFFF" borderRadius="10px" height="100%" overflow="auto">
            <ProductDetails
              garment={selectedGarment}
              onGarmentUpdate={handleSelectedGarment}
              product={selectedProductPreview}
            />
          </Box>
        </Box>
      ) : null}
      <Box
        display={{
          base: 'block',
          md: selectedProductPreview ? 'none' : 'flex',
        }}
        flex={1}
        flexDirection="column"
        h={{ base: 'auto', md: '100%' }}
        position="relative"
        w="100%"
      >
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
          position="relative"
          top={{ base: '40px', md: 0 }}
        >
          <Box
            id="#canvas-container-front"
            display={selectedSide === 'front' ? 'block' : 'none'}
            position="relative"
            userSelect="none"
          >
            <CanvasContainer
              canvas={canvasFront.current}
              product={product}
              selectedVariant={selectedGarment.variant}
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
            position="relative"
          >
            <CanvasContainer
              canvas={canvasBack.current}
              product={product}
              selectedVariant={selectedGarment.variant}
              showHint={showHint}
              side="back"
              onHintClick={() => {
                setEditorToolbarExpanded(true);
              }}
            />
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
