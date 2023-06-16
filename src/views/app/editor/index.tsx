import { useEffect, useRef, useState } from 'react';

import { Box, Button, Flex, HStack, Spacer } from '@chakra-ui/react';

import { fabric } from 'fabric';
import { isEmpty } from 'lodash';

import { UndoButton, RedoButton } from './toolbar/UndoRedoButtons';
import ButtonDelete from './toolbar/ButtonDelete';

import Toolbar from './toolbar/Toolbar';
import FooterToolbar from './footer-toolbar';

import Hoodie_Back from './Hoodie_Back.png';
import Hoodie_Front from './Hoodie_Front.png';

import './ImageEditor.css';

const GARMENTS = [
  { name: 'Front', image: Hoodie_Front },
  { name: 'Back', image: Hoodie_Back },
  { name: 'Left' },
  { name: 'Right' },
];

const MOCK_IMAGE = 'https://d3bezdph00y8ns.cloudfront.net/1/1686736472517.png';

export default function ImageGenerator() {
  const canvas = useRef(null);
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);
  const state = useRef<string>('');

  const [isDrawingAreaVisible, setDrawingAreaVisible] = useState(true);

  const [garment, setGarment] = useState(GARMENTS[0]);

  useEffect(() => {
    canvas.current = initCanvas();

    console.log('Use effect');

    canvas.current.on('object:modified', () => {
      console.log('Object modified');
      saveState();
    });

    state.current = JSON.stringify(canvas.current);

    // destroy fabric on unmount
    return () => {
      canvas.current.dispose();
      canvas.current = null;
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

  const updateImage = (imageURL) => {
    // Create a new image that can be used in Fabric with the URL
    fabric.Image.fromURL(imageURL, function (img) {
      console.log(canvas.current);

      img.scaleToHeight(241);
      img.scaleToWidth(200);

      canvas.current.centerObject(img);
      canvas.current.add(img);
      canvas.current.renderAll();

      saveState();
    });
  };

  const initCanvas = () =>
    new fabric.Canvas('canvas', {
      width: 120,
      height: 120,
      selection: false,
      renderOnAddRemove: true,
    });

  const handleAddText = () => {
    const text = new fabric.Text('This is cool', {
      fill: 'white',
      fontSize: 22,
    });

    // Render the Text on Canvas
    canvas.current.add(text);

    saveState();
  };

  return (
    <Flex
      align="center"
      bg="#292929"
      flexDirection="column"
      h="100%"
      position="relative"
      pt="13px"
      w="100%"
    >
      <Toolbar
        isDrawingAreaVisible={isDrawingAreaVisible}
        onSettingsClick={() => null}
        onToggleDrawingArea={() => setDrawingAreaVisible(!isDrawingAreaVisible)}
      />
      <Box position="relative">
        <img src={garment.image} width={250} />
        <Box
          border={isDrawingAreaVisible ? '2px dashed #a8a8a8' : ''}
          id="drawingArea"
          className="drawing-area"
        >
          <div className="canvas-container">
            <canvas id="canvas" ref={canvas}></canvas>
          </div>
        </Box>
      </Box>
      <HStack mt="20px" spacing="20px">
        <UndoButton
          disabled={isEmpty(undoStack)}
          onClick={() => handleUndo()}
        />
        <RedoButton
          disabled={isEmpty(redoStack)}
          onClick={() => handleRedo()}
        ></RedoButton>
      </HStack>
      <ButtonDelete bottom="142px" position="absolute" />
      <FooterToolbar />
      {/* <HStack spacing={2}>
        <Button onClick={() => updateImage(MOCK_IMAGE)}>Add image</Button>
        <Button onClick={() => handleAddText()}>Add text</Button>
      </HStack> */}
    </Flex>
  );
}
