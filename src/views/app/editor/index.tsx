import { useEffect, useRef, useState } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import { Box, Flex, Text } from '@chakra-ui/react';
import { useMe } from '@/api/auth';
import { saveTemplate } from '@/api/image-generator';

import { fabric } from 'fabric';
import { isEmpty } from 'lodash';
import { toPng } from 'html-to-image';

import Navbar from '@/components/navbar/Navbar';
import { Design } from '@/components/types';
import PRODUCTS from '@/data/products';

import SignInModal from '@/views/auth/SignInModal';
import SignUpModal from '@/views/auth/SignUpModal';

import SaveDesignModal from './components/SaveDesignModal';
import Toolbar from './controls/Toolbar';
import IconEmptyState from './icons/EmptyState';
import FooterToolbar from './toolbar';

import './ImageEditor.css';

const DARK_VARIANTS = ['Onyx', 'Oceana'];

type ImageEditorProps = {
  design: Design;
  onDesignChange: (design: Design) => void;
};

export default function ImageEditor({
  design,
  onDesignChange,
}: ImageEditorProps) {
  const canvas = useRef(null);
  const clothingAndCanvasRef = useRef(null);

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

  const productId = searchParams.get('productName');
  const variant = searchParams.get('variant');

  const product =
    PRODUCTS.find((product) => product.id === parseInt(productId, 10)) ||
    PRODUCTS[0];

  const [selectedVariant, setSelectedVariant] = useState(
    variant || PRODUCTS[0].variants[0].name
  );

  const defaultSide = 'Front';

  const [selectedSide, setSelectedSide] = useState(defaultSide);

  const { printableAreas } = product;

  const drawingArea = printableAreas[selectedSide.toLowerCase()];

  const [activeTextObject, setActiveTextObject] = useState(null);

  console.log('Design', design);

  useEffect(() => {
    console.log('Effect');
    canvas.current = initCanvas();

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
      console.log('Log', e);

      console.log('Clicked on', e.target);

      setActiveObject(e.target);
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

    const json = canvas.current.toJSON(['imageUrl']);

    state.current = JSON.stringify(json);

    console.log('Save state');

    onDesignChange({ ...(design || {}), canvasStateAsJson: state.current });
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

  const initCanvas = () => {
    const { width, height } = drawingArea;

    return new fabric.Canvas('canvas', {
      width,
      height,
      selection: false,
      renderOnAddRemove: true,
    });
  };

  const handleAddText = (params) => {
    const textObject = {
      fill: '#FFFFFF',
      fontFamily: 'Poppins',
      text: 'this is\na multiline\ntext\naligned right!',
      fontSize: 12,
      textAlign: 'left',
      ...params,
    };

    const text = new fabric.Text(textObject.text, textObject);

    // Render the Text on Canvas
    canvas.current.add(text);

    canvas.current.setActiveObject(text);

    setActiveTextObject(textObject);

    saveState();
  };

  const handleRemoveText = () => {
    canvas.current.remove(canvas.current.getActiveObject());

    setActiveTextObject(null);

    saveState();
  };

  const handleRemoveActiveObject = () => {
    canvas.current.remove(canvas.current.getActiveObject());

    canvas.current.renderAll();

    saveState();
  };

  const handleUpdateTextObject = (updates) => {
    setActiveTextObject({ ...activeTextObject, ...updates });

    Object.keys(updates).forEach((key) => {
      canvas.current.getActiveObject().set(key, updates[key]);

      canvas.current.renderAll();
    });

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

  const handleImageGenerated = (imageUrl) => {
    canvas.current.remove(canvas.current.getActiveObject());

    fabric.Image.fromURL(
      imageUrl,
      (img) => {
        img.scaleToWidth(200);

        img.set('aiImageUrl', imageUrl);

        img.crossOrigin = 'anonymous';
        canvas.current.add(img).setActiveObject(img).renderAll();

        saveState();
      },
      { crossOrigin: 'anonymous' }
    );
  };

  const handleImageSelected = (image) => {
    onDesignChange({ ...design, aiImage: image });
  };

  const handleSelectedVariant = (name) => {
    const { variants } = product;

    const variant = variants.find((variant) => variant.name === name).name;

    setSelectedVariant(variant);
  };

  const handleSelectedSide = (side: string) => {
    setSelectedSide(side);

    const drawingArea = printableAreas[side.toLowerCase()];

    canvas.current.setDimensions({
      width: drawingArea.width,
      height: drawingArea.height,
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
    handleSaveDesign();

    return;
    setSignInModalVisible(false);
    setSaveDesignModalVisible(true);

    return;
  };

  const handleSaveDesign = () => {
    toPng(clothingAndCanvasRef.current, { cacheBust: false })
      .then((dataUrl) => {
        saveTemplate(`Testing-${Date.now()}`, dataUrl).then(() => {
          console.log('success');
        });
      })
      .catch((err) => {
        console.log(err);
      });

    return;
    setSaveDesignModalVisible(false);

    history.push('/app/order-or-share');

    return;
  };

  const { urlPrefix } = product;

  const variantImageUrl = `${urlPrefix}_${selectedVariant}_${selectedSide.toUpperCase()}.png?timestamp=${Date.now()}`;

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
        <Box ref={clothingAndCanvasRef} position="relative">
          <img src={variantImageUrl} crossOrigin="anonymous" width={350} />
          <Box
            border={
              isDrawingAreaVisible
                ? `2px dashed ${
                    DARK_VARIANTS.includes(selectedVariant)
                      ? '#FFFFFF'
                      : '#a8a8a8'
                  }`
                : ''
            }
            borderRadius="4px"
            left={`${drawingArea.left}px`}
            position="absolute"
            top={`${drawingArea.top}px`}
            id="drawingArea"
            className="drawing-area"
          >
            <div className="canvas-container">
              <canvas id="canvas" ref={canvas}></canvas>
            </div>
            {!hasSeenInitialCallToAction && !design && (
              <Flex
                align="center"
                as="button"
                direction="column"
                justify="center"
                onClick={() => {
                  setHasSeenInitialCallToAction(true);
                  setFooterToolbarExpanded(true);
                }}
                position="absolute"
                top="20%"
                w="100%"
                textAlign="center"
              >
                <IconEmptyState />
                <Text
                  color={
                    DARK_VARIANTS.includes(selectedVariant)
                      ? '#FFFFFF'
                      : '#000000'
                  }
                  fontSize="sm"
                  fontWeight={400}
                  mt="17px"
                >
                  Select a style to begin
                </Text>
              </Flex>
            )}
          </Box>
        </Box>
        <FooterToolbar
          isExpanded={isFooterToolbarExpanded}
          onAddText={handleAddText}
          onRemoveText={handleRemoveText}
          onDeleteActiveObject={handleRemoveActiveObject}
          onUpdateTextObject={handleUpdateTextObject}
          onSetExpanded={(isExpanded) => {
            setHasSeenInitialCallToAction(true);
            setFooterToolbarExpanded(isExpanded);
          }}
          activeObject={activeObject}
          activeTextObject={activeTextObject}
          selectedColor={selectedVariant}
          onSelectedColor={handleSelectedVariant}
          onImageUploaded={handleImageUpload}
          onImageGenerated={handleImageGenerated}
          onImageSelected={handleImageSelected}
        />
      </Flex>
      {isSignUpModalVisible ? (
        <SignUpModal
          onClose={() => setSignUpModalVisible(false)}
          onGoToSignin={() => {
            setSignInModalVisible(true);
            setSignUpModalVisible(false);
          }}
          onSignUp={handleGoToSaveDesign}
        />
      ) : null}
      {isSignInModalVisible ? (
        <SignInModal
          onClose={() => setSignInModalVisible(false)}
          onGoToSignup={() => {
            setSignInModalVisible(false);
            setSignUpModalVisible(true);
          }}
          onSignIn={handleGoToSaveDesign}
        />
      ) : null}
      {isSaveDesignModalVisible ? (
        <SaveDesignModal
          onClose={() => setSaveDesignModalVisible(false)}
          onSave={handleSaveDesign}
        />
      ) : null}
    </Box>
  );
}
