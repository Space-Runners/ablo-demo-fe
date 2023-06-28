import { useEffect, useRef, useState } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import { Box, Flex, Text } from '@chakra-ui/react';

import { fabric } from 'fabric';
import { isEmpty } from 'lodash';
import { toPng } from 'html-to-image';

import Navbar from '@/components/navbar/Navbar';
import PRODUCTS from '@/data/products';

import SignUpModal from '@/views/auth/SignUpModal';

import ButtonDelete from './controls/ButtonDelete';
import Toolbar from './controls/Toolbar';
import IconEmptyState from './icons/EmptyState';
import FooterToolbar from './toolbar';

import './ImageEditor.css';

const DARK_VARIANTS = ['Onyx', 'Oceana'];

export default function ImageEditor() {
  const canvas = useRef(null);
  const clothingAndCanvasRef = useRef(null);

  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);

  const [isSignUpModalVisible, setSignUpModalVisible] = useState([]);

  const state = useRef<string>('');

  const history = useHistory();

  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);

  const productName = searchParams.get('productName');

  const [isDrawingAreaVisible, setDrawingAreaVisible] = useState(true);
  const [isFooterToolbarExpanded, setFooterToolbarExpanded] = useState(false);
  const [hasSeenInitialCallToAction, setHasSeenInitialCallToAction] =
    useState(false);

  const [selectedProduct] = useState(
    (productName &&
      PRODUCTS.find(
        (product) => `${product.fit} ${product.name}` === productName
      )) ||
      PRODUCTS[0]
  );

  const [selectedVariant, setSelectedVariant] = useState(
    PRODUCTS[0].variants[0].name
  );

  const defaultSide = 'Front';

  const [selectedSide, setSelectedSide] = useState(defaultSide);

  const { printableAreas } = selectedProduct;

  const drawingArea = printableAreas[selectedSide.toLowerCase()];

  const [activeTextObject, setActiveTextObject] = useState(null);

  useEffect(() => {
    canvas.current = initCanvas();

    canvas.current.on('object:modified', () => {
      console.log('Object modified');
      saveState();
    });

    setSelectedVariant(PRODUCTS[0].variants[0].name);

    state.current = JSON.stringify(canvas.current);

    // destroy fabric on unmount
    return () => {
      if (canvas.current) {
        canvas.current.dispose();
        canvas.current = null;
      }
    };
  }, []);

  const saveState = () => {
    // Clear redo stack
    setRedoStack([]);

    console.log('Current', state.current);

    // initial call won't have a state
    if (state.current) {
      setUndoStack([...undoStack, state.current]);
    }

    state.current = JSON.stringify(canvas.current);
  };

  const handleUndo = () => {
    setRedoStack([...redoStack, state.current]);

    state.current = undoStack.pop();

    console.log('STate current', state.current);

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
    // canvas.current.setActiveObject(text);

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

        img.crossOrigin = 'anonymous';
        canvas.current.add(img).setActiveObject(img).renderAll();
      },
      { crossOrigin: 'anonymous' }
    );
  };

  const handleSelectedVariant = (name) => {
    console.log('Name', name);
    const { variants } = selectedProduct;

    const variant = variants.find((variant) => variant.name === name).name;

    setSelectedVariant(variant);
  };

  const handleSelectedSide = (side: string) => {
    setSelectedSide(side);

    const drawingArea = printableAreas[side.toLowerCase()];

    console.log('SS side', side, drawingArea);

    canvas.current.setDimensions({
      width: drawingArea.width,
      height: drawingArea.height,
    });
  };

  const handleSignUp = () => {
    history.push(`/signup?returnTo=${window.location.pathname}`);
  };

  const handleSaveImage = () => {
    toPng(clothingAndCanvasRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'my-image-name.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { urlPrefix } = selectedProduct;

  const variantImageUrl = `${urlPrefix}_${selectedVariant}_${selectedSide.toUpperCase()}.png?timestamp=${Date.now()}`;

  return (
    <Box h="100%" w="100%">
      <Navbar
        onNext={() => handleSaveImage()}
        onSignUp={handleSignUp}
        step={2}
        title="Create your design"
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
            {!hasSeenInitialCallToAction && (
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
        <ButtonDelete mt="12px" onClick={handleRemoveActiveObject} w="122px" />
        <FooterToolbar
          isExpanded={isFooterToolbarExpanded}
          onAddText={handleAddText}
          onRemoveText={handleRemoveText}
          onUpdateTextObject={handleUpdateTextObject}
          onSetExpanded={setFooterToolbarExpanded}
          activeTextObject={activeTextObject}
          selectedColor={selectedVariant}
          onSelectedColor={handleSelectedVariant}
          onImageUploaded={handleImageUpload}
          onImageGenerated={handleImageGenerated}
        />
      </Flex>
      {/* {isSignUpModalVisible ? (
        <SignUpModal
          onClose={() => setSignUpModalVisible(!isSignUpModalVisible)}
        />
      ) : null} */}
    </Box>
  );
}
