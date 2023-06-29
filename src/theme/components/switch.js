import { mode } from '@chakra-ui/theme-tools';

import Colors from '../colors';

const { abloBlue } = Colors;

export const switchStyles = {
  components: {
    Switch: {
      baseStyle: {
        thumb: {
          bg: '#000000',
          fontWeight: 400,
          borderRadius: '50%',
          w: '18px',
          h: '18px',
          _checked: { bg: abloBlue, transform: 'translate(26px, 0px)' },
        },
        track: {
          bg: '#EAE9E9',
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'border-box',
          padding: '3px',
          borderRadius: '16px',
          w: '50px',
          h: '24px',
          _checked: {
            bg: '#EAE9E9',
          },
          _focus: {
            boxShadow: 'none',
          },
        },
      },

      variants: {
        main: (props) => ({
          track: {
            bg: mode('gray.300', 'navy.700')(props),
          },
        }),
      },
    },
  },
};
