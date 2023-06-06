import { Button } from '@chakra-ui/react';

const style = {
  bg: 'rgb(204, 219, 241);',
  border: '1px',
  p: '20px',
  display: 'flex',
  flexDirection: 'column',
  fontSize: '10px',
  textAlign: 'center',
  h: '80px',
  w: '160px',
};

const selectedStyle = {
  bg: 'rgb(254, 244, 69)',
};

function CustomButton(props: any) {
  const { isSelected, title, ...rest } = props;

  return (
    <Button {...style} {...(isSelected ? selectedStyle : {})} {...rest}>
      {title}
    </Button>
  );
}

export default CustomButton;
