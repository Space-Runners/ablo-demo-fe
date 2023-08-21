import { Alert, AlertDescription, CloseButton, Icon } from '@chakra-ui/react';

const IconSaved = (props) => (
  <Icon
    width="18px"
    height="18px"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9 1.5C4.86 1.5 1.5 4.86 1.5 9C1.5 13.14 4.86 16.5 9 16.5C13.14 16.5 16.5 13.14 16.5 9C16.5 4.86 13.14 1.5 9 1.5ZM7.5 12.75L3.75 9L4.8075 7.9425L7.5 10.6275L13.1925 4.935L14.25 6L7.5 12.75Z"
      fill="white"
    />
  </Icon>
);

type FeedbackAlertProps = {
  error: string;
  onClose: () => void;
};

const FeedbackAlert = ({ error, onClose }: FeedbackAlertProps) => {
  if (error) {
    return (
      <Alert status="error" justifyContent="space-between">
        <AlertDescription>{error}</AlertDescription>
        <CloseButton onClick={onClose} />
      </Alert>
    );
  }

  return (
    <Alert
      bg="#000000"
      color="#FFFFFF"
      fontSize="xs"
      fontWeight={600}
      justifyContent="center"
      textAlign="center"
    >
      <IconSaved mr="6px" />
      Design Saved
    </Alert>
  );
};

export default FeedbackAlert;
