import { Box, Button, HStack } from '@chakra-ui/react';

import { TemplateColor } from '@/components/types';

import Colors from '@/theme/colors';
import { useState } from 'react';

const { abloBlue } = Colors;

const ButtonSelectColor = (props) => (
  <Button
    h="24px"
    flexShrink={0}
    padding="0"
    w="24px"
    borderRadius="50%"
    minWidth="auto"
    {...props}
  />
);

const ButtonLink = (props) => (
  <Button
    bg="transparent"
    color="#397ADC"
    fontSize="13px"
    fontWeight={500}
    h="16px"
    minWidth="none"
    p={0}
    width="auto"
    {...props}
  />
);

type Props = {
  selectedVariantId: string;
  onSelectedVariant: (value: string) => void;
  options: TemplateColor[];
};

const ColorPicker = ({ selectedVariantId, onSelectedVariant, options }: Props) => {
  const [isPickerVisible, setPickerVisible] = useState(false);

  const selectedVariant = options.find(({ id }) => id === selectedVariantId);

  return (
    <Box
      borderRadius="50px"
      border="1px solid #DDD"
      background="#FFFFFF"
      h="36px"
      padding="5px 8px"
    >
      {isPickerVisible ? (
        <HStack>
          {options.map(({ id, name, hex }) => {
            const isSelected = selectedVariantId === id;

            return (
              <ButtonSelectColor
                bg={hex}
                border={
                  isSelected
                    ? `1px solid ${abloBlue}`
                    : name === 'Blanco'
                    ? '1px solid #D9D9D9'
                    : 'none'
                }
                key={id}
                onClick={(e) => {
                  e.stopPropagation();

                  onSelectedVariant(id);
                }}
              />
            );
          })}
          <ButtonLink onClick={() => setPickerVisible(false)}>Done</ButtonLink>
        </HStack>
      ) : (
        <HStack>
          <Box bg={selectedVariant.hex} width="26px" height="26px" borderRadius="50%" />
          <ButtonLink onClick={() => setPickerVisible(true)}>Change</ButtonLink>
        </HStack>
      )}
    </Box>
  );
};

export default ColorPicker;
