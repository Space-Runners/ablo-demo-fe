import { Box, Button, Flex, Hide, HStack, Icon } from '@chakra-ui/react';

import { ReactNode, useEffect, useState } from 'react';

import { AiImage } from '../../types';

import { IconFontToImage, IconImageToImage, IconTextToImage, IconUploadImage } from './Icons';
import ToolType from './ToolTypes';

const ToolbarButton = ({ isSelected, ...rest }) => {
  return (
    <Button
      background={isSelected ? '#E2E8F0' : 'transparent'}
      borderRadius="12px"
      height="40px"
      padding="8px"
      width="40px"
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
    name: ToolType.TEXT_TO_IMAGE,
    icon: <IconTextToImage />,
    iconActive: <IconTextToImage isSelected />,
  },
  {
    name: ToolType.FONT_TO_IMAGE,
    icon: <IconFontToImage />,
    iconActive: <IconFontToImage isSelected />,
  },
  {
    name: ToolType.IMAGE_TO_IMAGE,
    icon: <IconImageToImage />,
    iconActive: <IconImageToImage isSelected />,
  },
  {
    name: ToolType.IMAGE_UPLOAD,
    icon: <IconUploadImage />,
    iconActive: <IconUploadImage isSelected />,
  },
];

const MIN_OVERLAY_HEIGHT = 80;
const MAX_OVERLAY_HEIGHT = 400;
const MAX_OVERLAY_HEIGHT_ONE_TOOL = 336;
const MAX_OVERLAY_HEIGHT_ONE_STYLE = 282;

type FooterToolbarProps = {
  isExpanded: boolean;
  onSetExpanded: (isExpaned: boolean) => void;
  onGeneratedImageSelected: (image: AiImage) => void;
  selectedTool: ToolType;
  onSelectedTool: (tool: ToolType) => void;
  children: ReactNode;
  hideStyles: boolean;
  maxHeight?: number;
  hideButtons?: boolean;
  availableTools?: ToolType[];
};

export default function EditorToolbar(props: FooterToolbarProps) {
  const {
    children,
    hideStyles,
    isExpanded,
    onSetExpanded,
    onSelectedTool,
    selectedTool,
    maxHeight,
    hideButtons,
    availableTools,
  } = props;

  const [height, setHeight] = useState(MIN_OVERLAY_HEIGHT);

  const [drag, setDrag] = useState({
    active: false,
  });

  let maxOverlayHeight = hideStyles ? MAX_OVERLAY_HEIGHT_ONE_STYLE : MAX_OVERLAY_HEIGHT;

  if (maxHeight) {
    maxOverlayHeight = maxHeight;
  } else if (availableTools?.length === 1) {
    maxOverlayHeight = MAX_OVERLAY_HEIGHT_ONE_TOOL;
  }

  useEffect(() => {
    if (isExpanded) {
      setHeight(maxOverlayHeight);
    } else {
      setHeight(MIN_OVERLAY_HEIGHT);
    }
  }, [isExpanded, selectedTool, maxOverlayHeight]);

  const startResize = () => {
    setDrag({
      active: true,
    });
  };

  const endResize = () => {
    let newHeight = document.getElementById('toolbarOverlay')?.clientHeight || 0;

    if (newHeight > MIN_OVERLAY_HEIGHT + (maxOverlayHeight - MIN_OVERLAY_HEIGHT) / 2) {
      newHeight = maxOverlayHeight;

      onSetExpanded(true);
    } else {
      newHeight = MIN_OVERLAY_HEIGHT;

      onSetExpanded(false);
    }

    setHeight(newHeight);

    setDrag({
      active: false,
    });
  };

  const resize = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>
  ) => {
    const { active } = drag;

    if (!active) {
      return;
    }

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

    if (newHeight > maxOverlayHeight) {
      newHeight = maxOverlayHeight;
    } else if (newHeight < MIN_OVERLAY_HEIGHT) {
      newHeight = MIN_OVERLAY_HEIGHT;
    }

    setHeight(newHeight);
  };

  const handleToolChange = (name) => {
    onSelectedTool(name);

    onSetExpanded(true);
  };

  const { active } = drag;

  const isFullHeight = height >= maxOverlayHeight;

  const views = availableTools ? VIEWS.filter(({ name }) => availableTools.includes(name)) : VIEWS;

  return (
    <Box
      borderRadius={{ base: '24px 24px 0 0', md: 0 }}
      bottom={0}
      id="toolbarOverlay"
      bg="#FFFFFF"
      h={{ base: `${height}px`, md: '100%' }}
      overflow={{
        base: height === MIN_OVERLAY_HEIGHT ? 'none' : 'auto',
        md: 'auto',
      }}
      pb={{ base: 0, md: '14px' }}
      position={{ base: 'fixed', md: 'relative' }}
      w={{ base: '100%', md: '393px' }}
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
        <Hide above="md">
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
        </Hide>
        {!hideButtons ? (
          <Flex align="center" justify="space-between" padding="10px 14px">
            <HStack spacing="8px">
              {views.map(({ name, icon, iconActive }) => (
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
        ) : null}
      </Box>
      {children}
    </Box>
  );
}
