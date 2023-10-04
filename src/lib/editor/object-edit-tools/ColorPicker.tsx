import { Button as ChakraButton, HStack } from '@chakra-ui/react';

import IconColorPicker from '../../components/icons/IconColorPicker';
import { AiImage } from '../../types';
import Colors from '../../theme/colors';
import { useState } from 'react';
import ColorPickerModal from '../../components/modals/ColorPickerModal';

const { abloBlue } = Colors;

const COLORS_FOR_STYLES = {
  Basic: ['#FFFFFF', '#050606', '#EA2824', '#019548', '#4063AE', '#FDDE0A', '#8399AA'],
  Botanical: ['#FFFFFF', '#050606', '#553B28', '#616100', '#415561', '#E6DFCA', '#DAC190'],
  Collage: ['#FFFFFF', '#050606', '#EA2824', '#019548', '#4063AE', '#FDDE0A', '#68AFBC'],
  Graffiti: ['#FFFFFF', '#050606', '#FF0080', '#87009B', '#4FD0F0', '#EBFF00', '#6C84A8'],
  Kidult: ['#FFFFFF', '#050606', '#E440FB', '#00F000', '#0099E7', '#F3F300', '#FF7000'],
  'Line Art': ['#FFFFFF', '#050606', '#FF1C1A', '#00C900', '#0099E7', '#BCBCBC', '#666666'],
  'Mixed Media': ['#FFFFFF', '#050606', '#FF95D9', '#00C770', '#3D6B9E', '#EDE838', '#8399AA'],
  Origami: ['#FFFFFF', '#050606', '#FF3900', '#00E8CB', '#005EAA', '#FFD900', '#99928A'],
  'Pop Stained Glass': [
    '#FFFFFF',
    '#050606',
    '#FF0080',
    '#8D055A',
    '#0072F7',
    '#FDDE0A',
    '#05D3AB',
  ],
  Deco: ['#FFFFFF', '#050606', '#FF006A', '#00A064', '#2259B2', '#FF9F1D', '#C9C3CE'],
  'Vintage Poster': ['#FFFFFF', '#050606', '#D22700', '#366140', '#107988', '#DAC190', '#776655'],
};

const Button = ({ isSelected = false, ...rest }) => {
  const size = 25;

  return (
    <ChakraButton
      border={isSelected ? `4px solid ${abloBlue}` : 'none'}
      minWidth={`${size}px`}
      padding={0}
      width={`${size}px`}
      height={`${size}px`}
      borderRadius="50%"
      {...rest}
    />
  );
};

type ColorPickerProps = {
  aiImage: AiImage;
  selectedColor: string;
  onUpdateColor: (color: string) => void;
  selectedOpacity: number;
  onUpdateOpacity: (opacity: number) => void;
};

export default function ColorPicker({
  aiImage,
  selectedColor,
  onUpdateColor,
  selectedOpacity,
  onUpdateOpacity,
}: ColorPickerProps) {
  const style = aiImage && aiImage.options.style;

  const [isColorPickerModalVisible, setColorPickerModalVisible] = useState(false);

  const colorsForStyle = COLORS_FOR_STYLES[style] || COLORS_FOR_STYLES.Basic;

  return (
    <HStack mt="8px" overflow="auto" spacing="10px">
      {colorsForStyle.map((color) => (
        <Button
          bg={color}
          border={
            color === selectedColor
              ? `1px solid ${abloBlue}`
              : color === '#FFFFFF'
              ? '1px solid #EAE9E9'
              : 'none'
          }
          isSelected={color === selectedColor}
          key={color}
          onClick={() => onUpdateColor(color)}
        />
      ))}
      <Button onClick={() => setColorPickerModalVisible(true)}>
        <IconColorPicker />
      </Button>
      {isColorPickerModalVisible ? (
        <ColorPickerModal
          onClose={() => setColorPickerModalVisible(false)}
          onSelectedColor={(color) => {
            onUpdateColor(color);
          }}
          selectedColor={selectedColor}
          selectedOpacity={selectedOpacity}
          onSelectedOpacity={onUpdateOpacity}
        />
      ) : null}
    </HStack>
  );
}
