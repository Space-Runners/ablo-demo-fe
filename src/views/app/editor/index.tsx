import { useCallback, useEffect, useRef, useState } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import { Box, Flex } from '@chakra-ui/react';
import { useMe } from '@/api/auth';
import Button from '@/components/Button';

import { fabric } from 'fabric';
import { isEmpty, times } from 'lodash';

import Navbar from '@/components/navbar/Navbar';
import { AiImage, Design } from '@/components/types';
import PRODUCTS from '@/data/products';

import SignInModal from '@/views/auth/SignInModal';
import SignUpModal from '@/views/auth/SignUpModal';

import CanvasContainer from './components/CanvasContainer';
import SaveDesignModal from './components/SaveDesignModal';
import Toolbar from './controls/Toolbar';

import renderRotateLabel from './fabric/rotateLabel';
import ObjectEditTools from './components/object-edit-tools';
import FooterToolbar from './toolbar';

import './ImageEditor.css';

const sides = ['Front', 'Back'];

const initCanvas = (side, width, height) => {
  return new fabric.Canvas(side === 'Front' ? 'canvas-front' : 'canvas-back', {
    width,
    height,
    selection: false,
    renderOnAddRemove: true,
  });
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
};

export default function ImageEditor({
  design: designForSides,
  onDesignChange,
}: ImageEditorProps) {
  const canvasFront = useRef(null);
  const canvasBack = useRef(null);
  const clothingAndCanvasRefFront = useRef(null);
  const clothingAndCanvasRefBack = useRef(null);

  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);

  const [isSignUpModalVisible, setSignUpModalVisible] = useState(false);
  const [isSignInModalVisible, setSignInModalVisible] = useState(false);
  const [isSaveDesignModalVisible, setSaveDesignModalVisible] = useState(false);
  const [isModifyingObject, setIsModifyingObject] = useState(false);

  const [activeObject, setActiveObject] = useState(null);

  const history = useHistory();

  const state = useRef<string>('');

  const userState = useRef({ angle: 0, isModifying: false, isRotating: false });

  const { data: me } = useMe();

  const [isDrawingAreaVisible, setDrawingAreaVisible] = useState(true);
  const [isFooterToolbarExpanded, setFooterToolbarExpanded] = useState(false);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const productId = searchParams.get('productId');
  const variant = searchParams.get('variant');

  const product =
    PRODUCTS.find((product) => product.id === parseInt(productId, 10)) ||
    PRODUCTS[0];

  const [selectedVariant, setSelectedVariant] = useState(
    variant || PRODUCTS[0].variants[0].name
  );

  const [selectedSide, setSelectedSide] = useState(sides[0]);

  const canvas = selectedSide === 'Front' ? canvasFront : canvasBack;

  const { printableAreas } = product;

  const drawingArea = printableAreas[selectedSide.toLowerCase()];

  const saveState = useCallback(() => {
    const canvas = selectedSide === 'Front' ? canvasFront : canvasBack;

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
    console.log('Use effect');
    sides.forEach((side) => {
      const canvas = side === 'Front' ? canvasFront : canvasBack;

      const { width, height } = printableAreas[side.toLowerCase()];

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
      console.log('Unmount');
      sides.forEach((side) => {
        const canvas = side === 'Front' ? canvasFront : canvasBack;

        if (canvas.current) {
          canvas.current.dispose();
          canvas.current = null;
        }
      });
    };
  }, []);

  useEffect(() => {
    const canvasCurrent = canvas.current;
    console.log('Use modified effect');

    canvasCurrent.on('object:modified', () => {
      console.log('Object modified');
      saveState();
    });

    return () => {
      console.log('Remove modified handler');
      if (canvasCurrent) {
        canvasCurrent.off('object:modified');
      }
    };
  }, [canvas, saveState]);

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

  const handleClick = () => {
    canvas.current.discardActiveObject();
    canvas.current.renderAll();

    setActiveObject(null);
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
    const aiImagesToRemove = canvas.current._objects.filter(
      (obj) => obj.aiImage && !obj.aiImage.isPreview
    );

    aiImagesToRemove.forEach((aiImage) => {
      canvas.current.remove(aiImage);
    });

    const imagePreview = canvas.current._objects.find(
      ({ aiImage }) => aiImage?.isPreview
    );

    imagePreview.set('aiImage', { ...imagePreview.aiImage, isPreview: false });

    saveState();

    setActiveObject(canvas.current.getActiveObject());

    setFooterToolbarExpanded(false);
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
    console.log('Image', image);
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
    setSaveDesignModalVisible(true);
  };

  const handleSaveDesign = ([urlFront, urlBack]) => {
    setDrawingAreaVisible(false);
    setSaveDesignModalVisible(false);

    onDesignChange({
      Front: {
        ...(designForSides.Front || { canvas: null }),
        templateUrl: urlFront,
      },
      Back: {
        ...(designForSides.Back || { canvas: null }),
        templateUrl: urlBack,
      },
    });

    history.push('/app/order-or-share');
  };

  const { urlPrefix } = product;

  const variantImageUrl = `${urlPrefix}_${selectedVariant}`;

  const canvasState = designForSides[selectedSide]?.canvas;

  const canvasStateFromJson = canvasState && JSON.parse(canvasState);

  const objects = canvasStateFromJson?.objects || [];

  console.log('Objects', objects, designForSides);

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
        step={2}
        title="Create design"
      />
      <Flex
        align="center"
        bg="#F9F9F7"
        flexDirection="column"
        h="calc(100% - 163px)"
        position="relative"
        w="100%"
      >
        <Toolbar
          isDrawingAreaVisible={isDrawingAreaVisible}
          onAddText={handleAddText}
          onToggleDrawingArea={() =>
            setDrawingAreaVisible(!isDrawingAreaVisible)
          }
          onSelectedSide={handleSelectedSide}
          onSelectedVariant={(variant) => setSelectedVariant(variant)}
          onUndo={isEmpty(undoStack) ? null : handleUndo}
          onRedo={isEmpty(redoStack) ? null : handleRedo}
          selectedSide={selectedSide}
          selectedVariant={selectedVariant}
        />
        {
          <Box
            id="#canvas-container-front"
            display={selectedSide === 'Front' ? 'block' : 'none'}
            onClick={handleClick}
            ref={clothingAndCanvasRefFront}
            position="relative"
          >
            <CanvasContainer
              canvasRef={canvasFront}
              drawingArea={printableAreas.front}
              id="canvas-front"
              isDrawingAreaVisible={isDrawingAreaVisible}
              variantImageUrl={variantImageUrl}
              selectedVariant={selectedVariant}
              showHint={showHint}
              showCenterAxis={isModifyingObject}
              side="front"
              onHintClick={() => {
                setFooterToolbarExpanded(true);
              }}
            />
          </Box>
        }
        <Box
          id="#canvas-container-back"
          display={selectedSide === 'Back' ? 'block' : 'none'}
          ref={clothingAndCanvasRefBack}
          position="relative"
        >
          <CanvasContainer
            canvasRef={canvasBack}
            drawingArea={printableAreas.back}
            id="canvas-back"
            isDrawingAreaVisible={isDrawingAreaVisible}
            variantImageUrl={variantImageUrl}
            selectedVariant={selectedVariant}
            showHint={showHint}
            showCenterAxis={isModifyingObject}
            side="back"
            onHintClick={() => {
              setFooterToolbarExpanded(true);
            }}
          />
        </Box>
        {imagePreview ? (
          <Button onClick={handlePreviewImageSelected} title="Place artwork" />
        ) : null}
        <ObjectEditTools
          activeObject={activeObject}
          hasImagePreview={!!imagePreview}
          onLayerUp={handleLayerUp}
          onLayerDown={handleLayerDown}
          onCopyActiveObject={handleCopyActiveObject}
          onDeleteActiveObject={handleRemoveActiveObject}
          onUpdateTextObject={handleUpdateTextObject}
          onImageUpdate={handleImageUpdate}
        />
        <FooterToolbar
          isExpanded={isFooterToolbarExpanded}
          onSetExpanded={setFooterToolbarExpanded}
          activeObject={activeObject}
          aiImage={!imagePreview && aiImage}
          onImageUploaded={handleImageUpload}
          onGeneratedImagePreview={handleGeneratedImagePreview}
          onGeneratedImageSelected={handlePreviewImageSelected}
          onGeneratedImageRemoved={handleGeneratedImageRemoved}
        />
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
      {isSaveDesignModalVisible ? (
        <SaveDesignModal
          onClose={() => {
            setSaveDesignModalVisible(false);
          }}
          onSave={handleSaveDesign}
          designRef={
            !isEmpty(canvasFront.current?._objects) && clothingAndCanvasRefFront
          }
          designRefBack={
            !isEmpty(canvasBack.current?._objects) && clothingAndCanvasRefBack
          }
        />
      ) : null}
    </Box>
  );
}
