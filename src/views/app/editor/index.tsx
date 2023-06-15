import { useEffect, useRef, useState } from 'react';

import { Button, Flex } from '@chakra-ui/react';

import { fabric } from 'fabric';

import TShirt from './icons/TShirt';

import Hoodie_Front from './Hoodie_Front.png';

import './ImageEditor.css';

const MOCK_IMAGE = 'https://d3bezdph00y8ns.cloudfront.net/1/1686736472517.png';

export default function ImageGenerator() {
  const [params, setParams] = useState({});

  const canvas = useRef(null);

  useEffect(() => {
    canvas.current = initCanvas();

    console.log('Use effect');

    canvas.current.on('mouse:over', () => {
      console.log('hello');
    });

    // destroy fabric on unmount
    return () => {
      canvas.current.dispose();
      canvas.current = null;
    };
  }, []);

  const updateImage = (imageURL) => {
    // If the user doesn't pick an option of the select, clear the canvas

    canvas.current.clear();

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
      width: 200,
      height: 241,
      selection: false,
      renderOnAddRemove: true,
    });

  return (
    <Flex align="center" className="image-editor" justify="center" w="100%">
      <div className="image-container">
        <img id="tshirt-backgroundpicture" src={Hoodie_Front} width={400} />
        <div id="drawingArea" className="drawing-area">
          <div className="canvas-container">
            <canvas id="canvas" ref={canvas} width="200" height="400"></canvas>
          </div>
        </div>
      </div>
      <Button onClick={() => updateImage(MOCK_IMAGE)}>Add image</Button>
    </Flex>
  );
}
