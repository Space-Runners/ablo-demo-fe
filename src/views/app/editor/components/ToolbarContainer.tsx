import { Box } from '@chakra-ui/react';

type ToolbarContainerProps = {
  children: React.ReactNode;
};

const ToolbarContainer = ({ children, ...rest }: ToolbarContainerProps) => (
  <Box
    bg="#FFFFFF"
    boxShadow="0px 1px 2px 0px #0000000F"
    id="object-edit-tools"
    onClick={(e) => {
      e.stopPropagation();
    }}
    p="12px 11px 8px 11px"
    {...rest}
  >
    {children}
  </Box>
);

export default ToolbarContainer;
