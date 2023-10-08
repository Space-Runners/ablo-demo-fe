import { Box, Button, Flex, HStack, Icon } from '@chakra-ui/react';

import ButtonCTA from '@/lib/components/Button';
import Panel from '@/components/Panel';
import { Filters, Template } from '@/lib/types';

import { COLLECTIONS, GENDERS } from '@/data/templates';

import ColorPicker from './ColorPicker';
import PricePicker from './PricePicker';
import { getOptions } from '../utils';
import { useSizes } from '@/api/sizes';

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

const getColorOptions = (templates: Template[]) =>
  templates.reduce((result, template) => {
    const { colors } = template;

    const newColors = colors.filter(({ name }) => !result.find((color) => color.name === name));

    return [...result, ...newColors];
  }, []);

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
              key={value}
              onClick={() => toggleSelected(value)}
              padding="7px 12px"
              _focus={{
                border: '1px solid',
                borderColor: 'brand.500',
                boxShadow: '0px 0px 8px 0px #97B9F5',
              }}
              _hover={{
                border: '1px solid',
                borderColor: 'brand.500',
                boxShadow: '0px 0px 8px 0px #97B9F5',
              }}
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

type Props = {
  filters: Filters;
  onApply: () => void;
  onUpdate: (updates: object) => void;
  templates: Template[];
};

const TemplateFilters = ({ filters, onApply, onUpdate, templates }: Props) => {
  const { data: allSizes = [] } = useSizes();

  const { clothingTypes, collections, fits, genders, sizes, colors, price } = filters;

  return (
    <Box paddingBottom="38px" w="100%">
      <Multiselect
        name="Sizes Available"
        options={allSizes.map(({ id, name }) => ({ value: `${id}`, name }))}
        selectedValues={sizes}
        onUpdateSelectedValues={(values) => onUpdate({ sizes: values })}
      />
      <Panel title="Colors">
        <ColorPicker
          isMulti
          onSelectedVariants={(values) => onUpdate({ colors: values })}
          options={getColorOptions(templates)}
          selectedVariants={colors}
        />
      </Panel>
      <Multiselect
        name="Clothing Type"
        options={getOptions(templates, 'name')}
        selectedValues={clothingTypes}
        onUpdateSelectedValues={(values) => onUpdate({ clothingTypes: values })}
      />
      <Multiselect
        name="Product Fit"
        options={getOptions(templates, 'fit')}
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
      <Panel title="Price">
        <PricePicker
          max={150}
          min={0}
          onChange={(value) => onUpdate({ price: value })}
          value={price}
        />
      </Panel>
      <Flex align="flex-end" justify="center" w="100%" padding="0 14px">
        <ButtonCTA mt="16px" onClick={onApply} title="Apply Filters" w="100%" />
      </Flex>
    </Box>
  );
};

export default TemplateFilters;
