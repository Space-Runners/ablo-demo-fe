import { Button, Text, VStack } from '@chakra-ui/react';

const ToolbarButton = ({ icon, isDisabled = false, isSelected = null, text = null, ...rest }) => {
  return (
    <Button
      background={isSelected ? '#EDF2F7' : 'transparent'}
      borderRadius="7px"
      disabled={isDisabled}
      h="47px"
      padding="4px 4px 8px 4px"
      width="auto"
      {...rest}
    >
      <VStack>
        {icon}
        {text ? (
          <Text as="b" fontSize="9px" color={isDisabled ? '#848484' : '#000000'}>
            {text}
          </Text>
        ) : null}
      </VStack>
    </Button>
  );
};

export default ToolbarButton;
