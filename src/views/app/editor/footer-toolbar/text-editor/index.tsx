import {
  Box,
  Button as ChakraButton,
  Flex,
  HStack,
  Text,
} from '@chakra-ui/react';

import {
  IconFontFamily,
  IconColor,
  IconTextLeftAlign,
  IconTextCenter,
  IconTextRightAlign,
} from './Icons';
import { useState } from 'react';

import Dropdown from './Dropdown';
import Fonts from './fonts';

type Props = {
  isDrawingAreaVisible;
  onToggleDrawingArea: () => void;
  onSettingsClick: () => void;
};

const TEXT_ALIGN_OPTIONS = [
  { name: 'left', icon: <IconTextLeftAlign /> },
  { name: 'center', icon: <IconTextCenter /> },
  { name: 'right', icon: <IconTextRightAlign /> },
];

const Button = (props) => {
  const { isSelected, ...rest } = props;

  return (
    <ChakraButton
      bg="#FFFFFF"
      borderRadius="5px"
      fontSize="sm"
      // width="39px"
      height="46px"
      opacity={isSelected ? 1 : 0.3}
      variant="ghost"
      _hover={{ bg: '' }}
      _active={{
        bg: '',
      }}
      _focus={{
        bg: '',
        boxShadow: '',
      }}
      {...rest}
    />
  );
};

export default function TextEditor() {
  const [isExpanded, setExpanded] = useState(false);
  const [isColorPickerOpen, setColorPickerOpen] = useState(false);
  const [isTextEditorOpen, setTextEditorOpen] = useState(false);

  const [selectedFontFamily, setSelectedFontFamily] = useState('Arial');
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [selectedTextAlign, setSelectedTextAlign] = useState('left');

  return (
    <Box bg="#292929" padding="30px 15px" w="100%">
      <Flex>
        <Dropdown
          icon={<IconFontFamily />}
          name="Font"
          onSelectedOption={setSelectedFontFamily}
          options={Fonts}
          selectedOption={selectedFontFamily}
        />
      </Flex>
      <Flex mt="24px">
        <Dropdown
          icon={<IconColor />}
          name="Color"
          onSelectedOption={setSelectedColor}
          options={Fonts}
          selectedOption={selectedColor}
        />
        <Flex ml="16px" w="calc(100% - 229px)">
          {TEXT_ALIGN_OPTIONS.map(({ name, icon }, index) => (
            <Button
              flex={1}
              isSelected={name === selectedTextAlign}
              ml={index === 0 ? 0 : '8px'}
              onClick={() => setSelectedTextAlign(name)}
            >
              {icon}
            </Button>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
}
