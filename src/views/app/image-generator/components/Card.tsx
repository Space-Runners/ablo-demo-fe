import { Box, Text } from '@chakra-ui/react';

const style = {
  bg: 'rgb(217, 217, 217);',
  border: '2px',
  h: '600px',
  p: '20px',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  w: '500px',
};

function Card(props: any) {
  const { children, title, ...rest } = props;

  return (
    <Box {...style} {...rest}>
      <Text>{title}</Text>
      {children}
    </Box>
  );
}

export default Card;
