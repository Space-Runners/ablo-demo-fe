import { mode } from '@chakra-ui/theme-tools';
export const buttonStyles = {
  components: {
    Text: {
      baseStyle: {
        color: '#000000',
      },
    },
    Button: {
      baseStyle: {
        borderRadius: '16px',
        boxShadow: '45px 76px 113px 7px rgba(112, 144, 176, 0.08)',
        transition: '.25s all ease',
        boxSizing: 'border-box',
      },
      variants: {
        solid: () => ({
          borderRadius: '16px',
          _hover: null,
          _active: null,
          _focus: null,
        }),
        outline: () => ({
          borderRadius: '16px',
          _hover: null,
          _active: null,
          _focus: null,
        }),
        brand: (props) => ({
          bg: mode('brand.500', 'brand.400')(props),
          color: 'white',
        }),
        darkBrand: (props) => ({
          bg: mode('brand.900', 'brand.400')(props),
          color: 'white',
        }),
        lightBrand: (props) => ({
          bg: mode('#F2EFFF', 'whiteAlpha.100')(props),
          color: mode('brand.500', 'white')(props),
        }),
        light: (props) => ({
          bg: mode('secondaryGray.300', 'whiteAlpha.100')(props),
          color: mode('secondaryGray.900', 'white')(props),
        }),
        action: (props) => ({
          fontWeight: '500',
          borderRadius: '50px',
          bg: mode('secondaryGray.300', 'brand.400')(props),
          color: mode('brand.500', 'white')(props),
        }),
        setup: (props) => ({
          fontWeight: '500',
          borderRadius: '50px',
          bg: mode('transparent', 'brand.400')(props),
          border: mode('1px solid', '0px solid')(props),
          borderColor: mode('secondaryGray.400', 'transparent')(props),
          color: mode('secondaryGray.900', 'white')(props),
        }),
      },
    },
  },
};
