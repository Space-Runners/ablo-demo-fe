import { Icon } from '@chakra-ui/react';

export const IconExpand = () => (
  <Icon
    width="18px"
    height="18px"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 18V16H3.41L7.91 11.5L6.5 10.09L2 14.59V11H0V18H7ZM11.5 7.91L16 3.41V7H18V0H11V2H14.59L10.09 6.5L11.5 7.91Z"
      fill="white"
    />
  </Icon>
);

export const IconShrink = () => (
  <Icon
    width="18px"
    height="18px"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.4998 0.0898438L11.9998 4.58984V0.999844H9.99984V7.99984H16.9998V5.99984H13.4098L17.9098 1.49984L16.4998 0.0898438ZM0.999844 9.99984V11.9998H4.58984L0.0898438 16.4998L1.49984 17.9098L5.99984 13.4098V16.9998H7.99984V9.99984H0.999844Z"
      fill="white"
    />
  </Icon>
);

export const IconAiGenerator = () => (
  <Icon
    width="20px"
    height="22px"
    viewBox="0 0 20 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.7521 9.54434L7.1521 14.9443L5.5521 9.54434L0.1521 7.94434L5.5521 6.34434L7.1521 0.944336L8.7521 6.34434L14.1521 7.94434L8.7521 9.54434ZM15.1521 14.1443L19.1521 11.9443L16.9521 15.9443L19.1521 19.9443L15.1521 17.7443L11.1521 19.9443L13.3521 15.9443L11.1521 11.9443L15.1521 14.1443ZM8.1521 15.9443L6.4521 18.9443L8.1521 21.9443L5.1521 20.2443L2.1521 21.9443L3.8521 18.9443L2.1521 15.9443L5.1521 17.6443L8.1521 15.9443Z"
      fill="white"
    />
  </Icon>
);

export const IconTextEditor = () => (
  <Icon
    width="26px"
    height="26px"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.34473 7.70406V4.56006H21.1127V7.70406"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.58398 21.3281H15.872"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.7285 4.56006V21.3281"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

export const IconImage = () => (
  <Icon
    width="22px"
    height="22px"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.54412 20.3762C2.38654 20.3762 1.44812 19.4378 1.44812 18.2802V3.60821C1.44812 2.45063 2.38654 1.51221 3.54412 1.51221H18.2161C19.3737 1.51221 20.3121 2.45063 20.3121 3.60821V18.2802C20.3121 19.4378 19.3737 20.3762 18.2161 20.3762H3.54412Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.32371 6.16453C8.93761 6.77843 8.93761 7.77376 8.32371 8.38767C7.7098 9.00158 6.71447 9.00158 6.10056 8.38767C5.48666 7.77377 5.48666 6.77844 6.10056 6.16453C6.71447 5.55063 7.7098 5.55063 8.32371 6.16453"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.3121 14.0881L15.0721 8.84814L3.54407 20.3761"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

export const IconColorPicker = ({ isSelected }) => (
  <Icon
    width="22px"
    height="22px"
    opacity={isSelected ? 1 : 0.5}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.3"
      d="M11.32 9.63374C12.4147 8.81147 13.7754 8.32422 15.25 8.32422C18.8674 8.32422 21.8 11.2568 21.8 14.8742C21.8 18.4917 18.8674 21.4242 15.25 21.4242C13.7754 21.4242 12.4147 20.937 11.32 20.1147C10.2253 20.937 8.86452 21.4242 7.38997 21.4242C3.77251 21.4242 0.839966 18.4917 0.839966 14.8742C0.839966 11.2568 3.77251 8.32422 7.38997 8.32422C8.86452 8.32422 10.2253 8.81147 11.32 9.63374V9.63374ZM13.067 11.6049C13.6223 12.5671 13.94 13.6835 13.94 14.8742C13.94 16.0649 13.6223 17.1813 13.067 18.1435C13.7027 18.5693 14.4559 18.8042 15.25 18.8042C17.4204 18.8042 19.18 17.0447 19.18 14.8742C19.18 12.7038 17.4204 10.9442 15.25 10.9442C14.4549 10.9442 13.701 11.1806 13.067 11.6049L13.067 11.6049Z"
      fill="white"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.9516 2.38281C18.5095 4.94075 18.5095 9.08799 15.9516 11.6459C13.3936 14.2039 9.2464 14.2039 6.68847 11.6459C4.13054 9.08799 4.13054 4.94075 6.68847 2.38281C9.2464 -0.175129 13.3936 -0.175129 15.9516 2.38281"
      fill="white"
    />
  </Icon>
);
