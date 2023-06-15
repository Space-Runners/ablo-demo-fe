import { HStack, VStack, Text } from '@chakra-ui/react';

import { Garment } from '@/components/types';

import Colors from '@/theme/colors';

const { gray } = Colors;

const IconGarment = ({ isHighlighted }: { isHighlighted: boolean }) => (
  <svg
    width="26"
    height="23"
    viewBox="0 0 26 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.0895 22.4375H5.91046C5.68296 22.4375 5.49851 22.2516 5.49851 22.0223V12.6907L5.19851 12.9855C5.08434 13.0981 4.91545 13.1337 4.76601 13.0771C4.14323 12.8419 1.4332 10.0833 0.617643 9.24341C0.50042 9.12274 0.467364 8.94271 0.534031 8.78761C0.952924 7.81357 4.05184 4.08907 4.66879 3.35217C6.32602 1.37387 9.86105 0.603382 10.0108 0.571464C10.1222 0.547667 10.2391 0.571744 10.3327 0.638098C10.9069 1.04462 11.9041 1.28736 13 1.28736C14.0958 1.28736 15.0928 1.04462 15.6675 0.637818C15.7611 0.571744 15.8778 0.547667 15.9894 0.571464C16.1389 0.603102 19.6742 1.37359 21.3311 3.35217C21.9481 4.08907 25.0473 7.81385 25.4662 8.78761C25.5326 8.94271 25.4995 9.12274 25.3823 9.24341C24.5664 10.0833 21.8567 12.8419 21.2339 13.0768C21.0847 13.1337 20.9159 13.0978 20.8014 12.9853L20.5014 12.6905V22.022C20.5017 22.2516 20.3172 22.4375 20.0895 22.4375ZM6.32241 21.6071H19.6775V11.7052C19.6775 11.5381 19.7767 11.3872 19.9295 11.3225C20.0822 11.2578 20.2589 11.2914 20.3772 11.4082L21.1467 12.1644C21.7342 11.7105 23.2234 10.2695 24.582 8.87944C24.0564 8.0062 22.3231 5.82491 20.7011 3.88833C19.4142 2.35182 16.6769 1.59505 15.9817 1.42287C15.2594 1.86663 14.1869 2.11833 13 2.11833C11.813 2.11833 10.7405 1.86663 10.0183 1.42287C9.32327 1.59477 6.58574 2.35154 5.29879 3.88833C3.67683 5.82491 1.94349 8.00592 1.41793 8.87944C2.77544 10.2681 4.26239 11.7072 4.85379 12.1638L5.62268 11.4082C5.74129 11.2914 5.91796 11.2578 6.07046 11.3225C6.22296 11.3872 6.32241 11.5384 6.32241 11.7052V21.6071Z"
      fill={isHighlighted ? gray[100] : gray[200]}
    />
  </svg>
);

type Props = {
  garments: Garment[];
  onSelectedGarment: (garment: Garment) => void;
  selectedGarment: Garment;
};

export default function GarmentPicker({
  garments,
  selectedGarment,
  onSelectedGarment,
}: Props) {
  return (
    <HStack spacing="20px">
      {garments.map((garment) => {
        const isSelected = garment.name === selectedGarment.name;

        return (
          <VStack
            background={isSelected ? gray[300] : 'transparent'}
            border="1px solid"
            borderColor={gray[200]}
            borderRadius="4px"
            direction="column"
            height="60px"
            key={garment.name}
            onClick={() => onSelectedGarment(garment)}
            padding="8px 10px"
            width="60px"
          >
            <IconGarment isHighlighted={isSelected} />
            <Text
              as="b"
              color={garment === selectedGarment ? gray[100] : gray[200]}
              fontSize="9px"
              marginTop="8px"
            >
              {garment.name}
            </Text>
          </VStack>
        );
      })}
    </HStack>
  );
}
