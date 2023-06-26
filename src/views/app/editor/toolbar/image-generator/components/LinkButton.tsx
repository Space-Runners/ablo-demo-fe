import { Button, Text } from '@chakra-ui/react';

import Colors from '@/theme/colors';

const { abloBlue } = Colors;

const LinkButton = ({ icon, title, ...rest }) => (
  <Button justifyContent="flex-start" padding="0" {...rest}>
    {icon}
    <Text as="b" color={abloBlue} fontSize="sm" ml="13px">
      {title}
    </Text>
  </Button>
);

export default LinkButton;
