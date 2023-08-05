import { useCallback, useEffect, useRef, useState } from 'react';

import { useHistory } from 'react-router-dom';

import { Box, Flex, VStack, useBreakpointValue } from '@chakra-ui/react';
import { useMe } from '@/api/auth';
import { saveDesign } from '@/api/designs';

import Button from '@/components/Button';

import { fabric } from 'fabric';
import { isEmpty, times } from 'lodash';

import Navbar from '@/components/navbar/Navbar';
import {
  AiImage,
  Design,
  EditorState,
  Garment,
  Product,
} from '@/components/types';
import PRODUCTS from '@/data/products';

import SignInModal from '@/views/auth/SignInModal';
import SignUpModal from '@/views/auth/SignUpModal';

import CanvasContainer from './components/CanvasContainer';
import FeedbackAlert from './components/FeedbackAlert';
import SaveDesignDrawer from './components/SaveDesignDrawer';
import Toolbar from './controls';

import renderRotateLabel from './fabric/rotateLabel';
import ObjectEditTools from './components/object-edit-tools';
import EditorToolbar from './toolbar';
import ProductDetails from './toolbar/product-picker/ProductDetails';

import './ImageEditor.css';
import getEditorStateAsImageUrls from './utils/template-export';

const sides = ['front', 'back'];

const initCanvas = (side, width, height) => {
  return new fabric.Canvas(side === 'front' ? 'canvas-front' : 'canvas-back', {
    width,
    height,
    selection: false,
    renderOnAddRemove: true,
    preserveObjectStacking: true,
  });
};

const reloadCanvasFromState = (canvas, stateAsJson) => {
  canvas.current.clear();
  canvas.current.loadFromJSON(stateAsJson, function () {
    canvas.current.renderAll();
  });
};

type ImageEditorProps = {
  design: EditorState;
  onDesignChange: (design: Design) => void;
  selectedGarment: Garment;
  onSelectedGarment: (garment: Garment) => void;
};

export default function ImageEditor({
  design: designForSides,
  onDesignChange,
  selectedGarment,
  onSelectedGarment,
}: ImageEditorProps) {
  const canvasFront = useRef(null);
  const canvasBack = useRef(null);
  const clothingAndCanvasRefFront = useRef(null);
  const clothingAndCanvasRefBack = useRef(null);

  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);

  const [isSignUpModalVisible, setSignUpModalVisible] = useState(false);
  const [isSignInModalVisible, setSignInModalVisible] = useState(false);
  const [isSaveDesignDrawerVisible, setSaveDesignDrawerVisible] =
    useState(false);

  const [isModifyingObject, setIsModifyingObject] = useState(false);

  const [isSavingDesign, setSavingDesign] = useState(false);
  const [errorSavingDesign, setErrorSavingDesign] = useState(null);
  const [isDesignSaved, setIsDesignSaved] = useState(null);

  const [activeObject, setActiveObject] = useState(null);

  const history = useHistory();

  const state = useRef<string>('');

  const userState = useRef({ angle: 0, isModifying: false, isRotating: false });

  const { data: me } = useMe();

  const [isDrawingAreaVisible, setDrawingAreaVisible] = useState(true);
  const [isEditorToolbarExpanded, setEditorToolbarExpanded] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product>(null);

  const product = PRODUCTS.find(
    (product) => product.id === selectedGarment.productId
  );

  const selectedVariant = selectedGarment.variant;

  const [selectedSide, setSelectedSide] = useState(sides[0]);

  const canvas = selectedSide === 'front' ? canvasFront : canvasBack;

  const { printableAreas } = product;

  const isMobile = useBreakpointValue(
    { base: true, md: false },
    { ssr: false }
  );

  const drawingAreaForSide = printableAreas[selectedSide.toLowerCase()];

  const drawingArea = drawingAreaForSide[isMobile ? 'base' : 'md'];

  const saveState = useCallback(() => {
    const canvas = selectedSide === 'front' ? canvasFront : canvasBack;

    setRedoStack([]);

    // Initial call won't have a state
    if (state.current) {
      setUndoStack([...undoStack, state.current]);
    }

    const json = canvas.current.toJSON(['aiImage']);

    state.current = JSON.stringify(json);

    onDesignChange({
      ...designForSides,
      [selectedSide]: {
        ...designForSides[selectedSide],
        canvas: state.current,
      },
    });
  }, [selectedSide, designForSides, onDesignChange, undoStack]);

  useEffect(() => {
    sides.forEach((side) => {
      const canvas = side === 'front' ? canvasFront : canvasBack;

      const drawingAreaForSide = printableAreas[side.toLowerCase()];

      const { width, height } = drawingAreaForSide[isMobile ? 'base' : 'md'];

      canvas.current = initCanvas(side, width, height);

      const canvasState = designForSides[side]?.canvas;

      if (canvasState) {
        // Loading an already active design if you to go another page and come back
        state.current = canvasState;

        reloadCanvasFromState(canvas, canvasState);
      } else {
        state.current = JSON.stringify(canvas.current);
      }

      canvas.current.on('mouse:up', function (e) {
        setActiveObject(e.target);

        const { isRotating } = userState.current;

        if (isRotating) {
          const newAngle = Math.round(e.target.angle);

          const commonAngles = times(9, (index) => index * 45);

          const nearestAngle = commonAngles.find(
            (angle) => Math.abs(newAngle - angle) <= 5
          );

          e.target.set(
            'angle',
            nearestAngle !== undefined ? nearestAngle : newAngle
          );
        }

        userState.current.isRotating = false;

        setIsModifyingObject(false);
      });

      canvas.current.on('mouse:down', function (e) {
        if (e.target) {
          userState.current.isModifying = true;

          setIsModifyingObject(true);
        }
      });

      canvas.current.on('object:rotating', function (e) {
        userState.current.isRotating = true;

        userState.current.angle = e.target.angle;
      });

      canvas.current.on('after:render', function (opt) {
        userState.current.isRotating &&
          renderRotateLabel(opt.ctx, userState.current);
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

    canvasCurrent.on('object:modified', () => {
      saveState();
    });

    canvasCurrent.on('erasing:end', () => {
      saveState();
    });

    return () => {
      if (canvasCurrent) {
        canvasCurrent.off('object:modified');
        canvasCurrent.off('erasing:end');
      }
    };
  }, [canvas, saveState]);

  const handleSelectedGarment = (garment) => {
    onSelectedGarment(garment);

    setSelectedProduct(null);

    sides.forEach((side) => {
      const canvas = side === 'front' ? canvasFront : canvasBack;

      const product = PRODUCTS.find(
        (product) => product.id === garment.productId
      );

      const drawingAreaForSide = product.printableAreas[side.toLowerCase()];

      const { width, height } = drawingAreaForSide[isMobile ? 'base' : 'md'];

      canvas.current.setDimensions({ width, height });
    });
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
    setIsModifyingObject(false);
  };

  const handleAddText = () => {
    const { width, height } = drawingArea;

    const textObject = {
      editable: true,
      fill: '#000000',
      fontFamily: 'Poppins',
      text: '',
      fontSize: 20,
      textAlign: 'left',
      originX: 'center',
      originY: 'center',
      left: width / 2,
      top: height / 2 - 20,
      centeredScaling: true,
    };

    const text = new fabric.IText(textObject.text, textObject);

    text.enterEditing();
    text.hiddenTextarea.focus();

    // Render the Text on Canvas
    canvas.current.add(text);
    canvas.current.setActiveObject(text);

    setActiveObject(textObject);
  };

  const handleCopyActiveObject = () => {
    const activeObject = canvas.current.getActiveObject();

    activeObject.clone((clone) => {
      clone.set({
        left: activeObject.left + 10,
        top: activeObject.top + 10,
      });
      canvas.current.add(clone);
      canvas.current.bringForward(clone);
      canvas.current.setActiveObject(clone);
      canvas.current.renderAll();

      saveState();
    });
  };

  const handleCrop = (image) => {
    canvas.current.setActiveObject(image);
    canvas.current.renderAll();

    setActiveObject(image);

    saveState();
  };

  const handleRemoveActiveObject = () => {
    const activeObject = canvas.current.getActiveObject();

    canvas.current.remove(activeObject);

    canvas.current.renderAll();

    setActiveObject(null);

    saveState();
  };

  const handleUpdateTextObject = (updates) => {
    Object.keys(updates).forEach((key) => {
      canvas.current.getActiveObject().set(key, updates[key]);

      canvas.current.renderAll();
    });

    setActiveObject({ ...activeObject, ...updates });

    saveState();
  };

  const handleImageUpload = (fileObj) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      const image = new Image();

      image.src = e.target.result as string;

      image.onload = function () {
        const img = new fabric.Image(image);

        addImageToCanvas(img);
      };
    };
    reader.readAsDataURL(fileObj);
  };

  const handleGeneratedImagePreview = (image: AiImage) => {
    const imagesToRemove = canvas.current._objects.filter(
      ({ aiImage }) => aiImage?.isPreview
    );

    imagesToRemove.forEach((image) => {
      canvas.current.remove(image);
    });

    addAiImageToCanvas({ ...image, isPreview: true });
  };

  const handlePreviewImageSelected = () => {
    const aiImage = canvas.current._objects.find(
      ({ aiImage }) => aiImage && !aiImage.isPreview
    );

    if (aiImage) {
      aiImage.set('aiImage', null);
    }

    const imagePreview = canvas.current._objects.find(
      ({ aiImage }) => aiImage?.isPreview
    );

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
    const aiImages = canvas.current._objects.filter(
      (obj) => obj.aiImage?.url === imageUrl
    );

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

    img.scaleToWidth(150);

    img.set({
      left: width / 2,
      top: height / 2,
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

  const handleLayerUp = () => {
    const selectedObject = canvas.current.getActiveObject();

    canvas.current.bringForward(selectedObject);
    canvas.current.discardActiveObject().renderAll();

    saveState();
  };

  const handleLayerDown = () => {
    const selectedObject = canvas.current.getActiveObject();

    canvas.current.sendBackwards(selectedObject);
    canvas.current.discardActiveObject().renderAll();

    saveState();
  };

  const handleSelectedSide = (side: string) => {
    canvas.current.discardActiveObject().renderAll();

    setActiveObject(null);
    setSelectedSide(side);
    setRedoStack([]);
    setUndoStack([]);
  };

  const handleNext = () => {
    canvas.current.discardActiveObject().renderAll();

    if (me && me.roles[0] !== 'guest') {
      handleGoToSaveDesign();

      return;
    }

    setSignInModalVisible(true);
  };

  const handleGoToSaveDesign = () => {
    setSaveDesignDrawerVisible(true);
  };

  const handleSaveDesign = async (name) => {
    setSavingDesign(true);

    try {
      const [urlFront, urlBack] = await getEditorStateAsImageUrls([
        clothingAndCanvasRefFront,
        clothingAndCanvasRefBack,
      ]);

      const editorState = {
        front: {
          ...(designForSides.front || { canvas: null }),
          templateUrl: urlFront,
        },
        back: {
          ...(designForSides.back || { canvas: null }),
          templateUrl: urlBack,
        },
      };

      const { productId, variant } = selectedGarment;

      const design = {
        name,
        garmentId: productId,
        garmentColor: variant,
        editorState,
      };

      await saveDesign(design);

      setIsDesignSaved(true);

      setTimeout(() => {
        setIsDesignSaved(false);
      }, 3000);
    } catch (err) {
      setErrorSavingDesign(err.response?.data2?.message || err.message);
    } finally {
      setSaveDesignDrawerVisible(false);
      setSavingDesign(false);
      // onDesignChange(editorState);
    }

    /* onDesignChange({
      front: {
        ...(designForSides.front || { canvas: null }),
        templateUrl: urlFront,
      },
      back: {
        ...(designForSides.back || { canvas: null }),
        templateUrl: urlBack,
      },
    }); */

    // history.push('/app/order-or-share');
  };

  const { urlPrefix } = product;

  const variantImageUrl = `${urlPrefix}_${selectedVariant}`;

  const canvasState = designForSides[selectedSide]?.canvas;

  const canvasStateFromJson = canvasState && JSON.parse(canvasState);

  const objects = canvasStateFromJson?.objects || [];

  const aiImage = objects.find(
    ({ aiImage }) => aiImage && !aiImage.isPreview
  )?.aiImage;

  const imagePreview = objects.find(({ aiImage }) => aiImage?.isPreview);

  const showHint = isEmpty(objects) && !activeObject;

  return (
    <Box h="100vh" w="100%">
      <Navbar
        onBack={() => history.push('/app/products')}
        onNext={() => handleNext()}
        title="Create design"
      />
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
          selectedProduct={selectedProduct}
          onSelectedProduct={setSelectedProduct}
        />
        {!isMobile && selectedProduct ? (
          <Box flex={1} height="100%" p="20px">
            <Box bg="#FFFFFF" borderRadius="10px" height="100%" overflow="auto">
              <ProductDetails
                garment={selectedGarment}
                onGarmentUpdate={handleSelectedGarment}
                product={selectedProduct}
              />
            </Box>
          </Box>
        ) : null}
        <Box
          display={{ base: 'block', md: selectedProduct ? 'none' : 'flex' }}
          flex={1}
          flexDirection="column"
          h={{ base: 'auto', md: '100%' }}
          position="relative"
          w="100%"
        >
          <Toolbar
            onAddText={handleAddText}
            onSelectedSide={handleSelectedSide}
            onUndo={isEmpty(undoStack) ? null : handleUndo}
            onRedo={isEmpty(redoStack) ? null : handleRedo}
            onSave={handleNext}
            selectedSide={selectedSide}
          />
          {(errorSavingDesign || isDesignSaved) && (
            <FeedbackAlert error={errorSavingDesign} />
          )}
          <Box
            alignItems="center"
            display="flex"
            flex={1}
            flexDirection="column"
            justifyContent="center"
            position="relative"
            top={{ base: '40px', md: 0 }}
          >
            <Box
              id="#canvas-container-front"
              display={selectedSide === 'front' ? 'block' : 'none'}
              onClick={handleClick}
              ref={clothingAndCanvasRefFront}
              position="relative"
            >
              <CanvasContainer
                canvasRef={canvasFront}
                drawingArea={printableAreas.front[isMobile ? 'base' : 'md']}
                id="canvas-front"
                isDrawingAreaVisible={isDrawingAreaVisible}
                variantImageUrl={variantImageUrl}
                selectedVariant={selectedVariant}
                showHint={showHint}
                showCenterAxis={isModifyingObject}
                side="front"
                onHintClick={() => {
                  setEditorToolbarExpanded(true);
                }}
              />
            </Box>
            <Box
              id="#canvas-container-back"
              display={selectedSide === 'back' ? 'block' : 'none'}
              ref={clothingAndCanvasRefBack}
              position="relative"
            >
              <CanvasContainer
                canvasRef={canvasBack}
                drawingArea={printableAreas.front[isMobile ? 'base' : 'md']}
                id="canvas-back"
                isDrawingAreaVisible={isDrawingAreaVisible}
                variantImageUrl={variantImageUrl}
                selectedVariant={selectedVariant}
                showHint={showHint}
                showCenterAxis={isModifyingObject}
                side="back"
                onHintClick={() => {
                  setEditorToolbarExpanded(true);
                }}
              />
            </Box>
          </Box>
          <VStack
            left={0}
            right={0}
            position="absolute"
            top={`${92 + 20 + drawingArea.height + drawingArea.top + 10}px`}
          >
            <ObjectEditTools
              activeObject={activeObject}
              canvas={canvas.current}
              onLayerUp={handleLayerUp}
              onLayerDown={handleLayerDown}
              onCopyActiveObject={handleCopyActiveObject}
              onCrop={handleCrop}
              onDeleteActiveObject={handleRemoveActiveObject}
              onUpdateTextObject={handleUpdateTextObject}
              onImageUpdate={handleImageUpdate}
            />
            {imagePreview ? (
              <Button
                onClick={handlePreviewImageSelected}
                title="Place artwork"
              />
            ) : null}
          </VStack>
        </Box>
      </Flex>
      {isSignUpModalVisible ? (
        <SignUpModal
          onClose={() => setSignUpModalVisible(false)}
          onGoToSignin={() => {
            setSignInModalVisible(true);
            setSignUpModalVisible(false);
          }}
          onSignUp={() => {
            setSignUpModalVisible(false);

            handleGoToSaveDesign();
          }}
        />
      ) : null}
      {isSignInModalVisible ? (
        <SignInModal
          onClose={() => setSignInModalVisible(false)}
          onGoToSignup={() => {
            setSignInModalVisible(false);
            setSignUpModalVisible(true);
          }}
          onSignIn={() => {
            setSignInModalVisible(false);

            handleGoToSaveDesign();
          }}
        />
      ) : null}
      {isSaveDesignDrawerVisible ? (
        <SaveDesignDrawer
          isSaving={isSavingDesign}
          onClose={() => {
            setSaveDesignDrawerVisible(false);
          }}
          onSave={handleSaveDesign}
        />
      ) : null}
    </Box>
  );
}
