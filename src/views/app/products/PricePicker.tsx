import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Text,
} from '@chakra-ui/react';

import Colors from '@/theme/colors';

const { abloBlue } = Colors;

type Props = {
  min: number;
  max: number;
  onChange: (val: number[]) => void;
  value: number[];
};

const PriceTag = ({ price }) => (
  <Text
    as="b"
    fontFamily="Roboto Condensed"
    fontSize="md"
    fontWeight={700}
    position="absolute"
    top="13px"
  >
    ${price}
  </Text>
);

const PricePicker = ({ onChange, value }: Props) => {
  return (
    <RangeSlider
      aria-label={['min', 'max']}
      onChange={(val) => onChange(val)}
      value={value}
    >
      <RangeSliderTrack bg="#D4D4D3" h="2px">
        <RangeSliderFilledTrack bg={abloBlue} />
      </RangeSliderTrack>
      <RangeSliderThumb bg={abloBlue} index={0} position="relative">
        <PriceTag price={value[0]} />
      </RangeSliderThumb>
      <RangeSliderThumb bg={abloBlue} index={1} position="relative">
        <PriceTag price={value[1]} />
      </RangeSliderThumb>
    </RangeSlider>
  );
};

export default PricePicker;
