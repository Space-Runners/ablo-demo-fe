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

export const IconAiGenerator = ({ isSelected }: { isSelected?: boolean }) => (
  <Icon
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1577_5018)">
      <path
        d="M16 18C16.5304 18 17.0391 18.2107 17.4142 18.5858C17.7893 18.9609 18 19.4696 18 20C18 19.4696 18.2107 18.9609 18.5858 18.5858C18.9609 18.2107 19.4696 18 20 18C19.4696 18 18.9609 17.7893 18.5858 17.4142C18.2107 17.0391 18 16.5304 18 16C18 16.5304 17.7893 17.0391 17.4142 17.4142C17.0391 17.7893 16.5304 18 16 18ZM16 6C16.5304 6 17.0391 6.21071 17.4142 6.58579C17.7893 6.96086 18 7.46957 18 8C18 7.46957 18.2107 6.96086 18.5858 6.58579C18.9609 6.21071 19.4696 6 20 6C19.4696 6 18.9609 5.78929 18.5858 5.41421C18.2107 5.03914 18 4.53043 18 4C18 4.53043 17.7893 5.03914 17.4142 5.41421C17.0391 5.78929 16.5304 6 16 6ZM9 18C9 16.4087 9.63214 14.8826 10.7574 13.7574C11.8826 12.6321 13.4087 12 15 12C13.4087 12 11.8826 11.3679 10.7574 10.2426C9.63214 9.11742 9 7.5913 9 6C9 7.5913 8.36786 9.11742 7.24264 10.2426C6.11742 11.3679 4.5913 12 3 12C4.5913 12 6.11742 12.6321 7.24264 13.7574C8.36786 14.8826 9 16.4087 9 18Z"
        stroke={isSelected ? '#FFFFFF' : '#959392'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1577_5018">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </Icon>
);

export const IconTextEditor = ({ isSelected }: { isSelected?: boolean }) => (
  <Icon
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1577_5048)">
      <path
        d="M3 7V5H16V7"
        stroke={isSelected ? '#FFFFFF' : '#959392'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 5V19"
        stroke={isSelected ? '#FFFFFF' : '#959392'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 19H8"
        stroke={isSelected ? '#FFFFFF' : '#959392'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 13V12H21V13"
        stroke={isSelected ? '#FFFFFF' : '#959392'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 12V19"
        stroke={isSelected ? '#FFFFFF' : '#959392'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 19H19"
        stroke={isSelected ? '#FFFFFF' : '#959392'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1577_5048">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </Icon>
);

export const IconImage = ({ isSelected }: { isSelected?: boolean }) => (
  <Icon
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1577_5058)">
      <path
        d="M15 8H15.01"
        stroke={isSelected ? '#FFFFFF' : '#959392'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 6C3 5.20435 3.31607 4.44129 3.87868 3.87868C4.44129 3.31607 5.20435 3 6 3H18C18.7956 3 19.5587 3.31607 20.1213 3.87868C20.6839 4.44129 21 5.20435 21 6V18C21 18.7956 20.6839 19.5587 20.1213 20.1213C19.5587 20.6839 18.7956 21 18 21H6C5.20435 21 4.44129 20.6839 3.87868 20.1213C3.31607 19.5587 3 18.7956 3 18V6Z"
        stroke={isSelected ? '#FFFFFF' : '#959392'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 16L8 11C8.928 10.107 10.072 10.107 11 11L16 16"
        stroke={isSelected ? '#FFFFFF' : '#959392'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 14L15 13C15.928 12.107 17.072 12.107 18 13L21 16"
        stroke={isSelected ? '#FFFFFF' : '#959392'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1577_5058">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </Icon>
);
