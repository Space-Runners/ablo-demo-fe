import { Icon } from '@chakra-ui/react';

const IconToggleColorPicker = ({ isSelected }) => (
  <Icon
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1646_11347)">
      <path
        d="M12 21C9.61305 21 7.32387 20.0518 5.63604 18.364C3.94821 16.6761 3 14.3869 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C16.97 3 21 6.582 21 11C21 12.06 20.526 13.078 19.682 13.828C18.838 14.578 17.693 15 16.5 15H14C13.5539 14.9928 13.1181 15.135 12.7621 15.404C12.4061 15.673 12.1503 16.0533 12.0353 16.4844C11.9203 16.9155 11.9528 17.3727 12.1276 17.7833C12.3025 18.1938 12.6095 18.5341 13 18.75C13.1997 18.9342 13.3366 19.1764 13.3915 19.4425C13.4465 19.7085 13.4167 19.9851 13.3064 20.2334C13.196 20.4816 13.0107 20.6891 12.7764 20.8266C12.5421 20.9641 12.2705 21.0247 12 21Z"
        stroke={isSelected ? '#FFFFFF' : '#959392'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 10.5C7.5 10.7652 7.60536 11.0196 7.79289 11.2071C7.98043 11.3946 8.23478 11.5 8.5 11.5C8.76522 11.5 9.01957 11.3946 9.20711 11.2071C9.39464 11.0196 9.5 10.7652 9.5 10.5C9.5 10.2348 9.39464 9.98043 9.20711 9.79289C9.01957 9.60536 8.76522 9.5 8.5 9.5C8.23478 9.5 7.98043 9.60536 7.79289 9.79289C7.60536 9.98043 7.5 10.2348 7.5 10.5Z"
        stroke={isSelected ? '#FFFFFF' : '#959392'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.5 7.5C11.5 7.76522 11.6054 8.01957 11.7929 8.20711C11.9804 8.39464 12.2348 8.5 12.5 8.5C12.7652 8.5 13.0196 8.39464 13.2071 8.20711C13.3946 8.01957 13.5 7.76522 13.5 7.5C13.5 7.23478 13.3946 6.98043 13.2071 6.79289C13.0196 6.60536 12.7652 6.5 12.5 6.5C12.2348 6.5 11.9804 6.60536 11.7929 6.79289C11.6054 6.98043 11.5 7.23478 11.5 7.5Z"
        stroke={isSelected ? '#FFFFFF' : '#959392'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 10.5C15.5 10.7652 15.6054 11.0196 15.7929 11.2071C15.9804 11.3946 16.2348 11.5 16.5 11.5C16.7652 11.5 17.0196 11.3946 17.2071 11.2071C17.3946 11.0196 17.5 10.7652 17.5 10.5C17.5 10.2348 17.3946 9.98043 17.2071 9.79289C17.0196 9.60536 16.7652 9.5 16.5 9.5C16.2348 9.5 15.9804 9.60536 15.7929 9.79289C15.6054 9.98043 15.5 10.2348 15.5 10.5Z"
        stroke={isSelected ? '#FFFFFF' : '#959392'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1646_11347">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </Icon>
);

export default IconToggleColorPicker;
