import { Box, Flex, Text } from '@chakra-ui/react';

import Colors from '../../../theme/colors';
import { useEffect, useState } from 'react';

const { abloBlue } = Colors;

const DURATION = 10;

const Progress = ({ duration = DURATION }: { duration?: number }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => oldProgress + 1);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const progressPercentage = Math.min(100, Math.floor((100 * progress) / (duration * 2)));

  return (
    <Flex align="center">
      <Box bg="#959392" flex={1} h="3px" w="100%">
        <Box bg={abloBlue} h="100%" w={`${progressPercentage}%`} />
      </Box>
      <Text fontFamily="Roboto Condensed" fontSize="22px" fontWeight={700} ml="20px">
        {progressPercentage}%
      </Text>
    </Flex>
  );
};

export default Progress;
