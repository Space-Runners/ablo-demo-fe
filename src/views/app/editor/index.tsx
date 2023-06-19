import { useEffect, useRef, useState } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import { Box, Flex, VStack } from '@chakra-ui/react';

import { fabric } from 'fabric';
import { isEmpty } from 'lodash';

import Navbar from '@/components/navbar/Navbar';
import PRODUCTS from '@/data/products';

import { UndoButton, RedoButton } from './controls/UndoRedoButtons';
import ButtonDelete from './controls/ButtonDelete';

import Toolbar from './controls/Toolbar';
import FooterToolbar from './toolbar';

import './ImageEditor.css';

export default function ImageEditor() {
  const canvas = useRef(null);
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);
  const state = useRef<string>('');

  const history = useHistory();

  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);

  const productName = searchParams.get('productName');

  const [isDrawingAreaVisible, setDrawingAreaVisible] = useState(true);

  const [selectedProduct] = useState(
    (productName && PRODUCTS.find((product) => product.name === productName)) ||
      PRODUCTS[0]
  );
  const [selectedVariant, setSelectedVariant] = useState(
    PRODUCTS[0].variants[0].name
  );

  const [orientation, setOrientation] = useState('FRONT');

  const [activeTextObject, setActiveTextObject] = useState(null);

  useEffect(() => {
    canvas.current = initCanvas();

    canvas.current.on('object:modified', () => {
      console.log('Object modified');
      saveState();
    });

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

  const initCanvas = () =>
    new fabric.Canvas('canvas', {
      width: 160,
      height: 160,
      selection: false,
      renderOnAddRemove: true,
    });

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
      };
    };
    reader.readAsDataURL(fileObj);
  };

  const handleImageGenerated = (imageUrl) => {
    fabric.Image.fromURL(imageUrl, (img) => {
      img.scaleToWidth(200);

      canvas.current.add(img).setActiveObject(img).renderAll();
    });
  };

  const handleSelectedVariant = (name) => {
    console.log('Name', name);
    const { variants } = selectedProduct;

    const variant = variants.find((variant) => variant.name === name).name;

    setSelectedVariant(variant);
  };

  const handleSignUp = () => {
    history.push(`/signup?returnTo=${window.location.pathname}`);
  };

  const { urlPrefix } = selectedProduct;

  console.log('Orientation', orientation);

  const variantImageUrl = `${urlPrefix}_${selectedVariant}_${orientation}.png`;

  return (
    <Box h="100%" w="100%">
      <Navbar
        action="Create your design"
        onNext={() => null}
        onSignUp={handleSignUp}
        title="Design generation"
      />
      <Flex
        align="center"
        bg="#292929"
        flexDirection="column"
        position="relative"
        w="100%"
      >
        <Toolbar
          isDrawingAreaVisible={isDrawingAreaVisible}
          onSettingsClick={() => history.push('/app/products')}
          onToggleDrawingArea={() =>
            setDrawingAreaVisible(!isDrawingAreaVisible)
          }
          onToggleOrientation={() =>
            setOrientation(orientation === 'FRONT' ? 'BACK' : 'FRONT')
          }
        />
        <Box position="relative">
          <img src={variantImageUrl} width={300} />
          <Box
            border={isDrawingAreaVisible ? '2px dashed #a8a8a8' : ''}
            borderRadius="4px"
            left="67px"
            position="absolute"
            top="120px"
            id="drawingArea"
            zIndex={10}
            className="drawing-area"
          >
            <div className="canvas-container">
              <canvas id="canvas" ref={canvas}></canvas>
            </div>
          </Box>
        </Box>
        <VStack position="absolute" right="12px" top="45%" spacing="20px">
          <UndoButton disabled={isEmpty(undoStack)} onClick={handleUndo} />
          <RedoButton
            disabled={isEmpty(redoStack)}
            onClick={handleRedo}
          ></RedoButton>
        </VStack>
        <ButtonDelete mt="12px" onClick={handleRemoveActiveObject} w="122px" />
        <FooterToolbar
          onAddText={handleAddText}
          onRemoveText={handleRemoveText}
          onUpdateTextObject={handleUpdateTextObject}
          activeTextObject={activeTextObject}
          selectedColor={selectedVariant}
          onSelectedColor={handleSelectedVariant}
          onImageUploaded={handleImageUpload}
          onImageGenerated={handleImageGenerated}
        />
      </Flex>
    </Box>
  );
}
