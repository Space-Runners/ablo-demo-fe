import { Button, HStack } from '@chakra-ui/react';

import { TemplateColor } from '@/lib/types';
import Colors from '@/lib/theme/colors';

const { abloBlue } = Colors;

type Props = {
  isMulti?: boolean;
  selectedVariants?: string[];
  onSelectedVariants?: (values: string[]) => void;
  options: TemplateColor[];
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
      {options.map(({ id, name, hex }) => {
        const isSelected = selectedVariants.includes(id);

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
            key={id}
            padding="0"
            w="24px"
            borderRadius="50%"
            minWidth="auto"
            onClick={(e) => {
              e.stopPropagation();

              toggleSelected(id);
            }}
          />
        );
      })}
    </HStack>
  );
};

export default ColorPicker;
