import { useState } from 'react';

import { Button, Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';

import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

import ChooseDirection from './steps/ChooseDirection';

const getStepComponent = (step) => {
  if (step === 2) {
    return null;
  }

  return <ChooseDirection />;
};

export default function ImageGenerator() {
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  const [activeStep, setActiveStep] = useState(1);

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
