const BUCKET = 'https://sr-demo-products.s3.eu-central-1.amazonaws.com';

const variants = [
  {
    name: 'Blanco',
    color: '#FAFAFA',
    sides: {
      front: '',
    },
  },
  {
    name: 'Onyx',
    color: '#2A2A2C',
  },
  {
    name: 'OatMilk',
    color: '#EBDFC7',
  },
  {
    name: 'MatchaTea',
    color: '#B8CCB4',
  },
  {
    name: 'Cloudy',
    color: '#C7C9CC',
  },
  {
    name: 'ClearSky',
    color: '#9FBCD3',
  },
  {
    name: 'Oceana',
    color: '#404B67',
  },
  {
    name: 'PinkPetal',
    color: '#EFC4DC',
  },
  {
    name: 'Lavender',
    color: '#BFB4CD',
  },
  {
    name: 'LemonDrop',
    color: '#F9E39A',
  },
];

const PRODUCTS = [
  {
    name: 'Hoodie',
    fit: 'Regular',
    price: 200,
    urlPrefix: `${BUCKET}/10001229_REGULAR_FIT_HOODIE_HEAVYWEIGHT_50/10001229_REGULAR_FIT_HOODIE_Packshot`,
    description:
      'Made with our soft ring spun cotton and cotton blends - Softstyle features high stitch density fabric that offers a smooth printing surface, ideal for DTG',
    variants,
  },
  {
    name: 'T-Shirt',
    fit: 'Regular',
    price: 20,
    urlPrefix: `${BUCKET}/10001005_REGULAR_FIT_TSHIRT_RECYCLED_COTTON/10001005_REGULAR_FIT_TSHIRT_Packshot`,
    description:
      'Made with our soft ring spun cotton and cotton blends - Softstyle features high stitch density fabric that offers a smooth printing surface, ideal for DTG',
    variants,
  },
  {
    name: 'Shorts',
    fit: 'Regular',
    price: 30,
    urlPrefix: `${BUCKET}/10000991_REGULAR_SHORTS_LIGHTWEIGHT_50/10000991_REGULAR_SHORTS_Packshot`,
    description:
      'Made with our soft ring spun cotton and cotton blends - Softstyle features high stitch density fabric that offers a smooth printing surface, ideal for DTG',
    variants,
  },
];

export default PRODUCTS;
