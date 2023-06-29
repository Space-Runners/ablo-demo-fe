import { Button, HStack } from '@chakra-ui/react';
import Colors from '@/theme/colors';

import { variants } from '@/data/products';

const { abloBlue } = Colors;

type Props = {
  isMulti?: boolean;
  selectedVariants?: string[];
  onSelectedVariants?: (values: string[]) => void;
};

const ColorPicker = ({
  isMulti,
  selectedVariants = [],
  onSelectedVariants,
}: Props) => {
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
      {variants.map(({ name, color }) => {
        const isSelected = selectedVariants.includes(name);

        return (
          <Button
            bg={color}
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
            onClick={() => toggleSelected(name)}
          />
        );
      })}
    </HStack>
  );
};

export default ColorPicker;
