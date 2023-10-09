import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Text,
} from '@chakra-ui/react';

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

const PricePicker = ({ min, max, onChange, value }: Props) => {
  return (
    <RangeSlider
      aria-label={['min', 'max']}
      min={min}
      max={max}
      onChange={(val) => onChange(val)}
      value={value}
    >
      <RangeSliderTrack bg="#D4D4D3" h="2px">
        <RangeSliderFilledTrack bg="brand.500" />
      </RangeSliderTrack>
      <RangeSliderThumb bg="brand.500" index={0} position="relative">
        <PriceTag price={value[0]} />
      </RangeSliderThumb>
      <RangeSliderThumb bg="brand.500" index={1} position="relative">
        <PriceTag price={value[1]} />
      </RangeSliderThumb>
    </RangeSlider>
  );
};

export default PricePicker;
