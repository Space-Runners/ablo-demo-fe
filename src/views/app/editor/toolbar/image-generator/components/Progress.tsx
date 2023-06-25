import { Box, Flex, Text } from '@chakra-ui/react';

import Colors from '@/theme/colors';
import { useEffect, useState } from 'react';

const { abloBlue } = Colors;

const DURATION = 50;

const Progress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => oldProgress + 1);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const progressPercentage = Math.min(
    100,
    Math.floor((100 * progress) / DURATION)
  );

  return (
    <Flex align="center" direction="column">
      <Text fontSize="22px" fontWeight={700} mb="10px">
        {progressPercentage}%
      </Text>
      <Text fontSize="11px" mb="17px">
        Generating...
      </Text>
      <Box bg="#959392" h="3px" w="100%">
        <Box bg={abloBlue} h="100%" w={`${progressPercentage}%`} />
      </Box>
    </Flex>
  );
};

export default Progress;
