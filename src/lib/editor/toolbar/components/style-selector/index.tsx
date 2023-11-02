import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';

import { useRef } from 'react';

import { Style } from '../../../../types';

import SelectStyle from './select-style';
import SelectColorPalette from './select-color-palette';

const accordionButtonStyles = {
  borderRadius: 0,
  color: 'black.200',
  padding: '12px 14px',
  _focus: {
    boxShadow: 'none',
  },
};

type StyleSelectorProps = {
  styles: Style[];
  selectedStyle: string;
  onSelectedStyle: (styleId: string) => void;
  onSelectedColorPalette: (toneId: string) => void;
  selectedColorPalette: string;
  hideColorPalettes?: boolean;
};

export default function StyleSelector({
  styles,
  selectedStyle,
  onSelectedStyle,
  selectedColorPalette,
  onSelectedColorPalette,
  hideColorPalettes,
}: StyleSelectorProps) {
  const tonesRef = useRef(null);

  const style = styles.find(({ id }) => id === selectedStyle);

  return (
    <Accordion defaultIndex={[0, 1]} allowMultiple>
      <AccordionItem
        borderBottomWidth={0}
        borderColor={hideColorPalettes ? 'transparent' : 'black.600'}
        borderTopWidth={0}
        paddingBottom="8px"
      >
        <h2>
          <AccordionButton {...accordionButtonStyles}>
            <Box as="span" flex="1" fontSize="sm" textAlign="left">
              Style
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <SelectStyle
            onChange={(styleId) => {
              tonesRef.current?.scrollIntoView({ behavior: 'smooth' });

              onSelectedStyle(styleId);
            }}
            options={styles}
            selectedValue={selectedStyle}
          />
        </AccordionPanel>
      </AccordionItem>
      {!hideColorPalettes ? (
        <AccordionItem borderColor="transparent" paddingBottom="10px">
          <h2>
            <AccordionButton {...accordionButtonStyles}>
              <Box as="span" flex="1" fontSize="sm" textAlign="left" ref={tonesRef}>
                Color Filter
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <SelectColorPalette
              onChange={onSelectedColorPalette}
              selectedValue={selectedColorPalette}
              style={style}
            />
          </AccordionPanel>
        </AccordionItem>
      ) : null}
    </Accordion>
  );
}
