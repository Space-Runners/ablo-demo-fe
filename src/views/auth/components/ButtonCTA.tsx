import { useEffect } from 'react';
import { Button } from '@chakra-ui/react';

const ButtonCTA = ({ onClick, title, ...rest }) => {
  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();

        // 👇️ your logic here
        onClick();
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [onClick]);

  return (
    <Button
      bg="#0D6EFD"
      borderRadius="4px"
      color="#FFFFFF"
      fontWeight={400}
      h="36px"
      padding="6px 0"
      w="100%"
      onClick={onClick}
      {...rest}
    >
      {title}
    </Button>
  );
};

export default ButtonCTA;
