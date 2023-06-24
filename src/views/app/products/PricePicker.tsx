import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Text,
} from '@chakra-ui/react';

import Colors from '@/theme/colors';

const { abloBlue } = Colors;

type PricePicker = {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
};

const PricePicker = ({ min, max, onChange }) => {
  return (
    <RangeSlider aria-label={['min', 'max']} defaultValue={[0, max]}>
      <RangeSliderTrack bg="#D4D4D3" h="2px">
        <RangeSliderFilledTrack bg={abloBlue} />
      </RangeSliderTrack>
      <RangeSliderThumb bg={abloBlue} index={0} position="relative">
        <Text as="b" position="absolute" top="13px">
          Hey
        </Text>
      </RangeSliderThumb>
      <RangeSliderThumb bg={abloBlue} index={1} />
    </RangeSlider>
  );
};

export default PricePicker;
