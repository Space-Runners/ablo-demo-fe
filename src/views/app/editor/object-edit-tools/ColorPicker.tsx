import { Button as ChakraButton, HStack } from '@chakra-ui/react';

import IconColorPicker from '@/components/icons/IconColorPicker';
import ColorPickerModal from '@/components/ColorPickerModal';
import { AiImage } from '@/components/types';
import Colors from '@/theme/colors';
import { useState } from 'react';

const { abloBlue } = Colors;

const COLORS_FOR_STYLES = {
  basic: ['#FFFFFF', '#050606', '#EA2824', '#019548', '#4063AE', '#FDDE0A', '#8399AA'],
  botanical: ['#FFFFFF', '#050606', '#553B28', '#616100', '#415561', '#E6DFCA', '#DAC190'],
  collage: ['#FFFFFF', '#050606', '#EA2824', '#019548', '#4063AE', '#FDDE0A', '#68AFBC'],
  graffiti: ['#FFFFFF', '#050606', '#FF0080', '#87009B', '#4FD0F0', '#EBFF00', '#6C84A8'],
  kidult: ['#FFFFFF', '#050606', '#E440FB', '#00F000', '#0099E7', '#F3F300', '#FF7000'],
  line_art: ['#FFFFFF', '#050606', '#FF1C1A', '#00C900', '#0099E7', '#BCBCBC', '#666666'],
  mixed_media: ['#FFFFFF', '#050606', '#FF95D9', '#00C770', '#3D6B9E', '#EDE838', '#8399AA'],
  origami: ['#FFFFFF', '#050606', '#FF3900', '#00E8CB', '#005EAA', '#FFD900', '#99928A'],
  pop_stained_glass: ['#FFFFFF', '#050606', '#FF0080', '#8D055A', '#0072F7', '#FDDE0A', '#05D3AB'],
  deco: ['#FFFFFF', '#050606', '#FF006A', '#00A064', '#2259B2', '#FF9F1D', '#C9C3CE'],
  vintage_poster: ['#FFFFFF', '#050606', '#D22700', '#366140', '#107988', '#DAC190', '#776655'],
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
  const style = aiImage ? aiImage.options.style : 'basic';

  const [isColorPickerModalVisible, setColorPickerModalVisible] = useState(false);

  return (
    <HStack mt="8px" overflow="auto" spacing="10px">
      {COLORS_FOR_STYLES[style].map((color) => (
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
