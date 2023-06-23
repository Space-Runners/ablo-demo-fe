import {
  Box,
  Button as ChakraButton,
  Flex,
  HStack,
  Input,
  Text,
} from '@chakra-ui/react';

import IconTrash from '@/components/icons/IconTrash';

import {
  IconAiGenerator,
  IconTextEditor,
  IconImage,
  IconExpand,
  IconShrink,
  IconColorPicker,
} from './Icons';

import { useState, Fragment as F } from 'react';
import { chunk } from 'lodash';

import ProductColors from '@/data/product-colors';

import TextToolbar from './text-toolbar';
import ImageGenerator from './components/ImageGenerator';
import ImagePicker from './components/ImagePicker';

const TOOLS = [
  {
    name: 'imageGenerator',
    icon: <IconAiGenerator />,
  },
  {
    name: 'text',
    icon: <IconTextEditor />,
  },
  {
    name: 'image',
    icon: <IconImage />,
  },
];

const Button = (props) => (
  <ChakraButton
    color="#FFFFFF"
    fontSize="sm"
    minWidth="auto"
    padding="0 8px"
    variant="ghost"
    _hover={{ bg: '' }}
    _active={{
      bg: '',
    }}
    _focus={{
      bg: '',
      boxShadow: '',
    }}
    {...props}
  />
);

const TextControls = ({ onAddText, onRemoveText }) => (
  <HStack mb="17px" mt="30px" spacing="14px">
    <Button
      border="1px solid #FFFFFF"
      borderRadius="112px"
      fontWeight={600}
      fontSize="sm"
      color="#FFFFFF"
      height="40px"
      leftIcon={<IconTrash />}
      onClick={onRemoveText}
      padding="8px 32px"
    >
      Remove Text
    </Button>
    <Button
      background="#ffffff"
      color="#212121"
      onClick={onAddText}
      padding="8px 32px"
    >
      Add New Text
    </Button>
  </HStack>
);

const ColorPicker = ({ selectedColor, onSelectedColor }) => {
  const chunks = chunk(ProductColors, 5);

  return (
    <Box padding="10px 24px 45px 27px">
      <Text color="#ffffff" fontSize="md" textAlign="center">
        Select the product color
      </Text>
      {chunks.map((chunk, index) => (
        <Flex align="center" key={index} mt="24px">
          {chunk.map(({ name, value }, index) => {
            const isSelected = name === selectedColor;

            const size = `${isSelected ? 50 : 35}px`;

            const marginLeft = isSelected ? '22px' : '29px';
            const marginRight = isSelected ? '-7px' : 0;

            return (
              <Button
                bg={value}
                height={size}
                key={name}
                padding="0"
                width={size}
                borderRadius="50%"
                marginLeft={
                  index === 0 ? (isSelected ? '-7px' : 0) : marginLeft
                }
                marginRight={marginRight}
                onClick={() => onSelectedColor(name)}
              />
            );
          })}
        </Flex>
      ))}
    </Box>
  );
};

export default function FooterToolbar(props) {
  const {
    onAddText,
    onRemoveText,
    onUpdateTextObject,
    activeTextObject,
    selectedColor,
    onSelectedColor,
    onImageUploaded,
    onImageGenerated,
  } = props;

  const { text = '' } = activeTextObject || {};

  const [isExpanded, setExpanded] = useState(true);
  const [selectedTool, setSelectedTool] = useState('imageGenerator');

  const handleToolChange = (name) => {
    setSelectedTool(name);

    setExpanded(true);
  };

  const handleTextUpdate = (text) => {
    if (!activeTextObject) {
      onAddText({ text });

      return;
    }

    onUpdateTextObject({ text });
  };

  const isImageGenerator = selectedTool === 'imageGenerator';
  const isTextEditor = selectedTool === 'text';
  const isProductVariantPicker = selectedTool === 'productVariant';
  const isImagePicker = selectedTool === 'image';

  return (
    <Box bottom={0} position="fixed" w="100%" zIndex={2}>
      {isTextEditor ? (
        <TextToolbar
          onUpdate={onUpdateTextObject}
          textObject={activeTextObject}
        />
      ) : null}
      <Box
        background="#000000"
        boxShadow="0px -1px 1px #626262"
        padding="11px 20px 13px 17px"
      >
        <Flex justify="space-between">
          {isTextEditor ? (
            <Input
              border="none"
              color="#FFFFFF"
              onChange={(e) => handleTextUpdate(e.target.value)}
              placeholder="Write your text here"
              value={text}
              _focus={{
                border: 'none',
              }}
            />
          ) : (
            <Button opacity={0.7}>Generate your design with AI</Button>
          )}
          <Button onClick={() => setExpanded(!isExpanded)} opacity={0.7}>
            {isExpanded ? <IconShrink /> : <IconExpand />}
          </Button>
        </Flex>
        <Flex align="center" justify="space-between" mt="10px">
          <HStack spacing="8px">
            {TOOLS.map(({ name, icon }) => (
              <Button
                key={name}
                onClick={() => handleToolChange(name)}
                opacity={name === selectedTool ? 1 : 0.3}
              >
                {icon}
              </Button>
            ))}
          </HStack>
          <Button onClick={() => handleToolChange('productVariant')}>
            <IconColorPicker isSelected={isProductVariantPicker} />
          </Button>
        </Flex>
        {isExpanded ? (
          <F>
            {isTextEditor ? (
              <TextControls
                onAddText={() => onAddText()}
                onRemoveText={onRemoveText}
              />
            ) : null}
            {isProductVariantPicker ? (
              <ColorPicker
                selectedColor={selectedColor}
                onSelectedColor={onSelectedColor}
              />
            ) : null}
            {isImagePicker ? (
              <ImagePicker onImageUploaded={onImageUploaded} />
            ) : null}
            {isImageGenerator ? (
              <ImageGenerator onImageGenerated={onImageGenerated} />
            ) : null}
          </F>
        ) : null}
      </Box>
    </Box>
  );
}
