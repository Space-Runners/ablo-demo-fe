import { useEffect, useRef, useState } from 'react';

import { Button, Flex, HStack, Spacer } from '@chakra-ui/react';

import { fabric } from 'fabric';
import { isEmpty } from 'lodash';

import GarmentPicker from './components/GarmentPicker';

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

  const [garment, setGarment] = useState(GARMENTS[0]);

  useEffect(() => {
    canvas.current = initCanvas();

    canvas.current.on('mouse:over', () => {
      console.log('hello');
    });

    canvas.current.on(
      'object:modified',
      () => {
        console.log('Object modified');
        saveState();
      },
      'object:added',
      () => {
        console.log('Object added');
        saveState();
      }
    );

    // destroy fabric on unmount
    return () => {
      canvas.current.dispose();
      canvas.current = null;
    };
  }, []);

  const saveState = () => {
    // Clear redo stack
    setRedoStack([]);

    // initial call won't have a state
    if (state.current) {
      setUndoStack([...undoStack, state.current]);
    }
    state.current = JSON.stringify(canvas.current);
  };

  /*  const replay = (playStack, saveStack, buttonsOn, buttonsOff) => {
    
    
    saveStack.push(state);
    state = playStack.pop();
    var on = $(buttonsOn);
    var off = $(buttonsOff);
    // turn both buttons off for the moment to prevent rapid clicking
    on.prop('disabled', true);
    off.prop('disabled', true);
    canvas.clear();
    canvas.loadFromJSON(state, function() {
      canvas.renderAll();
      // now turn the buttons back on if applicable
      on.prop('disabled', false);
      if (playStack.length) {
        off.prop('disabled', false);
      }
    }); */

  const handleUndo = () => {
    state.current = undoStack.pop();

    setUndoStack(undoStack);
    setRedoStack([...redoStack, state.current]);

    reloadCanvasFromState();
  };

  const handleRedo = () => {
    state.current = redoStack.pop();

    setRedoStack(redoStack);
    setUndoStack([...undoStack, state.current]);

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
    });
  };

  const initCanvas = () =>
    new fabric.Canvas('canvas', {
      width: 150,
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
  };

  return (
    <Flex
      align="center"
      className="image-editor"
      flexDirection="column"
      justify="center"
      pt="13px"
      w="100%"
    >
      <GarmentPicker
        garments={GARMENTS}
        onSelectedGarment={setGarment}
        selectedGarment={garment}
      />
      <div className="image-container">
        <img id="tshirt-backgroundpicture" src={garment.image} width={300} />
        <div id="drawingArea" className="drawing-area">
          <div className="canvas-container">
            <canvas id="canvas" ref={canvas}></canvas>
          </div>
        </div>
      </div>
      <HStack spacing={2}>
        <Button onClick={() => updateImage(MOCK_IMAGE)}>Add image</Button>
        <Button onClick={() => handleAddText()}>Add text</Button>
        <Button disabled={isEmpty(undoStack)} onClick={() => handleUndo()}>
          Undo
        </Button>
        <Button disabled={isEmpty(redoStack)} onClick={() => handleRedo()}>
          Redo
        </Button>
      </HStack>
    </Flex>
  );
}
