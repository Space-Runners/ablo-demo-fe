import { Flex, Image, Text } from '@chakra-ui/react';

import IconWarning from '@/assets/IconWarning.png';

type Props = {
  message: string;
  width: string;
};

const ErrorMessage = ({ message, ...rest }: Props) => (
  <Flex bg="red.200" borderRadius="14px" padding="12px" width="100%" {...rest}>
    <Image alt="warning" h="27px" mr="7px" src={IconWarning} w="28px" />
    <Text
      color="red.400"
      fontSize="sm"
      fontWeight={400}
      position="relative"
      top="3px"
      textAlign="left"
    >
      {message}
    </Text>
  </Flex>
);

export default ErrorMessage;
