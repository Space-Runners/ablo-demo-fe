import { Fragment as F, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Box, Button, Center, HStack, Spinner, Text } from '@chakra-ui/react';

import ButtonCTA from '@/lib/components/Button';
import Navbar from '@/lib/components/navbar';

import { Design, Filters, Garment, Template, User } from '@/lib/types';

import { IconFilters, IconCloseFilters } from './components/Icons';
import TemplatesList from './TemplatesList';
import TemplateFilters from './components/Filters';
import MiniFilterBar from './components/MiniFilterBar';
import TemplateDetails from './TemplateDetails';

import { getOptions } from './utils';

const matchesClothingType = (types, template) =>
  !types.length ||
  (types.length === 1 && types[0] === 'all') ||
  types.find((type) => type.includes(template.name));

const matchesFit = (fits, template) =>
  !fits.length || fits.find((fit) => template.fit && fit.includes(template.fit));

const matchesPrice = ([min, max], template) => {
  const { price: priceAsString } = template;

  const price = parseFloat(priceAsString);

  return price >= min && price <= max;
};

const matchesSize = (sizes: string[], template: Template) =>
  !sizes.length ||
  sizes.find((sizeId) => template.sizes.map(({ id }) => id).includes(parseInt(sizeId, 10)));

const getTemplatesMatchingFilters = (templates, filters) =>
  templates.filter((template) => {
    const { clothingTypes = [], fits = [], price: priceRange, sizes = [] } = filters;

    return (
      matchesClothingType(clothingTypes, template) &&
      matchesFit(fits, template) &&
      matchesPrice(priceRange, template) &&
      matchesSize(sizes, template)
    );
  });

type TemplatesPageProps = {
  design: Design;
  onDesignChange: (design: Design) => void;
  loading: boolean;
  templates: Template[];
  user: User;
};

export default function TemplatesPage({
  design,
  onDesignChange,
  loading,
  templates,
  user,
}: TemplatesPageProps) {
  const [filters, setFilters] = useState<Filters>({
    clothingTypes: [],
    price: [20, 90],
  });

  const [selectedTemplate, setSelectedTemplate] = useState<Template>();

  const [areFiltersVisible, setFiltersVisible] = useState(false);

  const { clothingTypes } = filters;

  const visibleTemplates = getTemplatesMatchingFilters(templates, filters);

  const history = useHistory();

  const handleGoToMyDesigns = () => {
    history.push('/app/designs');
  };

  const handleSelectedGarment = (garment: Garment) => {
    const { sizeId, templateId, templateColorId } = garment;

    const oldTemplate = templates.find(({ id }) => id === design.template.id);
    const newTemplate = templates.find(({ id }) => id === templateId);

    const newSides = newTemplate.sides.map(({ id, name }) => {
      const sideInOldTemplate = oldTemplate.sides.find((side) => side.name === name);

      if (sideInOldTemplate) {
        const { id: sideId } = sideInOldTemplate;

        const oldDesign = design.sides.find(({ templateSideId }) => templateSideId === sideId);

        if (oldDesign) {
          return {
            ...oldDesign,
            templateSideId: id,
          };
        }
      }

      return {
        templateSideId: id,
      };
    });

    onDesignChange({
      ...design,
      sizeId,
      sides: newSides,
      template: newTemplate,
      templateId,
      templateColorId,
    });

    history.push(`/app/editor`);
  };

  const isGuest = !user || user.roles[0]?.name === 'guest';

  return (
    <Box bg="#ffffff" w="100%" h="100%">
      <Navbar
        callToActionContent={<Text color="brand.500">Next</Text>}
        onNext={() => history.push(`/app/editor?`)}
        rightSideContent={
          <F>
            <HStack>
              {!isGuest && (
                <ButtonCTA
                  h="40px"
                  onClick={handleGoToMyDesigns}
                  outlined
                  textTransform="none"
                  title="My Designs"
                />
              )}
            </HStack>
          </F>
        }
        title="Pick Your Product"
      />
      {loading ? (
        <Center h="300px">
          <Spinner thickness="1px" speed="0.65s" emptyColor="gray" color="brand.500" size="md" />
        </Center>
      ) : (
        <F>
          {!selectedTemplate ? (
            <Button
              alignItems="center"
              bg="#FFFFFF"
              borderRadius={0}
              boxShadow="none"
              display="flex"
              height="50px"
              justifyContent="space-between"
              marginTop="30px"
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
              }}
              onUpdate={(updates) => setFilters({ ...filters, ...updates })}
              templates={templates}
            />
          ) : (
            <Box marginTop="">
              {selectedTemplate ? (
                <TemplateDetails
                  garment={design}
                  onBack={() => setSelectedTemplate(null)}
                  onGarmentUpdate={handleSelectedGarment}
                  template={selectedTemplate}
                />
              ) : (
                <Box marginTop="5px">
                  <MiniFilterBar
                    options={[{ name: 'All', value: 'all' }, ...getOptions(templates, 'name')]}
                    selectedValue={clothingTypes[0] || 'all'}
                    onChange={(value) => setFilters({ ...filters, clothingTypes: [value] })}
                  />
                  <TemplatesList
                    onSelectedTemplate={setSelectedTemplate}
                    templates={visibleTemplates}
                    selectedGarment={design}
                  />
                </Box>
              )}
            </Box>
          )}
        </F>
      )}
    </Box>
  );
}
