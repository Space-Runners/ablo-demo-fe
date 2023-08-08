import { Button, Text, VStack } from "@chakra-ui/react";

const ToolbarButton = ({ icon, isDisabled = false, isSelected = null, text, ...rest }) => {
  return (
    <Button
      background={isSelected ? "#EDF2F7" : "transparent"}
      borderRadius="7px"
      disabled={isDisabled}
      h="47px"
      padding="4px 4px 8px 4px"
      width="auto"
      /*  _focus={{
        border: `1px solid ${abloBlue}`,
        boxShadow: '0px 0px 8px 0px #97B9F5',
      }} */
      /*  _hover={{
        border: `1px solid ${abloBlue}`,
        boxShadow: '0px 0px 8px 0px #97B9F5',
      }} */
      {...rest}
    >
      <VStack>
        {icon}
        <Text as="b" fontSize="9px" color={isDisabled ? "#848484" : "#000000"}>
          {text}
        </Text>
      </VStack>
    </Button>
  );
};

export default ToolbarButton;
