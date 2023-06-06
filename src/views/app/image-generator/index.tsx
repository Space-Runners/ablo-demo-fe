import { useState } from 'react';

import { Button, Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';

import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

import ChooseDirection from './steps/ChooseDirection';
import ChooseStyle from './steps/ChooseStyle';
import ChoosePictureProperties from './steps/ChoosePictureProperties';
import ChooseItemsToRemove from './steps/ChooseItemsToRemove';

const getStepComponent = (step) => {
  if (step === 2) {
    return <ChooseStyle />;
  } else if (step === 3) {
    return <ChoosePictureProperties />;
  } else if (step === 4) {
    return <ChooseItemsToRemove />;
  }

  return <ChooseDirection />;
};

export default function ImageGenerator() {
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  const [activeStep, setActiveStep] = useState(3);

  return (
    <Flex
      align="center"
      justify="center"
      pt={{ base: '130px', md: '80px', xl: '80px' }}
      w="100%"
    >
      {activeStep !== 10 ? (
        <Button
          leftIcon={<AiOutlineArrowLeft />}
          onClick={() => setActiveStep(activeStep - 1)}
          variant="outline"
          mr={10}
        >
          Back
        </Button>
      ) : null}
      {getStepComponent(activeStep)}
      <Button
        colorScheme="purple"
        ml={10}
        onClick={() => setActiveStep(activeStep + 1)}
        rightIcon={<AiOutlineArrowRight />}
      >
        Next
      </Button>
    </Flex>
  );
}
