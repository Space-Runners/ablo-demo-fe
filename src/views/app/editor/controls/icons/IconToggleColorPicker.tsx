import { Icon } from '@chakra-ui/react';

const IconToggleColorPicker = ({ isSelected }) => (
  <Icon
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1515_7103)">
      <g clipPath="url(#clip1_1515_7103)">
        <path
          d="M13.58 13.79C13.85 14.47 14 15.22 14 16C14 17.77 13.23 19.37 12 20.46C10.9053 21.4541 9.47871 22.0033 8 22C4.69 22 2 19.31 2 16C2 13.24 3.88 10.9 6.42 10.21"
          stroke={isSelected ? '#FFFFFF' : '#6A6866'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.58 10.21C20.12 10.9 22 13.24 22 16C22 19.31 19.31 22 16 22C14.5213 22.0033 13.0947 21.4541 12 20.46"
          stroke={isSelected ? '#FFFFFF' : '#6A6866'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 8C6 9.5913 6.63214 11.1174 7.75736 12.2426C8.88258 13.3679 10.4087 14 12 14C13.5913 14 15.1174 13.3679 16.2426 12.2426C17.3679 11.1174 18 9.5913 18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8Z"
          stroke={isSelected ? '#FFFFFF' : '#6A6866'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_1515_7103">
        <rect width="24" height="24" fill="white" />
      </clipPath>
      <clipPath id="clip1_1515_7103">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </Icon>
);

export default IconToggleColorPicker;
