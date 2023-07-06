import { useEffect, useRef, useState } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import { Box, Flex } from '@chakra-ui/react';
import { useMe } from '@/api/auth';
import Button from '@/components/Button';

import { fabric } from 'fabric';
import { isEmpty } from 'lodash';

import Navbar from '@/components/navbar/Navbar';
import { AiImage, Design } from '@/components/types';
import PRODUCTS from '@/data/products';

import SignInModal from '@/views/auth/SignInModal';
import SignUpModal from '@/views/auth/SignUpModal';

import CanvasContainer from './components/CanvasContainer';
import SaveDesignModal from './components/SaveDesignModal';
import Toolbar from './controls/Toolbar';

import renderRotateLabel from './fabric/rotateLabel';
import ObjectEditTools from './components/ObjectEditTools';
import FooterToolbar from './toolbar';

import './ImageEditor.css';

type ImageEditorProps = {
  design: Design;
  canvasFront;
  canvasBack;
  onDesignChange: (design: Design) => void;
  onCanvasFrontChange: (canvasStateAsJson: string) => void;
  onCanvasBackChange: (canvasStateAsJson: string) => void;
};

export default function ImageEditor({
  design: designForFrontAndBack,
  canvasFront: canvasStateFront,
  canvasBack: canvasStateBack,
  onCanvasFrontChange,
  onCanvasBackChange,
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

  const [imagePreview, setImagePreview] = useState(null);

  const [activeObject, setActiveObject] = useState(null);

  const history = useHistory();

  const state = useRef<string>('');

  const userState = useRef({ angle: 0, isRotating: false });

  const { data: me } = useMe();

  const [isDrawingAreaVisible, setDrawingAreaVisible] = useState(true);
  const [isFooterToolbarExpanded, setFooterToolbarExpanded] = useState(false);
  const [hasSeenInitialCallToAction, setHasSeenInitialCallToAction] =
    useState(false);

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

  const defaultSide = 'Front';

  const [selectedSide, setSelectedSide] = useState(defaultSide);

  const design = designForFrontAndBack[selectedSide];

  const canvas = selectedSide === 'Front' ? canvasFront : canvasBack;

  const { printableAreas } = product;

  const drawingArea = printableAreas[selectedSide.toLowerCase()];

  useEffect(() => {
    canvas.current = initCanvas(selectedSide);

    if (canvasStateFront) {
      // Loading an already active design if you to go another page and come back
      state.current = canvasStateFront;

      reloadCanvasFromState();
    } else {
      state.current = JSON.stringify(canvas.current);
    }

    canvas.current.on('object:modified', () => {
      console.log('Object modified');
      saveState();
    });

    canvas.current.on('mouse:up', function (e) {
      setActiveObject(e.target);

      const { isRotating } = userState.current;

      if (isRotating) {
        e.target.set('angle', Math.round(e.target.angle));
      }

      userState.current.isRotating = false;
    });

    canvas.current.on('object:rotating', function (e) {
      userState.current.isRotating = true;

      userState.current.angle = e.target.angle;
    });

    canvas.current.on('after:render', function (opt) {
      userState.current.isRotating &&
        renderRotateLabel(opt.ctx, userState.current);
    });

    return () => {
      if (canvas.current) {
        canvas.current.dispose();
        canvas.current = null;
      }
    };
  }, []);

  const saveState = () => {
    setRedoStack([]);

    // Initial call won't have a state
    if (state.current) {
      setUndoStack([...undoStack, state.current]);
    }

    const json = canvas.current.toJSON(['aiImageUrl']);

    state.current = JSON.stringify(json);

    const canvasId = canvas.current.getElement().id;

    if (canvasId === 'canvas-front') {
      onCanvasFrontChange(state.current);
    } else {
      onCanvasBackChange(state.current);
    }
  };

  const handleDesignUpdate = (updates) => {
    onDesignChange({
      ...designForFrontAndBack,
      [selectedSide]: { ...design, ...updates },
    });
  };

  const handleUndo = () => {
    setRedoStack([...redoStack, state.current]);

    state.current = undoStack.pop();

    setUndoStack(undoStack);

    reloadCanvasFromState();
  };

  const handleRedo = () => {
    setUndoStack([...undoStack, state.current]);

    state.current = redoStack.pop();

    setRedoStack(redoStack);

    reloadCanvasFromState();
  };

  const reloadCanvasFromState = () => {
    canvas.current.clear();
    canvas.current.loadFromJSON(state.current, function () {
      canvas.current.renderAll();
    });
  };

  const initCanvas = (side) => {
    const { width, height } = printableAreas[side.toLowerCase()];

    return new fabric.Canvas(
      side === 'Front' ? 'canvas-front' : 'canvas-back',
      {
        width,
        height,
        selection: false,
        renderOnAddRemove: true,
      }
    );
  };

  const handleAddText = (params) => {
    const { width, height } = drawingArea;

    const textObject = {
      fill: '#FFFFFF',
      fontFamily: 'Poppins',
      text: 'this is\na multiline\ntext\naligned right!',
      fontSize: 12,
      textAlign: 'left',
      left: width / 2 - 20,
      top: height / 2 - 20,
      ...params,
    };

    const text = new fabric.Text(textObject.text, textObject);

    // Render the Text on Canvas
    canvas.current.add(text);

    canvas.current.setActiveObject(text);

    setActiveObject(textObject);

    saveState();
  };

  const handleRemoveActiveObject = () => {
    const activeObject = canvas.current.getActiveObject();

    const isAiImage = activeObject.aiImageUrl;

    canvas.current.remove(activeObject);

    canvas.current.renderAll();

    setActiveObject(null);

    saveState();

    if (isAiImage) {
      handleDesignUpdate({ aiImage: null });
    }

    if (imagePreview && activeObject.aiImageUrl === imagePreview.url) {
      setImagePreview(null);
    }
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
    const { url: imageUrl } = image;

    const aiImagesToRemove = canvas.current._objects.filter(
      ({ aiImageUrl }) =>
        aiImageUrl !== imageUrl && aiImageUrl !== design?.aiImage?.url
    );

    console.log('AI image preview', imageUrl, aiImagesToRemove);

    aiImagesToRemove.forEach((aiImage) => {
      canvas.current.remove(aiImage);
    });

    if (canvas.current._objects.find((obj) => obj.aiImageUrl === imageUrl)) {
      return;
    }

    setImagePreview(image);

    addAiImageToCanvas(imageUrl);
  };

  const handleGeneratedImageSelected = (image: AiImage) => {
    const aiImagesToRemove = canvas.current._objects.filter(
      (obj) => obj.aiImageUrl && obj.aiImageUrl !== image.url
    );

    console.log('AI image', image);

    aiImagesToRemove.forEach((aiImage) => {
      canvas.current.remove(aiImage);
    });

    saveState();

    setActiveObject(canvas.current.getActiveObject());
    setImagePreview(null);

    handleDesignUpdate({ aiImage: image });

    setFooterToolbarExpanded(false);
  };

  const handleGeneratedImageRemoved = (imageUrl: string) => {
    console.log('Image URL', imageUrl, canvas.current._objects);

    const aiImage = canvas.current._objects.filter(
      (obj) => obj.aiImageUrl === imageUrl
    );

    console.log('Handle image removed', aiImage);
    canvas.current.remove(aiImage[0]);
    canvas.current.renderAll();

    setImagePreview(null);
    setActiveObject(null);

    saveState();

    handleDesignUpdate({ aiImage: null });
  };

  const handleAiImageUpdate = (aiImage) => {
    console.log('AI image update', aiImage);

    handleGeneratedImageSelected(aiImage);

    addAiImageToCanvas(aiImage.url);
  };

  const addAiImageToCanvas = (imageUrl) => {
    fabric.Image.fromURL(
      imageUrl,
      (img) => {
        addImageToCanvas(img, { aiImageUrl: imageUrl });
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
    canvas.current.renderAll();
  };

  const handleLayerUp = () => {
    const selectedObject = canvas.current.getActiveObject();

    console.log('Up', selectedObject);

    canvas.current.bringForward(selectedObject);
    canvas.current.discardActiveObject();
    canvas.current.renderAll();
  };

  const handleLayerDown = () => {
    const selectedObject = canvas.current.getActiveObject();

    console.log('Down', selectedObject);

    canvas.current.sendBackwards(selectedObject);
    canvas.current.discardActiveObject();
    canvas.current.renderAll();
  };

  const handleSelectedSide = (side: string) => {
    setSelectedSide(side);

    const canvas = side === 'Front' ? canvasFront : canvasBack;

    if (!canvas.current.clear) {
      canvas.current = initCanvas(side);
    }

    state.current = side === 'Front' ? canvasStateFront : canvasStateBack;

    canvas.current.clear();
    canvas.current.loadFromJSON(state.current, function () {
      canvas.current.renderAll();
    });
  };

  const handleNext = () => {
    canvas.current.discardActiveObject();
    canvas.current.renderAll();

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
      Front: { ...(designForFrontAndBack.Front || {}), templateUrl: urlFront },
      Back: { ...(designForFrontAndBack.Back || {}), templateUrl: urlBack },
    });

    history.push('/app/order-or-share');
  };

  const { urlPrefix } = product;

  const variantImageUrl = `${urlPrefix}_${selectedVariant}`;

  const showHint = !hasSeenInitialCallToAction && isEmpty(design);

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
              side="front"
              onHintClick={() => {
                setHasSeenInitialCallToAction(true);
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
            side="back"
            onHintClick={() => {
              setHasSeenInitialCallToAction(true);
              setFooterToolbarExpanded(true);
            }}
          />
        </Box>
        {imagePreview ? (
          <Button
            onClick={() => handleGeneratedImageSelected(imagePreview)}
            title="Place artwork"
          />
        ) : null}
        <ObjectEditTools
          activeObject={activeObject}
          aiImage={design && design.aiImage}
          hasImagePreview={!!imagePreview}
          onLayerUp={handleLayerUp}
          onLayerDown={handleLayerDown}
          onDeleteActiveObject={handleRemoveActiveObject}
          onAiImageUpdate={handleAiImageUpdate}
        />
        <FooterToolbar
          isExpanded={isFooterToolbarExpanded}
          onSetExpanded={(isExpanded) => {
            setHasSeenInitialCallToAction(true);
            setFooterToolbarExpanded(isExpanded);
          }}
          onAddText={handleAddText}
          onUpdateTextObject={handleUpdateTextObject}
          activeObject={activeObject}
          aiImage={design && design.aiImage}
          onImageUploaded={handleImageUpload}
          onGeneratedImagePreview={handleGeneratedImagePreview}
          onGeneratedImageSelected={handleGeneratedImageSelected}
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
