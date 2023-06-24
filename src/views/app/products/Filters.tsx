import { Box, Button as ChakraButton, HStack, Icon } from '@chakra-ui/react';

import Panel from '@/components/Panel';

import {
  BRANDS,
  CLOTHING_TYPES,
  COLLECTIONS,
  FITS,
  GENDERS,
  SIZES,
} from '@/data/products';

import ColorPicker from './ColorPicker';
import PricePicker from './PricePicker';

type Option = {
  name: string;
  value: string;
};

const IconCheckmark = () => (
  <Icon
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.55001 18L3.85001 12.3L5.27501 10.875L9.55001 15.15L18.725 5.97498L20.15 7.39998L9.55001 18Z"
      fill="white"
    />
  </Icon>
);

const Button = (props) => <ChakraButton {...props} variant="outline" />;

type MultiselectProps = {
  name: string;
  onUpdateSelectedValues: (values: string[]) => void;
  options: Option[];
  selectedValues: string[];
};

const Multiselect = ({
  options,
  selectedValues = [],
  onUpdateSelectedValues,
  name,
}: MultiselectProps) => {
  const toggleSelected = (value) => {
    let newSelected;

    if (selectedValues.includes(value)) {
      newSelected = selectedValues.filter((s) => s !== value);
    } else {
      newSelected = [...selectedValues, value];
    }

    onUpdateSelectedValues(newSelected);
  };

  return (
    <Panel title={name}>
      <HStack overflowX="auto" spacing="4px">
        {options.map((option) => {
          const { name, value } = option;

          const isSelected = selectedValues.includes(value);

          return (
            <Button
              bg={isSelected ? '#000000' : 'transparent'}
              borderRadius="100px"
              color={isSelected ? '#FFFFFF' : '#6A6866'}
              flexShrink={0}
              fontSize="sm"
              fontWeight={isSelected ? 500 : 400}
              h="30px"
              onClick={() => toggleSelected(value)}
              padding="7px 12px"
            >
              {isSelected ? <IconCheckmark /> : null}
              {name}
            </Button>
          );
        })}
      </HStack>
    </Panel>
  );
};

type Filters = {
  sizes?: string[];
  colors?: string[];
  clothingTypes?: string[];
  fits?: string[];
  collections?: string[];
  genders?: string[];
  brands?: string[];
  price: {
    min: number;
    max: number;
  };
};

type Props = {
  filters: Filters;
  onUpdate: (updates: { [key in keyof Filters]: string[] }) => void;
};

const Filters = ({ filters, onUpdate }: Props) => {
  const { brands, clothingTypes, collections, fits, genders, sizes, colors } =
    filters || {};

  return (
    <Box>
      <Multiselect
        name="Sizes Available"
        options={SIZES.map((size) => ({ value: size, name: size }))}
        selectedValues={sizes}
        onUpdateSelectedValues={(values) => onUpdate({ sizes: values })}
      />
      <Panel title="Colors">
        <ColorPicker
          isMulti
          onSelectedVariants={(values) => onUpdate({ colors: values })}
          selectedVariants={colors}
        />
      </Panel>
      <Multiselect
        name="Clothing Type"
        options={CLOTHING_TYPES.map((name) => ({ value: name, name }))}
        selectedValues={clothingTypes}
        onUpdateSelectedValues={(values) => onUpdate({ clothingTypes: values })}
      />
      <Multiselect
        name="Product Fit"
        options={FITS.map((name) => ({ value: name, name }))}
        selectedValues={fits}
        onUpdateSelectedValues={(values) => onUpdate({ fits: values })}
      />
      <Multiselect
        name="Collections"
        options={COLLECTIONS.map((name) => ({ value: name, name }))}
        selectedValues={collections}
        onUpdateSelectedValues={(values) => onUpdate({ collections: values })}
      />
      <Multiselect
        name="Gender"
        options={GENDERS.map((name) => ({ value: name, name }))}
        selectedValues={genders}
        onUpdateSelectedValues={(values) => onUpdate({ genders: values })}
      />
      <Multiselect
        name="Brand"
        options={BRANDS.map((name) => ({ value: name, name }))}
        selectedValues={brands}
        onUpdateSelectedValues={(values) => onUpdate({ brands: values })}
      />
      <Panel title="Price">
        <PricePicker
          max={100}
          min={0}
          onChange={(min, max) => onUpdate({ price: { min, max } })}
        />
      </Panel>
    </Box>
  );
};

export default Filters;
