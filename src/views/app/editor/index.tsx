import { useEffect, useRef, useState } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import { Box, Flex } from '@chakra-ui/react';
import { useMe } from '@/api/auth';

import { fabric } from 'fabric';
import { isEmpty } from 'lodash';

import Navbar from '@/components/navbar/Navbar';
import { Design, TemplateDesign } from '@/components/types';
import PRODUCTS from '@/data/products';

import SignInModal from '@/views/auth/SignInModal';
import SignUpModal from '@/views/auth/SignUpModal';

import CanvasContainer from './components/CanvasContainer';
import SaveDesignModal from './components/SaveDesignModal';
import Toolbar from './controls/Toolbar';

import FooterToolbar from './toolbar';

import './ImageEditor.css';

type ImageEditorProps = {
  design: Design;
  onDesignChange: (design: Design) => void;
};

export default function ImageEditor({
  design: designForFrontAndBack,
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

  const [activeObject, setActiveObject] = useState(null);

  const history = useHistory();

  const state = useRef<string>('');

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

    if (design) {
      // Loading an already active design if you to go another page and come back
      const { canvasStateAsJson } = design;

      state.current = canvasStateAsJson;

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
    });

    return () => {
      if (canvas.current) {
        canvas.current.dispose();
        canvas.current = null;
      }
    };
  }, []);

  const saveState = (aiImage = undefined) => {
    setRedoStack([]);

    // Initial call won't have a state
    if (state.current) {
      setUndoStack([...undoStack, state.current]);
    }

    const json = canvas.current.toJSON(['aiImageUrl']);

    state.current = JSON.stringify(json);

    const updates = { canvasStateAsJson: state.current } as TemplateDesign;

    if (aiImage !== undefined) {
      updates.aiImage = aiImage;
    }

    handleDesignChange({ ...design, ...updates });
  };

  const handleDesignChange = (designForSide) => {
    onDesignChange({ ...designForFrontAndBack, [selectedSide]: designForSide });
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
    canvas.current.remove(canvas.current.getActiveObject());

    canvas.current.renderAll();

    saveState();
  };

  const handleDeselectActiveObject = () => {
    canvas.current.discardActiveObject();
    canvas.current.renderAll();

    setActiveObject(null);

    setFooterToolbarExpanded(true);
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
        img.set({
          left: 100,
          top: 60,
        });
        img.scaleToWidth(200);
        canvas.current.add(img).setActiveObject(img).renderAll();

        saveState();
      };
    };
    reader.readAsDataURL(fileObj);
  };

  const handleGeneratedImagePreview = (imageUrl) => {
    const { width, height } = drawingArea;

    const activeObject = canvas.current.getActiveObject();

    if (activeObject && activeObject.aiImageUrl) {
      canvas.current.remove(activeObject);
    }

    fabric.Image.fromURL(
      `${imageUrl}?timestamp=${Date.now()}`,
      (img) => {
        img.scaleToWidth(150);

        img.set('aiImageUrl', imageUrl);
        img.set('left', width / 2 - 75);
        img.set('top', height / 2 - 75);

        img.crossOrigin = 'anonymous';
        canvas.current.add(img).setActiveObject(img).renderAll();
      },
      { crossOrigin: 'anonymous' }
    );
  };

  const handleGeneratedImageSelected = (image) => {
    saveState(image);
  };

  const handleGeneratedImageRemoved = (imageUrl) => {
    console.log('Image URL', imageUrl, canvas.current._objects);

    const aiImage = canvas.current._objects.filter(
      (obj) => obj.aiImageUrl === imageUrl
    );

    console.log('Handle image removed', aiImage);
    canvas.current.remove(aiImage[0]);
    canvas.current.renderAll();

    setActiveObject(null);

    saveState(null);
  };

  const handleSelectedVariant = (name) => {
    const { variants } = product;

    const variant = variants.find((variant) => variant.name === name).name;

    setSelectedVariant(variant);
  };

  const handleSelectedSide = (side: string) => {
    setSelectedSide(side);

    const canvas = side === 'Front' ? canvasFront : canvasBack;

    if (!canvas.current.clear) {
      canvas.current = initCanvas(side);
    }

    const design = designForFrontAndBack[side];

    const { canvasStateAsJson = {} } = design || {};

    state.current = canvasStateAsJson;

    canvas.current.clear();
    canvas.current.loadFromJSON(state.current, function () {
      canvas.current.renderAll();
    });
  };

  const handleNext = () => {
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
    setSaveDesignModalVisible(false);

    const { Front, Back } = designForFrontAndBack;

    onDesignChange({
      Front: { ...Front, templateUrl: urlFront },
      Back: { ...Back, templateUrl: urlBack },
    });

    history.push('/app/order-or-share');
  };

  const { urlPrefix } = product;

  const variantImageUrl = `${urlPrefix}_${selectedVariant}`;

  const showHint = !hasSeenInitialCallToAction && isEmpty(design);

  return (
    <Box h="100%" w="100%">
      <Navbar onNext={() => handleNext()} step={2} title="Create your design" />
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
        <FooterToolbar
          isExpanded={isFooterToolbarExpanded}
          onSetExpanded={(isExpanded) => {
            setHasSeenInitialCallToAction(true);
            setFooterToolbarExpanded(isExpanded);
          }}
          selectedColor={selectedVariant}
          onSelectedColor={handleSelectedVariant}
          onAddText={handleAddText}
          onUpdateTextObject={handleUpdateTextObject}
          activeObject={activeObject}
          onDeleteActiveObject={handleRemoveActiveObject}
          onUnselectActiveObject={handleDeselectActiveObject}
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
          onClose={() => setSaveDesignModalVisible(false)}
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
