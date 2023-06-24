import { Icon } from '@chakra-ui/react';

const IconToggleSide = ({ isSelected }) => (
  <Icon
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1515_7072)">
      <path
        d="M17 15.328C19.414 14.61 21 13.388 21 12C21 9.79 16.97 8 12 8C7.03 8 3 9.79 3 12C3 14.21 7.03 16 12 16"
        stroke={isSelected ? '#FFFFFF' : '#6A6866'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 13L12 16L9 19"
        stroke={isSelected ? '#FFFFFF' : '#6A6866'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1515_7072">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </Icon>
);

export default IconToggleSide;
