import { Box, Button, Flex, HStack, Icon } from '@chakra-ui/react';

import { useEffect, useState } from 'react';

import { AiImage } from '@/components/types';

import Colors from '@/theme/colors';

import {
  IconProductPicker,
  IconProductPickerSelected,
  IconTextToImage,
  IconTextToImageSelected,
  IconUploadImage,
  IconUploadImageSelected,
} from './Icons';

import ProductPicker from './product-picker';
import ImageGenerator from './image-generator';
import ImagePicker from './components/ImagePicker';

const { abloBlue } = Colors;

const ToolbarButton = ({ isSelected, ...rest }) => {
  return (
    <Button
      background={isSelected ? '#E2E8F0' : 'transparent'}
      borderRadius="12px"
      height="40px"
      padding="8px"
      width="40px"
      _focus={{
        border: `1px solid ${abloBlue}`,
        boxShadow: '0px 0px 8px 0px #97B9F5',
      }}
      _hover={{
        border: `1px solid ${abloBlue}`,
        boxShadow: '0px 0px 8px 0px #97B9F5',
      }}
      {...rest}
    />
  );
};

const IconDragHandle = ({ rotate }) => (
  <Icon
    position="relative"
    top="5px"
    width="28px"
    height="11px"
    viewBox="0 0 28 11"
    fill="none"
    {...(rotate ? { transform: 'rotate(180deg)' } : {})}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 2L14 9L26 2"
      stroke="#D4D4D3"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

const VIEWS = [
  {
    name: 'productPicker',
    icon: <IconProductPicker />,
    iconActive: <IconProductPickerSelected />,
  },
  {
    name: 'textToImage',
    icon: <IconTextToImage />,
    iconActive: <IconTextToImageSelected />,
  },
  {
    name: 'imageUpload',
    icon: <IconUploadImage />,
    iconActive: <IconUploadImageSelected />,
  },
];

const MIN_OVERLAY_HEIGHT = 80;
const MAX_OVERLAY_HEIGHT = 400;

type FooterToolbarProps = {
  isExpanded: boolean;
  onSetExpanded: (isExpaned: boolean) => void;
  activeObject: { text: string };
  aiImage: AiImage;
  onImageUploaded: (image: File) => void;
  onGeneratedImagePreview: (image: AiImage) => void;
  onGeneratedImageSelected: (image: AiImage) => void;
  onGeneratedImageRemoved: (url: string) => void;
};

export default function FooterToolbar(props: FooterToolbarProps) {
  const {
    aiImage,
    isExpanded,
    onSetExpanded,
    onImageUploaded,
    onGeneratedImagePreview,
    onGeneratedImageSelected,
    onGeneratedImageRemoved,
  } = props;

  // const resizable = document.getElementById('toolbarOverlay');

  const [selectedTool, setSelectedTool] = useState('imageGenerator');
  const [height, setHeight] = useState(MIN_OVERLAY_HEIGHT);

  const [isEditingAiImage, setIsEditingAiImage] = useState(false);

  const isFullScreen = aiImage && !isEditingAiImage;

  const [drag, setDrag] = useState({
    active: false,
  });

  useEffect(() => {
    if (isExpanded && aiImage) {
      setHeight(window.innerHeight);
    } else if (isExpanded || isEditingAiImage) {
      setHeight(MAX_OVERLAY_HEIGHT);
    } else {
      setHeight(MIN_OVERLAY_HEIGHT);
    }
  }, [aiImage, isExpanded, isEditingAiImage]);

  const startResize = () => {
    setDrag({
      active: true,
    });
  };

  const endResize = () => {
    let newHeight =
      document.getElementById('toolbarOverlay')?.clientHeight || 0;

    const containerHeight = window.innerHeight || 0;

    const maxHeight = isFullScreen ? containerHeight : MAX_OVERLAY_HEIGHT;

    if (newHeight > MIN_OVERLAY_HEIGHT + (maxHeight - MIN_OVERLAY_HEIGHT) / 2) {
      newHeight = maxHeight;
    } else {
      newHeight = MIN_OVERLAY_HEIGHT;
    }

    console.log('End resize', containerHeight, MIN_OVERLAY_HEIGHT, newHeight);

    // resizable.style.height = `${newHeight}px`;

    setHeight(newHeight);

    setDrag({
      active: false,
    });
  };

  const resize = (
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.TouchEvent<HTMLDivElement>
  ) => {
    const { active } = drag;

    if (!active) {
      return;
    }

    // const resizable = document.getElementById('toolbarOverlay');

    e.stopPropagation();

    const containerHeight = window.innerHeight || 0;

    let clientY = 0;

    if (e.type === 'touchmove' || e.type === 'touchstart') {
      const { touches, changedTouches } = e as React.TouchEvent;

      const touch = touches[0] || changedTouches[0];

      clientY = touch.pageY;
    } else {
      clientY = (e as React.MouseEvent).clientY;
    }

    let newHeight = containerHeight - clientY;

    const maxHeight = isFullScreen ? containerHeight : MAX_OVERLAY_HEIGHT;

    if (newHeight > maxHeight) {
      newHeight = maxHeight;
    } else if (newHeight < MIN_OVERLAY_HEIGHT) {
      newHeight = MIN_OVERLAY_HEIGHT;
    }

    // resizable.style.height = `${newHeight}px`;

    setHeight(newHeight);
  };

  const handleToolChange = (name) => {
    setSelectedTool(name);

    onSetExpanded(true);
  };

  const { active } = drag;

  const isProductPicker = selectedTool === 'productPicker';

  const isImageGenerator = selectedTool === 'imageGenerator';
  const isImagePicker = selectedTool === 'image';

  const isFullHeight = height >= MAX_OVERLAY_HEIGHT;

  return (
    <Box
      borderRadius="24px 24px 0 0"
      bottom={0}
      id="toolbarOverlay"
      bg="#FFFFFF"
      height={`${height}px`}
      overflow={height === MIN_OVERLAY_HEIGHT ? 'none' : 'auto'}
      position="fixed"
      w="100%"
      zIndex={3}
    >
      <Box
        onMouseDown={startResize}
        onMouseMove={resize}
        onMouseUp={endResize}
        onTouchStart={startResize}
        onTouchMove={resize}
        onTouchEnd={endResize}
      >
        <Flex
          align="center"
          height="20px"
          justify="center"
          style={{
            cursor: active ? 'grabbing' : 'grab',
            touchAction: 'none',
          }}
          padding="8px"
          w="100%"
        >
          <IconDragHandle rotate={!isFullHeight} />
        </Flex>
        <Flex align="center" justify="space-between" padding="10px 14px">
          <HStack spacing="8px">
            {VIEWS.map(({ name, icon, iconActive }) => (
              <ToolbarButton
                isSelected={selectedTool === name}
                key={name}
                onClick={() => handleToolChange(name)}
              >
                {selectedTool === name ? iconActive : icon}
              </ToolbarButton>
            ))}
          </HStack>
        </Flex>
      </Box>
      <Box>
        {isProductPicker ? <ProductPicker /> : null}
        {isImageGenerator ? (
          <ImageGenerator
            aiImage={aiImage}
            isEditingAiImage={isEditingAiImage}
            onGeneratedImagePreview={onGeneratedImagePreview}
            onGeneratedImageSelected={onGeneratedImageSelected}
            onGeneratedImageRemoved={onGeneratedImageRemoved}
            onSetIsEditingAiImage={setIsEditingAiImage}
          />
        ) : null}
        {isImagePicker ? (
          <ImagePicker onImageUploaded={onImageUploaded} />
        ) : null}
      </Box>
    </Box>
  );
}
