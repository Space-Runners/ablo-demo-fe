import { Button, HStack } from '@chakra-ui/react';

import { ColorVariant } from './types';

import Colors from '@/theme/colors';

const { abloBlue } = Colors;

type Props = {
  isMulti?: boolean;
  selectedVariants?: string[];
  onSelectedVariants?: (values: string[]) => void;
  options: ColorVariant[];
};

const ColorPicker = ({ isMulti, selectedVariants = [], onSelectedVariants, options }: Props) => {
  const toggleSelected = (value) => {
    let newSelected;

    if (!isMulti) {
      onSelectedVariants([value]);

      return;
    }

    if (selectedVariants.includes(value)) {
      newSelected = selectedVariants.filter((s) => s !== value);
    } else {
      newSelected = [...selectedVariants, value];
    }

    onSelectedVariants(newSelected);
  };

  return (
    <HStack align="center" overflowX="auto" spacing="10px">
      {options.map(({ name, hex }) => {
        const isSelected = selectedVariants.includes(name);

        return (
          <Button
            bg={hex}
            border={
              isSelected
                ? `1px solid ${abloBlue}`
                : name === 'Blanco'
                ? '1px solid #D9D9D9'
                : 'none'
            }
            h="24px"
            flexShrink={0}
            key={name}
            padding="0"
            w="24px"
            borderRadius="50%"
            minWidth="auto"
            onClick={(e) => {
              e.stopPropagation();

              toggleSelected(name);
            }}
          />
        );
      })}
    </HStack>
  );
};

export default ColorPicker;
