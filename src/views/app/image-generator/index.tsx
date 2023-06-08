import { useState } from 'react';

import { Button, Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';

import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

import ChooseDirection from './steps/ChooseDirection';
import ChooseStyle from './steps/ChooseStyle';
import ChoosePictureProperties from './steps/ChoosePictureProperties';
import ChooseItemsToRemove from './steps/ChooseItemsToRemove';
import DescribeAndSubmit from './steps/DescribeAndSubmit';

const getStepComponent = (step, params, onUpdate) => {
  const { engineId, keys, style_preset: stylePreset } = params;

  if (step === 2) {
    return <ChooseStyle stylePreset={stylePreset} onUpdate={onUpdate} />;
  } else if (step === 3) {
    return <ChoosePictureProperties keys={keys} onUpdate={onUpdate} />;
  } else if (step === 4) {
    return <ChooseItemsToRemove keys={keys} onUpdate={onUpdate} />;
  } else if (step === 5) {
    return <DescribeAndSubmit params={params} />;
  }

  return <ChooseDirection engineId={engineId} onUpdate={onUpdate} />;
};

export default function ImageGenerator() {
  const [params, setParams] = useState({});

  const [activeStep, setActiveStep] = useState(1);

  const handleUpdate = (update) => setParams({ ...params, ...update });

  console.log('Params', params);

  return (
    <Flex
      align="center"
      justify="center"
      pt={{ base: '130px', md: '80px', xl: '80px' }}
      w="100%"
    >
      {activeStep !== 1 ? (
        <Button
          leftIcon={<AiOutlineArrowLeft />}
          onClick={() => setActiveStep(activeStep - 1)}
          variant="outline"
          mr={10}
        >
          Back
        </Button>
      ) : null}
      {getStepComponent(activeStep, params, handleUpdate)}
      {activeStep !== 5 ? (
        <Button
          colorScheme="purple"
          ml={10}
          onClick={() => setActiveStep(activeStep + 1)}
          rightIcon={<AiOutlineArrowRight />}
        >
          Next
        </Button>
      ) : null}
    </Flex>
  );
}
