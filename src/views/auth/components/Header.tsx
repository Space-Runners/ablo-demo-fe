import { VStack, Text } from "@chakra-ui/react";

import IconAblo from "@/components/icons/IconAblo";

type HeaderProps = {
  title: string;
  subtitle: string;
};

const Header = ({ title, subtitle }: HeaderProps) => (
  <VStack mb="10px" spacing="8px">
    <IconAblo />
    <Text as="b" color="#212529" fontSize="24px">
      {title}
    </Text>
    <Text>{subtitle}</Text>
  </VStack>
);

export default Header;
