import { Fragment as F, useState } from 'react';

import { Box, Button, Flex, Image, Text, useBreakpointValue } from '@chakra-ui/react';

import { chunk } from 'lodash';

import MiniFilterBar from '@/components/MiniFilterBar';

import IconBack from '@/components/icons/IconBack';
import { Filters, Garment, Template } from '@/components/types';

import PRODUCTS, { CLOTHING_TYPES } from '@/data/products';
import { useTemplates } from '@/api/templates';

import Colors from '@/theme/colors';

import TemplateDetails from './TemplateDetails';
import TemplateFilters from './Filters';

import { IconFilters, IconCloseFilters, IconSustainable, IconSelected } from './Icons';

const { abloBlue } = Colors;

const matchesClothingType = (types, template) =>
  !types.length || types[0] === 'All' || types.find((type) => type.includes(template.name));

const matchesFit = (fits, template) =>
  !fits.length || fits.find((fit) => fit.includes(template.name));

const matchesPrice = ([min, max], template) => {
  const { price } = template;

  return price >= min && price <= max;
};

const getTemplatesMatchingFilters = (filters) =>
  PRODUCTS.filter((template) => {
    const { clothingTypes = [], fits = [], price: priceRange } = filters;

    return (
      matchesClothingType(clothingTypes, template) &&
      matchesFit(fits, template) &&
      matchesPrice(priceRange, template)
    );
  });

type TemplatesListProps = {
  templates: Template[];
  onSelectedTemplate: (template: Template) => void;
  selectedGarment: Garment;
};

const TemplatesList = ({ templates, onSelectedTemplate, selectedGarment }: TemplatesListProps) => {
  const chunks = chunk(templates, 2);

  return (
    <Box bg="#ffffff" padding="25px 16px 45px 14px" w="100%">
      {chunks.map((chunk, index) => (
        <Flex key={index} mb="24px">
          {chunk.map((template, index) => {
            const { fabric, fit, id, name, price, variants, urlPrefix } = template;

            const variant =
              selectedGarment && selectedGarment.variant
                ? variants.find((variant) => variant.name === selectedGarment.variant)
                : variants.find((variant) => variant.name === 'OatMilk');

            const isSelected = selectedGarment && selectedGarment.templateId === id;

            const selectedProps = isSelected
              ? { border: '2px solid #000000', borderRadius: '10px' }
              : {};

            return (
              <Box
                flex="1"
                key={index}
                marginLeft={`${index === 0 ? 0 : 8}px`}
                onClick={() => onSelectedTemplate(template)}
                position="relative"
                {...selectedProps}
              >
                {isSelected ? (
                  <IconSelected position="absolute" top="8px" right="8px" />
                ) : (
                  <IconSustainable position="absolute" top="8px" right="8px" />
                )}
                <Flex
                  align="center"
                  bg="#F9F9F7"
                  borderRadius="10px"
                  h="180px"
                  justify="center"
                  padding="16px 8px"
                >
                  <Image h={160} src={`${urlPrefix}_${variant.name}_FRONT.webp`} alt={name} />
                </Flex>
                <Box padding="8px">
                  <Text color="#6A6866" display="block" fontSize="xs" textTransform="uppercase">
                    Spaarkd
                  </Text>
                  <Text color="#000000" fontSize="md" fontWeight={500} lineHeight="20px">
                    {fit} {name}
                  </Text>
                  <Text color="#6A6866" fontSize="xs">
                    {fabric}
                  </Text>
                  <Flex color="#6A6866" align="center" fontSize="xs">
                    <Text
                      as="b"
                      color="#000000"
                      fontFamily="Roboto Condensed"
                      fontSize="md"
                      fontWeight={700}
                      mr="4px"
                    >
                      ${price}.00
                    </Text>{' '}
                    (Base Price)
                  </Flex>
                </Box>
              </Box>
            );
          })}
          {chunk.length === 1 ? <Box flex="1" marginLeft="8px" /> : null}
        </Flex>
      ))}
    </Box>
  );
};

type TemplatePickerProps = {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  selectedGarment: Garment;
  onSelectedGarment: (garment: Garment) => void;
  selectedTemplate: Template;
  onSelectedTemplate: (garment: Template) => void;
};

export default function TemplatePicker({
  filters,
  onFiltersChange,
  selectedGarment,
  onSelectedGarment,
  selectedTemplate,
  onSelectedTemplate,
}: TemplatePickerProps) {
  const [areFiltersVisible, setFiltersVisible] = useState(false);

  const { clothingTypes } = filters;

  const templates = getTemplatesMatchingFilters(filters);

  const isMobile = useBreakpointValue({ base: true, md: false });

  const { data: templates2 } = useTemplates();

  return (
    <Box bg="#ffffff" w="100%" h="100%">
      <Flex align="center" height="63px" pl="17px">
        {selectedTemplate && isMobile ? (
          <Button
            bg="transparent"
            height="30px"
            minWidth="none"
            mr="10px"
            onClick={() => onSelectedTemplate(null)}
            padding={0}
            _hover={{
              bg: '#F9F9F7',
              border: `1px solid ${abloBlue}`,
              boxShadow: '0px 0px 8px 0px #97B9F5',
            }}
          >
            <IconBack />
          </Button>
        ) : null}
        <Text fontFamily="Roboto Condensed" fontSize="18px" fontWeight={600} lineHeight="18px">
          Pick your clothe
        </Text>
      </Flex>
      {!selectedTemplate || !isMobile ? (
        <Button
          alignItems="center"
          bg="#FFFFFF"
          borderRadius={0}
          boxShadow="none"
          display="flex"
          height="50px"
          justifyContent="space-between"
          onClick={() => setFiltersVisible(!areFiltersVisible)}
          padding="10px 14px"
          w="100%"
        >
          <Text color="#212121" fontWeight={400}>
            FILTERS
          </Text>
          {areFiltersVisible ? <IconCloseFilters /> : <IconFilters />}
        </Button>
      ) : null}
      {areFiltersVisible ? (
        <TemplateFilters
          filters={filters}
          onApply={() => {
            setFiltersVisible(false);

            onSelectedGarment({ ...selectedGarment });
          }}
          onUpdate={(updates) => onFiltersChange({ ...filters, ...updates })}
        />
      ) : (
        <Box>
          {selectedTemplate && isMobile ? (
            <TemplateDetails
              garment={selectedGarment}
              onGarmentUpdate={onSelectedGarment}
              template={selectedTemplate}
            />
          ) : (
            <F>
              <MiniFilterBar
                options={['All', ...CLOTHING_TYPES]}
                selectedValue={clothingTypes[0] || 'All'}
                onChange={(value) => onFiltersChange({ ...filters, clothingTypes: [value] })}
              />
              <TemplatesList
                onSelectedTemplate={onSelectedTemplate}
                templates={templates}
                selectedGarment={selectedGarment}
              />
            </F>
          )}
        </Box>
      )}
    </Box>
  );
}
